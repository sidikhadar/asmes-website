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

        <SectionPlaceholder id="qui-sommes-nous" />
        <SectionPlaceholder id="mission" tinted />
        <SectionPlaceholder id="vision" />
        <SectionPlaceholder id="objectifs" tinted />
        <SectionPlaceholder id="partenaires" />
        <SectionPlaceholder id="contact" tinted />
      </main>
    </>
  )
}
