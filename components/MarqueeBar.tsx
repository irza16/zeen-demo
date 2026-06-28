'use client';

export default function MarqueeBar() {
  const messages = [
    '✓ Free Shipping on Orders Over PKR 5,000',
    '✓ 14-Day Returns on All Items',
    '✓ Secure Payment Options',
    '✓ WhatsApp Support',
  ];

  return (
    <div className="bg-foreground text-surface overflow-hidden py-3 md:py-4">
      <div className="flex animate-scroll gap-8 md:gap-12 whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-8 md:gap-12">
            {messages.map((msg, idx) => (
              <span key={idx} className="text-xs md:text-sm font-medium inline-block">
                {msg}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
