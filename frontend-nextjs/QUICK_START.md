# Quick Start Guide

## Prerequisites

1. **Backend Running**: Your Flask backend should be running on `http://localhost:5000`
2. **Database**: MySQL database should be set up and running
3. **Node.js**: Version 18 or higher

## Setup Steps

### 1. Install Frontend Dependencies

```bash
cd frontend-nextjs
npm install
```

### 2. Configure Environment

Create or verify `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Backend (if not already running)

```bash
cd ../backend
python run.py
```

The backend should start on `http://localhost:5000`

### 4. Start Frontend

```bash
cd frontend-nextjs
npm run dev
```

The frontend will start on `http://localhost:3000`

## Testing the Integration

### 1. Test API Connection

Open browser console and check for any CORS or connection errors.

### 2. Register a New User

1. Go to `http://localhost:3000/signup`
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: 1234567890
   - Password: password123
   - Confirm Password: password123
3. Click "Sign Up"
4. You should be automatically logged in and redirected to rewards page

### 3. Browse Products

1. Go to `http://localhost:3000/menu`
2. Products should load from the backend API
3. If API fails, fallback products will be shown

### 4. Add to Cart

1. Click "Add to Cart" on any product
2. Cart badge in navbar should update
3. Go to Cart page to see items

### 5. Place an Order

1. Go to Cart page
2. Click "Proceed to Checkout"
3. Fill in delivery information
4. Select payment method (Cash on Delivery)
5. Click "Place Order"
6. Order should be created in backend
7. You should see order confirmation with points earned

### 6. Check Rewards

1. Go to Rewards page
2. You should see your reward points
3. Points are earned: 1 point per 100 PKR spent

### 7. Redeem Points

1. On Rewards page, click "Redeem Now"
2. Enter points to redeem (minimum 100)
3. Points will be redeemed for discount (1 point = 1 PKR)

## Common Issues

### CORS Errors

**Problem**: Browser shows CORS error in console

**Solution**: 
- Verify backend CORS is configured for `http://localhost:3000`
- Check `backend/app/__init__.py` line 45
- Restart backend server

### API Connection Failed

**Problem**: Frontend can't connect to backend

**Solution**:
- Verify backend is running: `curl http://localhost:5000/api/health`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Check firewall/antivirus isn't blocking connections

### Authentication Issues

**Problem**: Login fails or token expires

**Solution**:
- Check backend JWT_SECRET_KEY is set
- Verify password hashing is working
- Check browser localStorage for token
- Try logging out and back in

### Products Not Loading

**Problem**: Menu page shows no products

**Solution**:
- Check backend has products in database
- Verify API endpoint: `curl http://localhost:5000/api/products`
- Check browser console for errors
- Fallback products will show if API fails

### Order Creation Fails

**Problem**: Can't place order

**Solution**:
- Ensure user is logged in (check token in localStorage)
- Verify cart has items
- Check backend database has products with stock
- Check backend logs for errors

## Debugging Tips

1. **Browser Console**: Check for JavaScript errors
2. **Network Tab**: Inspect API requests/responses
3. **Backend Logs**: Check Flask console for errors
4. **Database**: Verify data exists in MySQL
5. **LocalStorage**: Check token and user data

## Next Steps

- Add more products via admin panel
- Test order cancellation
- Test review submission
- Customize styling
- Deploy to production

## Support

For detailed API documentation, see `BACKEND_INTEGRATION.md`
For migration details, see `MIGRATION_GUIDE.md`

