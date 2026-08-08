/**
 * Trilingual dictionary for ASMES (FR / AR / EN).
 *
 * Every locale shares the exact same shape (enforced by the `Dictionary`
 * type), so adding a new string in one language forces you to provide it in
 * all three. Section content keyed by anchor id keeps the header, hero and
 * section components fully data-driven.
 */

export const LOCALES = ['fr', 'en', 'ar'] as const
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

/** SDG numbers ASMES contributes to (order matters — matches `goals`). */
export const SDG_NUMBERS = [1, 2, 3, 4, 5, 6, 8, 10, 13, 14, 15, 16, 17] as const

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
  sections: {
    'qui-sommes-nous': {
      eyebrow: string
      title: string
      lead: string
      paragraphs: string[]
      facts: string[]
    }
    mission: { eyebrow: string; title: string; intro: string; items: string[] }
    vision: { eyebrow: string; title: string; paragraphs: string[] }
    objectifs: {
      eyebrow: string
      title: string
      intro: string
      cards: { title: string; description: string }[]
    }
    odd: {
      eyebrow: string
      title: string
      intro: string
      conclusion: string
      goals: string[]
    }
    partenaires: { eyebrow: string; title: string; intro: string }
    contact: {
      eyebrow: string
      title: string
      intro: string
      addressLabel: string
      address: string
      emailLabel: string
      facebookLabel: string
      facebookvalue: string
    }
  }
  footer: { rights: string; developedBy: string; followUs: string }
  common: { comingSoon: string; sdgLabel: string }
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
      'qui-sommes-nous': {
        eyebrow: 'À propos',
        title: 'Qui sommes-nous',
        lead: "L'Association Sauvetage du Milieu Environnemental et Social (ASMES) est une organisation non gouvernementale mauritanienne, apolitique et à but non lucratif, créée le 24 novembre 2015 par un groupe de cadres issus de différentes wilayas de Mauritanie.",
        paragraphs: [
          "L'ASMES œuvre pour contribuer au développement durable, inclusif et équitable de la Mauritanie, en s'inscrivant dans la réalisation des Objectifs de Développement Durable (ODD).",
          "À travers ses interventions, l'association accompagne les populations et les communautés dans plusieurs domaines : lutte contre la pauvreté, autonomisation des femmes, formation, accès à l'eau, développement local, sécurité alimentaire, protection des droits, santé, environnement et adaptation aux changements climatiques.",
          "L'ASMES privilégie une approche participative qui place les communautés au cœur de l'identification, de la mise en œuvre et du suivi des actions de développement.",
        ],
        facts: [
          'Créée le 24 novembre 2015',
          'ONG apolitique',
          'À but non lucratif',
          'Approche participative',
        ],
      },
      mission: {
        eyebrow: 'Notre engagement',
        title: 'Notre mission',
        intro:
          "La mission de l'ASMES est de contribuer à l'amélioration durable des conditions de vie des populations, en particulier des communautés vulnérables, à travers le renforcement de leurs capacités, l'accompagnement des initiatives locales et la promotion d'un développement inclusif.",
        items: [
          "Renforcer l'autonomie et les capacités des communautés",
          'Soutenir les femmes et les initiatives locales',
          "Contribuer à l'accès aux services sociaux essentiels",
          "Promouvoir la formation et l'éducation citoyenne",
          'Soutenir la lutte contre la pauvreté et les vulnérabilités',
          'Contribuer à la sécurité alimentaire et au développement local',
          'Promouvoir la gestion durable des ressources',
          'Favoriser la participation des populations au processus de développement',
        ],
      },
      vision: {
        eyebrow: 'Notre horizon',
        title: 'Notre vision',
        paragraphs: [
          "Notre vision est celle d'une Mauritanie inclusive, solidaire et durable, où chaque personne et chaque communauté peut accéder aux opportunités nécessaires à son développement et participer pleinement à la construction de son avenir.",
          "Nous aspirons à un développement qui place l'être humain, la dignité, l'inclusion sociale, l'autonomisation économique et la préservation des ressources au centre des priorités.",
          "Notre ambition est de contribuer à des communautés plus autonomes, résilientes et capables de prendre en charge leur propre développement.",
        ],
      },
      objectifs: {
        eyebrow: 'Nos priorités',
        title: 'Nos objectifs',
        intro:
          "Huit priorités complémentaires guident l'action de l'ASMES sur le terrain, au plus près des besoins des communautés.",
        cards: [
          {
            title: 'Lutter contre la pauvreté et les vulnérabilités',
            description:
              "Contribuer à l'amélioration des conditions de vie des populations vulnérables, particulièrement en milieu rural, et soutenir les initiatives locales permettant de renforcer leur autonomie économique et sociale.",
          },
          {
            title: "Promouvoir l'autonomisation des femmes",
            description:
              "Renforcer les capacités des femmes, notamment en milieu rural, à travers la formation, l'organisation, la gestion des coopératives et l'appui aux activités génératrices de revenus.",
          },
          {
            title: "Renforcer les compétences et l'éducation",
            description:
              "Développer les capacités des populations à travers la formation professionnelle, l'alphabétisation, l'éducation citoyenne, la formation des coopératives et l'accompagnement des initiatives communautaires.",
          },
          {
            title: "Améliorer l'accès aux services essentiels",
            description:
              "Contribuer à l'amélioration de l'accès à l'eau potable, à l'assainissement et aux autres services sociaux essentiels, particulièrement dans les zones vulnérables.",
          },
          {
            title: 'Soutenir le développement local',
            description:
              "Accompagner les communautés, les collectivités locales et les initiatives locales afin de renforcer leur capacité à concevoir et mettre en œuvre des solutions adaptées à leurs besoins.",
          },
          {
            title: 'Promouvoir la santé, la protection et les droits',
            description:
              "Contribuer à la sensibilisation sanitaire, à la prévention des maladies liées à l'eau, à la protection des droits de la personne et à l'amélioration du bien-être des populations.",
          },
          {
            title: 'Renforcer la sécurité alimentaire',
            description:
              "Soutenir les communautés dans leurs initiatives visant à améliorer la sécurité alimentaire, la production locale et la résilience des populations face aux difficultés économiques et climatiques.",
          },
          {
            title: "Préserver l'environnement et renforcer la résilience climatique",
            description:
              "Contribuer à la protection des ressources naturelles et à la lutte contre les effets des changements climatiques, en complément des actions sociales et économiques de l'association.",
          },
        ],
      },
      odd: {
        eyebrow: 'Agenda 2030',
        title: 'Notre engagement envers les ODD',
        intro:
          "L'ASMES inscrit ses actions dans une approche globale des Objectifs de Développement Durable. Notre contribution porte notamment sur :",
        conclusion:
          "L'ASMES considère que la réalisation des ODD passe par une approche intégrée dans laquelle le développement social, l'autonomisation économique, l'accès aux services essentiels, la protection des droits, la résilience des communautés et la protection de l'environnement se renforcent mutuellement.",
        goals: [
          'Pas de pauvreté',
          'Faim « zéro » et sécurité alimentaire',
          'Bonne santé et bien-être',
          'Éducation de qualité',
          'Égalité entre les sexes',
          'Eau propre et assainissement',
          'Travail décent et croissance économique',
          'Réduction des inégalités',
          'Lutte contre les changements climatiques',
          'Vie aquatique',
          'Vie terrestre',
          'Paix, justice et institutions efficaces',
          'Partenariats pour la réalisation des objectifs',
        ],
      },
      partenaires: {
        eyebrow: 'Ils nous soutiennent',
        title: 'Nos partenaires',
        intro:
          "L'ASMES agit aux côtés de partenaires nationaux et internationaux qui partagent son engagement pour un développement durable, inclusif et solidaire.",
      },
      contact: {
        eyebrow: 'Restons en lien',
        title: 'Contact',
        intro:
          "Une question, un projet ou une envie de collaborer ? N'hésitez pas à nous contacter.",
        addressLabel: 'Adresse',
        address:
          'Rue Cheikhna Mohamed Laghdaf N°085, Ilot K, Tevragh-Zeina, Nouakchott',
        emailLabel: 'Email',
        facebookLabel: 'Facebook',
        facebookvalue: 'facebook.com/ongasmerim',
      },
    },
    footer: {
      rights: 'Tous droits réservés.',
      developedBy: 'Site développé par HYBRIDS TECH',
      followUs: 'Suivez-nous',
    },
    common: { comingSoon: 'Contenu à venir dans la prochaine étape.', sdgLabel: 'ODD' },
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
      'qui-sommes-nous': {
        eyebrow: 'عن الجمعية',
        title: 'من نحن',
        lead: 'جمعية إنقاذ الوسط البيئي والاجتماعي (ASMES) هي منظمة غير حكومية موريتانية، غير سياسية ولا تهدف إلى الربح، تأسست في 24 نوفمبر 2015 على يد مجموعة من الأطر المنحدرين من مختلف ولايات موريتانيا.',
        paragraphs: [
          'تعمل ASMES على المساهمة في التنمية المستدامة والشاملة والعادلة لموريتانيا، في إطار تحقيق أهداف التنمية المستدامة.',
          'من خلال تدخلاتها، تواكب الجمعية السكان والمجتمعات في عدة مجالات: مكافحة الفقر، وتمكين المرأة، والتدريب، والوصول إلى الماء، والتنمية المحلية، والأمن الغذائي، وحماية الحقوق، والصحة، والبيئة، والتكيف مع تغير المناخ.',
          'تعتمد ASMES مقاربة تشاركية تضع المجتمعات في صميم تحديد وتنفيذ ومتابعة أعمال التنمية.',
        ],
        facts: [
          'تأسست في 24 نوفمبر 2015',
          'منظمة غير سياسية',
          'لا تهدف إلى الربح',
          'مقاربة تشاركية',
        ],
      },
      mission: {
        eyebrow: 'التزامنا',
        title: 'مهمتنا',
        intro:
          'تتمثل مهمة ASMES في المساهمة في التحسين المستدام لظروف عيش السكان، خاصة المجتمعات الهشة، من خلال تعزيز قدراتها ومواكبة المبادرات المحلية وتعزيز تنمية شاملة.',
        items: [
          'تعزيز استقلالية المجتمعات وقدراتها',
          'دعم النساء والمبادرات المحلية',
          'المساهمة في الوصول إلى الخدمات الاجتماعية الأساسية',
          'تعزيز التدريب والتربية المدنية',
          'دعم مكافحة الفقر وأشكال الهشاشة',
          'المساهمة في الأمن الغذائي والتنمية المحلية',
          'تعزيز الإدارة المستدامة للموارد',
          'تشجيع مشاركة السكان في عملية التنمية',
        ],
      },
      vision: {
        eyebrow: 'آفاقنا',
        title: 'رؤيتنا',
        paragraphs: [
          'رؤيتنا هي موريتانيا شاملة ومتضامنة ومستدامة، حيث يمكن لكل شخص وكل مجتمع الوصول إلى الفرص اللازمة لتنميته والمشاركة الكاملة في بناء مستقبله.',
          'نتطلع إلى تنمية تضع الإنسان والكرامة والإدماج الاجتماعي والتمكين الاقتصادي والحفاظ على الموارد في صميم الأولويات.',
          'طموحنا هو المساهمة في مجتمعات أكثر استقلالية وقدرة على الصمود وقادرة على تولي تنميتها الخاصة.',
        ],
      },
      objectifs: {
        eyebrow: 'أولوياتنا',
        title: 'أهدافنا',
        intro:
          'ثماني أولويات متكاملة توجه عمل ASMES على أرض الواقع، في أقرب صلة باحتياجات المجتمعات.',
        cards: [
          {
            title: 'مكافحة الفقر وأشكال الهشاشة',
            description:
              'المساهمة في تحسين الظروف المعيشية للفئات الهشة، خاصة في الوسط الريفي، ودعم المبادرات المحلية التي تعزز استقلاليتها الاقتصادية والاجتماعية.',
          },
          {
            title: 'تعزيز تمكين المرأة',
            description:
              'تعزيز قدرات النساء، لا سيما في الوسط الريفي، من خلال التدريب والتنظيم وإدارة التعاونيات ودعم الأنشطة المدرة للدخل.',
          },
          {
            title: 'تعزيز المهارات والتعليم',
            description:
              'تنمية قدرات السكان من خلال التدريب المهني ومحو الأمية والتربية المدنية وتكوين التعاونيات ومواكبة المبادرات المجتمعية.',
          },
          {
            title: 'تحسين الوصول إلى الخدمات الأساسية',
            description:
              'المساهمة في تحسين الوصول إلى الماء الصالح للشرب والصرف الصحي وسائر الخدمات الاجتماعية الأساسية، خاصة في المناطق الهشة.',
          },
          {
            title: 'دعم التنمية المحلية',
            description:
              'مواكبة المجتمعات والجماعات المحلية والمبادرات المحلية لتعزيز قدرتها على تصميم وتنفيذ حلول ملائمة لاحتياجاتها.',
          },
          {
            title: 'تعزيز الصحة والحماية والحقوق',
            description:
              'المساهمة في التوعية الصحية والوقاية من الأمراض المرتبطة بالماء وحماية حقوق الإنسان وتحسين رفاهية السكان.',
          },
          {
            title: 'تعزيز الأمن الغذائي',
            description:
              'دعم المجتمعات في مبادراتها الرامية إلى تحسين الأمن الغذائي والإنتاج المحلي وقدرة السكان على الصمود أمام الصعوبات الاقتصادية والمناخية.',
          },
          {
            title: 'حماية البيئة وتعزيز القدرة على مواجهة تغير المناخ',
            description:
              'المساهمة في حماية الموارد الطبيعية ومكافحة آثار تغير المناخ، تكميلاً للأعمال الاجتماعية والاقتصادية للجمعية.',
          },
        ],
      },
      odd: {
        eyebrow: 'أجندة 2030',
        title: 'التزامنا بأهداف التنمية المستدامة',
        intro:
          'تُدرج ASMES أعمالها ضمن مقاربة شاملة لأهداف التنمية المستدامة. وتنصبّ مساهمتنا بشكل خاص على:',
        conclusion:
          'ترى ASMES أن تحقيق أهداف التنمية المستدامة يمرّ عبر مقاربة متكاملة تتعزز فيها التنمية الاجتماعية والتمكين الاقتصادي والوصول إلى الخدمات الأساسية وحماية الحقوق وقدرة المجتمعات على الصمود وحماية البيئة بعضها ببعض.',
        goals: [
          'القضاء على الفقر',
          'القضاء التام على الجوع والأمن الغذائي',
          'الصحة الجيدة والرفاه',
          'التعليم الجيد',
          'المساواة بين الجنسين',
          'المياه النظيفة والصرف الصحي',
          'العمل اللائق ونمو الاقتصاد',
          'الحد من أوجه عدم المساواة',
          'العمل المناخي',
          'الحياة تحت الماء',
          'الحياة في البرّ',
          'السلام والعدل والمؤسسات القوية',
          'عقد الشراكات لتحقيق الأهداف',
        ],
      },
      partenaires: {
        eyebrow: 'يدعموننا',
        title: 'شركاؤنا',
        intro:
          'تعمل جمعية ASMES إلى جانب شركاء وطنيين ودوليين يشاركونها التزامها بتنمية مستدامة وشاملة وتضامنية.',
      },
      contact: {
        eyebrow: 'لنبقَ على تواصل',
        title: 'اتصل بنا',
        intro: 'لديك سؤال أو مشروع أو رغبة في التعاون؟ لا تتردد في التواصل معنا.',
        addressLabel: 'العنوان',
        address:
          'شارع الشيخنا محمد لغظف رقم 085، الحي K، تفرغ زينة، نواكشوط',
        emailLabel: 'البريد الإلكتروني',
        facebookLabel: 'فيسبوك',
        facebookvalue: 'facebook.com/ongasmerim',
      },
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
      developedBy: 'الموقع من تطوير HYBRIDS TECH',
      followUs: 'تابعونا',
    },
    common: { comingSoon: 'سيُضاف المحتوى في الخطوة القادمة.', sdgLabel: 'هدف' },
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
      'qui-sommes-nous': {
        eyebrow: 'About',
        title: 'About us',
        lead: 'The Association for the Safeguarding of the Environmental and Social Milieu (ASMES) is a Mauritanian non-governmental organization, non-political and non-profit, founded on 24 November 2015 by a group of professionals from various wilayas (regions) of Mauritania.',
        paragraphs: [
          'ASMES works to contribute to the sustainable, inclusive and equitable development of Mauritania, as part of achieving the Sustainable Development Goals (SDGs).',
          "Through its interventions, the association supports populations and communities across several areas: the fight against poverty, women's empowerment, training, access to water, local development, food security, protection of rights, health, the environment and adaptation to climate change.",
          'ASMES favors a participatory approach that places communities at the heart of identifying, implementing and monitoring development actions.',
        ],
        facts: [
          'Founded on 24 November 2015',
          'Non-political NGO',
          'Non-profit',
          'Participatory approach',
        ],
      },
      mission: {
        eyebrow: 'Our commitment',
        title: 'Our mission',
        intro:
          "ASMES's mission is to contribute to a lasting improvement in people's living conditions, particularly those of vulnerable communities, by strengthening their capacities, supporting local initiatives and promoting inclusive development.",
        items: [
          'Strengthen community autonomy and capacities',
          'Support women and local initiatives',
          'Contribute to access to essential social services',
          'Promote training and civic education',
          'Support the fight against poverty and vulnerabilities',
          'Contribute to food security and local development',
          'Promote sustainable resource management',
          "Foster people's participation in the development process",
        ],
      },
      vision: {
        eyebrow: 'Our horizon',
        title: 'Our vision',
        paragraphs: [
          'Our vision is that of an inclusive, united and sustainable Mauritania, where every person and every community can access the opportunities needed for their development and fully participate in building their future.',
          'We aspire to a form of development that places the human being, dignity, social inclusion, economic empowerment and the preservation of resources at the heart of its priorities.',
          'Our ambition is to contribute to communities that are more autonomous, resilient and able to take charge of their own development.',
        ],
      },
      objectifs: {
        eyebrow: 'Our priorities',
        title: 'Our objectives',
        intro:
          "Eight complementary priorities guide ASMES's work on the ground, as close as possible to the needs of communities.",
        cards: [
          {
            title: 'Fight poverty and vulnerabilities',
            description:
              'Help improve the living conditions of vulnerable populations, particularly in rural areas, and support local initiatives that strengthen their economic and social autonomy.',
          },
          {
            title: "Promote women's empowerment",
            description:
              "Strengthen women's capacities, especially in rural areas, through training, organization, cooperative management and support for income-generating activities.",
          },
          {
            title: 'Strengthen skills and education',
            description:
              "Build people's capacities through vocational training, literacy, civic education, cooperative training and support for community initiatives.",
          },
          {
            title: 'Improve access to essential services',
            description:
              'Help improve access to drinking water, sanitation and other essential social services, particularly in vulnerable areas.',
          },
          {
            title: 'Support local development',
            description:
              'Support communities, local authorities and local initiatives to strengthen their ability to design and implement solutions adapted to their needs.',
          },
          {
            title: 'Promote health, protection and rights',
            description:
              "Contribute to health awareness, prevention of water-related diseases, protection of human rights and improvement of people's well-being.",
          },
          {
            title: 'Strengthen food security',
            description:
              "Support communities in their initiatives to improve food security, local production and people's resilience in the face of economic and climatic difficulties.",
          },
          {
            title: 'Protect the environment and strengthen climate resilience',
            description:
              "Help protect natural resources and combat the effects of climate change, complementing the association's social and economic actions.",
          },
        ],
      },
      odd: {
        eyebrow: 'Agenda 2030',
        title: 'Our commitment to the SDGs',
        intro:
          'ASMES embeds its actions within a comprehensive approach to the Sustainable Development Goals. Our contribution focuses in particular on:',
        conclusion:
          'ASMES believes that achieving the SDGs requires an integrated approach in which social development, economic empowerment, access to essential services, protection of rights, community resilience and environmental protection reinforce one another.',
        goals: [
          'No poverty',
          'Zero hunger and food security',
          'Good health and well-being',
          'Quality education',
          'Gender equality',
          'Clean water and sanitation',
          'Decent work and economic growth',
          'Reduced inequalities',
          'Climate action',
          'Life below water',
          'Life on land',
          'Peace, justice and strong institutions',
          'Partnerships for the goals',
        ],
      },
      partenaires: {
        eyebrow: 'They support us',
        title: 'Our partners',
        intro:
          'ASMES works alongside national and international partners who share its commitment to sustainable, inclusive and solidarity-driven development.',
      },
      contact: {
        eyebrow: 'Stay in touch',
        title: 'Contact',
        intro:
          'A question, a project or a wish to collaborate? Feel free to reach out to us.',
        addressLabel: 'Address',
        address:
          'Rue Cheikhna Mohamed Laghdaf N°085, Ilot K, Tevragh-Zeina, Nouakchott',
        emailLabel: 'Email',
        facebookLabel: 'Facebook',
        facebookvalue: 'facebook.com/ongasmerim',
      },
    },
    footer: {
      rights: 'All rights reserved.',
      developedBy: 'Website developed by HYBRIDS TECH',
      followUs: 'Follow us',
    },
    common: { comingSoon: 'Content coming in the next step.', sdgLabel: 'SDG' },
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
