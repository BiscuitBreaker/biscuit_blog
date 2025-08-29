import BackButton from '../../../components/BackButton';
import { getPostBySlug } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Comments from '../../../components/Comments';
import { mdxComponents } from '../../../components/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

export async function generateStaticParams() {
  const { slugs } = await import('../../../lib/posts');
  const all = await slugs();
  return all.map((s) => ({ slug: s }));
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <BackButton />
      <article className="prose prose-invert">
        <h1>{post.frontmatter.title}</h1>
        <p className="!mt-0 text-white/60 text-sm">{new Date(post.frontmatter.date).toDateString()}</p>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [],
              rehypePlugins: [[rehypePrettyCode, { theme: 'one-dark-pro' }]],
            },
          }}
        />
      </article>
  <Comments />
    </main>
  );
}
