import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'BiscuitBlog';
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'black',
          color: 'white',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{title}</div>
        <div style={{ marginTop: 12, opacity: 0.7 }}>biscuit.blog</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
