import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export function AboutChefPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAF8F5]">
      {/* Dramatic Hero - Offset Layout */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 grid md:grid-cols-12">
          <div className="md:col-span-7 relative h-full">
            <motion.div 
              style={{ y: y1 }}
              className="absolute inset-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1726931535415-edbc43d42c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwYXJ0aXNhbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2ODk0MDUwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Chef Marco Bellini"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="md:ml-[58.333%] max-w-2xl"
            >
              <div className="bg-white p-10 md:p-14 lg:p-16 shadow-2xl">
                <h1 
                  className="text-6xl md:text-7xl lg:text-8xl font-black italic text-[#2C2C2C] leading-[0.85] tracking-tight mb-8"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Marco<br />
                  Bellini
                </h1>
                <div className="h-1 w-20 bg-[#D32F2F] mb-8" />
                <p className="text-2xl md:text-3xl text-[#4A4A4A] leading-relaxed font-light">
                  Pizza is simple.<br />
                  Simplicity is sacred.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy - Asymmetric Layout */}
      <section className="relative py-24 md:py-32 lg:py-40 bg-[#FAF8F5]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5"
            >
              <h2 
                className="text-5xl md:text-6xl lg:text-7xl font-black italic text-[#2C2C2C] leading-tight mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Philosophy
              </h2>
              <div className="h-1 w-16 bg-[#D32F2F]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-7 space-y-8"
            >
              <div className="space-y-6 text-xl md:text-2xl text-[#4A4A4A] leading-relaxed font-light">
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-[#D32F2F] font-bold leading-none">—</span>
                  <p>Neapolitan tradition isn't a recipe. It's respect for time, fire, and ingredients.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-[#D32F2F] font-bold leading-none">—</span>
                  <p>Dough ferments for 72 hours. Not because it's trendy, but because it's right.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="text-4xl text-[#D32F2F] font-bold leading-none">—</span>
                  <p>Every pizza leaves the oven at 450°C in 90 seconds. That's precision, not speed.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craft Section - Overlapping Editorial */}
      <section className="relative bg-[#2C2C2C] py-20 md:py-28">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text First */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 order-2 md:order-1"
            >
              <p 
                className="text-5xl md:text-6xl lg:text-7xl italic text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "Every gesture<br />
                has a reason."
              </p>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light max-w-lg">
                Trained in Naples. Inspired by tradition. 
                Committed to doing less, but doing it perfectly.
              </p>
              <div className="pt-4">
                <div className="flex gap-8 text-white/60 text-sm tracking-wider">
                  <div>
                    <div className="text-3xl font-bold text-white">72h</div>
                    <div className="mt-1">Fermentation</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">450°C</div>
                    <div className="mt-1">Fire Temp</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">90s</div>
                    <div className="mt-1">Bake Time</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[3/4] order-1 md:order-2"
            >
              <img 
                src="https://images.unsplash.com/photo-1661715419750-18edeced7ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGNoZWYlMjBoYW5kcyUyMGNsb3NlfGVufDF8fHx8MTc2ODk0MDUwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Chef hands at work"
                className="w-full h-full object-cover shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fire Section - Full Bleed with Overlay */}
      <section className="relative h-[80vh]">
        <motion.div 
          style={{ y: y2 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1651978595438-980213ca6d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMG92ZW4lMjBmaXJlJTIwZ2xvd3xlbnwxfHx8fDE3Njg5NDA1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Fire and oven"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-[#D32F2F]/40" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-end px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-right"
          >
            <p 
              className="text-5xl md:text-6xl lg:text-7xl italic text-white leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "Fire doesn't<br />
              negotiate."
            </p>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
              At 450°C, there's no room for error. Every pizza is a conversation between heat, timing, and instinct.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hands Section - Split Screen */}
      <section className="relative">
        <div className="grid md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square md:aspect-auto md:h-[70vh]"
          >
            <img 
              src="https://images.unsplash.com/photo-1767065887268-e0827daae0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWQlMjBtYWtpbmclMjBoYW5kc3xlbnwxfHx8fDE3Njg5NDA1MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Artisan hands"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative aspect-square md:aspect-auto md:h-[70vh]"
          >
            <img 
              src="https://images.unsplash.com/photo-1597667756343-810c1d7069be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwd29ya2luZyUyMGtpdGNoZW4lMjBkYXJrfGVufDF8fHx8MTc2ODk0MDUwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Chef working"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Closing Statement - Editorial Quote */}
      <section className="relative py-32 md:py-40 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="border-l-8 border-[#D32F2F] pl-10 md:pl-16">
              <p 
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic text-[#2C2C2C] leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "I make twelve pizzas.<br />
                Each one matters."
              </p>
            </div>
            <div className="pl-10 md:pl-16">
              <p className="text-2xl md:text-3xl text-[#4A4A4A] font-light">
                — Marco Bellini
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Clean */}
      <section className="relative py-20 md:py-24 bg-[#2C2C2C]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <p className="text-2xl md:text-3xl text-white/80 font-light">
              Experience Marco's philosophy
            </p>
            <Link 
              to="/menu"
              className="inline-block px-12 py-5 bg-[#D32F2F] text-white text-lg font-medium hover:bg-[#B71C1C] transition-all hover:scale-105 transform"
            >
              Explore the Menu
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
