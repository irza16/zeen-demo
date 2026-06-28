'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import OrderForm from './OrderForm';

interface ProductCardProps {
  product: Product;
  eager?: boolean;
}

export default function ProductCard({ product, eager = false }: ProductCardProps) {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const isSale = product.original_price !== null;

  const handleAddToBag = (e: React.MouseEvent) => {
    // Prevent Link navigation when clicking the button
    e.stopPropagation();
    e.preventDefault();
    setIsOrderFormOpen(true);
  };

  return (
    <>
      <Link href={`/products/${product.slug}`} className="block">
        <article className="flex flex-col h-full">
          {/* Product Image */}
          <div className="relative group mb-4">
            {product.image_url && !showFallback ? (
              <div className="aspect-3-4 w-full relative overflow-hidden bg-surface">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover w-full h-full"
                  loading={eager ? 'eager' : 'lazy'}
                  fetchPriority={eager ? 'high' : undefined}
                  width={600}
                  height={800}
                  decoding="async"
                  onError={() => setShowFallback(true)}
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-foreground text-background px-3 py-1 text-xs font-medium">
                    {product.badge}
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={handleAddToBag}
                    className="btn-primary text-sm md:text-base"
                    aria-label={`Add ${product.name} to bag`}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`${product.bg_color} aspect-3-4 w-full flex items-center justify-center relative overflow-hidden`}
                aria-label={`${product.name} product image`}
              >
                <p className="text-center font-cormorant italic text-foreground/60 text-lg md:text-xl px-4">
                  {product.name}
                </p>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-foreground text-background px-3 py-1 text-xs font-medium">
                    {product.badge}
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-foreground/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={handleAddToBag}
                    className="btn-primary text-sm md:text-base"
                    aria-label={`Add ${product.name} to bag`}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h3 className="font-cormorant text-lg md:text-xl mb-2 text-foreground">
              {product.name}
            </h3>

            <p className="text-xs md:text-sm text-muted mb-3">
              {product.category} · {product.sizes?.join(', ')}
            </p>

            <div className="flex items-center gap-2">
              <span className={`text-base md:text-lg font-semibold text-foreground`}>
                PKR {product.price.toLocaleString()}
              </span>
              {isSale && (
                <span className="text-xs md:text-sm text-muted line-through">
                  PKR {product.original_price?.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>

      {/* Order Form Modal */}
      <OrderForm
        product={product}
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />
    </>
  );
}
