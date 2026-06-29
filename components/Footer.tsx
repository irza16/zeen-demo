import Link from 'next/link';
import { Camera, MessageCircle } from 'lucide-react';

const columns = [
  {
    title: 'Shop',
    links: [
      ['New In', '/products'],
      ['Drops', '/products?category=All'],
      ['Festive', '/products?category=Festive'],
    ],
  },
  {
    title: 'Help',
    links: [
      ['Shipping', '#'],
      ['Returns', '#'],
      ['Size Guide', '#'],
    ],
  },
  {
    title: 'Contact',
    links: [
      ['Instagram', 'https://instagram.com/aescopk'],
      ['WhatsApp', '#'],
      ['Karachi, Pakistan', '#'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#f9f1e9]">
      <div className="container-page section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="font-display text-3xl italic text-ink">
              Aesco.pk
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Dreamy traditional and fusion Pakistani clothing for girls who want
              editorial, feminine, and modern dressing in one place.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com/aescopk"
                target="_blank"
                rel="noreferrer"
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-ink"
                aria-label="Instagram"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-ink"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-display text-lg text-ink">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      {href.startsWith('http') ? (
                        <a href={href} target="_blank" rel="noreferrer" className="hover:text-ink">
                          {label}
                        </a>
                      ) : href.startsWith('#') ? (
                        <a href={href} className="hover:text-ink">
                          {label}
                        </a>
                      ) : (
                        <Link href={href} className="hover:text-ink">
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted">
          Built with ❤️ in Karachi 🇵🇰
        </div>
      </div>
    </footer>
  );
}
