import { CallToAction } from '@components/template/CallToAction'
import { Faqs } from '@components/template/Faqs'
import { Footer } from '@components/template/Footer'
import { Header } from '@components/template/Header'
import { Hero } from '@components/template/Hero'
import { Pricing } from '@components/template/Pricing'
import { PrimaryFeatures } from '@components/template/PrimaryFeatures'
import { SecondaryFeatures } from '@components/template/SecondaryFeatures'
import { Testimonials } from '@components/template/Testimonials'

const HomePage = () =>
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

export default HomePage