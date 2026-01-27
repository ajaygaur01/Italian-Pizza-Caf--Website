import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function LifestyleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAF8F5] overflow-hidden"
    >
      {/* Hero Block - Dramatic Full Bleed with Offset Title */}
      <div className="relative min-h-screen flex items-end pb-20 md:pb-32">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1598610089864-f19b4ff743a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwc2hhcmluZyUyMHBpenphJTIwdGFibGV8ZW58MXx8fHwxNzY4OTM4NDU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Friends sharing pizza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </motion.div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-5xl"
            >
              <h2
                className="text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black italic text-white leading-[0.85] tracking-tight mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                La Dolce
                <br />
                Vita
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 leading-relaxed font-light max-w-3xl">
                It's not just pizza. It's the conversation
                between friends, the aroma filling the street,
                the warm evening light.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Overlapping Editorial Layout */}
      {/* <div className="relative -mt-32 md:-mt-40 lg:-mt-48">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-12 gap-8 md:gap-0"> */}
      {/* Large Pizza Slice Image - Offset Left */}
      {/* <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7 relative z-20"
            >
              <div className="aspect-[3/4] md:aspect-[4/5] relative">
                <img 
                  src="https://images.unsplash.com/photo-1597715469889-dd75fe4a1765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3Njg5Mzg0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Pizza slice detail"
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>
            </motion.div> */}

      {/* Floating Text Card - Overlaps Image */}
      {/* <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-6 md:col-start-7 relative z-30 md:-ml-16 md:mt-20"
            >
              <div className="bg-[#E8DCC8] p-10 md:p-14 lg:p-16 space-y-8 shadow-xl">
                <p className="text-3xl md:text-4xl text-[#2C2C2C] leading-relaxed font-light">
                  It's the moment when you pause, breathe, savor.
                </p>
                <div className="h-px bg-[#2C2C2C]/20" />
                <p className="text-3xl md:text-4xl text-[#2C2C2C] leading-relaxed font-light">
                  It's living the Italian way: with passion, without rush.
                </p>
                <div className="pt-4">
                  <p 
                    className="text-4xl md:text-5xl lg:text-6xl italic text-[#D32F2F] leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Every slice is an<br />invitation to<br />slow down.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div> */}

      {/* Wide Texture Block with Offset Quote */}
      <div className="relative py-32 md:py-40 lg:py-48">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Quote - Left Aligned */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 space-y-8"
            >
              <div className="border-l-8 border-[#D32F2F] pl-8 md:pl-12">
                <p
                  className="text-5xl md:text-6xl lg:text-7xl italic text-[#2C2C2C] leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  "A meal shared
                  <br />
                  is a life
                  <br />
                  celebrated"
                </p>
              </div>
              <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed font-light max-w-md">
                In Italy, food is never rushed. It's the
                centerpiece of connection, laughter, and memory.
              </p>
            </motion.div>

            {/* Pizza Texture - Right with Parallax */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="md:col-span-7 relative"
            >
              <div className="aspect-[16/10] relative">
                <img
                  src="https://images.unsplash.com/photo-1695284512188-b5b588034b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWFwb2xpdGFuJTIwcGl6emElMjB0ZXh0dXJlfGVufDF8fHx8MTc2ODkzODQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Neapolitan pizza texture"
                  className="w-full h-full object-cover shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Bleed Atmosphere Shot with Floating Elements */}
      <div className="relative h-screen">
        <motion.div
          style={{ y: y3 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1761515113769-9b34af4e2ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZGluaW5nJTIwYXRtb3NwaGVyZXxlbnwxfHx8fDE3Njg5Mzg0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Italian dining atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C2C2C]/60 via-black/40 to-[#D32F2F]/30" />
        </motion.div>

        {/* Floating Stats/Facts */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 w-full">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center md:text-left space-y-4"
              >
                <div
                  className="text-7xl md:text-8xl lg:text-9xl font-black italic text-white leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  1889
                </div>
                <p className="text-xl md:text-2xl text-white/90 font-light">
                  Year the Margherita
                  <br />
                  was born in Naples
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center md:text-left space-y-4"
              >
                <div
                  className="text-7xl md:text-8xl lg:text-9xl font-black italic text-white leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  72h
                </div>
                <p className="text-xl md:text-2xl text-white/90 font-light">
                  Minimum fermentation
                  <br />
                  for authentic dough
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center md:text-left space-y-4"
              >
                <div
                  className="text-7xl md:text-8xl lg:text-9xl font-black italic text-white leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  90s
                </div>
                <p className="text-xl md:text-2xl text-white/90 font-light">
                  Perfect time in the
                  <br />
                  wood-fired oven
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Texture Strip - Full Bleed */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1597715469889-dd75fe4a1765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3Njg5Mzg0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Pizza close detail"
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
          <div className="absolute inset-0 bg-[#FAF8F5]/80" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic text-[#2C2C2C] leading-tight text-center max-w-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            This is more than tradition.
            <br />
            This is art you can taste.
          </motion.p>
        </div>
      </div>
    </section>
  );
}