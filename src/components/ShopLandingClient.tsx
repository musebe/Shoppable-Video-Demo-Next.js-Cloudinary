// src/components/ShopLandingClient.tsx
'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export interface Product {
  publicId: string;
  productName: string;
  onClick: { args: { url: string } };
}

interface ShopLandingClientProps {
  products: readonly Product[]; // accept readonly array to match config
}

export default function ShopLandingClient({
  products,
}: ShopLandingClientProps) {
  return (
    <main className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-8'>Welcome to the Shop</h1>
      <p className='mb-12 text-gray-600'>
        Browse our exclusive collection below!
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.map((product, index) => {
          const slug = product.onClick.args.url.split('/').pop()!;

          return (
            <motion.div
              key={product.publicId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link
                href={`/shop/${slug}`}
                className='block rounded-lg overflow-hidden shadow hover:shadow-lg transition'
              >
                <div className='bg-white p-4'>
                  <Image
                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_600,h_600,c_pad/${product.publicId}.jpg`}
                    alt={product.productName}
                    width={600}
                    height={600}
                    className='rounded-lg object-contain w-full'
                  />
                  <h2 className='mt-4 text-xl font-semibold'>
                    {product.productName}
                  </h2>
                  <p className='text-gray-500 mt-2'>$399.99</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
