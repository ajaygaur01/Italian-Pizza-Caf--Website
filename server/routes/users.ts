import express from 'express';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';

const router = express.Router();

const createUserSchema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1).max(100).optional(),
  phone: z.string().max(30).optional(),
  address: z.string().max(500).optional(),
});

// GET /api/users - List users (paginated)
router.get('/', async (req, res) => {
  try {
    const { page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          address: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { orders: true, reservations: true } },
        },
      }),
      prisma.user.count(),
    ]);

    res.json({
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET /api/users/:id - Get user by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: { select: { orders: true, reservations: true } },
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users - Create user (e.g. for registration)
router.post('/', async (req, res) => {
  try {
    const parse = createUserSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parse.error.errors,
      });
    }
    const data = parse.data;

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name ?? null,
        phone: data.phone ?? null,
        address: data.address ?? null,
      },
    });

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

export { router as usersRouter };
