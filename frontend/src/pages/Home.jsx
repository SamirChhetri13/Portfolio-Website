import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import Services from '../sections/Services';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

export default function Home({ onOpenResume }) {
  return (
    <>
      <Hero onOpenResume={onOpenResume} />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Contact />
      <Footer onOpenResume={onOpenResume} />
    </>
  );
}
