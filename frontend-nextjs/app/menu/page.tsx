'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { productsAPI } from '@/lib/api';

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category_id?: number;
  stock_quantity?: number;
}

export default function MenuPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      // Normalize image URLs - ensure they start with /images/
      const products = (response.products || []).map((product: Product) => {
        let imageUrl = product.image_url || '/images/mocha.jpg';
        // If image_url doesn't start with /, add /images/ prefix
        if (imageUrl && !imageUrl.startsWith('/')) {
          imageUrl = imageUrl.startsWith('images/') ? `/${imageUrl}` : `/images/${imageUrl}`;
        }
        return {
          ...product,
          image_url: imageUrl
        };
      });
      setProducts(products.length > 0 ? products : getDefaultProducts());
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to hardcoded products if API fails
      setProducts(getDefaultProducts());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultProducts = (): Product[] => {
    return [
      { product_id: 1, name: 'Mocha Latte', description: 'Rich chocolate coffee blend.', price: 550, image_url: '/images/mocha.jpg' },
      { product_id: 2, name: 'Espresso', description: 'Strong and bold coffee shot.', price: 700, image_url: '/images/espresso.jpg' },
      { product_id: 3, name: 'Cappuccino', description: 'Espresso with steamed milk and foam.', price: 600, image_url: '/images/cappuccino.jpg' },
      { product_id: 4, name: 'Caramel Iced Latte', description: 'Chilled espresso with caramel and milk.', price: 650, image_url: '/images/caramelicedlatte.jpg' },
      { product_id: 5, name: 'Vanilla Frappe', description: 'Blended coffee with vanilla and cream.', price: 700, image_url: '/images/vanillafrappe.jpg' },
      { product_id: 6, name: 'Salted Caramel Frappe', description: 'Blended coffee with salted caramel and cream.', price: 750, image_url: '/images/saltedcaramelfrappe.jpg' },
      { product_id: 7, name: 'Chocolate Shake', description: 'Creamy shake with rich chocolate flavor.', price: 500, image_url: '/images/chocolateshake.jpg' },
      { product_id: 8, name: 'Matcha', description: 'Delicious and soulful Matcha.', price: 500, image_url: '/images/matcha.jpg' },
    ];
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.product_id,
      name: product.name,
      price: product.price,
      image: product.image_url || '/images/mocha.jpg',
    });

    // Show feedback
    setAddedItems(new Set([...addedItems, product.name]));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.name);
        return newSet;
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="menu-header text-center mb-5">
        <h2 className="menu-title">Our Menu</h2>
        <div className="menu-underline"></div>
        <p className="menu-subtext mt-3">
          Discover our handcrafted blends and signature brews, made with love
          and a hint of magic.
        </p>
      </div>

      <div className="row">
        {products.map((product) => (
          <div key={product.product_id} className="col-md-3 mb-4">
            <div className="card shadow-sm">
              <img
                src={product.image_url || '/images/mocha.jpg'}
                alt={product.name}
                className="card-img-top"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="fw-bold">{product.price} PKR</p>
                <button
                  className={`btn ${
                    addedItems.has(product.name)
                      ? 'btn-success'
                      : 'btn-primary'
                  }`}
                  onClick={() => handleAddToCart(product)}
                >
                  {addedItems.has(product.name) ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

