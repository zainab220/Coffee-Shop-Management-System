# MochaMagic - Next.js Frontend

This is the Next.js frontend for the MochaMagic Coffee Shop Management System.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.local` and update `NEXT_PUBLIC_API_URL` to point to your Flask backend

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app directory with pages and layouts
- `components/` - Reusable React components
- `context/` - React context providers (Cart, Auth)
- `lib/` - Utility functions and API client
- `public/` - Static assets (images, etc.)
- `styles/` - Global CSS styles

## Features

- 🛒 Shopping cart with persistent state
- 🔐 User authentication
- 🎁 Rewards system
- 📝 Product reviews
- 💳 Checkout process
- 📱 Responsive design

