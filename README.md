# FreshCart — E-commerce (Next.js)

FreshCart is a modern e-commerce web app built with **Next.js (App Router)**, **TypeScript**, **TailwindCSS**, and **TanStack React Query**.  
It includes a complete shopping experience: products browsing, categories, brands, cart, checkout, orders, and wishlist — with a clean UI and solid UX patterns.

🌐 Live Demo: https://freshcart-ecommerce-next.vercel.app/  
👤 Author: Ahmed Soliman  
🔗 LinkedIn: https://www.linkedin.com/in/ahmed-soliman-1334b116a/

---

## ✨ Features

### 🛍️ Shopping

- Products listing (responsive grid)
- Product details page with gallery
- Search & filtering patterns ready

### 🧩 Catalog

- Categories listing + search
- Brand listing + brand details handling
- Elegant empty-state / not-found UI for missing API data

### 🛒 Cart (Full CRUD)

- View cart
- Update quantity (increment / decrement)
- Remove item
- Clear cart
- Per-action loaders (better UX)

### ❤️ Wishlist

- Add / remove products
- Dedicated Wishlist page
- Wishlist icon in navbar with count + animation when not empty

### ✅ Checkout & Orders

- Cash order creation
- Online payment session (checkout-session) redirect
- Orders history page for the logged-in user

### 🔐 Authentication UX

- Login / Register / Forgot / Reset password flows
- Route protection using **Next.js Middleware** (`/checkout`, `/orders`)
- Redirect support (e.g. `/login?redirect=/checkout`)

### ⚡ Performance & DX

- TanStack React Query caching, refetch control, and mutations
- Reusable API layer (`apiFetch`) with typed responses
- Clean UI components with consistent styling

---

## 🧰 Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **TanStack React Query**
- **Lucide Icons**
- **React Hook Form + Zod**
- **Sonner** (toasts)
- **AOS** (scroll animations)

---

## 🔌 API Used

This project uses the public API:

- Base URL: `https://ecommerce.routemisr.com/api/v1`

Endpoints used include:

- Products / Categories / Brands
- Cart (GET/POST/PUT/DELETE/CLEAR)
- Wishlist (POST/DELETE/GET)
- Orders (Cash Order / Checkout Session / User Orders)

> Note: Some endpoints may return incomplete data for certain brands/categories.  
> FreshCart handles this gracefully using not-found and empty-state UIs.

---

## 🚀 Getting Started

### 1) Install dependencies

```bash
npm install
```
