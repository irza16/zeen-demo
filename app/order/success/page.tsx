import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="section-shell">
        <div className="container-page max-w-3xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-success/20 bg-success/10 text-success">
            <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mt-8 text-[clamp(3rem,6vw,4.8rem)] leading-[0.95] text-ink">
            Order Placed!
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            We&apos;ll contact you on WhatsApp within 2 hours to confirm your order.
          </p>

          <div className="card-soft mt-10 p-6 text-left sm:p-8">
            <h2 className="font-display text-2xl text-ink">Order Summary</h2>
            <div className="mt-6 space-y-4 border-b border-border pb-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted">Order Number</span>
                <span className="font-medium text-ink">
                  #ZN-{new Date().getTime().toString().slice(-8)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted">Status</span>
                <span className="rounded-full border border-success/20 bg-success/10 px-3 py-1 text-sm text-success">
                  Pending Confirmation
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-muted">
              <p>✓ Check your WhatsApp for order confirmation</p>
              <p>✓ We accept COD, EasyPaisa, JazzCash, and Bank Transfer</p>
              <p>✓ Free shipping on orders over PKR 5,000</p>
              <p>✓ 14-day returns on all items</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3.5 text-sm font-medium text-white shadow-[0_16px_32px_rgba(201,133,106,0.28)]"
            >
              Continue Shopping
            </Link>
            <button className="focus-ring inline-flex items-center justify-center rounded-full border border-border bg-white/80 px-6 py-3.5 text-sm font-medium text-ink">
              Track Order
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
