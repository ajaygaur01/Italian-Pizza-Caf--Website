import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "@/app/hooks/useInView";
import { useRef } from "react";

export function Story() {
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAF8F5]"
    >
      {/* First Full-Width Visual Block */}
      {/* <div className="relative h-screen"> */}
      {/* <motion.div
          style={{ y: y1 }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1638981369408-20b28d5932f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGRvdWdoJTIwaGFuZHMlMjBmbG91cnxlbnwxfHx8fDE3Njg5MzQ3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hands shaping pizza dough"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </motion.div> */}

      {/* Text Overlay - Contained within section */}
      {/* <div className="relative z-10 h-full flex items-end px-6 md:px-12 lg:px-16 pb-16 md:pb-20">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl"
          >
            <h2
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black italic text-white leading-[0.85] tracking-tight mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Since 1889
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed font-light">
              Where tradition meets craft.
              <br />
              Every gesture tells a story.
            </p>
          </motion.div>
        </div> */}
      {/* </div> */}

      {/* Content Block - Full Width, No Empty Space */}
      <div className="relative bg-[rgb(250,246,245)] px-6 md:px-12 lg:px-16 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-16"
          >
            <p className="text-3xl md:text-4xl lg:text-5xl text-[#2C2C2C] leading-relaxed font-light max-w-5xl">
              Pizza isn't fast food.
              <br />
              It's tradition. Family. Respect for time.
            </p>

            <div className="h-px bg-[#2C2C2C]/10" />

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="space-y-6">
                <h3
                  className="text-4xl md:text-5xl font-black italic text-[#D32F2F] leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  The Dough
                </h3>
                <p className="text-xl text-[#4A4A4A] leading-relaxed">
                  72 hours of natural fermentation. Selected
                  tipo 00 flour. Pure water. Sourdough starter
                  passed down through generations.
                </p>
              </div>

              <div className="space-y-6">
                <h3
                  className="text-4xl md:text-5xl font-black italic text-[#D32F2F] leading-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  The Fire
                </h3>
                <p className="text-xl text-[#4A4A4A] leading-relaxed">
                  450°C in the heart of our wood-fired oven. 90
                  seconds that transform simple ingredients into
                  edible art.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Second Visual Block - Full-Width */}
      <div className="relative h-[80vh]">
        <div className="absolute inset-0">
          <motion.div
            style={{ y: y2 }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1706011465964-7a226eea129a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZmlyZWQlMjBwaXp6YSUyMG92ZW4lMjBmbGFtZXN8ZW58MXx8fHwxNzY4OTM0NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Wood fired oven flames"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/30" />
          </motion.div>

          <div className="relative z-10 h-full flex items-center justify-center md:justify-end px-6 md:px-12 lg:px-16">
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl italic text-white leading-tight max-w-3xl text-center md:text-right"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              "True Neapolitan pizza is poetry written with
              fire."
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}