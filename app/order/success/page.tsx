import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Success Message */}
      <section className="flex-1 flex items-center justify-center py-12 md:py-24">
        <div className="container-tight max-w-2xl text-center">
          {/* Checkmark */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-success/10 border-2 border-success mx-auto mb-8 flex items-center justify-center">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-success"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Order Placed!
          </h1>

          <p className="text-lg md:text-xl text-muted mb-8">
            We'll contact you on WhatsApp within 2 hours to confirm your order.
          </p>

          {/* Order Summary */}
          <div className="bg-surface border border-border rounded-sm p-8 md:p-12 mb-12 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span className="text-muted">Order Number</span>
                <span className="font-medium text-foreground">
                  #ZN-{new Date().getTime().toString().slice(-8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Status</span>
                <span className="inline-block bg-success/10 border border-success text-success text-sm px-3 py-1 rounded-sm">
                  Pending Confirmation
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted">
                ✓ Check your WhatsApp for order confirmation
              </p>
              <p className="text-sm text-muted">
                ✓ We accept COD, EasyPaisa, JazzCash, and Bank Transfer
              </p>
              <p className="text-sm text-muted">
                ✓ Free shipping on orders over PKR 5,000
              </p>
              <p className="text-sm text-muted">
                ✓ 14-day returns on all items
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary text-center">
              Continue Shopping
            </Link>
            <button className="btn-secondary text-center">
              Track Order
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted mb-4">
              Need help? Reach out to us
            </p>
            <p className="text-lg font-medium text-foreground mb-2">
              📱 WhatsApp: +92 (upcoming)
            </p>
            <p className="text-lg font-medium text-foreground">
              ✉️ Email: hello@zeen.pk (upcoming)
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
