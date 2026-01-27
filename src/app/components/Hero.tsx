import { motion, useScroll, useTransform } from 'motion/react';

export function Hero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed Background Image with Parallax */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 origin-center"
      >
        <img 
          src="https://images.unsplash.com/photo-1712652080841-9e480a2c43ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGNoZWVzZSUyMHB1bGwlMjBjbG9zZXxlbnwxfHx8fDE3Njg5MzU1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Neapolitan pizza close-up"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </motion.div>

      {/* All content contained within hero - nothing escapes */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col justify-between px-6 md:px-12 lg:px-16 py-20 md:py-24"
      >
        {/* Top spacing */}
        <div className="h-16 md:h-20" />

        {/* Main Content - Centered vertically */}
        <div className="flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl"
          >
            <h1 
              className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black italic text-white leading-[0.85] tracking-tighter mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Fire.<br />
              Flour.<br />
              Passion.
            </h1>
            
            <motion.p 
              className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light max-w-3xl mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Authentic Neapolitan pizza.<br />
              Nothing more, nothing less.
            </motion.p>

            <motion.a
              href="#menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="inline-block px-14 py-6 bg-[#D32F2F] text-white text-lg tracking-widest hover:bg-[#B71C1C] transition-all duration-300"
            >
              EXPLORE MENU
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom content - scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/60 text-sm tracking-widest"
          >
            SCROLL
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
