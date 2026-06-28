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
  try {
    const products = await getProducts(category);

    if (products.length === 0) {
      return (
        <div className="py-24 text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            No products found
          </h2>
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
  } catch (error) {
    return (
      <div className="py-24 text-center">
        <p className="text-muted">Unable to load products. Please try again later.</p>
      </div>
    );
  }
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
