import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// GET /api/categories - List all categories (with menu items count)
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: { select: { menuItems: true } },
      },
    });
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET /api/categories/slug/:slug - Get category by slug (with menu items) — must be before /:id
router.get('/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { menuItems: true },
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ category });
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// GET /api/categories/:id - Get category by id (with menu items)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
      include: { menuItems: true },
    });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

export { router as categoriesRouter };
