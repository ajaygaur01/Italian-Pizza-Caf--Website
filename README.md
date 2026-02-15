# Italian Pizza Café Website

A full-stack website for an Italian pizza café, built with React (Vite), Express, Prisma, and PostgreSQL.

## Tech Stack

| Layer      | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React 18, Vite, TypeScript, Tailwind, Motion |
| Backend   | Node.js, Express, TypeScript         |
| Database  | PostgreSQL with Prisma ORM          |
| Deployment| Docker, nginx                        |

## Prerequisites

- **Node.js** 20+
- **npm** or **pnpm**
- **PostgreSQL** (local or hosted)
- **Docker** (optional, for containerized run)

## Getting Started

### 1. Clone and install

```bash
git clone <repository-url>
cd "Italian Pizza Café Website"
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
# Database (required for backend and Prisma)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Backend (optional)
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your PostgreSQL credentials.

### 3. Database setup

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations (creates tables)
npm run prisma:migrate

# Seed dummy pizzas and categories
npm run prisma:seed
```

### 4. Run the app

**Frontend (Vite dev server):**

```bash
npm run dev
```

App: **http://localhost:5173**

**Backend (Express API):**

```bash
npm run server
```

API: **http://localhost:3001**

For development with auto-reload:

```bash
npm run dev:server
```

Use two terminals (or a process manager) to run both frontend and backend at once.

## Project structure

```
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data (pizzas, categories)
├── server/
│   ├── index.ts         # Express app entry
│   ├── lib/
│   │   └── prisma.ts    # Prisma client singleton
│   └── routes/
│       ├── contact.ts      # Contact form API
│       ├── categories.ts   # Menu categories
│       ├── menu.ts         # Menu items
│       ├── orders.ts       # Orders
│       ├── reservations.ts # Reservations
│       └── users.ts        # Users
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   ├── lib/
│   │   └── prisma.ts   # Frontend Prisma (if used)
│   ├── main.tsx
│   └── styles/
├── prisma.config.ts     # Prisma 7 config (migrations, seed)
├── Dockerfile           # Frontend production build + nginx
├── docker-compose.yml
├── nginx.conf
└── vite.config.ts
```

## Scripts

| Script            | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start Vite dev server (frontend)     |
| `npm run build`   | Build frontend for production        |
| `npm run server`  | Start Express API server             |
| `npm run dev:server` | Start API with tsx watch (reload) |
| `npm run build:server` | Compile server TypeScript        |
| `npm run prisma:generate` | Generate Prisma Client          |
| `npm run prisma:migrate` | Run migrations                  |
| `npm run prisma:push`    | Push schema (no migration files) |
| `npm run prisma:studio`  | Open Prisma Studio             |
| `npm run prisma:seed`    | Run seed script                |

## API documentation

Base URL (dev): `http://localhost:3001`

### Health check

- **GET** `/health`  
  Returns `{ status: "ok", timestamp: "..." }`.

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List all categories (with item count) |
| GET | `/api/categories/slug/:slug` | Get category by slug (e.g. `classic`) with menu items |
| GET | `/api/categories/:id` | Get category by id with menu items |

### Menu

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | List menu items. Query: `categoryId`, `categorySlug`, `vegetarian`, `spicy`, `bestseller`, `available`, `page`, `limit` |
| GET | `/api/menu/:id` | Get single menu item |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order (body: `items[]`, optional `userId`, `customerName`, `customerEmail`, `customerPhone`, `deliveryAddress`, `notes`) |
| GET | `/api/orders` | List orders. Query: `status`, `page`, `limit` |
| GET | `/api/orders/:id` | Get order by id |
| PATCH | `/api/orders/:id/status` | Update order status (body: `{ "status": "CONFIRMED" }`) |

### Reservations

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reservations` | Create reservation (body: `guestName`, `guestEmail`, `guestPhone`, `reservationDate`, `numberOfGuests`, optional `specialRequests`, `userId`) |
| GET | `/api/reservations` | List reservations. Query: `status`, `from`, `to`, `page`, `limit` |
| GET | `/api/reservations/:id` | Get reservation by id |
| PATCH | `/api/reservations/:id/status` | Update reservation status (body: `{ "status": "CONFIRMED" }`) |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List users. Query: `page`, `limit` |
| GET | `/api/users/:id` | Get user by id |
| POST | `/api/users` | Create user (body: `email`, optional `name`, `phone`, `address`) |

### Contact (Get in Touch)

| Method | Endpoint              | Description                    |
|--------|------------------------|--------------------------------|
| POST   | `/api/contact`         | Submit contact form            |
| GET    | `/api/contact`         | List contacts (paginated)      |
| GET    | `/api/contact/:id`      | Get one contact by id          |
| PATCH  | `/api/contact/:id/status` | Update contact status      |

#### POST `/api/contact` — Submit contact form

**Request body (JSON):**

| Field   | Type   | Required | Validation                    |
|---------|--------|----------|--------------------------------|
| name    | string | Yes      | 2–100 characters               |
| email   | string | Yes      | Valid email                   |
| phone   | string | No       | —                             |
| subject | string | Yes      | Non-empty                     |
| message | string | Yes      | 10–2000 characters            |

**Example:**

```json
{
  "name": "Mario Rossi",
  "email": "mario@example.com",
  "phone": "+39 123 456 7890",
  "subject": "general",
  "message": "I would like to know your opening hours and if you take reservations."
}
```

**Success (201):**

```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!",
  "contact": {
    "id": "uuid",
    "name": "Mario Rossi",
    "email": "mario@example.com",
    "createdAt": "2026-02-05T..."
  }
}
```

**Validation error (400):**

```json
{
  "error": "Validation failed",
  "details": [ { "path": ["email"], "message": "Invalid email address" } ]
}
```

#### GET `/api/contact` — List contacts

**Query parameters:**

| Param  | Type   | Default | Description        |
|--------|--------|---------|--------------------|
| page   | number | 1       | Page number        |
| limit  | number | 10      | Items per page     |
| status | string | —       | Filter by status   |

**Status values:** `NEW`, `READ`, `REPLIED`, `ARCHIVED`

**Example:** `GET /api/contact?page=1&limit=10&status=NEW`

#### PATCH `/api/contact/:id/status` — Update status

**Request body:**

```json
{ "status": "READ" }
```

Allowed: `NEW`, `READ`, `REPLIED`, `ARCHIVED`.

## Database schema (overview)

- **User** — Customers (email, name, phone, address)
- **Category** — Menu categories (e.g. Classic, Signature, Seasonal)
- **MenuItem** — Pizzas and other items (name, price, ingredients, tags, etc.)
- **Order** / **OrderItem** — Orders and line items
- **Reservation** — Table reservations
- **Contact** — Get-in-touch form submissions (name, email, subject, message, status)

See `prisma/schema.prisma` for the full schema. Run `npm run prisma:studio` to browse and edit data.

## Docker

**Build and run frontend only:**

```bash
docker build -t italian-pizza-cafe-frontend .
docker run -p 3000:80 italian-pizza-cafe-frontend
```

**Using Docker Compose:**

```bash
docker-compose up -d
```

Frontend is served at **http://localhost:3000**. The backend and database are not included in the default compose file; add services as needed.

## Frontend routes

| Path           | Page           |
|----------------|----------------|
| `/`            | Landing        |
| `/menu`        | Menu           |
| `/about-chef`  | About Chef     |
| `/reservation` | Reserve a table|
| `/contact`     | Get in Touch   |

## License

Private project. See repository or `ATTRIBUTIONS.md` for third-party credits.
