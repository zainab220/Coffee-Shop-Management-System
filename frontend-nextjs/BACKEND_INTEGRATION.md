# Backend Integration Guide

This document explains how the Next.js frontend integrates with the Flask backend.

## API Configuration

The frontend is configured to connect to your Flask backend via the `NEXT_PUBLIC_API_URL` environment variable in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Authentication Flow

### Registration
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St"
  }
  ```
- **Response**: Returns customer object (no token - user must login)

### Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "access_token": "jwt_token_here",
    "customer": {
      "customer_id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "reward_points": 0
    }
  }
  ```
- The token is automatically stored in localStorage and added to all subsequent requests

### Profile
- **Endpoint**: `GET /api/auth/profile` (requires JWT)
- **Response**: Customer object with current reward points

## Products

### Get All Products
- **Endpoint**: `GET /api/products`
- **Query Parameters** (optional):
  - `category_id`: Filter by category
  - `search`: Search in name/description
  - `min_price`, `max_price`: Price range
- **Response**:
  ```json
  {
    "products": [
      {
        "product_id": 1,
        "name": "Mocha Latte",
        "description": "Rich chocolate coffee blend",
        "price": 550.0,
        "image_url": "/images/mocha.jpg",
        "stock_quantity": 100
      }
    ],
    "count": 1
  }
  ```

## Orders

### Create Order
- **Endpoint**: `POST /api/orders` (requires JWT)
- **Request Body**:
  ```json
  {
    "items": [
      {
        "product_id": 1,
        "quantity": 2,
        "price": 550.0
      }
    ],
    "payment_method": "Cash",
    "delivery_fee": 150,
    "delivery_address": "123 Main St",
    "city": "Karachi",
    "postal_code": "12345",
    "notes": "Special instructions"
  }
  ```
- **Payment Methods**: `Cash`, `CreditCard`, `Online`
- **Response**:
  ```json
  {
    "message": "Order placed successfully",
    "order": {
      "order_id": 1,
      "total_amount": 1250.0,
      "status": "Pending"
    },
    "points_earned": 12
  }
  ```

### Get Customer Orders
- **Endpoint**: `GET /api/orders` (requires JWT)
- **Response**: Array of orders with details

## Rewards

### Get Rewards
- **Endpoint**: `GET /api/rewards` (requires JWT)
- **Response**:
  ```json
  {
    "reward_points": 100,
    "transactions": [
      {
        "points_earned": 50,
        "points_redeemed": 0,
        "description": "Points earned from Order #1"
      }
    ],
    "transactions_count": 1
  }
  ```

### Redeem Points
- **Endpoint**: `POST /api/rewards/redeem` (requires JWT)
- **Request Body**:
  ```json
  {
    "points": 100
  }
  ```
- **Response**:
  ```json
  {
    "message": "Points redeemed successfully",
    "points_redeemed": 100,
    "discount_amount": 100,
    "remaining_points": 0
  }
  ```
- **Note**: 1 point = 1 PKR discount

## Reviews

### Create Review
- **Endpoint**: `POST /api/reviews` (requires JWT)
- **Request Body**:
  ```json
  {
    "product_id": 1,
    "rating": 5,
    "comment": "Great coffee!"
  }
  ```
- **Rating**: Must be between 1 and 5

### Get Product Reviews
- **Endpoint**: `GET /api/reviews/product/<product_id>`
- **Response**:
  ```json
  {
    "product_id": 1,
    "product_name": "Mocha Latte",
    "reviews": [
      {
        "review_id": 1,
        "customer_name": "John Doe",
        "rating": 5,
        "comment": "Great coffee!",
        "review_date": "2025-01-01T00:00:00"
      }
    ],
    "count": 1,
    "average_rating": 5.0
  }
  ```

## Error Handling

The frontend automatically handles:
- **401 Unauthorized**: Clears token and redirects to login
- **Network Errors**: Shows user-friendly error messages
- **Validation Errors**: Displays backend error messages

## Data Mapping

### User Object
- Backend: `customer_id`, `name`, `email`, `phone`, `address`, `reward_points`
- Frontend: Same structure (mapped in AuthContext)

### Product Object
- Backend: `product_id`, `name`, `description`, `price`, `image_url`, `stock_quantity`
- Frontend: Same structure (mapped in menu page)

### Order Object
- Backend: `order_id`, `customer_id`, `total_amount`, `status`, `order_date`
- Frontend: Uses `order_id` for display

## Testing the Integration

1. **Start Backend**:
   ```bash
   cd backend
   python run.py
   ```

2. **Start Frontend**:
   ```bash
   cd frontend-nextjs
   npm run dev
   ```

3. **Test Flow**:
   - Register a new user
   - Login with credentials
   - Browse products (should load from API)
   - Add items to cart
   - Place an order (should create in backend)
   - Check rewards (should show points earned)
   - Redeem points

## Troubleshooting

### CORS Errors
- Ensure Flask CORS is configured for `http://localhost:3000`
- Check `backend/app/__init__.py` CORS settings

### Authentication Issues
- Verify JWT token is being sent in Authorization header
- Check token expiration
- Ensure backend JWT_SECRET_KEY is set

### API Connection
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check backend is running on correct port
- Test API endpoints directly with Postman/curl

### Data Format Mismatches
- Check browser console for API response structure
- Verify backend model `to_dict()` methods match frontend expectations

