# Quick Reference Guide

## 🚀 Getting Started

### Running the Backend
```bash
cd backend
python run.py
# Server runs on http://localhost:5000
```

### Running the Frontend
```bash
cd frontend-nextjs
npm install
npm run dev
# App runs on http://localhost:3000
```

---

## 📁 Project Structure

### Backend
```
backend/
├── app/
│   ├── __init__.py       # App setup & configuration
│   ├── models.py         # Database models (tables)
│   └── routes/           # API endpoints
│       ├── auth.py       # /api/auth/*
│       ├── products.py   # /api/products/*
│       ├── orders.py     # /api/orders/*
│       ├── reviews.py    # /api/reviews/*
│       ├── rewards.py    # /api/rewards/*
│       └── admin.py      # /api/admin/*
├── run.py                # Start server
├── init_db.py           # Database initialization
├── setup_database.py     # Database setup
└── requirements.txt      # Python packages
```

### Frontend
```
frontend-nextjs/
├── app/                  # Pages (routes)
│   ├── page.tsx         # Homepage (/)
│   ├── login/           # /login
│   ├── signup/           # /signup
│   ├── menu/            # /menu
│   ├── cart/            # /cart
│   ├── checkout/        # /checkout
│   ├── reviews/         # /reviews
│   ├── rewards/         # /rewards
│   └── contact/         # /contact
├── components/          # Reusable UI components
├── context/             # Global state (Auth, Cart)
├── lib/
│   └── api.ts           # Backend API client
├── styles/              # CSS files
└── public/              # Static assets (images)
```

---

## 🔑 Key Concepts

### Backend (Flask)

**Route Definition:**
```python
@blueprint.route('/endpoint', methods=['POST'])
@jwt_required()  # Requires authentication
def function_name():
    data = request.get_json()  # Get request data
    # Process data
    return jsonify({'result': 'success'}), 200
```

**Database Query:**
```python
# Get all
products = Product.query.all()

# Get one
product = Product.query.get(id)

# Filter
products = Product.query.filter_by(category_id=1).all()

# Create
new_product = Product(name='Coffee', price=100)
db.session.add(new_product)
db.session.commit()
```

**JWT Authentication:**
```python
from flask_jwt_extended import jwt_required, get_jwt_identity

@jwt_required()
def protected_route():
    user_id = get_jwt_identity()  # Get user ID from token
```

### Frontend (Next.js/React)

**Component:**
```tsx
export default function MyComponent() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Runs after render
  }, [dependencies]);
  
  return <div>Content</div>;
}
```

**Using Context:**
```tsx
const { user, login } = useAuth();
const { items, addItem } = useCart();
```

**API Call:**
```tsx
import { authAPI } from '@/lib/api';

const response = await authAPI.login(email, password);
```

**Navigation:**
```tsx
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/menu');
```

---

## 🔄 Common Patterns

### 1. Create New Endpoint

**Backend:**
```python
# In routes/your_route.py
@your_bp.route('/new-endpoint', methods=['POST'])
@jwt_required()
def new_function():
    data = request.get_json()
    # Process
    return jsonify({'result': 'ok'}), 201
```

**Frontend:**
```tsx
// In lib/api.ts
export const yourAPI = {
  call: async (data) => {
    const response = await api.post('/your-route/new-endpoint', data);
    return response.data;
  }
};
```

### 2. Form Handling

```tsx
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await api.post('/endpoint', formData);
};
```

### 3. Error Handling

```tsx
try {
  const response = await api.post('/endpoint', data);
} catch (error) {
  if (error.response) {
    // Server error
    console.error(error.response.data.error);
  } else {
    // Network error
    console.error('Network error');
  }
}
```

### 4. Loading States

```tsx
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await api.post('/endpoint', data);
  } finally {
    setLoading(false);
  }
};

return <button disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>;
```

---

## 📊 Database Models

### Customer
- `customer_id` (Primary Key, Auto Increment)
- `name`, `email`, `password` (Required)
- `phone`, `address` (Optional)
- `reward_points` (Default: 0)
- Relationships: orders, reviews, reward_transactions

### Category
- `category_id` (Primary Key, Auto Increment)
- `category_name` (Unique, Required)
- Relationship: products

### Product
- `product_id` (Primary Key, Auto Increment)
- `name`, `description`, `price` (Required)
- `stock_quantity` (Default: 0)
- `image_url`
- `category_id` (Foreign Key → Category)
- Relationships: order_details, reviews

### Orders
- `order_id` (Primary Key, Auto Increment)
- `customer_id` (Foreign Key → Customer, Required)
- `total_amount` (Required)
- `status` (Enum: 'Pending', 'Completed', 'Cancelled')
- `order_date` (Default: current timestamp)
- Relationships: order_details, payment

### OrderDetails
- `order_detail_id` (Primary Key, Auto Increment)
- `order_id` (Foreign Key → Orders, Required)
- `product_id` (Foreign Key → Product, Required)
- `quantity` (Required)
- `subtotal` (Required)

### Payment
- `payment_id` (Primary Key, Auto Increment)
- `order_id` (Foreign Key → Orders, Unique, Required)
- `payment_method` (Enum: 'CreditCard', 'Cash', 'Online')
- `amount` (Required)
- `status` (Enum: 'Paid', 'Pending', 'Refunded')
- `payment_date` (Default: current timestamp)

### Review
- `review_id` (Primary Key, Auto Increment)
- `customer_id` (Foreign Key → Customer, Required)
- `product_id` (Foreign Key → Product, Required)
- `rating` (Required, 1-5)
- `comment` (Optional)
- `review_date` (Default: current timestamp)

### RewardTransaction
- `reward_id` (Primary Key, Auto Increment)
- `customer_id` (Foreign Key → Customer, Required)
- `points_earned` (Default: 0)
- `points_redeemed` (Default: 0)
- `transaction_date` (Default: current timestamp)
- `description` (Optional)

### Admin
- `admin_id` (Primary Key, Auto Increment)
- `username` (Unique, Required)
- `password` (Required)
- `role` (Enum: 'Manager', 'Staff')

---

## 🌐 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
  - Body: `{ name, email, password, phone?, address? }`
- `POST /login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ access_token, customer }`
- `GET /profile` - Get user profile (requires auth)
- `PUT /profile` - Update profile (requires auth)
  - Body: `{ name?, phone?, address? }`
- `POST /change-password` - Change password (requires auth)
  - Body: `{ old_password, new_password }`

### Products (`/api/products`)
- `GET /` - Get all products (with optional filters)
  - Query params: `category_id?, search?, min_price?, max_price?`
- `GET /:id` - Get single product by ID
- `GET /categories` - Get all categories
- `GET /category/:id` - Get products by category
- `GET /featured` - Get featured products (top 8)

### Orders (`/api/orders`)
- `POST /` - Create order (requires auth)
  - Body: `{ items: [{product_id, quantity, price}], payment_method, delivery_fee?, points_to_redeem? }`
  - Returns: `{ order, points_earned, points_redeemed, discount_amount }`
- `GET /` - Get user's orders (requires auth)
- `GET /:id` - Get order details (requires auth)
- `PUT /:id/cancel` - Cancel order (requires auth, only if status is 'Pending')

### Reviews (`/api/reviews`)
- `GET /` - Get all reviews
- `POST /` - Create review (requires auth)
  - Body: `{ product_id, rating (1-5), comment? }`
- `GET /product/:id` - Get reviews for specific product
  - Returns: `{ reviews, count, average_rating }`
- `GET /customer` - Get user's reviews (requires auth)
- `PUT /:id` - Update review (requires auth, only own reviews)
  - Body: `{ rating?, comment? }`
- `DELETE /:id` - Delete review (requires auth, only own reviews)

### Rewards (`/api/rewards`)
- `GET /` - Get user's rewards and transaction history (requires auth)
  - Returns: `{ reward_points, transactions, transactions_count }`
- `POST /redeem` - Redeem points for discount (requires auth)
  - Body: `{ points }`
  - Returns: `{ points_redeemed, discount_amount, remaining_points }`

### Admin (`/api/admin`)
- `POST /login` - Admin login
- `POST /products` - Create product (requires admin auth)
- `PUT /products/:id` - Update product (requires admin auth)
- `DELETE /products/:id` - Delete product (requires admin auth)
- `POST /categories` - Create category (requires admin auth)
- `GET /orders` - Get all orders (requires admin auth)
- `PUT /orders/:id/status` - Update order status (requires admin auth)
- `GET /reports/sales` - Get sales reports (requires admin auth)
- `GET /customers` - Get all customers (requires admin auth)
- `GET /reviews` - Get all reviews (requires admin auth)
- `DELETE /reviews/:id` - Delete any review (requires admin auth)

---

## 🔐 Authentication Flow

1. **Register/Login** → Backend returns JWT token
2. **Store Token** → `localStorage.setItem('token', token)`
3. **Add to Requests** → `Authorization: Bearer <token>` header
4. **Backend Validates** → `@jwt_required()` decorator
5. **Get User ID** → `get_jwt_identity()`

---

## 🛒 Cart Flow

1. **Add Item** → `addItem(product)` → Updates state
2. **Persist** → Saves to `localStorage`
3. **Checkout** → Sends items to backend
4. **Clear** → `clearCart()` after successful order

---

## 📝 Common Tasks

### Add New Field to Model
```python
# models.py
class Customer(db.Model):
    new_field = db.Column(db.String(100))
```

### Add New Route
```python
# routes/your_route.py
@your_bp.route('/new', methods=['GET'])
def new_route():
    return jsonify({'data': 'value'})
```

### Add New Page
```tsx
// app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page</div>;
}
```

### Add New Component
```tsx
// components/NewComponent.tsx
export default function NewComponent() {
  return <div>Component</div>;
}
```

---

## 🐛 Debugging Tips

### Backend
```python
# Print request data
print("Request data:", request.get_json())

# Print database query
print("Products:", products)

# Check database
# Use MySQL client or Flask shell
```

### Frontend
```tsx
// Console logs
console.log('State:', state);
console.log('API Response:', response);

// React DevTools
// Install browser extension

// Network tab
// Check API requests in browser DevTools
```

---

## ⚠️ Common Errors

### CORS Error
**Problem**: Frontend can't connect to backend
**Solution**: Check CORS configuration in `__init__.py`

### 401 Unauthorized
**Problem**: Token missing or expired
**Solution**: Check if token is in localStorage, try logging in again

### 404 Not Found
**Problem**: Route doesn't exist
**Solution**: Check route path and HTTP method

### Database Error
**Problem**: Can't connect to database
**Solution**: Check `.env` file, database credentials, MySQL running

---

## 📚 File Locations

| Task | File Location |
|------|---------------|
| Add database model | `backend/app/models.py` |
| Add API endpoint | `backend/app/routes/*.py` |
| Configure app | `backend/app/__init__.py` |
| Add page | `frontend-nextjs/app/*/page.tsx` |
| Add component | `frontend-nextjs/components/*.tsx` |
| Add API function | `frontend-nextjs/lib/api.ts` |
| Global state | `frontend-nextjs/context/*.tsx` |
| Styles | `frontend-nextjs/styles/*.css` |

---

## 🎯 Quick Commands

```bash
# Backend
python run.py                    # Start server
flask db migrate -m "message"    # Create migration
flask db upgrade                 # Apply migrations

# Frontend
npm run dev                      # Start dev server
npm run build                    # Build for production
npm run start                    # Start production server
```

---

*Keep this guide handy while coding!*


