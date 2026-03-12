# BuahBerkahBE

Backend REST API untuk sistem manajemen lapak buah multi-cabang. Dibangun menggunakan **Fastify**, **TypeScript**, **Drizzle ORM**, dan **PostgreSQL**.

---

## Daftar Isi

- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Database](#database)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Autentikasi & Otorisasi](#autentikasi--otorisasi)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Users](#users)
  - [Stalls (Lapak)](#stalls-lapak)
  - [Products (Produk)](#products-produk)
  - [Suppliers (Pemasok)](#suppliers-pemasok)
  - [Inventory (Stok)](#inventory-stok)
  - [Sales (Penjualan)](#sales-penjualan)
  - [Finance (Keuangan)](#finance-keuangan)
  - [Employees (Karyawan)](#employees-karyawan)
- [Request & Response Format](#request--response-format)
- [Error Handling](#error-handling)
- [Pagination](#pagination)
- [Database Schema](#database-schema)
- [Aturan Bisnis & Kontrol](#aturan-bisnis--kontrol)

---

## Fitur

- Manajemen multi-lapak (stall) dalam satu sistem terpusat
- Manajemen produk dengan varian, satuan, dan harga dinamis
- Manajemen stok (inventory) per lapak beserta mutasi stok antar lapak
- Pencatatan penjualan retail dan grosir per lapak
- Manajemen supplier beserta pesanan dan pengiriman
- Manajemen keuangan: pengeluaran, arus kas (cashflow), dan penggajian
- Manajemen karyawan dengan beragam tipe dan skema gaji
- Autentikasi JWT dengan kontrol akses berbasis peran (RBAC)
- Audit log otomatis untuk semua perubahan data
- Pagination pada semua endpoint list

---

## Tech Stack

| Kategori        | Teknologi                              |
|-----------------|----------------------------------------|
| Runtime         | Node.js                                |
| Framework       | Fastify v5                             |
| Bahasa          | TypeScript                             |
| ORM             | Drizzle ORM                            |
| Database        | PostgreSQL                             |
| Autentikasi     | JWT (`@fastify/jwt`)                   |
| Validasi        | Zod                                    |
| Logging         | Pino (pino-pretty dev mode)            |
| DB Tooling      | drizzle-kit                            |
| Dev Server      | nodemon + tsx                          |

---

## Struktur Proyek

```
src/
├── app.ts                    # Fastify builder (plugin & route registration)
├── server.ts                 # Entry point (start server)
├── config/
│   ├── db.ts                 # PostgreSQL pool factory
│   └── env.ts                # Environment variable schema & type augmentation
├── database/
│   ├── migrations/           # SQL migration files (drizzle-kit)
│   └── schema/               # Drizzle table definitions
│       ├── audit_log.ts
│       ├── employees.ts
│       ├── finance.ts
│       ├── inventory.ts
│       ├── products.ts
│       ├── sales.ts
│       ├── stalls.ts
│       ├── suppliers.ts
│       └── user.ts
├── middleware/
│   ├── auth.middleware.ts    # JWT verify hook
│   └── role.middleware.ts    # Role-based access control hook
├── modules/                  # Feature modules (Controller-Service-Repository)
│   ├── auth/
│   ├── employee/
│   ├── finance/
│   ├── inventory/
│   ├── product/
│   ├── sales/
│   ├── stall/
│   ├── supplier/
│   └── user/
├── plugins/
│   ├── auth.ts               # @fastify/jwt plugin
│   ├── cors.ts               # @fastify/cors plugin
│   └── drizzle.ts            # Drizzle ORM plugin
├── types/
│   └── index.ts              # JwtPayload & type augmentation
└── utils/
    ├── date.ts               # Date helpers
    ├── error.ts              # Global error handler
    └── pagination.ts         # Pagination utilities
```

---

## Persyaratan Sistem

- **Node.js** >= 18.x
- **npm** >= 9.x
- **PostgreSQL** >= 14.x

---

## Instalasi

```bash
# 1. Clone repositori
git clone <repository-url>
cd buahberkahbe

# 2. Install dependencies
npm install
```

---

## Konfigurasi Environment

Buat file `.env` di root proyek berdasarkan template berikut:

```env
# ──────────────────────────────────────────
# Server
# ──────────────────────────────────────────
PORT=3000
NODE_ENV=development

# ──────────────────────────────────────────
# Database (WAJIB)
# ──────────────────────────────────────────
DATABASE_URL=postgresql://username:password@localhost:5432/nama_database

# ──────────────────────────────────────────
# JWT (WAJIB)
# ──────────────────────────────────────────
JWT_SECRET=ganti_dengan_string_rahasia_yang_panjang_dan_aman
```

| Variable       | Wajib | Default       | Keterangan                              |
|----------------|-------|---------------|-----------------------------------------|
| `PORT`         | Tidak | `3000`        | Port server HTTP                        |
| `NODE_ENV`     | Tidak | `development` | Environment (`development`/`production`)|
| `DATABASE_URL` | **Ya**| -             | Connection string PostgreSQL            |
| `JWT_SECRET`   | **Ya**| -             | Secret key untuk signing JWT            |

> **Keamanan**: Jangan pernah commit file `.env` ke version control. Tambahkan `.env` ke `.gitignore`.

---

## Database

### Generate Migration

Jalankan setelah mengubah schema di `src/database/schema/`:

```bash
npm run db:generate
```

### Jalankan Migration

Apply semua migration yang belum dijalankan ke database:

```bash
npm run db:migrate
```

### Push Schema Langsung (Development)

Untuk development cepat tanpa file migration:

```bash
npm run db:push
```

### Drizzle Studio

Buka GUI browser untuk inspect dan edit data database:

```bash
npm run db:studio
```

---

## Menjalankan Aplikasi

### Development (Hot Reload)

```bash
npm run dev
```

Server berjalan di `http://localhost:3000` dengan auto-reload via nodemon + tsx.

### Production

```bash
# 1. Build TypeScript ke JavaScript
npm run build

# 2. Jalankan hasil build
npm run start
```

---

## Autentikasi & Otorisasi

### Cara Kerja

Semua endpoint yang membutuhkan autentikasi harus menyertakan **Bearer Token** di header `Authorization`:

```http
Authorization: Bearer <token>
```

Token diperoleh dari endpoint `POST /api/auth/login`.

### JWT Token

- **Algoritma**: HS256 (default `@fastify/jwt`)
- **Expiry**: 8 jam
- **Payload**:

```json
{
  "sub": 1,
  "username": "admin",
  "role": "admin",
  "iat": 1741694400,
  "exp": 1741723200
}
```

### Peran (Roles)

| Role      | Keterangan                                      |
|-----------|-------------------------------------------------|
| `admin`   | Akses penuh ke seluruh endpoint                 |
| `worker`  | Akses terbatas, umumnya operasional lapak harian|

### Middleware

```
authenticate   → Verifikasi JWT token (401 jika gagal)
requireRole    → Periksa role user (403 jika tidak bererizin)
```

Contoh penerapan pada route:
```typescript
{ preHandler: [authenticate, requireRole('admin')] }
```

---

## API Endpoints

**Base URL**: `http://localhost:3000/api`

Semua response menggunakan format JSON.

---

### Auth

| Method | Endpoint          | Auth | Keterangan                     |
|--------|-------------------|------|--------------------------------|
| POST   | `/auth/login`     | Tidak| Login dan dapatkan JWT token   |
| POST   | `/auth/register`  | Tidak| Registrasi user baru           |
| GET    | `/auth/me`        | Ya   | Informasi user yang sedang login|

#### POST `/auth/login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Response `200`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/register`

**Request Body:**
```json
{
  "name": "Budi Santoso",
  "username": "budi",
  "password": "password123",
  "role": "worker"
}
```

**Validasi:**
- `name`: wajib, min 1 karakter
- `username`: wajib, min 3 karakter, harus unik
- `password`: wajib, min 6 karakter
- `role`: `admin` | `worker` (default: `worker`)

**Response `201`:**
```json
{
  "id": 1,
  "name": "Budi Santoso",
  "username": "budi",
  "role": "worker",
  "createdAt": "2026-03-12T00:00:00.000Z",
  "updatedAt": "2026-03-12T00:00:00.000Z"
}
```

#### GET `/auth/me`

**Response `200`:**
```json
{
  "id": 1,
  "name": "Budi Santoso",
  "username": "budi",
  "role": "admin",
  "createdAt": "2026-03-12T00:00:00.000Z",
  "updatedAt": "2026-03-12T00:00:00.000Z"
}
```

---

### Users

| Method | Endpoint       | Auth | Keterangan              |
|--------|----------------|------|-------------------------|
| GET    | `/users`       | Ya   | Ambil semua user        |
| GET    | `/users/:id`   | Ya   | Ambil user berdasarkan ID|
| POST   | `/users`       | Ya   | Buat user baru          |
| PATCH  | `/users/:id`   | Ya   | Update user             |
| DELETE | `/users/:id`   | Ya   | Hapus user              |

#### POST `/users`

**Request Body:**
```json
{
  "name": "Siti Rahayu",
  "username": "siti",
  "passwordHash": "hash_password",
  "role": "worker"
}
```

#### PATCH `/users/:id`

**Request Body (semua field opsional):**
```json
{
  "name": "Siti Rahayu Updated",
  "username": "siti_updated",
  "role": "admin"
}
```

---

### Stalls (Lapak)

| Method | Endpoint        | Auth | Keterangan               |
|--------|-----------------|------|--------------------------|
| GET    | `/stalls`       | Ya   | Ambil semua lapak        |
| GET    | `/stalls/:id`   | Ya   | Ambil lapak berdasarkan ID|
| POST   | `/stalls`       | Ya   | Buat lapak baru          |
| PATCH  | `/stalls/:id`   | Ya   | Update lapak             |
| DELETE | `/stalls/:id`   | Ya   | Hapus lapak              |

#### POST `/stalls`

**Request Body:**
```json
{
  "name": "Lapak Pusat",
  "location": "Jl. Pasar Baru No. 1, Jakarta"
}
```

**Validasi:**
- `name`: wajib, min 1 karakter
- `location`: opsional

---

### Products (Produk)

#### Produk

| Method | Endpoint             | Auth | Keterangan                     |
|--------|----------------------|------|--------------------------------|
| GET    | `/products`          | Ya   | Ambil semua produk             |
| GET    | `/products/:id`      | Ya   | Ambil produk berdasarkan ID    |
| POST   | `/products`          | Ya   | Buat produk baru               |
| PATCH  | `/products/:id`      | Ya   | Update produk                  |

#### POST `/products`

```json
{
  "name": "Jeruk Mandarin",
  "description": "Jeruk impor segar",
  "active": 1
}
```

#### Varian Produk

| Method | Endpoint                        | Auth | Keterangan                |
|--------|---------------------------------|------|---------------------------|
| GET    | `/products/:productId/variants` | Ya   | Ambil varian suatu produk |
| POST   | `/variants`                     | Ya   | Buat varian baru          |
| PATCH  | `/variants/:id`                 | Ya   | Update varian             |

#### POST `/variants`

```json
{
  "productId": 1,
  "name": "Grade A",
  "qualityLevel": "Premium",
  "active": 1
}
```

#### Satuan (Units)

| Method | Endpoint       | Auth | Keterangan               |
|--------|----------------|------|--------------------------|
| GET    | `/units`       | Ya   | Ambil semua satuan       |
| POST   | `/units`       | Ya   | Buat satuan baru         |
| PATCH  | `/units/:id`   | Ya   | Update satuan            |

#### POST `/units`

```json
{
  "name": "Kilogram",
  "symbol": "kg"
}
```

#### Harga Produk (Prices)

| Method | Endpoint                        | Auth | Keterangan                     |
|--------|---------------------------------|------|--------------------------------|
| GET    | `/variants/:variantId/prices`   | Ya   | Ambil harga suatu varian       |
| POST   | `/prices`                       | Ya   | Tambah harga                   |
| PATCH  | `/prices/:id`                   | Ya   | Update harga                   |

#### POST `/prices`

```json
{
  "variantId": 1,
  "unitId": 1,
  "price": 25000
}
```

---

### Suppliers (Pemasok)

#### Supplier

| Method | Endpoint                           | Auth | Keterangan                      |
|--------|------------------------------------|------|---------------------------------|
| GET    | `/suppliers`                       | Ya   | Ambil semua supplier            |
| GET    | `/suppliers/:id`                   | Ya   | Ambil supplier berdasarkan ID   |
| GET    | `/suppliers/:supplierId/orders`    | Ya   | Ambil pesanan milik supplier    |
| POST   | `/suppliers`                       | Ya   | Buat supplier baru              |
| PATCH  | `/suppliers/:id`                   | Ya   | Update supplier                 |

#### POST `/suppliers`

```json
{
  "name": "CV Buah Segar",
  "phone": "081234567890",
  "address": "Jl. Raya Bogor No. 12"
}
```

#### Pesanan Supplier (Supplier Orders)

| Method | Endpoint                              | Auth | Keterangan                  |
|--------|---------------------------------------|------|-----------------------------|
| GET    | `/supplier-orders`                    | Ya   | Ambil semua pesanan         |
| GET    | `/supplier-orders/:id`                | Ya   | Detail pesanan              |
| GET    | `/supplier-orders/:orderId/items`     | Ya   | Item-item dalam pesanan     |
| GET    | `/supplier-orders/:orderId/deliveries`| Ya   | Pengiriman suatu pesanan    |
| POST   | `/supplier-orders`                    | Ya   | Buat pesanan baru           |
| PATCH  | `/supplier-orders/:id`                | Ya   | Update pesanan              |

#### POST `/supplier-orders`

```json
{
  "supplierId": 1,
  "createdBy": 1,
  "status": "pending",
  "orderDate": "2026-03-12"
}
```

**Status pesanan:** `pending` → `confirmed` → `delivered` | `cancelled`

#### POST `/supplier-order-items`

```json
{
  "orderId": 1,
  "variantId": 1,
  "unitId": 1,
  "quantity": 100,
  "price": 15000
}
```

#### Pengiriman Supplier (Deliveries)

| Method | Endpoint                                 | Auth | Keterangan                     |
|--------|------------------------------------------|------|--------------------------------|
| POST   | `/supplier-deliveries`                   | Ya   | Catat pengiriman baru          |
| GET    | `/supplier-deliveries/:deliveryId/items` | Ya   | Item dalam pengiriman          |
| POST   | `/supplier-delivery-items`               | Ya   | Tambah item pengiriman         |

#### POST `/supplier-deliveries`

```json
{
  "orderId": 1,
  "deliveryDate": "2026-03-15"
}
```

#### POST `/supplier-delivery-items`

```json
{
  "deliveryId": 1,
  "stallId": 1,
  "variantId": 1,
  "unitId": 1,
  "quantity": 50,
  "price": 15000
}
```

---

### Inventory (Stok)

#### Inventori

| Method | Endpoint                        | Auth | Keterangan                    |
|--------|---------------------------------|------|-------------------------------|
| GET    | `/inventories`                  | Ya   | Ambil semua data stok         |
| GET    | `/inventories/:id`              | Ya   | Detail stok berdasarkan ID    |
| GET    | `/stalls/:stallId/inventories`  | Ya   | Stok pada lapak tertentu      |
| POST   | `/inventories`                  | Ya   | Tambah data stok              |
| PATCH  | `/inventories/:id`              | Ya   | Update jumlah stok            |

#### POST `/inventories`

```json
{
  "stallId": 1,
  "variantId": 1,
  "quantity": 100
}
```

> Setiap pasangan `(stallId, variantId)` bersifat unik — tidak boleh duplikat.

#### PATCH `/inventories/:id`

```json
{
  "quantity": 150
}
```

#### Mutasi Stok (Inventory Mutations)

| Method | Endpoint                                    | Auth | Keterangan                      |
|--------|---------------------------------------------|------|---------------------------------|
| GET    | `/inventory-mutations`                      | Ya   | Ambil semua mutasi stok         |
| GET    | `/inventory-mutations/:id`                  | Ya   | Detail mutasi                   |
| GET    | `/inventory-mutations/:mutationId/items`    | Ya   | Item dalam mutasi               |
| POST   | `/inventory-mutations`                      | Ya   | Buat mutasi stok (transfer)     |
| POST   | `/inventory-mutation-items`                 | Ya   | Tambah item pada mutasi         |

#### POST `/inventory-mutations`

```json
{
  "fromStallId": 1,
  "toStallId": 2,
  "createdBy": 1
}
```

#### POST `/inventory-mutation-items`

```json
{
  "mutationId": 1,
  "variantId": 1,
  "unitId": 1,
  "quantity": 25
}
```

---

### Sales (Penjualan)

| Method | Endpoint                    | Auth | Keterangan                    |
|--------|-----------------------------|------|-------------------------------|
| GET    | `/sales`                    | Ya   | Ambil semua transaksi penjualan|
| GET    | `/sales/:id`                | Ya   | Detail penjualan              |
| GET    | `/sales/:saleId/items`      | Ya   | Item dalam penjualan          |
| GET    | `/stalls/:stallId/sales`    | Ya   | Penjualan di lapak tertentu   |
| POST   | `/sales`                    | Ya   | Buat transaksi penjualan baru |
| PATCH  | `/sales/:id`                | Ya   | Update transaksi              |
| POST   | `/sale-items`               | Ya   | Tambah item penjualan         |

#### POST `/sales`

```json
{
  "stallId": 1,
  "createdBy": 1,
  "saleType": "retail",
  "totalAmount": 75000
}
```

**Tipe Penjualan:**
| Nilai       | Keterangan      |
|-------------|-----------------|
| `retail`    | Penjualan eceran|
| `wholesale` | Penjualan grosir|

#### POST `/sale-items`

```json
{
  "saleId": 1,
  "variantId": 1,
  "unitId": 1,
  "quantity": 3,
  "price": 25000,
  "subtotal": 75000
}
```

---

### Finance (Keuangan)

#### Pengeluaran (Expenses)

| Method | Endpoint                        | Auth | Keterangan                      |
|--------|---------------------------------|------|---------------------------------|
| GET    | `/expenses`                     | Ya   | Ambil semua pengeluaran         |
| GET    | `/expenses/:id`                 | Ya   | Detail pengeluaran              |
| GET    | `/stalls/:stallId/expenses`     | Ya   | Pengeluaran di lapak tertentu   |
| POST   | `/expenses`                     | Ya   | Catat pengeluaran baru          |
| PATCH  | `/expenses/:id`                 | Ya   | Update pengeluaran              |

#### POST `/expenses`

```json
{
  "stallId": 1,
  "category": "Transportasi",
  "amount": 50000,
  "description": "Ongkos kirim barang",
  "createdBy": 1
}
```

#### Arus Kas (Cashflows)

| Method | Endpoint                          | Auth | Keterangan                    |
|--------|-----------------------------------|------|-------------------------------|
| GET    | `/cashflows`                      | Ya   | Ambil semua arus kas          |
| GET    | `/cashflows/:id`                  | Ya   | Detail arus kas               |
| GET    | `/stalls/:stallId/cashflows`      | Ya   | Arus kas di lapak tertentu    |
| POST   | `/cashflows`                      | Ya   | Catat arus kas baru           |
| GET    | `/cashflows/salary`               | Ya   | Arus kas gaji                 |
| POST   | `/cashflows/salary`               | Ya   | Catat arus kas gaji baru      |

#### POST `/cashflows`

```json
{
  "stallId": 1,
  "type": "income",
  "amount": 500000,
  "sourceType": "sales",
  "sourceId": 1,
  "description": "Pendapatan penjualan harian",
  "transactionDate": "2026-03-12",
  "createdBy": 1
}
```

**Tipe Arus Kas:**
| `type`     | Keterangan   |
|------------|--------------|
| `income`   | Pemasukan    |
| `expense`  | Pengeluaran  |

**Sumber Arus Kas (`sourceType`):**
| Nilai              | Keterangan                     |
|--------------------|--------------------------------|
| `sales`            | Dari transaksi penjualan       |
| `expenses`         | Dari pengeluaran operasional   |
| `salary_payments`  | Dari pembayaran gaji           |
| `supplier_orders`  | Dari pembelian ke supplier     |
| `manual`           | Entri manual (tanpa sourceId)  |

---

### Employees (Karyawan)

#### Karyawan

| Method | Endpoint                       | Auth | Keterangan                     |
|--------|--------------------------------|------|--------------------------------|
| GET    | `/employees`                   | Ya   | Ambil semua karyawan           |
| GET    | `/employees/:id`               | Ya   | Detail karyawan                |
| GET    | `/stalls/:stallId/employees`   | Ya   | Karyawan di lapak tertentu     |
| POST   | `/employees`                   | Ya   | Tambah karyawan baru           |
| PATCH  | `/employees/:id`               | Ya   | Update data karyawan           |

#### POST `/employees`

```json
{
  "name": "Ahmad Fauzi",
  "type": "stall_worker",
  "stallId": 1,
  "salaryType": "monthly",
  "salaryAmount": 3000000
}
```

**Tipe Karyawan:**
| Nilai          | Keterangan     |
|----------------|----------------|
| `stall_worker` | Penjaga lapak  |
| `loader`       | Pemuat barang  |

**Skema Gaji:**
| Nilai     | Keterangan     |
|-----------|----------------|
| `monthly` | Bulanan        |
| `daily`   | Harian         |
| `weekly`  | Mingguan       |

#### Pembayaran Gaji (Salary Payments)

| Method | Endpoint                                    | Auth | Keterangan                          |
|--------|---------------------------------------------|------|-------------------------------------|
| GET    | `/salary-payments`                          | Ya   | Ambil semua pembayaran gaji         |
| GET    | `/employees/:employeeId/salary-payments`    | Ya   | Pembayaran gaji karyawan tertentu   |
| POST   | `/salary-payments`                          | Ya   | Catat pembayaran gaji               |

#### POST `/salary-payments`

```json
{
  "employeeId": 1,
  "amount": 3000000,
  "paymentDate": "2026-03-01",
  "note": "Gaji bulan Maret 2026"
}
```

---

## Request & Response Format

### Format Request

Semua request body menggunakan `Content-Type: application/json`.

```http
POST /api/auth/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer <token>

{
  "username": "admin",
  "password": "secret"
}
```

### Format Response Sukses

```json
{
  "id": 1,
  "name": "Contoh",
  ...
}
```

### Format Response List (dengan Pagination)

```json
{
  "data": [ ... ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

---

## Error Handling

### Format Error

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation error",
  "issues": [
    {
      "field": "username",
      "message": "Username must be at least 3 characters"
    }
  ]
}
```

### Kode HTTP Error

| Kode | Error                  | Kondisi                                    |
|------|------------------------|--------------------------------------------|
| 400  | Bad Request            | Validasi Zod gagal                         |
| 401  | Unauthorized           | Token JWT tidak valid atau tidak ada       |
| 403  | Forbidden              | Role tidak memiliki izin                   |
| 404  | Not Found              | Resource tidak ditemukan                   |
| 409  | Conflict               | Duplikat data (mis. username sudah ada)    |
| 500  | Internal Server Error  | Kesalahan server tidak terduga             |

---

## Pagination

Semua endpoint list mendukung query parameter pagination:

| Parameter | Default | Maksimum | Keterangan              |
|-----------|---------|----------|-------------------------|
| `page`    | `1`     | -        | Nomor halaman           |
| `limit`   | `20`    | `100`    | Jumlah data per halaman |

**Contoh:**
```
GET /api/products?page=2&limit=10
```

---

## Database Schema

### Diagram Relasi (Ringkasan)

```
users
  └─< sales (createdBy)
  └─< supplier_orders (createdBy)
  └─< inventory_mutations (createdBy)
  └─< expenses (createdBy)
  └─< cashflows (createdBy)
  └─< audit_logs (performedBy)

stalls
  └─< inventories (stallId)
  └─< sales (stallId)
  └─< expenses (stallId)
  └─< cashflows (stallId)
  └─< employees (stallId)
  └─< inventory_mutations (fromStallId / toStallId)

products
  └─< product_variants (productId)
        └─< product_prices (variantId)
        └─< inventory_mutation_items (variantId)
        └─< sale_items (variantId)
        └─< supplier_order_items (variantId)
        └─< supplier_delivery_items (variantId)
        └─< inventories (variantId)

units
  └─< product_prices (unitId)
  └─< inventory_mutation_items (unitId)
  └─< sale_items (unitId)
  └─< supplier_order_items (unitId)
  └─< supplier_delivery_items (unitId)

suppliers
  └─< supplier_orders (supplierId)
        └─< supplier_order_items (orderId)
        └─< supplier_deliveries (orderId)
              └─< supplier_delivery_items (deliveryId)

employees
  └─< salary_payments (employeeId)
```

### Enum Database

| Enum                       | Nilai                                               |
|----------------------------|-----------------------------------------------------|
| `role`                     | `admin`, `worker`                                   |
| `sale_type`                | `retail`, `wholesale`                               |
| `cashflow_type`            | `income`, `expense`                                 |
| `cashflow_source_type`     | `sales`, `expenses`, `salary_payments`, `supplier_orders`, `manual` |
| `employee_type`            | `stall_worker`, `loader`                            |
| `salary_type`              | `monthly`, `daily`, `weekly`                        |
| `supplier_order_status`    | `pending`, `confirmed`, `delivered`, `cancelled`    |
| `audit_action`             | `create`, `update`, `delete`                        |

---

## Aturan Bisnis & Kontrol

### Keamanan

1. **Password** tidak pernah disimpan dalam plaintext — di-hash menggunakan `crypto.scrypt` dengan salt acak 16 byte.
2. **Password** tidak pernah dikembalikan di response API (field `passwordHash` selalu dihapus).
3. **JWT** menggunakan `timingSafeEqual` untuk perbandingan hash, menghindari timing attack.
4. **JWT** memiliki expiry 8 jam — token yang kedaluwarsa otomatis ditolak.
5. **CORS**: Pada mode `production`, semua origin diblokir secara default. Pada `development`, semua origin diizinkan.

### Validasi Data

1. Semua input divalidasi menggunakan **Zod** sebelum diproses lebih lanjut.
2. Field bertipe numerik (harga, jumlah, dll) wajib bernilai positif.
3. Field bertipe tanggal menggunakan format string `YYYY-MM-DD`.
4. `username` minimal 3 karakter dan harus unik di seluruh sistem.
5. `password` minimal 6 karakter saat registrasi.

### Integritas Data

1. **Foreign keys** dengan `onDelete: 'restrict'` mencegah penghapusan data yang masih direferensi.
2. **Foreign keys** dengan `onDelete: 'cascade'` menghapus data turunan secara otomatis (mis. sale items saat sale dihapus).
3. Kombinasi `(stallId, variantId)` pada tabel `inventories` bersifat **unik** — satu lapak hanya boleh punya satu record stok per varian produk.
4. `cashflows` dan `audit_logs` menggunakan **pola polimorfik** (`source_type` + `source_id`) untuk mereferensi berbagai tabel sumber tanpa foreign key kaku.

### Kontrol Akses

1. Semua endpoint (kecuali `POST /auth/login` dan `POST /auth/register`) memerlukan **Bearer Token** yang valid.
2. Role `worker` tidak dapat mengakses endpoint manajemen user atau endpoint yang secara eksplisit memerlukan role `admin`.
3. Semua perubahan data tercatat di tabel `audit_logs` dengan snapshot `old_data` dan `new_data` dalam format JSONB.

### Koneksi Database

1. Koneksi PostgreSQL menggunakan **connection pool** (`pg.Pool`) untuk efisiensi.
2. Koneksi diverifikasi (`SELECT 1`) saat startup — server gagal start jika database tidak dapat dijangkau.
3. Pool ditutup secara graceful saat server shutdown melalui hook `onClose`.

### Logging

1. Semua request dan error di-log menggunakan **Pino**.
2. Pada mode `development`, log ditampilkan dengan format berwarna (`pino-pretty`).
3. Pada mode `production`, log menggunakan format JSON standar untuk kompatibilitas dengan log aggregator.
