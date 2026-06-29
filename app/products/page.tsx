import Navbar from '@/components/Navbar';
import CategoryFilter from '@/components/CategoryFilter';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { getProducts } from '@/lib/queries';
import { Suspense } from 'react';

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

async function ProductsContent({ category }: { category?: string }) {
  let products = [];

  try {
    products = await getProducts(category);
  } catch {
    return (
      <div className="container-page py-24 text-center text-muted">
        Unable to load products. Please try again later.
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container-page py-24 text-center">
        <h2 className="mb-2 text-2xl font-semibold text-ink">No products found</h2>
        <p className="text-muted">Try a different category.</p>
      </div>
    );
  }

  const categoryName =
    category && category !== 'All'
      ? category === 'Sale'
        ? 'Sale Items'
        : category
      : 'All Products';

  return <ProductGrid products={products} title={categoryName} />;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <CategoryFilter />
      <Suspense fallback={<div className="py-24 text-center">Loading products...</div>}>
        <ProductsContent category={category} />
      </Suspense>
      <Footer />
    </main>
  );
}
