import { useReveal } from "./hooks/useReveal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Services from "./components/Services";
import Vaccines from "./components/Vaccines";
import YellowFever from "./components/YellowFever";
import Marquee from "./components/Marquee";
import YourDoctors from "./components/YourDoctors";
import WhyChoose from "./components/WhyChoose";
import Location from "./components/Location";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import BookVisitSticky from "./components/BookVisitSticky";

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Vaccines />
        <YellowFever />
        <Marquee />
        <YourDoctors />
        <WhyChoose />
        <Location />
        <Testimonials />
        <Faq />
        <Booking />
      </main>
      <Footer />
      <ScrollTop />
      <BookVisitSticky />
    </div>
  );
}
