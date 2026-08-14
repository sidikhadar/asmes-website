import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Client-upload token route. The browser uploads the (potentially large) video
 * file straight to Blob storage; this route only issues a short-lived token and
 * records completion, so it never buffers the whole file server-side.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        access: 'public',
        allowedContentTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
        // Allow reasonably large hero videos (up to ~200 MB).
        maximumSizeInBytes: 200 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // No-op: the client receives the final URL directly.
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    )
  }
}
