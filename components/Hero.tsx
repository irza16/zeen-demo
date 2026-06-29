import Link from 'next/link';
import Image from 'next/image';

const avatars = [
  'linear-gradient(135deg, #c9856a, #f2d9d0)',
  'linear-gradient(135deg, #e9c7d2, #c9856a)',
  'linear-gradient(135deg, #c8a96e, #fdf8f3)',
  'linear-gradient(135deg, #f2d9d0, #edddd4)',
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(90deg,#f2d9d0_0%,#fdf8f3_62%)]">
      <div className="container-page min-h-[calc(100dvh-6rem)] py-10 sm:py-14 lg:flex lg:items-center lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="relative z-10 max-w-2xl">
            <span className="pill-soft border-rose/25 bg-white/70 text-rose shadow-[0_10px_30px_rgba(201,133,106,0.08)]">
              New Drop 🎀
            </span>

            <h1 className="mt-6 whitespace-pre-line text-[clamp(3.6rem,8vw,6.6rem)] leading-[0.9] text-ink">
              Made for the
              {'\n'}Girls Who Dream
            </h1>

            <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
              Soft, dreamy traditional and fusion Pakistani outfits for girls who love
              a little romance in every look.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_32px_rgba(201,133,106,0.28)] transition-transform duration-300 hover:scale-[1.03]"
              >
                Shop the Drop
              </Link>
              <a
                href="#lookbook"
                className="focus-ring inline-flex items-center justify-center rounded-full border border-rose/35 bg-white/70 px-6 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                See Lookbook
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatars.map((background, index) => (
                  <span
                    key={index}
                    className="h-11 w-11 rounded-full border-2 border-cream shadow-sm"
                    style={{ background }}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-ink sm:text-base">
                2,400+ happy customers ⭐
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[28rem] lg:max-w-none">
            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-border bg-white shadow-[0_28px_80px_rgba(28,20,16,0.16)]">
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
              <Image
                src="/images/hero.jpg"
                alt="Raani.pk hero"
                fill
                className="object-cover rounded-3xl"
                sizes="(min-width: 1024px) 28rem, 100vw"
              />

              <div className="absolute right-4 top-4 rounded-full border border-white/50 bg-white/85 px-4 py-2 text-xs font-medium text-ink shadow-lg backdrop-blur-sm">
                Limited Drop 🌸
              </div>

              <div className="absolute bottom-4 left-4 rounded-[18px] border border-white/40 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Live now
                </p>
                <p className="mt-1 text-sm font-medium text-ink">⚡ 47 girls shopping now</p>
              </div>
            </div>

            <div className="absolute -right-4 -top-6 hidden rounded-[18px] border border-border bg-white/80 px-4 py-3 shadow-[0_18px_40px_rgba(28,20,16,0.12)] backdrop-blur-sm lg:block">
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted">Made in</p>
              <p className="font-display text-lg text-ink">Pakistan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
