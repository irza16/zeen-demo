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
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal - Drawer on mobile, centered on desktop */}
      <div className="fixed z-50 inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-full h-full md:w-auto md:h-auto md:max-w-md bg-background md:rounded-none shadow-lg md:shadow-2xl overflow-y-auto max-h-screen md:max-h-none">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4 md:py-6 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Order {product.name}
            </h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Close order form"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {error && (
              <div
                className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-4 rounded-sm"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Fatima Ahmed"
                className="w-full border border-border bg-surface px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                WhatsApp Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="03XX-XXXXXXX"
                className="w-full border border-border bg-surface px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <p className="text-xs text-muted mt-1">
                Format: 03XX-XXXXXXX (Pakistani numbers only)
              </p>
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Karachi"
                className="w-full border border-border bg-surface px-4 py-3 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-sm font-medium mb-3">Size</label>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeSelect(size)}
                    className={`py-2 border font-medium text-sm transition-colors ${
                      formData.size === size
                        ? 'bg-accent border-accent text-background'
                        : 'border-border bg-surface text-foreground hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3 border border-border bg-surface w-fit">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Math.max(1, prev.quantity - 1),
                    }))
                  }
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="px-3 py-2 font-medium">{formData.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: Math.min(5, prev.quantity + 1),
                    }))
                  }
                  className="px-3 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Payment Method
              </label>
              <div className="space-y-2">
                {(['COD', 'EasyPaisa', 'JazzCash', 'BankTransfer'] as PaymentMethod[]).map(
                  (method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => handlePaymentSelect(method)}
                      className={`w-full p-3 border text-sm font-medium transition-colors text-left ${
                        formData.paymentMethod === method
                          ? 'bg-accent border-accent text-background'
                          : 'border-border bg-surface text-foreground hover:border-accent'
                      }`}
                    >
                      {method}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t border-border pt-4">
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
                <span>Total</span>
                <span>
                  PKR {(product.price * formData.quantity).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>

            {/* Info Text */}
            <p className="text-xs text-muted text-center">
              We'll contact you on WhatsApp within 2 hours to confirm your order.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
