import { supabase } from './supabase';
import { Product, OrderInsert } from './types';

export async function getProducts(category?: string): Promise<Product[]> {
  let query = supabase.from('products').select('*');

  if (category && category !== 'All') {
    if (category === 'Sale') {
      query = query.not('original_price', 'is', null);
    } else {
      query = query.eq('category', category);
    }
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }

  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }

  return data || null;
}

export async function createOrder(order: OrderInsert): Promise<string> {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select('id')
    .single();

  if (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }

  return data.id;
}
