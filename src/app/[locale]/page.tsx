import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TargetAudience from "@/components/TargetAudience";
import Features from "@/components/Features";
import TechStack from "@/components/TechStack";
import BlogPreview from "@/components/BlogPreview";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import ComparisonTable from "@/components/ComparisonTable";
import FAQ from "@/components/FAQ";
import Revenue from "@/components/Revenue";
import Roadmap from "@/components/Roadmap";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { getBlogPosts } from "@/data/blog-posts";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const blogPosts = await getBlogPosts(locale as "de" | "en");
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TargetAudience />
        <Features />
        <TechStack />
        <BlogPreview posts={latestPosts} />
        <Pricing />
        <Testimonials />
        <CaseStudies />
        <ComparisonTable />
        <FAQ />
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
