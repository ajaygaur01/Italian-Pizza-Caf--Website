import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Hero } from '@/app/components/Hero';
import { Story } from '@/app/components/Story';
import { PizzaSection } from '@/app/components/PizzaSection';
import { CraftSection } from '@/app/components/CraftSection';
import { LifestyleSection } from '@/app/components/LifestyleSection';
import { CTASection } from '@/app/components/CTASection';
import { Footer } from '@/app/components/Footer';
import { MenuPage } from '@/app/pages/MenuPage';
import { AboutChefPage } from '@/app/pages/AboutChefPage';
import { ReservationPage } from '@/app/pages/ReservationPage';
import { ContactPage } from '@/app/pages/ContactPage';

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-6 transition-all duration-500 ${
        isScrolled ? 'bg-[#FAF8F5]/95 backdrop-blur-sm shadow-sm' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className={`tracking-wide transition-colors ${
            isScrolled ? 'text-[#2C2C2C]' : 'text-white'
          }`} 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-2xl md:text-3xl font-black italic">Fuoco</span>
        </Link>
        <div className="hidden md:flex gap-10 text-sm tracking-widest">
          <Link 
            to="/" 
            className={`transition-colors ${
              isScrolled ? 'text-[#4A4A4A] hover:text-[#D32F2F]' : 'text-white/80 hover:text-white'
            }`}
          >
            Story
          </Link>
          <Link 
            to="/about-chef" 
            className={`transition-colors ${
              isScrolled ? 'text-[#4A4A4A] hover:text-[#D32F2F]' : 'text-white/80 hover:text-white'
            }`}
          >
            Chef
          </Link>
          <Link 
            to="/menu" 
            className={`transition-colors ${
              isScrolled ? 'text-[#4A4A4A] hover:text-[#D32F2F]' : 'text-white/80 hover:text-white'
            }`}
          >
            Menu
          </Link>
          <Link 
            to="/reservation" 
            className={`transition-colors ${
              isScrolled ? 'text-[#4A4A4A] hover:text-[#D32F2F]' : 'text-white/80 hover:text-white'
            }`}
          >
            Reserve
          </Link>
          <Link 
            to="/contact" 
            className={`px-6 py-2 transition-colors ${
              isScrolled 
                ? 'bg-[#D32F2F] text-white hover:bg-[#B71C1C]' 
                : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function LandingPage() {
  return (
    <>
      <Hero />
      <Story />
      <PizzaSection />
      <CraftSection />
      <LifestyleSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#FAF8F5]">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about-chef" element={<AboutChefPage />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}