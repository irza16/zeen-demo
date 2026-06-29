'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, OrderInsert, PaymentMethod } from '@/lib/types';
import { createOrder } from '@/lib/queries';

interface OrderFormProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderForm({ product, isOpen, onClose }: OrderFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    size: '',
    paymentMethod: 'COD' as PaymentMethod,
    quantity: 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeSelect = (size: string) => {
    setFormData((prev) => ({ ...prev, size }));
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const validatePhone = (phone: string): boolean => {
    const pkPhoneRegex = /^03\d{2}-?\d{7}$/;
    return pkPhoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid Pakistani phone number (e.g., 03XX-XXXXXXX)');
      return;
    }
    if (!formData.city.trim()) {
      setError('Please enter your city');
      return;
    }
    if (!formData.size) {
      setError('Please select a size');
      return;
    }

    setIsLoading(true);

    try {
      const orderData: OrderInsert = {
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_city: formData.city,
        product_id: product.id,
        size: formData.size,
        quantity: formData.quantity,
        total_price: product.price * formData.quantity,
        payment_method: formData.paymentMethod,
      };

      const orderId = await createOrder(orderData);
      onClose();
      router.push(`/order/success?id=${orderId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create order. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-ink/45 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
        <div className="pointer-events-auto max-h-[92dvh] w-full overflow-y-auto rounded-t-[28px] border border-border bg-cream shadow-[0_24px_70px_rgba(28,20,16,0.2)] sm:max-w-xl sm:rounded-[32px]">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-cream/95 px-5 py-4 backdrop-blur-xl sm:px-6">
            <h2 className="font-display text-2xl text-ink">
              Order {product.name}
            </h2>
            <button
              onClick={onClose}
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/70 text-ink transition-transform duration-300 hover:scale-[1.03]"
              aria-label="Close order form"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-5 py-6 sm:px-6 sm:py-8">
            {error && (
              <div
                className="rounded-[16px] border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
                role="alert"
              >
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Fatima Ahmed"
                className="focus-ring w-full rounded-[14px] border border-border bg-white/80 px-4 py-3 text-ink placeholder:text-muted"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
                WhatsApp Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="03XX-XXXXXXX"
                className="focus-ring w-full rounded-[14px] border border-border bg-white/80 px-4 py-3 text-ink placeholder:text-muted"
                required
              />
              <p className="mt-1 text-xs text-muted">
                Format: 03XX-XXXXXXX (Pakistani numbers only)
              </p>
            </div>

            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-medium text-ink">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Karachi"
                className="focus-ring w-full rounded-[14px] border border-border bg-white/80 px-4 py-3 text-ink placeholder:text-muted"
                required
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-ink">Size</label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeSelect(size)}
                    className={`focus-ring rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                      formData.size === size
                        ? 'border-rose bg-rose text-white'
                        : 'border-border bg-white/80 text-ink hover:border-rose/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-ink">
                Quantity
              </label>
              <div className="flex w-fit items-center gap-3 rounded-full border border-border bg-white/80">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Math.max(1, prev.quantity - 1),
                    }))
                  }
                  className="rounded-full px-4 py-2 transition-colors hover:bg-blush/60"
                >
                  −
                </button>
                <span className="px-3 py-2 font-medium text-ink">{formData.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Math.min(5, prev.quantity + 1),
                    }))
                  }
                  className="rounded-full px-4 py-2 transition-colors hover:bg-blush/60"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-ink">
                Payment Method
              </label>
              <div className="space-y-2">
                {(['COD', 'EasyPaisa', 'JazzCash', 'BankTransfer'] as PaymentMethod[]).map(
                  (method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => handlePaymentSelect(method)}
                      className={`w-full rounded-[16px] border p-3 text-left text-sm font-medium transition-colors ${
                        formData.paymentMethod === method
                          ? 'border-rose bg-rose/10 text-ink'
                          : 'border-border bg-white/80 text-ink hover:border-rose/50'
                      }`}
                    >
                      {method}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="rounded-[20px] border border-border bg-white/70 p-4">
              <div className="flex justify-between mb-2">
                <span className="text-muted">Price</span>
                <span className="font-medium">
                  PKR {product.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-muted">Quantity</span>
                <span className="font-medium">{formData.quantity}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-ink">Total</span>
                <span>
                  PKR {(product.price * formData.quantity).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="focus-ring w-full rounded-full bg-rose px-6 py-4 text-center text-sm font-medium text-white shadow-[0_16px_32px_rgba(201,133,106,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>

            <p className="text-center text-xs text-muted">
              We&apos;ll contact you on WhatsApp within 2 hours to confirm your order.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
