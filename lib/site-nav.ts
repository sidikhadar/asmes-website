/**
 * Centralised navigation model.
 *
 * Labels are kept here (rather than hard-coded in the JSX) so that the
 * trilingual system introduced in a later step can swap them per locale
 * without touching the header or section components.
 */

export type NavItem = {
  /** Anchor target id used on the corresponding <section>. */
  id: string
  /** Current (French) label. */
  label: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'qui-sommes-nous', label: 'Qui sommes-nous' },
  { id: 'mission', label: 'Notre mission' },
  { id: 'vision', label: 'Notre vision' },
  { id: 'objectifs', label: 'Nos objectifs' },
  { id: 'partenaires', label: 'Nos partenaires' },
  { id: 'contact', label: 'Contact' },
]
