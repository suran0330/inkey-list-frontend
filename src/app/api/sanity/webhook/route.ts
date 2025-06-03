import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { _type } = body;

    // Revalidate based on content type
    switch (_type) {
      case 'homepage':
        revalidatePath('/');
        break;
      case 'banner':
        revalidatePath('/');
        break;
      case 'page':
        revalidatePath('/');
        break;
      default:
        revalidatePath('/');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
