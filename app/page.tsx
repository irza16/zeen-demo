import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeBar from '@/components/MarqueeBar';
import ProductGrid from '@/components/ProductGrid';
import TrustStrip from '@/components/TrustStrip';
import Footer from '@/components/Footer';
import { getProducts } from '@/lib/queries';
import { Suspense } from 'react';

async function FeaturedProducts() {
  try {
    const products = await getProducts();
    return <ProductGrid products={products.slice(0, 8)} title="New Arrivals" />;
  } catch (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted">Unable to load products. Please try again later.</p>
      </div>
    );
  }
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <MarqueeBar />
      <Suspense fallback={<div className="py-12 text-center">Loading products...</div>}>
        <FeaturedProducts />
      </Suspense>
      <TrustStrip />
      <Footer />
    </main>
  );
}
