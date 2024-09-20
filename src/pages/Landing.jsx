import Hero from "../components/landing/Hero.jsx";
import Magazines from "../components/landing/Magazines.jsx";
import Testimonials from "../components/landing/Testimonials.jsx";
import Pricing from "../components/landing/Pricing.jsx";
import Features from "../components/landing/Features.jsx";
import Footer from "../components/landing/Footer.jsx";
import Highlights from "../components/landing/Highlights.jsx";
import Info from '../components/landing/Info.jsx'
const Landing = () => {
  return (
    <>
      <Hero />
      <Magazines />
      <Features />
      <Info />
      {/* <Testimonials /> */}
      {/* <Highlights /> */}
      {/* <Pricing /> */}
      <Footer />
    </>

  );
};

export default Landing;