import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export async function slugs() {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

/**
 * Load all posts' frontmatter/content metadata.
 * @param {Object} options
 * @param {boolean} [options.includeDrafts=false] include posts with frontmatter draft: true
 * @returns {Promise<Array<{slug:string, title:string, date:string, excerpt?:string, tags?:string[], cover?:string, readingTime:any, draft?:boolean}>>}
 */
export async function getAllPosts({ includeDrafts = false } = {}) {
  const files = await slugs();
  const posts = [];
  for (const s of files) {
    const full = await fs.readFile(path.join(POSTS_DIR, `${s}.mdx`), 'utf8');
    const { data, content } = matter(full);
    const meta = {
      ...data,
      slug: data.slug || s,
      readingTime: readingTime(content),
      excerpt: data.excerpt || content.slice(0, 160),
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
    };
    if (data.draft && !includeDrafts) continue;
    posts.push(meta);
  }
  posts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  return posts;
}

export async function getAllPostsMeta(page = 1, pageSize = 10, { includeDrafts = false } = {}) {
  const posts = await getAllPosts({ includeDrafts });
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const start = (page - 1) * pageSize;
  return { posts: posts.slice(start, start + pageSize), totalPages };
}

export async function getPostBySlug(slug) {
  const file = await fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(file);
  return { frontmatter: { ...data, slug: data.slug || slug }, content };
}

export async function getAllTags({ includeDrafts = false } = {}) {
  const posts = await getAllPosts({ includeDrafts });
  const map = new Map();
  for (const p of posts) {
    for (const t of p.tags || []) {
      map.set(t, (map.get(t) || 0) + 1);
    }
  }
  return Array.from(map.entries()).map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPostsByTag(tag, page = 1, pageSize = 10, { includeDrafts = false } = {}) {
  const posts = (await getAllPosts({ includeDrafts })).filter(p => (p.tags || []).includes(tag));
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const start = (page - 1) * pageSize;
  return { posts: posts.slice(start, start + pageSize), totalPages };
}
