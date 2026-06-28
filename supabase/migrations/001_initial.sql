-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Festive', 'Lawn', 'Formal', 'Basics')),
  price INTEGER NOT NULL,
  original_price INTEGER,
  description TEXT,
  sizes TEXT[] DEFAULT '{XS,S,M,L,XL,XXL}',
  badge TEXT CHECK (badge IN ('New', 'Sale', 'Eid')),
  bg_color TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_city TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id),
  size TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  total_price INTEGER NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('COD', 'EasyPaisa', 'JazzCash', 'BankTransfer')),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for performance (following supabase-postgres-best-practices)
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Add image_url column if missing
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url text;
