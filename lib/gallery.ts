/**
 * Gallery data model.
 *
 * Only the category keys and image counts live here — the visible category
 * titles come from the trilingual dictionary (`lib/i18n.ts`) keyed by these
 * same keys, so the gallery stays fully translated from a single source of
 * truth. Photos live under /public/gallery/<key>/<key>-NN.jpg.
 */

export const GALLERY_CATEGORY_KEYS = ['terrain', 'institution'] as const

export type GalleryCategoryKey = (typeof GALLERY_CATEGORY_KEYS)[number]

/** Number of photos available per category (files are 1-indexed, zero-padded). */
const IMAGE_COUNTS: Record<GalleryCategoryKey, number> = {
  terrain: 17,
  institution: 5,
}

export type GalleryCategory = {
  key: GalleryCategoryKey
  images: string[]
}

export const GALLERY: GalleryCategory[] = GALLERY_CATEGORY_KEYS.map((key) => ({
  key,
  images: Array.from(
    { length: IMAGE_COUNTS[key] },
    (_, i) => `/gallery/${key}/${key}-${String(i + 1).padStart(2, '0')}.jpg`,
  ),
}))
