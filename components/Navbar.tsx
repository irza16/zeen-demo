export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="container-tight flex items-center justify-between py-4 md:py-6">
        {/* Logo */}
        <a href="/" className="text-2xl md:text-3xl font-bold text-foreground font-cormorant tracking-wider">
          Zeen
        </a>

        {/* Nav Links - Hidden on mobile */}
        <div className="hidden md:flex gap-8 items-center">
          <a href="/products" className="text-sm font-medium transition-colors hover:text-accent">
            Shop
          </a>
          <a href="#" className="text-sm font-medium transition-colors hover:text-accent">
            About
          </a>
          <a href="#" className="text-sm font-medium transition-colors hover:text-accent">
            Contact
          </a>
        </div>

        {/* Bag Icon */}
        <button
          aria-label="Shopping bag"
          className="p-2 hover:bg-surface rounded-sm transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
