import express from 'express';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';

const router = express.Router();

const createReservationSchema = z.object({
  userId: z.string().uuid().optional(),
  guestName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  guestEmail: z.string().email('Invalid email'),
  guestPhone: z.string().min(1, 'Phone is required').max(30),
  reservationDate: z.string().min(1).refine((s) => !Number.isNaN(new Date(s).getTime()), { message: 'Invalid date' }),
  numberOfGuests: z.number().int().min(1).max(20),
  specialRequests: z.string().max(1000).optional(),
});

// POST /api/reservations - Create reservation
router.post('/', async (req, res) => {
  try {
    const parse = createReservationSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: parse.error.errors,
      });
    }
    const data = parse.data;

    const reservation = await prisma.reservation.create({
      data: {
        userId: data.userId ?? null,
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        guestPhone: data.guestPhone,
        reservationDate: new Date(data.reservationDate as string),
        numberOfGuests: data.numberOfGuests,
        specialRequests: data.specialRequests ?? null,
        status: 'PENDING',
      },
    });

    res.status(201).json({
      success: true,
      message: 'Reservation submitted. We will confirm shortly.',
      reservation: {
        id: reservation.id,
        guestName: reservation.guestName,
        reservationDate: reservation.reservationDate,
        numberOfGuests: reservation.numberOfGuests,
        status: reservation.status,
        createdAt: reservation.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// GET /api/reservations - List reservations (paginated, optional status/date filters)
router.get('/', async (req, res) => {
  try {
    const { status, from, to, page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const where: Record<string, unknown> = {};
    if (status && typeof status === 'string') where.status = status;
    if (from || to) {
      where.reservationDate = {};
      if (from && typeof from === 'string') (where.reservationDate as Record<string, Date>).gte = new Date(from);
      if (to && typeof to === 'string') (where.reservationDate as Record<string, Date>).lte = new Date(to);
    }

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        orderBy: { reservationDate: 'asc' },
        skip,
        take: limitNum,
      }),
      prisma.reservation.count({ where }),
    ]);

    res.json({
      reservations,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// GET /api/reservations/:id - Get reservation by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { user: { select: { id: true, email: true, name: true } } },
    });
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json({ reservation });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ error: 'Failed to fetch reservation' });
  }
});

// PATCH /api/reservations/:id/status - Update reservation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const valid = ['PENDING', 'CONFIRMED', 'SEATED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];
    if (!valid.includes(status)) {
      return res.status(400).json({ error: 'Invalid status', validStatuses: valid });
    }
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status: status as any },
    });
    res.json({ success: true, reservation });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    res.status(500).json({ error: 'Failed to update reservation status' });
  }
});

export { router as reservationsRouter };
