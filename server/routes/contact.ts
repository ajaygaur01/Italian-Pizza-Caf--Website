import express from 'express';
import { prisma } from '../lib/prisma.js';
import { z } from 'zod';

const router = express.Router();

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const validationResult = contactSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.errors,
      });
    }

    const { name, email, phone, subject, message } = validationResult.data;

    // Create contact record
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    });

    // In a real application, you might want to:
    // - Send an email notification
    // - Send a confirmation email to the user
    // - Add to a queue for processing

    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      contact: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      error: 'Failed to submit contact form',
      message: 'Please try again later.',
    });
  }
});

// GET /api/contact - Get all contacts (admin only - add auth middleware in production)
router.get('/', async (req, res) => {
  try {
    const { status, page = '1', limit = '10' } = req.query;
    
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    const where = status ? { status: status as any } : {};

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          subject: true,
          message: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.contact.count({ where }),
    ]);

    res.json({
      contacts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      error: 'Failed to fetch contacts',
    });
  }
});

// GET /api/contact/:id - Get single contact
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
      });
    }

    res.json({ contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      error: 'Failed to fetch contact',
    });
  }
});

// PATCH /api/contact/:id/status - Update contact status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['NEW', 'READ', 'REPLIED', 'ARCHIVED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        validStatuses,
      });
    }

    const contact = await prisma.contact.update({
      where: { id },
      data: { status: status as any },
    });

    res.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      error: 'Failed to update contact status',
    });
  }
});

export { router as contactRouter };
