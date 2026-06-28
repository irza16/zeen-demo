import Link from 'next/link';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] md:min-h-[70vh]">
      {/* Left Column */}
      <div className="bg-surface flex items-center justify-center px-6 md:px-12 py-12 md:py-0">
        <div className="max-w-md">
          <p className="text-xs md:text-sm font-medium text-accent uppercase tracking-widest mb-4">
            Eid Collection 2025
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Dressed in{' '}
            <span className="italic font-cormorant text-accent">Heritage</span>
          </h1>
          <p className="text-sm md:text-base text-muted mb-8 leading-relaxed">
            Handcrafted embroidery meets contemporary silhouettes. Crafted for the
            women of Karachi — and everywhere.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="btn-primary text-center text-sm md:text-base">
              Shop the Edit
            </Link>
            <button className="btn-secondary text-sm md:text-base">
              View Lookbook
            </button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-accent relative overflow-hidden flex items-center justify-center px-6 md:px-12 py-12 md:py-0">
        {/* Diagonal Pattern */}
        <div className="absolute inset-0 pattern-diagonal" />

        <div className="relative z-10 text-center">
          <p className="font-cormorant text-3xl md:text-4xl italic text-surface/60 mb-8">
            Timeless elegance,
            <br />
            Contemporary grace
          </p>
          <div className="inline-block bg-surface/10 backdrop-blur-sm rounded-sm px-4 py-2 border border-surface/20">
            <p className="text-xs md:text-sm font-medium text-surface">
              PKR 4,500 onwards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
