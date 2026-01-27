import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from '@/app/hooks/useInView';
import { useRef } from 'react';

export function CraftSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-[#FAF8F5]">
      {/* Background Image - Full Bleed */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1767713362918-d6db856570ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGl6emVyaWElMjBpbnRlcmlvciUyMHdhcm18ZW58MXx8fHwxNzY4OTM0NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Pizzeria craft process"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-[#FAF8F5]/95" />
      </motion.div>

      {/* Content Overlay - Fully contained */}
      <div className="relative z-10 w-full py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-32 md:space-y-40"
          >
            {/* Headline */}
            <div className="max-w-5xl">
              <h2 
                className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black italic text-[#2C2C2C] leading-[0.85] tracking-tighter mb-10"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Process<br />
                is Sacred
              </h2>
              <p className="text-3xl md:text-4xl text-[#4A4A4A] max-w-4xl leading-relaxed font-light">
                Every gesture has meaning.<br />
                Every moment has its time.
              </p>
            </div>

            {/* Step 01 - Image Left, Text Overlapping Right */}
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="md:w-[55%] aspect-[3/4] relative"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1738717201744-9faf699eea3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGRvdWdoJTIwaGFuZHMlMjBjbG9zZXxlbnwxfHx8fDE3Njg5Mzc2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Hands shaping pizza dough"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[50%] bg-white p-8 md:p-12 lg:p-16 space-y-6"
                >
                  <div className="text-7xl md:text-8xl font-black italic text-[#D32F2F]/15 leading-none">01</div>
                  <h3 
                    className="text-5xl md:text-6xl font-black italic text-[#2C2C2C] leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    72 Hours
                  </h3>
                  <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed">
                    Natural fermentation. Patience as the first ingredient. 
                    Time that transforms flour and water into alchemy.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Step 02 - Image Right, Text Overlapping Left */}
            <div className="relative">
              <div className="flex flex-col md:flex-row-reverse md:items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="md:w-[60%] aspect-[4/3] relative ml-auto"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1712223202828-c7bd02c86d64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZmlyZSUyMG92ZW4lMjBnbG93fGVufDF8fHx8MTc2ODkzNzY2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Wood fired oven flames"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:w-[45%] bg-[#2C2C2C] text-white p-8 md:p-12 lg:p-16 space-y-6"
                >
                  <div className="text-7xl md:text-8xl font-black italic text-[#D32F2F]/30 leading-none">02</div>
                  <h3 
                    className="text-5xl md:text-6xl font-black italic leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    450°C
                  </h3>
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                    In the heart of the wood-fired oven. Heat that forgives no mistakes. 
                    90 seconds of absolute perfection.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Step 03 - Centered with Image Behind */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[16/9] md:aspect-[21/9] mb-[-8rem] md:mb-[-12rem]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1602658015824-b49d35094837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwcGl6emElMjBkZXRhaWx8ZW58MXx8fHwxNzY4OTM3NjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Artisan pizza detail"
                  className="w-full h-full object-cover brightness-75"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 max-w-2xl mx-auto bg-white p-8 md:p-12 lg:p-16 space-y-6 text-center"
              >
                <div className="text-7xl md:text-8xl font-black italic text-[#D32F2F]/15 leading-none">03</div>
                <h3 
                  className="text-5xl md:text-6xl font-black italic text-[#2C2C2C] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Hands
                </h3>
                <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed">
                  Ancient gestures passed down. Mastery that isn't taught, 
                  it's inherited. Every pizza is unique.
                </p>
              </motion.div>
            </div>

            {/* Quote Block */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="border-l-4 border-[#D32F2F] pl-10 md:pl-16 py-10 max-w-5xl ml-auto"
            >
              <p 
                className="text-4xl md:text-5xl lg:text-6xl italic text-[#2C2C2C] leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "We don't make fast pizza.<br />
                We make it right."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}