import { SiteHeader } from '@/components/site-header'
import { SplashScreen } from '@/components/splash-screen'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Mission } from '@/components/sections/mission'
import { Vision } from '@/components/sections/vision'
import { Objectives } from '@/components/sections/objectives'
import { Sdg } from '@/components/sections/sdg'
import { SectionPlaceholder } from '@/components/sections/section-placeholder'

export default function Page() {
  return (
    <>
      <SplashScreen />
      <SiteHeader />
      <main>
        <Hero />

        <About />
        <Mission />
        <Vision />
        <Objectives />
        <Sdg />
        <SectionPlaceholder id="partenaires" />
        <SectionPlaceholder id="contact" tinted />
      </main>
    </>
  )
}
