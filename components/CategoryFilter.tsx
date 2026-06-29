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
      return;
    }

    router.push(`/products?category=${category}`);
  };

  return (
    <div className="sticky top-[7rem] z-40 border-b border-border bg-cream/95 backdrop-blur-xl">
      <div className="container-page overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-2">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? 'bg-rose text-white shadow-[0_12px_24px_rgba(201,133,106,0.22)]'
                    : 'border border-border bg-white/70 text-muted hover:text-ink'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
