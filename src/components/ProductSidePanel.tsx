'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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

const BUFFER = 0.15; // small delay for better sync

export function ProductSidePanel({
  products,
  currentTime,
  resetSignal,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [seenProductIds, setSeenProductIds] = useState<number[]>([]);

  // 🔁 Reset on replay
  useEffect(() => {
    setSeenProductIds([]);
    productRefs.current = {};
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  }, [resetSignal]);

  // 🎥 Get video reference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      videoRef.current = document.querySelector('video#cld-video');
    }
  }, []);

  // ✅ Update seen products over time
  useEffect(() => {
    const newSeen = products
      .filter(
        (p) =>
          currentTime >= p.startTime + BUFFER &&
          !seenProductIds.includes(p.productId)
      )
      .map((p) => p.productId);

    if (newSeen.length > 0) {
      setSeenProductIds((prev) => [...prev, ...newSeen]);
    }
  }, [currentTime]);

  const visibleProducts = products.filter((p) =>
    seenProductIds.includes(p.productId)
  );

  const activeProduct = products.find(
    (p) => currentTime >= p.startTime + BUFFER && currentTime <= p.endTime
  );

  // 🔁 Scroll to active product
  useEffect(() => {
    if (!activeProduct?.productId || !containerRef.current) return;

    requestAnimationFrame(() => {
      const el = productRefs.current[activeProduct.productId];
      if (!el || !containerRef.current) return;

      containerRef.current.scrollTo({
        top: el.offsetTop - 12,
        behavior: 'smooth',
      });
    });
  }, [activeProduct?.productId, visibleProducts.length]);

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
    }
  };

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
                productRefs.current[product.productId] = el;
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
                    className='w-full mb-2 block flex-1'
                  >
                    <img
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_300,h_300,c_pad/${product.publicId}.jpg`}
                      alt={product.productName}
                      className='rounded-md w-full h-full object-contain'
                    />
                  </button>
                  <a
                    href={product.onClick.args.url}
                    className='inline-block w-full text-center py-1.5 px-2 text-xs font-medium bg-primary text-white rounded hover:bg-primary/90 transition'
                  >
                    Buy Now →
                  </a>
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
