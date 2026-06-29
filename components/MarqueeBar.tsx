export default function MarqueeBar() {
  const messages = [
    'Free Shipping on Preorders 💗',
    'New Drop Every Friday ✨',
    'Limited Pieces Only 🌸',
    'Easy Exchange',
    'Made in Pakistan 🇵🇰',
  ];

  return (
    <div className="overflow-hidden border-y border-border bg-blush/75 py-3 text-rose">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap px-4">
        {[...messages, ...messages].map((message, index) => (
          <span
            key={`${message}-${index}`}
            className="text-xs font-medium uppercase tracking-[0.28em] sm:text-sm"
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
