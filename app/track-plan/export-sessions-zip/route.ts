import { NextRequest, NextResponse } from 'next/server'
import { getFilesForSession } from '../../../services/googleDriveService'
import archiver from 'archiver'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { sessions } = await req.json()
    if (!sessions || !Array.isArray(sessions) || sessions.length === 0) {
      return new NextResponse('No sessions provided', { status: 400 })
    }

    // Create a PassThrough stream for archiver
    const { PassThrough } = await import('stream')
    const zipStream = new PassThrough()
    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.pipe(zipStream)

    // For each session, fetch files and append to archive
    for (const session of sessions) {
      // getFilesForSession should return an array of { name, buffer } or { name, stream }
      const files = await getFilesForSession(session)
      for (const file of files) {
        if (file.buffer) {
          archive.append(file.buffer, { name: `${session.day}_${session.time}_${file.name}` })
        } else if (file.stream) {
          archive.append(file.stream, { name: `${session.day}_${session.time}_${file.name}` })
        }
      }
    }
    await archive.finalize()

    // Set headers for ZIP download
    const headers = new Headers()
    headers.set('Content-Type', 'application/zip')
    headers.set('Content-Disposition', 'attachment; filename="sessions.zip"')

    // Return a streaming response
    return new NextResponse(zipStream as any, { headers })
  } catch (err) {
    console.error('ZIP export error:', err)
    return new NextResponse('Failed to export ZIP', { status: 500 })
  }
} 