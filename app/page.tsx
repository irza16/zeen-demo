import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeBar from '@/components/MarqueeBar';
import ProductGrid from '@/components/ProductGrid';
import TrustStrip from '@/components/TrustStrip';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import InstagramFeed from '@/components/InstagramFeed';
import SectionReveal from '@/components/SectionReveal';
import Link from 'next/link';
import { getProducts } from '@/lib/queries';
import { Suspense } from 'react';

async function FeaturedProducts() {
  let products = [];

  try {
    products = await getProducts();
  } catch {
    return (
      <div className="container-page py-16 text-center text-muted">
        Unable to load products. Please try again later.
      </div>
    );
  }

  return (
    <ProductGrid
      products={products.slice(0, 6)}
      title="This Week's Drop"
      badge="Live Now 🔴"
      subtitle="A curated edit of soft, feminine pieces with a dreamy Pakistani Gen-Z mood."
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <MarqueeBar />

      <SectionReveal className="section-shell">
        <div className="container-page text-center">
          <p className="pill-soft mb-4 border-rose/25 bg-blush/70 text-rose">
            The Drop Ends Soon
          </p>
          <h2 className="section-heading">Don&apos;t Miss This Drop 🎀</h2>
          <p className="section-subtitle mx-auto mt-4 max-w-2xl">
            Limited pieces. Once sold out, they don&apos;t come back.
          </p>
          <div className="mt-10">
            <CountdownTimer />
          </div>
          <div className="mt-10">
            <Link
              href="/products"
              className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_32px_rgba(201,133,106,0.28)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Shop the Drop
            </Link>
          </div>
        </div>
      </SectionReveal>

      <Suspense fallback={<div className="container-page py-16 text-center text-muted">Loading products...</div>}>
        <FeaturedProducts />
      </Suspense>

      <TrustStrip />
      <InstagramFeed />
      <Footer />
    </main>
  );
}
