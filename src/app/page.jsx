import { CallToAction } from '@components/HomePage/CallToAction'
import { Faqs } from '@components/HomePage/Faqs'
import { Footer } from '@components/HomePage/Footer'
import { Header } from '@components/HomePage/Header'
import { Hero } from '@components/HomePage/Hero'
import { Pricing } from '@components/HomePage/Pricing'
import { PrimaryFeatures } from '@components/HomePage/PrimaryFeatures'
import { SecondaryFeatures } from '@components/HomePage/SecondaryFeatures'
import { Testimonials } from '@components/HomePage/Testimonials'

export default function Home ()
{
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
