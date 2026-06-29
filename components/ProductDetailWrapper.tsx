'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import OrderForm from '@/components/OrderForm';
import { getProductImageUrl } from '@/lib/product-images';

interface ProductDetailWrapperProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetailWrapper({
  product,
}: ProductDetailWrapperProps) {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const isSale = product.original_price !== null;
  const imageUrl = getProductImageUrl(product);

  return (
    <>
      <section className="section-shell">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
            <div className="relative">
              <div className="card-soft overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="aspect-[3/4] h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    width={900}
                    height={1200}
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div
                    className={`${product.bg_color} flex aspect-[3/4] items-center justify-center px-4`}
                    aria-label={`${product.name} product image`}
                  >
                    <p className="font-display text-center text-3xl italic text-ink/60">
                      {product.name}
                    </p>
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-ink shadow-sm">
                  {product.badge ?? 'Drop'}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="pill-soft w-fit border-rose/25 bg-blush/70 text-rose">
                {product.category}
              </p>

              <h1 className="mt-5 text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.92] text-ink">
                {product.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <span className="font-display text-3xl text-ink">
                  PKR {product.price.toLocaleString()}
                </span>
                {isSale && (
                  <span className="text-lg text-muted line-through">
                    PKR {product.original_price?.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="mt-6 max-w-xl text-base text-muted">{product.description}</p>

              <div className="mt-8">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-ink">
                  Available Sizes
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm text-ink"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setIsOrderFormOpen(true)}
                  className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_32px_rgba(201,133,106,0.28)]"
                >
                  Order Now
                </button>
                <div className="pill-soft border-rose/20 bg-white/80 text-muted">
                  WhatsApp confirmation within 2 hours
                </div>
              </div>

              <div className="mt-10 grid gap-3 border-t border-border pt-8 sm:grid-cols-3">
                {[
                  ['Fast Delivery', 'Across Pakistan'],
                  ['14-Day Returns', 'Easy exchange policy'],
                  ['Secure Checkout', 'COD, EasyPaisa & JazzCash'],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-[16px] border border-border bg-white/70 p-4">
                    <p className="font-medium text-ink">{title}</p>
                    <p className="mt-1 text-sm text-muted">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrderForm
        product={product}
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />
    </>
  );
}
