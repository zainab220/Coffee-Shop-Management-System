'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();

  const subtotal = getTotalPrice();
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      alert('Cart cleared successfully!');
    }
  };

  return (
    <>
      <header className="cart-header text-center py-5">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-subtitle">Review your selections before checkout</p>
      </header>

      <section className="container my-5">
        <div className="row">
          <div className="col-lg-8">
            {items.length === 0 ? (
              <div className="cart-section">
                <div className="cart-box text-center p-5">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
                    alt="Empty Cart"
                    width={120}
                    className="mb-3 opacity-75"
                  />
                  <p className="cart-empty-text mb-4">
                    Your cart is currently empty.
                  </p>
                  <button
                    className="btn btn-coffee"
                    onClick={() => router.push('/menu')}
                  >
                    Browse Menu
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {items.map((item) => (
                  <div key={item.name} className="card shadow-sm mb-3 p-3">
                    <div className="row align-items-center">
                      <div className="col-md-2 col-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="card-img-top"
                          style={{
                            height: '80px',
                            width: '80px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                          }}
                        />
                      </div>
                      <div className="col-md-4 col-9">
                        <h5 className="card-title mb-1">{item.name}</h5>
                        <p className="text-muted mb-0">{item.price} PKR</p>
                      </div>
                      <div className="col-md-3 col-6 mt-3 mt-md-0">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              updateQuantity(item.name, item.quantity - 1)
                            }
                            style={{
                              width: '35px',
                              height: '35px',
                              padding: 0,
                            }}
                          >
                            -
                          </button>
                          <span className="fw-bold">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              updateQuantity(item.name, item.quantity + 1)
                            }
                            style={{
                              width: '35px',
                              height: '35px',
                              padding: 0,
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2 col-4 mt-3 mt-md-0 text-end">
                        <strong>{item.price * item.quantity} PKR</strong>
                      </div>
                      <div className="col-md-1 col-2 mt-3 mt-md-0 text-end">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => {
                            if (confirm('Remove this item from cart?')) {
                              removeItem(item.name);
                            }
                          }}
                          style={{ fontSize: '1.2rem', padding: '2px 10px' }}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="col-lg-4">
              <div className="card shadow-sm p-4 position-sticky" style={{ top: '100px' }}>
                <h4 className="mb-4">Order Summary</h4>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{subtotal} PKR</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee</span>
                  <span>150 PKR</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong style={{ color: '#d1a679' }}>{total} PKR</strong>
                </div>
                <button
                  className="btn btn-primary w-100 mb-2"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

