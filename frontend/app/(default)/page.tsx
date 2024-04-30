export const metadata = {
  title: 'Appartami',
  description: 'Page description',
}

import Hero from '@/components/hero'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <Zigzag />
      <Testimonials />
    </>
  )
}
