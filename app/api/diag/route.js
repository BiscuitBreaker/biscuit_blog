import { NextResponse } from 'next/server';

export async function GET() {
  const isProd = process.env.NODE_ENV === 'production';
  const authDisabled = process.env.AUTH_DISABLED === 'true';
  if (isProd && !authDisabled) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  const mask = (v) => (v ? 'set' : 'missing');
  const allowlist = (process.env.ALLOWLIST || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV,
    AUTH_DISABLED: authDisabled,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || null,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
    NEXTAUTH_SECRET: mask(process.env.NEXTAUTH_SECRET),
    LOGIN_PASSCODE: mask(process.env.LOGIN_PASSCODE),
    ALLOWLIST_COUNT: allowlist.length,
  });
}
