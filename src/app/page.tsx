'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppableVideoPlayer } from '@/components/ShoppableVideoPlayer';
import { ProductSidePanel } from '@/components/ProductSidePanel';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';

/* new import */
import { PageHeadline } from '@/components/PageHeadline';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);

  /* replay button wiring (unchanged) */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const btn =
        document.querySelector<HTMLButtonElement>('.cld-replay-button');
      if (btn) {
        btn.addEventListener('click', handleReplay);
        observer.disconnect();
      }
    });

    const wrapper = document.querySelector('.cld-video-player');
    if (wrapper) observer.observe(wrapper, { childList: true, subtree: true });

    return () =>
      document
        .querySelector<HTMLButtonElement>('.cld-replay-button')
        ?.removeEventListener('click', handleReplay);
  }, []);

  const handleReplay = () => {
    setResetSignal((n) => n + 1);
    setCurrentTime(0);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col items-center justify-center min-h-screen px-4 space-y-8'
    >
      {/* shimmering headline */}
      <PageHeadline />

      <div className='flex flex-col lg:flex-row gap-6 max-w-6xl w-full'>
        <ShoppableVideoPlayer onTimeUpdate={setCurrentTime} />
        <ProductSidePanel
          products={SHOPPABLE_CONFIG.shoppable.products}
          currentTime={currentTime}
          resetSignal={resetSignal}
        />
      </div>
    </motion.main>
  );
}
