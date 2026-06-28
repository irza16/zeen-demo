import Navbar from '@/components/Navbar';
import ProductDetailWrapper from '@/components/ProductDetailWrapper';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import { getProductBySlug, getProducts } from '@/lib/queries';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts(product.category);
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <ProductDetailWrapper product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductGrid products={relatedProducts} title="Related Products" />
      )}

      <Footer />
    </main>
  );
}
