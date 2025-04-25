'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  productId: number;
  productName: string;
  startTime: number;
  endTime: number;
  publicId: string;
  onClick: {
    action: string;
    pause: boolean;
    args: { url: string };
  };
  onHover?: {
    action: string;
    args: { publicId: string };
  };
};

type Props = {
  products: readonly Product[];
  currentTime: number;
  resetSignal: number;
};

const BUFFER = 0.15; // delay before a card *appears*
const SCROLL_PAD = 12; // px padding under header

export function ProductSidePanel({
  products,
  currentTime,
  resetSignal,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  /** store refs by id; callback returns *void* so TS is happy */
  const productRefs = useRef<Record<number, HTMLDivElement>>({});

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [seenIds, setSeenIds] = useState<number[]>([]);

  /* ── Reset panel when the user hits “replay” ── */
  useEffect(() => {
    setSeenIds([]);
    productRefs.current = {};
    containerRef.current?.scrollTo({ top: 0 });
  }, [resetSignal]);

  /* ── One-time: get Cloudinary video element ── */
  useEffect(() => {
    videoRef.current = document.querySelector('video#cld-video');
  }, []);

  /* ── Mark products as “seen” once their cue starts ── */
  useEffect(() => {
    const newSeen = products
      .filter(
        (p) =>
          currentTime >= p.startTime + BUFFER && !seenIds.includes(p.productId)
      )
      .map((p) => p.productId);

    if (newSeen.length) setSeenIds((prev) => [...prev, ...newSeen]);
  }, [currentTime, products, seenIds]);

  /* ── Derived lists ── */
  const visibleProducts = products.filter((p) => seenIds.includes(p.productId));

  const activeProduct = products.find(
    (p) => currentTime >= p.startTime && currentTime <= p.endTime
  );

  /* ── Scroll whenever the *active* product changes ── */
  useEffect(() => {
    if (!activeProduct) return;

    const el = productRefs.current[activeProduct.productId];
    const wrap = containerRef.current;
    if (!el || !wrap) return;

    requestAnimationFrame(() => {
      wrap.scrollTo({
        top: el.offsetTop - SCROLL_PAD,
        behavior: 'smooth',
      });
    });
  }, [activeProduct?.productId, visibleProducts.length]);

  /* ── Clicking a thumbnail seeks the video ── */
  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
    }
  };

  /* ────────────────── JSX ────────────────── */
  return (
    <div
      ref={containerRef}
      className='w-full lg:w-64 h-[440px] overflow-y-auto scroll-smooth snap-y snap-mandatory space-y-4 p-2 border rounded-md shadow-sm bg-muted'
    >
      <h2 className='text-lg font-semibold mb-2'>Now Showing</h2>

      {visibleProducts.length === 0 ? (
        <p className='text-muted-foreground text-sm italic'>
          No products have appeared yet.
        </p>
      ) : (
        visibleProducts.map((product) => {
          const isActive = activeProduct?.productId === product.productId;

          return (
            <motion.div
              key={product.productId}
              ref={(el) => {
                if (el) productRefs.current[product.productId] = el;
              }}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className='snap-start'
            >
              <Card
                className={`h-[396px] flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isActive ? 'ring-2 ring-primary animate-pulse' : ''
                }`}
              >
                <CardHeader className='p-2 pb-0'>
                  <CardTitle className='text-sm font-semibold'>
                    {product.productName}
                  </CardTitle>
                </CardHeader>

                <CardContent className='p-2 flex flex-col justify-between flex-1'>
                  <button
                    onClick={() => handleSeek(product.startTime)}
                    className='w-full mb-2 flex-1'
                    type='button'
                  >
                    <Image
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_300,h_300,c_pad/${product.publicId}.jpg`}
                      alt={product.productName}
                      width={300}
                      height={300}
                      sizes='(min-width:1024px) 256px, 100vw'
                      className='rounded-md object-contain w-full h-full'
                      priority={isActive}
                    />
                  </button>

                  <Link
                    href={product.onClick.args.url}
                    className='inline-block w-full text-center py-1.5 px-2 text-xs font-medium bg-primary text-white rounded hover:bg-primary/90 transition'
                  >
                    Buy&nbsp;Now →
                  </Link>

                  {/* Discount banner kept exactly as before */}
                  <div className='mt-2 text-xs text-center text-green-600 animate-pulse'>
                    🎉 Use code <strong>LOVE20</strong> for 20% off!
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })
      )}
    </div>
  );
}
