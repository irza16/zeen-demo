import { Camera } from 'lucide-react';
import SectionReveal from './SectionReveal';

const posts = [
  '/images/gram-1.jpg',
  '/images/gram-2.jpg',
  '/images/gram-3.jpg',
  '/images/gram-4.jpg',
  '/images/gram-5.jpg',
  '/images/gram-6.jpg',
];

export default function InstagramFeed() {
  return (
    <SectionReveal className="section-shell">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="pill-soft mb-4 border-rose/30 bg-blush/70 text-rose">
            Social Feed
          </p>
          <h2 className="section-heading">Shop Our Feed</h2>
          <p className="section-subtitle mt-4">
            Editorial looks, festive edits, and everyday fusion fits.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {posts.map((seed, index) => (
            <a
              key={seed}
              href="https://instagram.com/aescopk"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-[16px] border border-border bg-white shadow-[0_14px_36px_rgba(28,20,16,0.08)]"
            >
              <img
                src={seed}
                alt={`Instagram post ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-white/90 p-3 text-ink shadow-lg">
                  <Camera className="h-5 w-5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://instagram.com/aescopk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white px-5 py-3 text-sm font-medium text-ink shadow-[0_12px_28px_rgba(28,20,16,0.08)] transition-transform duration-300 hover:scale-[1.03]"
          >
            Follow @aescopk <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}
