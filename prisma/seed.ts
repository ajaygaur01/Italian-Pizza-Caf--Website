import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create Categories
  const classicCategory = await prisma.category.upsert({
    where: { slug: 'classic' },
    update: {},
    create: {
      name: 'Classic',
      slug: 'classic',
      description: 'Traditional Italian pizzas with timeless flavors',
      order: 1,
    },
  })

  const signatureCategory = await prisma.category.upsert({
    where: { slug: 'signature' },
    update: {},
    create: {
      name: 'Signature',
      slug: 'signature',
      description: 'Our chef\'s special creations',
      order: 2,
    },
  })

  const seasonalCategory = await prisma.category.upsert({
    where: { slug: 'seasonal' },
    update: {},
    create: {
      name: 'Seasonal',
      slug: 'seasonal',
      description: 'Limited-time seasonal favorites',
      order: 3,
    },
  })

  console.log('✅ Categories created')

  // Pizza data
  const pizzas = [
    {
      name: 'Margherita',
      description: 'The classic Italian pizza',
      ingredients: 'San Marzano tomatoes, Fior di latte, fresh basil, extra virgin olive oil',
      price: 14.00,
      image: 'https://images.unsplash.com/photo-1667207394004-acb6aaf4790e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBjbG9zZXxlbnwxfHx8fDE3Njg5MDM5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'classic',
      isVegetarian: true,
      isSpicy: false,
      isBestseller: true,
      spiceLevel: 0,
      tags: ['vegetarian', 'classic'],
    },
    {
      name: 'Diavola',
      description: 'Spicy Italian favorite',
      ingredients: 'Tomato, mozzarella, spicy salami, Calabrian chili oil, oregano',
      price: 17.00,
      image: 'https://images.unsplash.com/photo-1554136812-8b7875b188b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWF2b2xhJTIwc3BpY3klMjBwaXp6YXxlbnwxfHx8fDE3Njg5Mzk1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'signature',
      isVegetarian: false,
      isSpicy: true,
      isBestseller: true,
      spiceLevel: 3,
      tags: ['spicy', 'signature'],
    },
    {
      name: 'Quattro Formaggi',
      description: 'Four Italian cheeses in perfect harmony',
      ingredients: 'Mozzarella, gorgonzola, parmigiano, fontina, black pepper',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1672939553298-fbec039867a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWF0dHJvJTIwZm9ybWFnZ2klMjBwaXp6YXxlbnwxfHx8fDE3Njg5Mzk1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'classic',
      isVegetarian: true,
      isSpicy: false,
      isBestseller: false,
      spiceLevel: 0,
      tags: ['vegetarian', 'cheese-heavy', 'classic'],
    },
    {
      name: 'Prosciutto e Rucola',
      description: 'Elegant combination of prosciutto and arugula',
      ingredients: 'Tomato, mozzarella, Parma prosciutto, wild arugula, shaved parmigiano',
      price: 19.00,
      image: 'https://images.unsplash.com/photo-1758157835961-5db4a033390b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9zY2l1dHRvJTIwYXJ1Z3VsYSUyMHBpenphfGVufDF8fHx8MTc2ODkzOTU3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'signature',
      isVegetarian: false,
      isSpicy: false,
      isBestseller: true,
      spiceLevel: 0,
      tags: ['signature'],
    },
    {
      name: 'Funghi Tartufo',
      description: 'Truffle-infused mushroom delight',
      ingredients: 'Mozzarella, mixed wild mushrooms, truffle oil, thyme, parmigiano',
      price: 22.00,
      image: 'https://images.unsplash.com/photo-1730372801496-be4af356e214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMHRydWZmbGUlMjBwaXp6YXxlbnwxfHx8fDE3Njg5Mzk1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'signature',
      isVegetarian: true,
      isSpicy: false,
      isBestseller: false,
      spiceLevel: 0,
      tags: ['vegetarian', 'signature'],
    },
    {
      name: 'Pepperoni Classico',
      description: 'Classic pepperoni pizza',
      ingredients: 'Tomato, mozzarella, premium pepperoni, oregano',
      price: 16.00,
      image: 'https://images.unsplash.com/photo-1662938979482-ee0d8162a545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHRvcHxlbnwxfHx8fDE3Njg5Mzk1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'classic',
      isVegetarian: false,
      isSpicy: false,
      isBestseller: true,
      spiceLevel: 1,
      tags: ['classic'],
    },
    {
      name: 'Capricciosa',
      description: 'Loaded with Italian favorites',
      ingredients: 'Tomato, mozzarella, prosciutto cotto, artichokes, mushrooms, olives',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1566843972705-1aad0ee32f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXByaWNjaW9zYSUyMHBpenphJTIwaGFtfGVufDF8fHx8MTc2ODkzOTU3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'classic',
      isVegetarian: false,
      isSpicy: false,
      isBestseller: false,
      spiceLevel: 0,
      tags: ['classic'],
    },
    {
      name: 'Ortolana',
      description: 'Garden-fresh vegetables',
      ingredients: 'Tomato, mozzarella, grilled zucchini, eggplant, bell peppers, basil',
      price: 16.00,
      image: 'https://images.unsplash.com/photo-1694717065203-8cb0de9918f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFyaWFuJTIwcGl6emElMjBmcmVzaHxlbnwxfHx8fDE3Njg5Mzk1ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'seasonal',
      isVegetarian: true,
      isSpicy: false,
      isBestseller: false,
      spiceLevel: 0,
      tags: ['vegetarian', 'seasonal'],
    },
    {
      name: 'Marinara',
      description: 'Simple and authentic',
      ingredients: 'San Marzano tomatoes, garlic, oregano, extra virgin olive oil, no cheese',
      price: 12.00,
      image: 'https://images.unsplash.com/photo-1684823906761-30fd02a961cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpbmFyYSUyMHBpenphJTIwc2ltcGxlfGVufDF8fHx8MTc2ODkzOTU4MHww&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'classic',
      isVegetarian: true,
      isSpicy: false,
      isBestseller: false,
      spiceLevel: 0,
      tags: ['vegetarian', 'classic'],
    },
    {
      name: 'Burrata Fresca',
      description: 'Creamy burrata perfection',
      ingredients: 'Tomato, creamy burrata, cherry tomatoes, basil, balsamic glaze',
      price: 20.00,
      image: 'https://images.unsplash.com/photo-1758700835219-0422fdc4dd54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJyYXRhJTIwcGl6emElMjBjcmVhbXxlbnwxfHx8fDE3Njg5Mzk1ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'signature',
      isVegetarian: true,
      isSpicy: false,
      isBestseller: false,
      spiceLevel: 0,
      tags: ['vegetarian', 'cheese-heavy', 'signature'],
    },
    {
      name: 'Pesto Genovese',
      description: 'Fresh basil pesto delight',
      ingredients: 'Fresh basil pesto, mozzarella, cherry tomatoes, pine nuts, parmigiano',
      price: 17.00,
      image: 'https://images.unsplash.com/photo-1707896543317-da87bde75ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGJhc2lsJTIwbGVhdmVzfGVufDF8fHx8MTc2ODkzOTU4MXww&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'seasonal',
      isVegetarian: true,
      isSpicy: false,
      isBestseller: false,
      spiceLevel: 0,
      tags: ['vegetarian', 'seasonal'],
    },
    {
      name: 'Salsiccia Piccante',
      description: 'Spicy Italian sausage',
      ingredients: 'Tomato, mozzarella, spicy Italian sausage, friarielli, chili flakes',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1554136812-8b7875b188b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWF2b2xhJTIwc3BpY3klMjBwaXp6YXxlbnwxfHx8fDE3Njg5Mzk1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categorySlug: 'signature',
      isVegetarian: false,
      isSpicy: true,
      isBestseller: false,
      spiceLevel: 2,
      tags: ['spicy', 'signature'],
    },
  ]

  // Create menu items
  const categoryMap: Record<string, string> = {
    classic: classicCategory.id,
    signature: signatureCategory.id,
    seasonal: seasonalCategory.id,
  }

  for (const pizza of pizzas) {
    const categoryId = categoryMap[pizza.categorySlug]
    
    // Check if pizza already exists
    const existing = await prisma.menuItem.findFirst({
      where: {
        name: pizza.name,
        categoryId: categoryId,
      },
    })

    if (!existing) {
      await prisma.menuItem.create({
        data: {
          name: pizza.name,
          description: pizza.description,
          ingredients: pizza.ingredients,
          price: pizza.price,
          image: pizza.image,
          categoryId: categoryId,
          isVegetarian: pizza.isVegetarian,
          isSpicy: pizza.isSpicy,
          isBestseller: pizza.isBestseller,
          spiceLevel: pizza.spiceLevel,
          tags: pizza.tags,
          isAvailable: true,
        },
      })
    }
  }

  console.log(`✅ Created ${pizzas.length} pizzas`)
  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
