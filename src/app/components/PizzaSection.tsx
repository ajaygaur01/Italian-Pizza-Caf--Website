import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from '@/app/hooks/useInView';
import { useRef, useState, useEffect } from 'react';

const pizzas = [
  {
    id: 'margherita',
    name: "Margherita",
    price: "€14",
    ingredients: "San Marzano tomato · Buffalo mozzarella · Fresh basil · Extra virgin olive oil",
    description: "The queen. Three colors of the Italian flag, four perfect ingredients.",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBiYXNpbCUyMG1venphcmVsbGF8ZW58MXx8fHwxNzY4OTM0NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 'marinara',
    name: "Marinara",
    price: "€12",
    ingredients: "Tomato · Garlic · Oregano · Extra virgin olive oil",
    description: "Essential. Ancient as the sea of Naples. No mozzarella, just purity.",
    image: "https://images.unsplash.com/photo-1692289645431-ff24c80b680f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWFwb2xpdGFuJTIwcGl6emElMjB0b3AlMjB2aWV3fGVufDF8fHx8MTc2ODkzNTU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 'diavola',
    name: "Diavola",
    price: "€16",
    ingredients: "Fior di latte mozzarella · Spicy salami · Chili oil",
    description: "Fire and passion. For those who dare to seek intensity.",
    image: "https://images.unsplash.com/photo-1689793600481-554512b7bab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGNydXN0JTIwY2hhcnJlZCUyMHRleHR1cmV8ZW58MXx8fHwxNzY4OTM1NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 'quattro',
    name: "Quattro Formaggi",
    price: "€17",
    ingredients: "Mozzarella · Gorgonzola · Parmigiano · Pecorino Romano",
    description: "Four Italian cheeses in perfect harmony. Rich, bold, unforgettable.",
    image: "https://images.unsplash.com/photo-1750127060930-ea1cdc1e59a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWFwb2xpdGFuJTIwcGl6emElMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc2ODkzNDc1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function PizzaSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState('margherita');
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 100 && rect.bottom > 100;
      setShowNav(isInSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPizza = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <section id="menu" ref={sectionRef} className="relative bg-[#2C2C2C] min-h-screen">
      {/* Sticky Menu Navigation - Only visible while in menu section */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-[#2C2C2C]/95 backdrop-blur-sm border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm tracking-widest">MENU</span>
            <div className="flex gap-6 md:gap-8">
              {pizzas.map((pizza) => (
                <button
                  key={pizza.id}
                  onClick={() => scrollToPizza(pizza.id)}
                  className={`text-sm tracking-wider transition-colors ${
                    activeId === pizza.id ? 'text-[#D32F2F]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {pizza.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black italic text-white leading-[0.85] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Pizzas
          </motion.h2>
        </div>
      </div>

      {/* Pizza Grid - Full Width, No Empty Space */}
      <div className="space-y-0">
        {pizzas.map((pizza, index) => (
          <div 
            key={pizza.id} 
            id={pizza.id}
            className="relative min-h-screen flex items-center"
          >
            {/* Full-bleed background image */}
            <div className="absolute inset-0">
              <img 
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-20">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-3xl"
                >
                  <div className="flex items-baseline gap-6 mb-6">
                    <h3 
                      className="text-6xl md:text-7xl lg:text-8xl font-black italic text-white leading-none"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {pizza.name}
                    </h3>
                    <span className="text-3xl md:text-4xl text-[#D32F2F] font-light">
                      {pizza.price}
                    </span>
                  </div>

                  <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                    {pizza.ingredients}
                  </p>

                  <p 
                    className="text-2xl md:text-3xl italic text-white/90 leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {pizza.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
