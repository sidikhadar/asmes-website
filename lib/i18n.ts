/**
 * Trilingual dictionary for ASMES (FR / AR / EN).
 *
 * Every locale shares the exact same shape (enforced by the `Dictionary`
 * type), so adding a new string in one language forces you to provide it in
 * all three. Section content keyed by anchor id keeps the header, hero and
 * section components fully data-driven.
 */

export const LOCALES = ['fr', 'ar', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'fr'

/** Locales that render right-to-left. */
export const RTL_LOCALES: Locale[] = ['ar']

export const LANGUAGE_LABELS: Record<Locale, string> = {
  fr: 'Français',
  ar: 'العربية',
  en: 'English',
}

/** Short code shown in the compact header pill. */
export const LANGUAGE_SHORT: Record<Locale, string> = {
  fr: 'FR',
  ar: 'ع',
  en: 'EN',
}

type SectionCopy = { eyebrow: string; title: string }

export type Dictionary = {
  brand: { tagline: string }
  nav: Record<
    'accueil' | 'qui-sommes-nous' | 'mission' | 'vision' | 'objectifs' | 'partenaires' | 'contact',
    string
  >
  hero: {
    badge: string
    titleLead: string
    titleHighlight: string
    subtitle: string
    ctaContact: string
    ctaDiscover: string
    scroll: string
  }
  sections: Record<
    'qui-sommes-nous' | 'mission' | 'vision' | 'objectifs' | 'partenaires' | 'contact',
    SectionCopy
  >
  common: { comingSoon: string }
  a11y: {
    home: string
    openMenu: string
    closeMenu: string
    changeLanguage: string
    language: string
    scrollDown: string
    menu: string
  }
}

export const DICTIONARIES: Record<Locale, Dictionary> = {
  fr: {
    brand: { tagline: 'Milieu Environnemental & Social' },
    nav: {
      accueil: 'Accueil',
      'qui-sommes-nous': 'Qui sommes-nous',
      mission: 'Notre mission',
      vision: 'Notre vision',
      objectifs: 'Nos objectifs',
      partenaires: 'Nos partenaires',
      contact: 'Contact',
    },
    hero: {
      badge: 'ONG mauritanienne',
      titleLead: 'Association de Sauvetage du',
      titleHighlight: 'Milieu Environnemental et Social',
      subtitle:
        "Agir pour la sauvegarde de l'environnement et le développement social, au service des communautés mauritaniennes et des générations futures.",
      ctaContact: 'Nous contacter',
      ctaDiscover: "Découvrir l'association",
      scroll: 'Faire défiler vers le bas',
    },
    sections: {
      'qui-sommes-nous': { eyebrow: 'À propos', title: 'Qui sommes-nous' },
      mission: { eyebrow: 'Notre engagement', title: 'Notre mission' },
      vision: { eyebrow: 'Notre horizon', title: 'Notre vision' },
      objectifs: { eyebrow: 'Nos priorités', title: 'Nos objectifs' },
      partenaires: { eyebrow: 'Ils nous soutiennent', title: 'Nos partenaires' },
      contact: { eyebrow: 'Restons en lien', title: 'Contact' },
    },
    common: { comingSoon: 'Contenu à venir dans la prochaine étape.' },
    a11y: {
      home: "ASMES — retour à l'accueil",
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      changeLanguage: 'Changer de langue',
      language: 'Langue',
      scrollDown: 'Faire défiler vers le bas',
      menu: 'Menu de navigation',
    },
  },
  ar: {
    brand: { tagline: 'الوسط البيئي والاجتماعي' },
    nav: {
      accueil: 'الرئيسية',
      'qui-sommes-nous': 'من نحن',
      mission: 'مهمتنا',
      vision: 'رؤيتنا',
      objectifs: 'أهدافنا',
      partenaires: 'شركاؤنا',
      contact: 'اتصل بنا',
    },
    hero: {
      badge: 'منظمة غير حكومية موريتانية',
      titleLead: 'جمعية إنقاذ',
      titleHighlight: 'الوسط البيئي والاجتماعي',
      subtitle:
        'العمل من أجل حماية البيئة والتنمية الاجتماعية، في خدمة المجتمعات الموريتانية والأجيال القادمة.',
      ctaContact: 'اتصل بنا',
      ctaDiscover: 'اكتشف الجمعية',
      scroll: 'التمرير للأسفل',
    },
    sections: {
      'qui-sommes-nous': { eyebrow: 'عن الجمعية', title: 'من نحن' },
      mission: { eyebrow: 'التزامنا', title: 'مهمتنا' },
      vision: { eyebrow: 'آفاقنا', title: 'رؤيتنا' },
      objectifs: { eyebrow: 'أولوياتنا', title: 'أهدافنا' },
      partenaires: { eyebrow: 'يدعموننا', title: 'شركاؤنا' },
      contact: { eyebrow: 'لنبقَ على تواصل', title: 'اتصل بنا' },
    },
    common: { comingSoon: 'سيُضاف المحتوى في الخطوة القادمة.' },
    a11y: {
      home: 'ASMES — العودة إلى الرئيسية',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      changeLanguage: 'تغيير اللغة',
      language: 'اللغة',
      scrollDown: 'التمرير للأسفل',
      menu: 'قائمة التنقل',
    },
  },
  en: {
    brand: { tagline: 'Environmental & Social Milieu' },
    nav: {
      accueil: 'Home',
      'qui-sommes-nous': 'About us',
      mission: 'Our mission',
      vision: 'Our vision',
      objectifs: 'Our objectives',
      partenaires: 'Our partners',
      contact: 'Contact',
    },
    hero: {
      badge: 'Mauritanian NGO',
      titleLead: 'Association for the Safeguarding of the',
      titleHighlight: 'Environmental and Social Milieu',
      subtitle:
        'Working to protect the environment and advance social development, in service of Mauritanian communities and future generations.',
      ctaContact: 'Contact us',
      ctaDiscover: 'Discover the association',
      scroll: 'Scroll down',
    },
    sections: {
      'qui-sommes-nous': { eyebrow: 'About', title: 'About us' },
      mission: { eyebrow: 'Our commitment', title: 'Our mission' },
      vision: { eyebrow: 'Our horizon', title: 'Our vision' },
      objectifs: { eyebrow: 'Our priorities', title: 'Our objectives' },
      partenaires: { eyebrow: 'They support us', title: 'Our partners' },
      contact: { eyebrow: 'Stay in touch', title: 'Contact' },
    },
    common: { comingSoon: 'Content coming in the next step.' },
    a11y: {
      home: 'ASMES — back to home',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      changeLanguage: 'Change language',
      language: 'Language',
      scrollDown: 'Scroll down',
      menu: 'Navigation menu',
    },
  },
}

export function isRtl(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale)
}
