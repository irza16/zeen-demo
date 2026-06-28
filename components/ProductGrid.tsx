import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title = 'New Arrivals' }: ProductGridProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container-tight">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} eager={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
