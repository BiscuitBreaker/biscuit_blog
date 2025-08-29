import { NextResponse } from 'next/server';
import { draftMode } from 'next/headers';

export async function GET(request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const redirect = url.searchParams.get('redirect') || '/';
  if (secret !== (process.env.PREVIEW_SECRET || 'bikki')) {
    return new NextResponse('Invalid secret', { status: 401 });
  }
  // Enable Draft Mode cookie
  draftMode().enable();
  return NextResponse.redirect(new URL(redirect, request.url));
}
