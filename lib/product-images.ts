import { Product } from './types';

const FALLBACK_IMAGES: Record<Product['category'], string> = {
  Festive: '/images/product-festive.jpg',
  Lawn: '/images/product-lawn.jpg',
  Formal: '/images/product-formal.jpg',
  Basics: '/images/product-basics.jpg',
};

export function getProductImageUrl(product: Product): string {
  const url = product.image_url?.trim();

  if (url) {
    return url;
  }

  return FALLBACK_IMAGES[product.category];
}
