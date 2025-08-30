// Deprecated diagnostics endpoint returning 404.
export const runtime = 'edge';
export async function GET() {
  return new Response('Not Found', { status: 404 });
}
