# 🏡 RentNest - Rental Property Management API

A secure and scalable backend API for a rental property marketplace where landlords can list properties, tenants can rent them, make payments through Stripe, and leave reviews after successful payment.

---
# 🔑 Key Information & Live Links

**🌐 Live API:**  https://rent-nest-xi.vercel.app/

**🗄️ Database ER Diagram:** https://drawsql.app/teams/flash-plus/diagrams/rentnest

**📬 API Collection:** `RentNest.postman_collection.json` *(Available in the project root)*

---

# 👤 Admin Demo Credentials

**Email:** `admin@admin.com`  
**Password:** `abc123`

---

# 🚀 Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Refresh Token
- Current User Profile (/me)

---

## 🏠 Property Management

- Create Property (Landlord)
- Update Property
- Delete Property
- Get Property Details
- Browse All Properties
- Search Properties
- Filter Properties

---

## 🗂 Property Categories

- Create Category
- Get All Categories

---

## 📋 Rental Management

### Tenant

- Submit Rental Request
- View Own Rental Requests
- View Rental Request Details

### Landlord

- View Rental Requests for Own Properties
- Approve Rental Request
- Reject Rental Request

---

## 💳 Stripe Payment

- Create Stripe Checkout Session
- Stripe Webhook Verification
- Complete Rental Payment
- Payment History
- Payment Details

---

## 👨‍💼 Admin

- Get All Users
- Update User Status
- Get All Properties
- Get All Rental Requests

---

# 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- bcrypt
- Cookie Parser
- Stripe
- CORS

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/torufa/RentNest.git
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

```env
PORT

APP_URL

DATABASE_URL

BCRYPT_SALT_ROUND

JWT_ACCESS_SECRET
JWT_ACCESS_EXPIRES_IN 

JWT_REFRESH_SECRET
JWT_REFRESH_EXPIRES_IN

STRIPE_PRODUCT_PRICE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

---

## Prisma

```bash
npx prisma generate
```

```bash
npx prisma migrate deploy
```

---

## Run Project

```bash
npm run dev
```

---

# 📌 API Endpoints

## Authentication

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh-token
- GET /api/auth/me

---

## Categories

- POST /api/categories
- GET /api/categories

---

## Properties

- POST /api/properties
- GET /api/properties
- GET /api/properties/:id
- PATCH /api/properties/:id
- DELETE /api/properties/:id

---

## Rentals

### Tenant

- POST /api/rentals
- GET /api/rentals
- GET /api/rentals/:id

### Landlord

- GET /api/landlord/requests
- PATCH /api/landlord/requests/:id

---

## Payments

- POST /api/payments/create
- POST /api/payments/confirm
- GET /api/payments
- GET /api/payments/:id

---

## Admin

- GET /api/admin/users
- PATCH /api/admin/users/:id
- GET /api/admin/properties
- GET /api/admin/rentals

---

# 🔄 Payment Workflow

```text
Tenant
    │
    ▼
Submit Rental Request
    │
    ▼
Landlord Approves Request
    │
    ▼
Create Stripe Checkout Session
    │
    ▼
Complete Payment
    │
    ▼
Stripe Webhook
    │
    ▼
Payment Recorded
    │
    ▼
Rental Status → PAID
```

---

# 👨‍💻 Author

**Torufa Toma**

GitHub: https://github.com/torufa

---

# 📄 License

Developed for the Programming Hero Level-2 Assignment-4.
