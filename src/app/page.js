'use client';

import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import CustomCursor from '@/components/ui/CustomCursor';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="overflow-hidden cursor-none">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}