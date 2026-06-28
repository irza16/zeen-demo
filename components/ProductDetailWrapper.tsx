'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import OrderForm from '@/components/OrderForm';

interface ProductDetailWrapperProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetailWrapper({
  product,
}: ProductDetailWrapperProps) {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const isSale = product.original_price !== null;

  return (
    <>
      {/* Product Detail */}
      <section className="flex-1">
        <div className="container-tight py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
            {/* Product Image */}
            <div>
              {product.image_url ? (
                <div className="aspect-3-4 w-full relative overflow-hidden bg-surface">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    loading="eager"
                    fetchPriority="high"
                    width={600}
                    height={800}
                    decoding="async"
                    onError={(e) => {
                      // fallback to background color if image fails
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />

                  {product.badge && (
                    <div className="absolute top-6 left-6 bg-foreground text-background px-4 py-2 text-sm font-medium">
                      {product.badge}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className={`${product.bg_color} aspect-3-4 w-full flex items-center justify-center relative`}
                  aria-label={`${product.name} product image`}
                >
                  <p className="text-center font-cormorant italic text-foreground/60 text-2xl md:text-3xl px-4">
                    {product.name}
                  </p>

                  {product.badge && (
                    <div className="absolute top-6 left-6 bg-foreground text-background px-4 py-2 text-sm font-medium">
                      {product.badge}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <p className="text-xs md:text-sm text-accent uppercase tracking-widest mb-4">
                {product.category}
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  PKR {product.price.toLocaleString()}
                </span>
                {isSale && (
                  <span className="text-lg md:text-xl text-muted line-through">
                    PKR {product.original_price?.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-base md:text-lg text-muted mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-4 text-foreground">Available Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div
                      key={size}
                      className="border border-border bg-surface px-4 py-2 text-sm"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setIsOrderFormOpen(true)}
                className="btn-primary w-full md:w-fit text-center mb-8"
              >
                Order Now
              </button>

              {/* Info */}
              <div className="space-y-3 border-t border-border pt-8">
                <div className="flex gap-4">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <p className="font-medium text-foreground">Fast Delivery</p>
                    <p className="text-sm text-muted">Across Pakistan</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">↩️</span>
                  <div>
                    <p className="font-medium text-foreground">14-Day Returns</p>
                    <p className="text-sm text-muted">Hassle-free exchange</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp Support</p>
                    <p className="text-sm text-muted">Within 2 hours confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Modal */}
      <OrderForm
        product={product}
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />
    </>
  );
}
