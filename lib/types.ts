export type Category = 'Festive' | 'Lawn' | 'Formal' | 'Basics';
export type Badge = 'New' | 'Sale' | 'Eid' | null;
export type PaymentMethod = 'COD' | 'EasyPaisa' | 'JazzCash' | 'BankTransfer';
export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  original_price: number | null;
  description: string;
  sizes: string[];
  badge: Badge;
  bg_color: string;
  image_url?: string | null;
  in_stock: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  product_id: string;
  size: string;
  quantity: number;
  total_price: number;
  payment_method: PaymentMethod;
  status: OrderStatus;
  created_at: string;
}

export interface OrderInsert {
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  product_id: string;
  size: string;
  quantity: number;
  total_price: number;
  payment_method: PaymentMethod;
}
