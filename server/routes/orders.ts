import express from 'express';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';
import { Decimal } from '@prisma/client/runtime/library';

const router = express.Router();

const orderItemSchema = z.object({
  menuItemId: z.string().uuid(),
  quantity: z.number().int().min(1).max(99),
  unitPrice: z.number().nonnegative(),
  specialInstructions: z.string().max(500).optional(),
});

const createOrderSchema = z.object({
  userId: z.string().uuid().optional(),
  customerName: z.string().min(1).max(100).optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().max(30).optional(),
  deliveryAddress: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
});

// POST /api/orders - Create order
router.post('/', async (req, res) => {
  try {
    const parse = createOrderSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parse.error.errors,
      });
    }
    const data = parse.data;

    const subtotals: Decimal[] = [];
    for (const item of data.items) {
      subtotals.push(new Decimal(item.unitPrice).mul(item.quantity));
    }
    const totalAmount = subtotals.reduce((a, b) => a.add(b), new Decimal(0));

    const order = await prisma.order.create({
      data: {
        userId: data.userId ?? null,
        customerName: data.customerName ?? null,
        customerEmail: data.customerEmail ?? null,
        customerPhone: data.customerPhone ?? null,
        deliveryAddress: data.deliveryAddress ?? null,
        notes: data.notes ?? null,
        status: 'PENDING',
        totalAmount,
        orderItems: {
          create: data.items.map((i) => ({
            menuItemId: i.menuItemId,
            quantity: i.quantity,
            unitPrice: new Decimal(i.unitPrice),
            subtotal: new Decimal(i.unitPrice * i.quantity),
            specialInstructions: i.specialInstructions ?? null,
          })),
        },
      },
      include: {
        orderItems: {
          include: { menuItem: { select: { id: true, name: true } } },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: {
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount.toString(),
        createdAt: order.createdAt,
        orderItems: order.orderItems,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders - List orders (paginated, optional status filter)
router.get('/', async (req, res) => {
  try {
    const { status, page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
    const skip = (pageNum - 1) * limitNum;
    const where = status && typeof status === 'string' ? { status: status as any } : {};

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        include: {
          orderItems: {
            include: { menuItem: { select: { id: true, name: true } } },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    res.json({
      orders,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id - Get order by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: { include: { menuItem: true } },
        user: { select: { id: true, email: true, name: true } },
      },
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// PATCH /api/orders/:id/status - Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const valid = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'];
    if (!valid.includes(status)) {
      return res.status(400).json({ error: 'Invalid status', validStatuses: valid });
    }
    const order = await prisma.order.update({
      where: { id },
      data: { status: status as any },
      include: { orderItems: { include: { menuItem: true } } },
    });
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

export { router as ordersRouter };
