import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Packages from './components/Packages.jsx';
import WhyEverywright from './components/WhyEverywright.jsx';
import OurWork from './components/OurWork.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Packages />
        <WhyEverywright />
        <OurWork />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
