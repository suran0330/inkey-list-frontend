import { NextRequest, NextResponse } from 'next/server';
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug') || '/';

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new NextResponse('Invalid secret', { status: 401 });
  }

  draftMode().enable();
  redirect(`${slug}?preview=true`);
}
