import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import SiteNav          from '@/components/SiteNav'
import HeroAurora       from '@/components/HeroAurora'
import ValueGrid        from '@/components/ValueGrid'
import TreatmentHub     from '@/components/TreatmentHub'
import CarePlanSelector from '@/components/CarePlanSelector'
import PatientJourney   from '@/components/PatientJourney'
import FooterCTA        from '@/components/FooterCTA'

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <SiteNav />
      <main>
        <HeroAurora />
        <ValueGrid />
        <TreatmentHub />
        <CarePlanSelector />
        <PatientJourney />
      </main>
      <FooterCTA />
    </SmoothScrollProvider>
  )
}
