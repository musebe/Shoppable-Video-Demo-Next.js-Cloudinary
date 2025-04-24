'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const products = SHOPPABLE_CONFIG.shoppable.products;
const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;

export default function ProductSidePanel() {
  return (
    <aside className='w-64 flex-shrink-0 space-y-4'>
      {products.map((p) => (
        <Card key={p.productId} className='hover:bg-muted/60 transition'>
          <Link href={p.onClick.args.url}>
            <CardHeader className='p-2 pb-0'>
              <CardTitle className='text-base'>{p.productName}</CardTitle>
            </CardHeader>

            <CardContent className='p-2'>
              <Image
                src={`https://res.cloudinary.com/${cloud}/image/upload/c_pad,w_224,h_224/${p.publicId}.png`}
                alt={p.productName}
                width={224}
                height={224}
                className='rounded'
              />
            </CardContent>
          </Link>
        </Card>
      ))}
    </aside>
  );
}
