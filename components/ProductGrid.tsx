import { cn } from '@/lib/utils';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import SectionReveal from './SectionReveal';

interface ProductGridProps {
  products: Product[];
  title?: string;
  badge?: string;
  subtitle?: string;
  className?: string;
}

export default function ProductGrid({
  products,
  title = 'New Arrivals',
  badge,
  subtitle,
  className,
}: ProductGridProps) {
  return (
    <SectionReveal className={cn('section-shell', className)}>
      <div className="container-page">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="pill-soft mb-4 border-rose/25 bg-blush/70 text-rose">
              This Week
            </p>
            <h2 className="section-heading">{title}</h2>
            {subtitle && <p className="section-subtitle mt-3 max-w-2xl">{subtitle}</p>}
          </div>

          {badge ? (
            <span className="pill-soft hidden border-rose/20 bg-white/70 text-rose sm:inline-flex">
              {badge}
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              eager={index < 2}
              stockCount={[3, 5, 2, 4, 3, 2][index % 6]}
              className={index === 0 ? 'lg:col-span-2' : undefined}
            />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
