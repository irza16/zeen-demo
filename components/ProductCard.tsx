'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/lib/types';
import { getProductImageUrl } from '@/lib/product-images';
import OrderForm from './OrderForm';

interface ProductCardProps {
  product: Product;
  eager?: boolean;
  stockCount?: number;
  className?: string;
}

export default function ProductCard({
  product,
  eager = false,
  stockCount = 3,
  className,
}: ProductCardProps) {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const badgeLabel = !product.in_stock ? 'Sold Out' : product.badge === 'New' ? 'New' : 'Drop';

  const openOrderForm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOrderFormOpen(true);
  };

  return (
    <>
      <Link href={`/products/${product.slug}`} className={`group block ${className ?? ''}`}>
        <article className="card-soft flex h-full flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.03]">
          <div className="relative aspect-[3/4] overflow-hidden bg-blush/40">
            {getProductImageUrl(product) ? (
              <img
                src={getProductImageUrl(product)}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading={eager ? 'eager' : 'lazy'}
                fetchPriority={eager ? 'high' : undefined}
                width={600}
                height={800}
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div
                className={`${product.bg_color} flex h-full w-full items-center justify-center px-4`}
                aria-label={`${product.name} product image`}
              >
                <p className="font-display text-center text-2xl italic text-ink/60">
                  {product.name}
                </p>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-ink shadow-sm">
              {badgeLabel}
            </div>

            <div className="absolute inset-x-3 bottom-3 translate-y-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={openOrderForm}
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-full bg-rose px-4 py-3 text-sm font-medium text-white shadow-[0_14px_28px_rgba(201,133,106,0.28)]"
                aria-label={`Quick order ${product.name}`}
              >
                Quick Order <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 px-4 py-4">
            <div className="space-y-1">
              <h3 className="font-display text-xl italic leading-tight text-ink">
                {product.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">
                {product.category}
              </p>
            </div>

            <div className="mt-auto flex items-end justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-ink">
                  PKR {product.price.toLocaleString()}
                </p>
                <p className="text-sm text-rose">🔥 {product.in_stock ? stockCount : 0} left</p>
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-muted">
                View
              </span>
            </div>
          </div>
        </article>
      </Link>

      <OrderForm
        product={product}
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />
    </>
  );
}
