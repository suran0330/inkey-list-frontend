import { revalidateTag, revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      const message = 'Invalid signature'
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401
      })
    }

    if (!body?._type) {
      const message = 'Bad Request'
      return new Response(JSON.stringify({ message, body }), { status: 400 })
    }

    // Revalidate specific paths based on the document type
    switch (body._type) {
      case 'homepage':
        revalidatePath('/')
        revalidateTag('homepage')
        break
      case 'product':
        revalidatePath('/products')
        if (body.slug?.current) {
          revalidatePath(`/products/${body.slug.current}`)
        }
        revalidateTag('products')
        break
      case 'blogPost':
        revalidatePath('/blog')
        if (body.slug?.current) {
          revalidatePath(`/blog/${body.slug.current}`)
        }
        revalidateTag('blog')
        break
      case 'page':
        if (body.slug?.current) {
          revalidatePath(`/${body.slug.current}`)
        }
        revalidateTag('pages')
        break
      case 'banner':
      case 'globalContent':
      case 'siteSettings':
        // These affect multiple pages, so revalidate common paths
        revalidatePath('/')
        revalidatePath('/products')
        revalidatePath('/blog')
        revalidateTag('global')
        break
      default:
        // For any other document type, revalidate the homepage
        revalidatePath('/')
        break
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    })
  } catch (err: any) {
    console.error('Error in revalidate API:', err)
    return new Response(err.message, { status: 500 })
  }
}