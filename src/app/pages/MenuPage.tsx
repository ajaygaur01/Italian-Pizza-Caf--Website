import { motion } from 'motion/react';
import { useState, useMemo } from 'react';

interface Pizza {
  id: number;
  name: string;
  ingredients: string;
  price: number;
  image: string;
  category: 'classic' | 'signature' | 'seasonal';
  tags: string[];
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
  spiceLevel?: number;
}

const pizzas: Pizza[] = [
  {
    id: 1,
    name: 'Margherita',
    ingredients: 'San Marzano tomatoes, Fior di latte, fresh basil, extra virgin olive oil',
    price: 14,
    image: 'https://images.unsplash.com/photo-1667207394004-acb6aaf4790e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBjbG9zZXxlbnwxfHx8fDE3Njg5MDM5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'classic',
    tags: ['vegetarian', 'classic'],
    isVegetarian: true,
    isBestseller: true,
    spiceLevel: 0,
  },
  {
    id: 2,
    name: 'Diavola',
    ingredients: 'Tomato, mozzarella, spicy salami, Calabrian chili oil, oregano',
    price: 17,
    image: 'https://images.unsplash.com/photo-1554136812-8b7875b188b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWF2b2xhJTIwc3BpY3klMjBwaXp6YXxlbnwxfHx8fDE3Njg5Mzk1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
    tags: ['spicy', 'signature'],
    isSpicy: true,
    isBestseller: true,
    spiceLevel: 3,
  },
  {
    id: 3,
    name: 'Quattro Formaggi',
    ingredients: 'Mozzarella, gorgonzola, parmigiano, fontina, black pepper',
    price: 18,
    image: 'https://images.unsplash.com/photo-1672939553298-fbec039867a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWF0dHJvJTIwZm9ybWFnZ2klMjBwaXp6YXxlbnwxfHx8fDE3Njg5Mzk1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'classic',
    tags: ['vegetarian', 'cheese-heavy', 'classic'],
    isVegetarian: true,
    spiceLevel: 0,
  },
  {
    id: 4,
    name: 'Prosciutto e Rucola',
    ingredients: 'Tomato, mozzarella, Parma prosciutto, wild arugula, shaved parmigiano',
    price: 19,
    image: 'https://images.unsplash.com/photo-1758157835961-5db4a033390b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9zY2l1dHRvJTIwYXJ1Z3VsYSUyMHBpenphfGVufDF8fHx8MTc2ODkzOTU3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
    tags: ['signature'],
    isBestseller: true,
    spiceLevel: 0,
  },
  {
    id: 5,
    name: 'Funghi Tartufo',
    ingredients: 'Mozzarella, mixed wild mushrooms, truffle oil, thyme, parmigiano',
    price: 22,
    image: 'https://images.unsplash.com/photo-1730372801496-be4af356e214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMHRydWZmbGUlMjBwaXp6YXxlbnwxfHx8fDE3Njg5Mzk1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
    tags: ['vegetarian', 'signature'],
    isVegetarian: true,
    spiceLevel: 0,
  },
  {
    id: 6,
    name: 'Pepperoni Classico',
    ingredients: 'Tomato, mozzarella, premium pepperoni, oregano',
    price: 16,
    image: 'https://images.unsplash.com/photo-1662938979482-ee0d8162a545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHRvcHxlbnwxfHx8fDE3Njg5Mzk1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'classic',
    tags: ['classic'],
    isBestseller: true,
    spiceLevel: 1,
  },
  {
    id: 7,
    name: 'Capricciosa',
    ingredients: 'Tomato, mozzarella, prosciutto cotto, artichokes, mushrooms, olives',
    price: 18,
    image: 'https://images.unsplash.com/photo-1566843972705-1aad0ee32f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXByaWNjaW9zYSUyMHBpenphJTIwaGFtfGVufDF8fHx8MTc2ODkzOTU3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'classic',
    tags: ['classic'],
    spiceLevel: 0,
  },
  {
    id: 8,
    name: 'Ortolana',
    ingredients: 'Tomato, mozzarella, grilled zucchini, eggplant, bell peppers, basil',
    price: 16,
    image: 'https://images.unsplash.com/photo-1694717065203-8cb0de9918f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwcGl6emElMjBmcmVzaHxlbnwxfHx8fDE3Njg5Mzk1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'seasonal',
    tags: ['vegetarian', 'seasonal'],
    isVegetarian: true,
    spiceLevel: 0,
  },
  {
    id: 9,
    name: 'Marinara',
    ingredients: 'San Marzano tomatoes, garlic, oregano, extra virgin olive oil, no cheese',
    price: 12,
    image: 'https://images.unsplash.com/photo-1684823906761-30fd02a961cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmFyYSUyMHBpenphJTIwc2ltcGxlfGVufDF8fHx8MTc2ODkzOTU4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'classic',
    tags: ['vegetarian', 'classic'],
    isVegetarian: true,
    spiceLevel: 0,
  },
  {
    id: 10,
    name: 'Burrata Fresca',
    ingredients: 'Tomato, creamy burrata, cherry tomatoes, basil, balsamic glaze',
    price: 20,
    image: 'https://images.unsplash.com/photo-1758700835219-0422fdc4dd54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJyYXRhJTIwcGl6emElMjBjcmVhbXxlbnwxfHx8fDE3Njg5Mzk1ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
    tags: ['vegetarian', 'cheese-heavy', 'signature'],
    isVegetarian: true,
    spiceLevel: 0,
  },
  {
    id: 11,
    name: 'Pesto Genovese',
    ingredients: 'Fresh basil pesto, mozzarella, cherry tomatoes, pine nuts, parmigiano',
    price: 17,
    image: 'https://images.unsplash.com/photo-1707896543317-da87bde75ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGJhc2lsJTIwbGVhdmVzfGVufDF8fHx8MTc2ODkzOTU4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'seasonal',
    tags: ['vegetarian', 'seasonal'],
    isVegetarian: true,
    spiceLevel: 0,
  },
  {
    id: 12,
    name: 'Salsiccia Piccante',
    ingredients: 'Tomato, mozzarella, spicy Italian sausage, friarielli, chili flakes',
    price: 18,
    image: 'https://images.unsplash.com/photo-1554136812-8b7875b188b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWF2b2xhJTIwc3BpY3klMjBwaXp6YXxlbnwxfHx8fDE3Njg5Mzk1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'signature',
    tags: ['spicy', 'signature'],
    isSpicy: true,
    spiceLevel: 2,
  },
];

type SortOption = 'popular' | 'price-low' | 'price-high';
type FilterOption = 'all' | 'vegetarian' | 'spicy' | 'cheese-heavy' | 'classic' | 'signature';

export function MenuPage() {
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedPizzas = useMemo(() => {
    let result = [...pizzas];

    // Apply search
    if (searchQuery) {
      result = result.filter(pizza =>
        pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (activeFilter !== 'all') {
      if (activeFilter === 'vegetarian') {
        result = result.filter(p => p.isVegetarian);
      } else if (activeFilter === 'spicy') {
        result = result.filter(p => p.isSpicy);
      } else {
        result = result.filter(p => p.tags.includes(activeFilter));
      }
    }

    // Apply sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return result;
  }, [sortBy, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Menu Hero - Half Screen */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-16 md:pb-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1667207394004-acb6aaf4790e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBjbG9zZXxlbnwxfHx8fDE3Njg5MDM5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Our Pizza Menu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-16">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <h1
                className="text-7xl md:text-8xl lg:text-9xl font-black italic text-white leading-[0.85] tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Il Menù
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 leading-relaxed font-light max-w-2xl">
                Twelve artisan pizzas. Each one a testament to tradition, craft, and the finest ingredients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar - Sticky */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#2C2C2C]/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search pizzas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 bg-[#FAF8F5] border border-[#2C2C2C]/10 focus:border-[#D32F2F] focus:outline-none transition-colors text-[#2C2C2C] placeholder:text-[#4A4A4A]/50"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'vegetarian', 'spicy', 'cheese-heavy', 'classic', 'signature'] as FilterOption[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-[#D32F2F] text-white'
                      : 'bg-[#FAF8F5] text-[#2C2C2C] hover:bg-[#E8DCC8]'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#4A4A4A] whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 bg-[#FAF8F5] border border-[#2C2C2C]/10 focus:border-[#D32F2F] focus:outline-none text-[#2C2C2C] cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Pizza Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
          {/* Section Dividers */}
          {['classic', 'signature', 'seasonal'].map((category) => {
            const categoryPizzas = filteredAndSortedPizzas.filter(p => p.category === category);
            if (categoryPizzas.length === 0) return null;

            return (
              <div key={category} className="mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <h2
                    className="text-5xl md:text-6xl lg:text-7xl font-black italic text-[#2C2C2C] leading-tight mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {category === 'classic' ? 'I Classici' : category === 'signature' ? 'Fire-Baked Signatures' : 'Seasonal Specials'}
                  </h2>
                  <div className="h-px bg-[#D32F2F] w-24" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                  {categoryPizzas.map((pizza, index) => (
                    <motion.div
                      key={pizza.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="bg-white overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                        {/* Image */}
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={pizza.image}
                            alt={pizza.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {pizza.isBestseller && (
                              <span className="px-3 py-1 bg-[#D32F2F] text-white text-xs font-medium">
                                Bestseller
                              </span>
                            )}
                            {pizza.isVegetarian && (
                              <span className="px-3 py-1 bg-[#6B7C59] text-white text-xs font-medium">
                                Vegetarian
                              </span>
                            )}
                            {pizza.isSpicy && (
                              <span className="px-3 py-1 bg-[#2C2C2C] text-white text-xs font-medium">
                                🌶️ Spicy
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h3
                              className="text-3xl font-black italic text-[#2C2C2C] leading-tight"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {pizza.name}
                            </h3>
                            <span className="text-2xl font-bold text-[#D32F2F] whitespace-nowrap">
                              €{pizza.price}
                            </span>
                          </div>
                          <p className="text-base text-[#4A4A4A] leading-relaxed">
                            {pizza.ingredients}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* No Results */}
          {filteredAndSortedPizzas.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-3xl text-[#4A4A4A] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                No pizzas match your search.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-24 md:py-32 bg-[#2C2C2C]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-black italic text-white leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to taste<br />tradition?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
              Visit us today or order ahead for pickup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button className="px-10 py-4 bg-[#D32F2F] text-white text-lg font-medium hover:bg-[#B71C1C] transition-colors">
                Order Now
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-medium hover:bg-white hover:text-[#2C2C2C] transition-colors">
                Visit Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
