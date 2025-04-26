// src/app/shop/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';

/**
 * This page is statically generated and revalidated every 60 seconds.
 */
export const dynamic = 'force-static';
export const revalidate = 60; // seconds

type Params = { slug: string };

// Generate static params at build time
export function generateStaticParams(): Params[] {
  return SHOPPABLE_CONFIG.shoppable.products.map((product) => ({
    slug: product.onClick.args.url.split('/').pop()!,
  }));
}

// Next.js 15 style async page component
export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const _searchParams = await searchParams; // Optional: if you need them later

  const product = SHOPPABLE_CONFIG.shoppable.products.find((p) =>
    p.onClick.args.url.endsWith(slug)
  );

  if (!product) {
    return notFound();
  }

  return (
    <div className='container mx-auto p-4'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Gallery */}
        <div className='lg:w-1/2'>
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_800,h_800,c_pad/${product.publicId}.jpg`}
            alt={product.productName}
            width={800}
            height={800}
            className='rounded-lg object-contain w-full bg-white'
          />
        </div>

        {/* Details */}
        <div className='lg:w-1/2 flex flex-col'>
          <h1 className='text-4xl font-bold'>{product.productName}</h1>

          <div className='mt-2 flex items-center'>
            <span className='text-orange-500 mr-2'>★★★★☆</span>
            <span className='text-gray-600'>(4.5)</span>
          </div>

          <p className='mt-4 text-gray-700 leading-relaxed'>
            {product.productName} is a premium item in our collection—crafted to
            perfection and available now. Click “Buy Now” to grab yours!
          </p>

          <div className='mt-4'>
            <span className='text-3xl font-bold'>$399.99</span>
            <span className='ml-3 line-through text-gray-400'>$499.99</span>
          </div>

          <div className='mt-6 flex flex-col sm:flex-row gap-4'>
            <Link
              href={product.onClick.args.url}
              className='px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg text-center hover:bg-orange-600 transition'
            >
              Buy Now
            </Link>
            <button className='px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition'>
              Add to Cart
            </button>
          </div>

          <div className='mt-8 grid grid-cols-2 gap-x-4 text-sm text-gray-600'>
            <div>
              <strong>Brand:</strong> Generic
            </div>
            <div>
              <strong>Color:</strong> Multi
            </div>
            <div>
              <strong>Category:</strong> {slug.replace('-', ' ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
