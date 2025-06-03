import { type NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    // Verify the webhook secret
    const body = await req.json()
    const secret = req.headers.get('sanity-webhook-secret')
    
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Extract document information from the webhook payload
    const { _type, slug } = body

    console.log('Webhook received for:', { _type, slug })

    // Revalidate based on document type
    switch (_type) {
      case 'homepage':
        revalidatePath('/')
        revalidateTag('homepage')
        break
      case 'product':
        revalidatePath('/products')
        if (slug?.current) {
          revalidatePath(`/products/${slug.current}`)
        }
        revalidateTag('products')
        break
      case 'blogPost':
        revalidatePath('/blog')
        if (slug?.current) {
          revalidatePath(`/blog/${slug.current}`)
        }
        revalidateTag('blog')
        break
      case 'page':
        if (slug?.current) {
          revalidatePath(`/${slug.current}`)
        }
        revalidateTag('pages')
        break
      case 'banner':
      case 'globalContent':
      case 'siteSettings':
        // Global content affects multiple pages
        revalidatePath('/')
        revalidatePath('/products')
        revalidatePath('/blog')
        revalidateTag('global')
        break
      default:
        // Fallback: revalidate homepage
        revalidatePath('/')
        break
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      _type,
      slug: slug?.current || null,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}