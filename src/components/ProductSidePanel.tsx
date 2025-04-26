// src/components/ProductSidePanel.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getShoppablePlayer } from '@/lib/cloudinary-player';

type Product = {
  productId: number;
  productName: string;
  startTime: number;
  endTime: number;
  publicId: string;
  onClick: { action: string; pause: boolean; args: { url: string } };
  onHover?: { action: string; args: { publicId: string } };
};

type Props = {
  products: readonly Product[];
  currentTime: number;
  resetSignal: number;
};

const BUFFER = 0.15; // fade‐in threshold
const SCROLL_PAD = 12; // scroll offset under header

export function ProductSidePanel({
  products,
  currentTime,
  resetSignal,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<Record<number, HTMLDivElement>>({});
  const [seenIds, setSeenIds] = useState<number[]>([]);

  // Reset when replay hits
  useEffect(() => {
    setSeenIds([]);
    productRefs.current = {};
    containerRef.current?.scrollTo({ top: 0 });
  }, [resetSignal]);

  // Mark products seen as time progresses
  useEffect(() => {
    const newSeen = products
      .filter(
        (p) =>
          currentTime >= p.startTime + BUFFER && !seenIds.includes(p.productId)
      )
      .map((p) => p.productId);

    if (newSeen.length > 0) {
      setSeenIds((prev) => [...prev, ...newSeen]);
    }
  }, [currentTime, products, seenIds]);

  const visible = products.filter((p) => seenIds.includes(p.productId));
  const active = products.find(
    (p) => currentTime >= p.startTime && currentTime <= p.endTime
  );

  // Scroll panel to the active card
  useEffect(() => {
    if (!active) return;
    const el = productRefs.current[active.productId];
    const wrap = containerRef.current;
    if (!el || !wrap) return;
    requestAnimationFrame(() => {
      wrap.scrollTo({
        top: el.offsetTop - SCROLL_PAD,
        behavior: 'smooth',
      });
    });
  }, [active?.productId, visible.length]);

  // Seek-and-pause via the real Video.js API
  const handleSeek = (t: number) => {
    const player = getShoppablePlayer();
    if (!player) return;
    player.pause(); // Video.js API
    player.currentTime(t); // Video.js API
  };

  return (
    <div
      ref={containerRef}
      className='w-full lg:w-64 h-[440px] overflow-y-auto scroll-smooth snap-y snap-mandatory space-y-4 p-2 border rounded-md shadow-sm bg-muted'
    >
      <h2 className='text-lg font-semibold mb-2'>Now Showing</h2>

      {visible.length === 0 ? (
        <p className='text-muted-foreground text-sm italic'>
          No products have appeared yet.
        </p>
      ) : (
        visible.map((p) => {
          const isActive = p.productId === active?.productId;
          return (
            <motion.div
              key={p.productId}
              ref={(el) => {
                if (el) productRefs.current[p.productId] = el;
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
                    {p.productName}
                  </CardTitle>
                </CardHeader>

                <CardContent className='p-2 flex flex-col justify-between flex-1'>
                  {/* thumbnail → seek & pause */}
                  <button
                    type='button'
                    onClick={() => handleSeek(p.startTime)}
                    className='w-full mb-2 flex-1'
                  >
                    <Image
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_300,h_300,c_pad/${p.publicId}.jpg`}
                      alt={p.productName}
                      width={300}
                      height={300}
                      sizes='(min-width:1024px) 256px, 100vw'
                      priority={isActive}
                      className='rounded-md object-contain w-full h-full'
                    />
                  </button>

                  {/* buy link */}
                  <Link
                    href={p.onClick.args.url}
                    className='inline-block w-full text-center py-1.5 px-2 text-xs font-medium bg-primary text-white rounded hover:bg-primary/90 transition'
                  >
                    Buy&nbsp;Now →
                  </Link>

                  {/* discount banner */}
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
