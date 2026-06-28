export default function Footer() {
  return (
    <footer className="bg-foreground text-surface border-t border-border">
      <div className="container-tight py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 font-cormorant tracking-wide">
              Zeen
            </h3>
            <p className="text-sm text-surface/70">
              Luxury Pakistani women's clothing crafted with heritage and contemporary style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products?category=Festive" className="hover:text-accent transition-colors">
                  Festive
                </a>
              </li>
              <li>
                <a href="/products?category=Lawn" className="hover:text-accent transition-colors">
                  Lawn
                </a>
              </li>
              <li>
                <a href="/products?category=Formal" className="hover:text-accent transition-colors">
                  Formal
                </a>
              </li>
              <li>
                <a href="/products?category=Basics" className="hover:text-accent transition-colors">
                  Basics
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Care Instructions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-surface/10 pt-8">
          <p className="text-xs text-surface/50 text-center">
            © 2025 Zeen.pk. All rights reserved. Handcrafted for Pakistani women
            everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
