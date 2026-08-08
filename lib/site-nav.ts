/**
 * Centralised navigation model.
 *
 * Only the anchor ids live here — the visible labels come from the
 * trilingual dictionary (`lib/i18n.ts`) keyed by these same ids, so the
 * header and sections stay fully translated from a single source of truth.
 */

export type NavId =
  | 'accueil'
  | 'qui-sommes-nous'
  | 'mission'
  | 'vision'
  | 'objectifs'
  | 'partenaires'
  | 'contact'

export type NavItem = {
  /** Anchor target id used on the corresponding <section>. */
  id: NavId
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'accueil' },
  { id: 'qui-sommes-nous' },
  { id: 'mission' },
  { id: 'vision' },
  { id: 'objectifs' },
  { id: 'partenaires' },
  { id: 'contact' },
]
