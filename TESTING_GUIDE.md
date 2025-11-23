# Complete Testing Guide

## Prerequisites

1. **MySQL Database** must be installed and running
2. **Python 3.9+** with venv_mac activated
3. **Node.js 18+** installed
4. **Both servers** should be running

---

## Step 1: Database Setup

### Option A: Use setup_database.py (Recommended)

```bash
cd backend
source venv_mac/bin/activate
python setup_database.py
```

This will:
- Create the database if it doesn't exist
- Create all tables
- Optionally seed with sample data

### Option B: Manual Setup

1. **Connect to MySQL:**
   ```bash
   mysql -u root -p
   ```

2. **Create Database:**
   ```sql
   CREATE DATABASE IF NOT EXISTS mochamagic;
   EXIT;
   ```

3. **Set Environment Variables:**
   Create a `.env` file in the `backend` directory:
   ```env
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_HOST=localhost
   DB_NAME=mochamagic
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key-here
   FLASK_ENV=development
   FLASK_PORT=5000
   ```

4. **Initialize Database:**
   ```bash
   cd backend
   source venv_mac/bin/activate
   python init_db.py
   ```

---

## Step 2: Start the Servers

### Start Backend (Terminal 1)

```bash
cd backend
source venv_mac/bin/activate
python run.py
```

**Expected Output:**
```
============================================================
 MochaMagic Backend Server Starting...
============================================================
 Server: http://localhost:5000
 Debug Mode: True
 API Endpoints: http://localhost:5000/api/
============================================================
 * Running on http://0.0.0.0:5000
```

### Start Frontend (Terminal 2)

```bash
cd frontend-nextjs
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

---

## Step 3: Testing Checklist

### ✅ Test 1: Home Page
1. Open browser: `http://localhost:3000`
2. **Expected:** 
   - Hero section with "Welcome to MochaMagic"
   - "Why Choose MochaMagic?" section with 3 cards
   - Navbar with all links

### ✅ Test 2: User Registration
1. Click **"Login"** in navbar → Click **"Sign up"** link
2. Or go directly to: `http://localhost:3000/signup`
3. Fill in the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Phone: `1234567890`
   - Password: `password123`
   - Confirm Password: `password123`
   - Address: `123 Main St, Karachi` (optional)
4. Click **"Sign Up"**
5. **Expected:**
   - Success message
   - Automatic login
   - Redirect to Rewards page
   - Navbar shows "John Doe" dropdown

### ✅ Test 3: User Login
1. Click **"Logout"** (if logged in)
2. Go to: `http://localhost:3000/login`
3. Enter credentials:
   - Email: `john@example.com`
   - Password: `password123`
4. Click **"Login"**
5. **Expected:**
   - Success message
   - Redirect to Rewards page
   - User name appears in navbar

### ✅ Test 4: Browse Products (Menu)
1. Click **"Menu"** in navbar
2. Or go to: `http://localhost:3000/menu`
3. **Expected:**
   - Products load from backend API (or fallback products)
   - Each product shows:
     - Image
     - Name
     - Description
     - Price
     - "Add to Cart" button
4. **Test Add to Cart:**
   - Click "Add to Cart" on any product
   - Button changes to "Added!" briefly
   - Cart badge in navbar updates with count

### ✅ Test 5: Shopping Cart
1. Click **"Cart"** in navbar (or badge)
2. Or go to: `http://localhost:3000/cart`
3. **Expected:**
   - See all items added to cart
   - Each item shows:
     - Image
     - Name
     - Price
     - Quantity controls (+/-)
     - Subtotal
     - Remove button (×)
4. **Test Cart Functions:**
   - Increase quantity: Click `+` button
   - Decrease quantity: Click `-` button
   - Remove item: Click `×` button
   - Check Order Summary:
     - Subtotal
     - Delivery Fee (150 PKR)
     - Total
   - Click **"Proceed to Checkout"**

### ✅ Test 6: Checkout Process
1. From Cart page, click **"Proceed to Checkout"**
2. **Expected:**
   - If not logged in: Redirect to login
   - If logged in: Show checkout form
3. **Fill Checkout Form:**
   - First Name: `John` (pre-filled)
   - Last Name: `Doe` (pre-filled)
   - Email: `john@example.com` (pre-filled)
   - Phone: `1234567890` (pre-filled)
   - Address: `123 Main St` (pre-filled)
   - City: `Karachi` (pre-filled)
   - Payment Method: `Cash on Delivery` (selected)
4. **Check Order Summary:**
   - Items list
   - Subtotal
   - Delivery Fee
   - Total
5. Click **"Place Order"**
6. **Expected:**
   - Success message with Order ID
   - Points earned notification
   - Cart cleared
   - Redirect to home page

### ✅ Test 7: Rewards System
1. Click **"Rewards"** in navbar
2. Or go to: `http://localhost:3000/rewards`
3. **Expected (Logged In):**
   - Welcome message with user name
   - Current reward points displayed
   - Progress bar (0/500 points)
   - "Redeem Now" button
   - Recent activity list
4. **Test Points Redemption:**
   - Click **"Redeem Now"**
   - Enter points to redeem (minimum 100)
   - Confirm redemption
   - **Expected:** Points deducted, discount code shown

### ✅ Test 8: Reviews
1. Click **"Reviews"** in navbar
2. Or go to: `http://localhost:3000/reviews`
3. **Expected:**
   - See existing reviews
   - Each review shows:
     - Customer name
     - Rating (stars)
     - Comment
4. **Test Submit Review (if logged in):**
   - Click **"Write a Review"**
   - Select rating (1-5 stars)
   - Enter comment
   - Click **"Submit"**
   - **Expected:** Review appears in list

### ✅ Test 9: Contact Form
1. Click **"Contact"** in navbar
2. Or go to: `http://localhost:3000/contact`
3. Fill the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Message: `This is a test message`
4. Click **"Send Message"**
5. **Expected:** Success message

### ✅ Test 10: API Integration Verification

#### Check Backend Health
```bash
curl http://localhost:5000/api/health
```
**Expected:** `{"status": "healthy", "message": "MochaMagic API is running"}`

#### Test Products API
```bash
curl http://localhost:5000/api/products
```
**Expected:** JSON with products array

#### Test Authentication (after registering)
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```
**Expected:** JSON with `access_token` and `customer` object

---

## Step 4: Browser Console Testing

### Open Browser Developer Tools (F12)

1. **Check for Errors:**
   - Console tab should show no red errors
   - Network tab should show successful API calls (200 status)

2. **Test API Calls:**
   - Go to Network tab
   - Perform actions (login, add to cart, etc.)
   - Verify API requests are being made
   - Check responses are correct

3. **Check LocalStorage:**
   - Application tab → Local Storage
   - Should see:
     - `token`: JWT token
     - `user`: User object
     - `mochamagic_cart`: Cart items

---

## Step 5: Common Issues & Solutions

### Issue: Backend won't start
**Solution:**
- Check MySQL is running: `mysql -u root -p`
- Verify `.env` file has correct database credentials
- Check port 5000 is not in use: `lsof -ti:5000`

### Issue: Frontend won't start
**Solution:**
- Check Node.js version: `node --version` (should be 18+)
- Reinstall dependencies: `cd frontend-nextjs && rm -rf node_modules && npm install`
- Check port 3000 is not in use: `lsof -ti:3000`

### Issue: CORS errors
**Solution:**
- Verify backend CORS allows `http://localhost:3000`
- Check `backend/app/__init__.py` CORS configuration
- Restart backend server

### Issue: Products not loading
**Solution:**
- Check backend is running: `curl http://localhost:5000/api/products`
- Check browser console for errors
- Verify database has products (use `setup_database.py` to seed data)

### Issue: Can't place order
**Solution:**
- Ensure user is logged in (check localStorage for token)
- Verify cart has items
- Check backend logs for errors
- Verify database connection

### Issue: Authentication fails
**Solution:**
- Check JWT_SECRET_KEY is set in backend `.env`
- Verify password is correct
- Check backend logs for authentication errors
- Try logging out and back in

---

## Step 6: Full User Flow Test

### Complete Shopping Flow:
1. ✅ Register new account
2. ✅ Browse menu
3. ✅ Add 3-4 items to cart
4. ✅ View cart, adjust quantities
5. ✅ Proceed to checkout
6. ✅ Fill delivery information
7. ✅ Place order
8. ✅ Check rewards page (should show points earned)
9. ✅ Logout
10. ✅ Login again
11. ✅ Check rewards (points should persist)

---

## Step 7: Performance Testing

1. **Load Time:**
   - Home page should load in < 2 seconds
   - Menu page should load in < 3 seconds

2. **API Response Time:**
   - Check Network tab in browser
   - API calls should complete in < 500ms

3. **Cart Persistence:**
   - Add items to cart
   - Refresh page
   - Cart should persist (localStorage)

---

## Success Criteria

✅ All pages load without errors  
✅ User can register and login  
✅ Products display correctly  
✅ Cart functionality works  
✅ Checkout process completes  
✅ Orders are created in database  
✅ Rewards points are earned and displayed  
✅ Reviews can be submitted  
✅ Contact form works  
✅ API integration is functional  
✅ No console errors  
✅ Responsive design works on mobile  

---

## Next Steps After Testing

1. **Add Sample Data:**
   - Use `setup_database.py` to add products
   - Create test orders
   - Add sample reviews

2. **Test Edge Cases:**
   - Empty cart checkout
   - Invalid login credentials
   - Network failures
   - Large quantities

3. **Production Readiness:**
   - Set up environment variables
   - Configure production database
   - Set up SSL/HTTPS
   - Deploy to hosting

---

## Quick Test Commands

```bash
# Check backend health
curl http://localhost:5000/api/health

# Check frontend
curl http://localhost:3000

# Check if servers are running
lsof -ti:5000 && echo "Backend running" || echo "Backend not running"
lsof -ti:3000 && echo "Frontend running" || echo "Frontend not running"
```

---

**Happy Testing! ☕**

If you encounter any issues, check the browser console and backend logs for error messages.

