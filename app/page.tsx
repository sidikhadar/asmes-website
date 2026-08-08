import { SiteHeader } from '@/components/site-header'
import { SplashScreen } from '@/components/splash-screen'
import { Hero } from '@/components/sections/hero'
import { SectionPlaceholder } from '@/components/sections/section-placeholder'

export default function Page() {
  return (
    <>
      <SplashScreen />
      <SiteHeader />
      <main>
        <Hero />

        <SectionPlaceholder
          id="qui-sommes-nous"
          eyebrow="À propos"
          title="Qui sommes-nous"
        />
        <SectionPlaceholder
          id="mission"
          eyebrow="Notre engagement"
          title="Notre mission"
          tinted
        />
        <SectionPlaceholder
          id="vision"
          eyebrow="Notre horizon"
          title="Notre vision"
        />
        <SectionPlaceholder
          id="objectifs"
          eyebrow="Nos priorités"
          title="Nos objectifs"
          tinted
        />
        <SectionPlaceholder
          id="partenaires"
          eyebrow="Ils nous soutiennent"
          title="Nos partenaires"
        />
        <SectionPlaceholder
          id="contact"
          eyebrow="Restons en lien"
          title="Contact"
          tinted
        />
      </main>
    </>
  )
}
