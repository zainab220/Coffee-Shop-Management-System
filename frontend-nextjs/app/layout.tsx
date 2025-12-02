import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Playfair_Display, Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
});
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'MochaMagic - Coffee Shop',
  description: 'Premium coffee shop with handcrafted blends and signature brews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} ${poppins.variable}`}>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main style={{ paddingTop: '80px' }}>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

