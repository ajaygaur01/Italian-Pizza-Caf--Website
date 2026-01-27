import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from '@/app/hooks/useInView';
import { useRef } from 'react';

export function CTASection() {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);

  return (
    <section id="contact" ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Full-bleed Background Image */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1692289645431-ff24c80b680f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWFwb2xpdGFuJTIwcGl6emElMjB0b3AlMjB2aWV3fGVufDF8fHx8MTc2ODkzNTU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Neapolitan pizza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#D32F2F]/90 via-[#D32F2F]/85 to-[#D32F2F]/90" />
      </motion.div>

      {/* Content - Fully contained within section */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-14"
          >
            <h2 
              className="text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-black italic text-white leading-[0.8] tracking-tighter max-w-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Come.<br />
              Taste.<br />
              Fall in Love.
            </h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 items-start"
            >
              <a 
                href="#" 
                className="inline-block px-14 py-6 bg-white text-[#D32F2F] text-lg tracking-widest hover:bg-[#FAF8F5] transition-all duration-300"
              >
                RESERVE TABLE
              </a>
              
              <a 
                href="#menu" 
                className="inline-block px-14 py-6 border-2 border-white text-white text-lg tracking-widest hover:bg-white hover:text-[#D32F2F] transition-all duration-300"
              >
                VIEW MENU
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3"
            >
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed">
                Via Roma 42, Naples, Italy
              </p>
              <p className="text-xl text-white/70">
                Tuesday — Sunday · 12:00 — 15:00 · 18:00 — 23:00
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
