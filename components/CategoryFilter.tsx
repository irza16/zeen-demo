'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = ['All', 'Festive', 'Lawn', 'Formal', 'Basics', 'Sale'];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      router.push('/products');
    } else {
      router.push(`/products?category=${category}`);
    }
  };

  return (
    <div className="bg-background border-b border-border sticky top-[80px] md:top-[100px] z-30 overflow-x-auto">
      <div className="container-tight flex gap-4 md:gap-8 py-4">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`text-sm md:text-base font-medium whitespace-nowrap pb-2 transition-colors border-b-2 ${
              activeCategory === category
                ? 'text-accent border-accent'
                : 'text-muted border-transparent hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
