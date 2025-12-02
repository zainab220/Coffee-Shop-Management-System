# Migration Guide: HTML/JS to Next.js

## Overview

Your frontend has been successfully converted from plain HTML/JavaScript to Next.js with TypeScript. This guide will help you understand the changes and how to use the new setup.

## Project Structure

```
frontend-nextjs/
├── app/                    # Next.js app directory (pages)
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── menu/               # Menu page
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout page
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── rewards/            # Rewards page
│   ├── reviews/            # Reviews page
│   └── contact/            # Contact page
├── components/             # Reusable components
│   ├── Navbar.tsx          # Navigation bar
│   └── Footer.tsx          # Footer component
├── context/                # React Context providers
│   ├── CartContext.tsx     # Shopping cart state
│   └── AuthContext.tsx      # Authentication state
├── lib/                    # Utilities
│   └── api.ts              # API client functions
├── public/                 # Static assets
│   └── images/             # Image files
└── styles/                 # Global styles
    └── globals.css         # Main stylesheet
```

## Key Changes

### 1. **State Management**
- **Before**: localStorage with vanilla JavaScript
- **After**: React Context API (CartContext, AuthContext)
- Cart state is now managed globally and persists to localStorage
- Authentication state is centralized

### 2. **API Integration**
- **Before**: localStorage for user data
- **After**: API calls to Flask backend (with localStorage fallback)
- All API functions are in `lib/api.ts`
- JWT token authentication is handled automatically

### 3. **Routing**
- **Before**: Multiple HTML files (`index.html`, `menu.html`, etc.)
- **After**: File-based routing (`app/page.tsx`, `app/menu/page.tsx`, etc.)
- Uses Next.js Link component for navigation

### 4. **Components**
- **Before**: Repeated HTML in each file
- **After**: Reusable React components (Navbar, Footer)
- Shared layout in `app/layout.tsx`

## Getting Started

### 1. Install Dependencies

```bash
cd frontend-nextjs
npm install
```

### 2. Configure Environment

Create or update `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
npm start
```

## API Integration

The frontend is configured to connect to your Flask backend. Make sure:

1. Your Flask backend is running on port 5000
2. CORS is enabled for `http://localhost:3000`
3. The API endpoints match the structure in `lib/api.ts`

### API Endpoints Used:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/products` - Get all products
- `POST /api/orders` - Create order
- `GET /api/rewards` - Get user rewards
- `POST /api/rewards/redeem` - Redeem reward points
- `POST /api/reviews` - Create review

## Features

### ✅ Implemented

- ✅ All pages converted (Home, Menu, Cart, Checkout, Login, Signup, Rewards, Reviews, Contact)
- ✅ Shopping cart with persistent state
- ✅ User authentication
- ✅ API integration ready
- ✅ Responsive design maintained
- ✅ All styling preserved
- ✅ Image assets copied

### 🔄 Fallback Behavior

- If API calls fail, the app falls back to:
  - Hardcoded product list for menu
  - localStorage for cart (already working)
  - localStorage for user session

## Differences from Original

1. **TypeScript**: All code is now typed for better development experience
2. **React Hooks**: Uses useState, useEffect, useContext instead of vanilla JS
3. **Client Components**: Pages marked with `'use client'` for interactivity
4. **Image Optimization**: Uses Next.js Image component for better performance
5. **Server-Side Ready**: Can be extended with SSR/SSG for better SEO

## Next Steps

1. **Connect to Backend**: Ensure your Flask API is running and accessible
2. **Test All Features**: Go through each page and test functionality
3. **Customize**: Modify components and styles as needed
4. **Deploy**: Deploy to Vercel, Netlify, or your preferred hosting

## Troubleshooting

### Images not loading?
- Check that images are in `public/images/` directory
- Verify image paths use `/images/` (not `images/`)

### API calls failing?
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Verify Flask backend is running
- Check browser console for CORS errors

### Bootstrap not working?
- Bootstrap JS is loaded via Next.js Script component
- Make sure you're using Bootstrap classes correctly

## Support

If you encounter any issues, check:
1. Browser console for errors
2. Terminal for build/run errors
3. Network tab for API call issues

