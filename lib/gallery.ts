/**
 * Gallery data model.
 *
 * Only the category keys and image counts live here — the visible category
 * titles come from the trilingual dictionary (`lib/i18n.ts`) keyed by these
 * same keys, so the gallery stays fully translated from a single source of
 * truth. Photos live under /public/gallery/<key>/<key>-NN.jpg.
 */

export const GALLERY_CATEGORY_KEYS = [
  'puits',
  'distributions',
  'inondations',
  'sensibilisation',
  'forums',
  'partenariats',
  'reseaux',
  'environnement',
  'moringa',
] as const

export type GalleryCategoryKey = (typeof GALLERY_CATEGORY_KEYS)[number]

/** Number of photos available per category (files are 1-indexed, zero-padded). */
const IMAGE_COUNTS: Record<GalleryCategoryKey, number> = {
  puits: 14,
  distributions: 15,
  inondations: 6,
  sensibilisation: 6,
  forums: 10,
  partenariats: 2,
  reseaux: 2,
  environnement: 5,
  moringa: 1,
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
