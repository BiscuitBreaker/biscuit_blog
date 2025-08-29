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

export async function getAllPostsMeta(page = 1, pageSize = 10) {
  const files = await slugs();
  const posts = [];
  for (const s of files) {
    const full = await fs.readFile(path.join(POSTS_DIR, `${s}.mdx`), 'utf8');
    const { data, content } = matter(full);
    if (data.draft) continue;
    posts.push({
      ...data,
      slug: data.slug || s,
      readingTime: readingTime(content),
      excerpt: data.excerpt || content.slice(0, 160),
    });
  }
  posts.sort((a,b) => new Date(b.date) - new Date(a.date));
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const start = (page - 1) * pageSize;
  return { posts: posts.slice(start, start + pageSize), totalPages };
}

export async function getPostBySlug(slug) {
  const file = await fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(file);
  return { frontmatter: { ...data, slug: data.slug || slug }, content };
}
