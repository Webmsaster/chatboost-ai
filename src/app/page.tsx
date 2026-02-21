import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TargetAudience from "@/components/TargetAudience";
import Features from "@/components/Features";
import TechStack from "@/components/TechStack";
import BlogPreview from "@/components/BlogPreview";
import Pricing from "@/components/Pricing";
import Revenue from "@/components/Revenue";
import Roadmap from "@/components/Roadmap";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TargetAudience />
        <Features />
        <TechStack />
        <BlogPreview />
        <Pricing />
        <Revenue />
        <Roadmap />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
