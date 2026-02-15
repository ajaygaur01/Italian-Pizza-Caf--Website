import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// GET /api/menu - List menu items with optional filters
// Query: categoryId, categorySlug, vegetarian, spicy, bestseller, available, page, limit
router.get('/', async (req, res) => {
  try {
    const {
      categoryId,
      categorySlug,
      vegetarian,
      spicy,
      bestseller,
      available,
      page = '1',
      limit = '50',
    } = req.query;

    const where: Record<string, unknown> = {};

    if (categoryId && typeof categoryId === 'string') where.categoryId = categoryId;
    if (categorySlug && typeof categorySlug === 'string') {
      const cat = await prisma.category.findUnique({ where: { slug: categorySlug } });
      if (cat) where.categoryId = cat.id;
    }
    if (vegetarian === 'true') where.isVegetarian = true;
    if (spicy === 'true') where.isSpicy = true;
    if (bestseller === 'true') where.isBestseller = true;
    if (available !== undefined) where.isAvailable = available !== 'false';

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [items, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        orderBy: [{ categoryId: 'asc' }, { name: 'asc' }],
        include: { category: { select: { id: true, name: true, slug: true } } },
        skip,
        take: limitNum,
      }),
      prisma.menuItem.count({ where }),
    ]);

    res.json({
      menuItems: items,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// GET /api/menu/:id - Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!item) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ menuItem: item });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

export { router as menuRouter };
