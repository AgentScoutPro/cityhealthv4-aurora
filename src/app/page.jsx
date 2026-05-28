import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import SiteNav          from '@/components/SiteNav'
import HeroAurora       from '@/components/HeroAurora'
import CoreProblemSplit from '@/components/CoreProblemSplit'
import ServiceBento     from '@/components/ServiceBento'
import LocationsHub     from '@/components/LocationsHub'
import FooterCTA        from '@/components/FooterCTA'

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <SiteNav />
      <main>
        <HeroAurora />
        <CoreProblemSplit />
        <ServiceBento />
        <LocationsHub />
      </main>
      <FooterCTA />
    </SmoothScrollProvider>
  )
}
