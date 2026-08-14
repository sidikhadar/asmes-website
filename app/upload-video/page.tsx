'use client'

import { useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import { Upload, Check, Copy, Loader2, Film } from 'lucide-react'

export default function UploadVideoPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleFile(file: File) {
    setStatus('uploading')
    setProgress(0)
    setError('')
    setUrl('')
    setFileName(file.name)

    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload-video',
        onUploadProgress: (e) => setProgress(Math.round(e.percentage)),
      })
      setUrl(blob.url)
      setStatus('done')
    } catch (err) {
      setError((err as Error).message || 'Upload failed')
      setStatus('error')
    }
  }

  async function copyUrl() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col justify-center gap-6 px-5 py-12">
      <div className="text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark">
          <Film className="size-7" />
        </span>
        <h1 className="mt-4 font-heading text-2xl font-extrabold text-brand-dark">
          Téléverser la vidéo du hero
        </h1>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Choisis la vidéo originale (sans watermark) depuis ta galerie. Une fois
          l&apos;upload terminé, copie l&apos;URL et envoie-la moi dans le chat.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void handleFile(file)
        }}
      />

      {status !== 'done' && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === 'uploading'}
          className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand/30 bg-card p-8 text-center transition-colors hover:border-brand/60 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'uploading' ? (
            <>
              <Loader2 className="size-8 animate-spin text-brand" />
              <span className="font-medium text-brand-dark">
                Envoi en cours… {progress}%
              </span>
              <span className="w-full max-w-xs overflow-hidden rounded-full bg-brand/10">
                <span
                  className="block h-2 rounded-full bg-brand transition-all"
                  style={{ width: `${progress}%` }}
                />
              </span>
              <span className="max-w-full truncate text-xs text-muted-foreground">
                {fileName}
              </span>
            </>
          ) : (
            <>
              <Upload className="size-8 text-brand" />
              <span className="font-medium text-brand-dark">
                Appuie pour choisir une vidéo
              </span>
              <span className="text-xs text-muted-foreground">
                MP4, WebM ou MOV — jusqu&apos;à 200 Mo
              </span>
            </>
          )}
        </button>
      )}

      {status === 'done' && (
        <div className="flex flex-col gap-4 rounded-2xl border border-brand/20 bg-card p-6">
          <div className="flex items-center gap-2 text-brand-dark">
            <Check className="size-5" />
            <span className="font-semibold">Vidéo téléversée</span>
          </div>

          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={url}
            className="w-full rounded-lg bg-black"
            controls
            playsInline
            muted
          />

          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              URL de la vidéo
            </span>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-2">
              <span className="flex-1 truncate text-xs" dir="ltr">
                {url}
              </span>
              <button
                type="button"
                onClick={copyUrl}
                className="flex shrink-0 items-center gap-1 rounded-md bg-brand px-3 py-2 text-xs font-medium text-brand-foreground transition-opacity hover:opacity-90"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? 'Copié' : 'Copier'}
              </button>
            </div>
          </div>

          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            Copie cette URL et colle-la moi dans le chat — je l&apos;intègre en fond
            du hero.
          </p>

          <button
            type="button"
            onClick={() => {
              setStatus('idle')
              setUrl('')
              setProgress(0)
            }}
            className="text-sm font-medium text-brand-dark underline underline-offset-4"
          >
            Téléverser une autre vidéo
          </button>
        </div>
      )}

      {status === 'error' && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </p>
      )}
    </main>
  )
}
