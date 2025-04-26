// src/app/shop/page.tsx

import ShopLandingClient from '@/components/ShopLandingClient';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';

// Route-segment config (server only) :contentReference[oaicite:1]{index=1}
export const dynamic = 'force-static';
export const revalidate = 60; // seconds

export default function ShopLandingPage() {
  // still static: reading from config at build time
  const products = SHOPPABLE_CONFIG.shoppable.products;

  return <ShopLandingClient products={products} />;
}
