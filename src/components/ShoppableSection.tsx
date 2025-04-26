'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppableVideoPlayer } from '@/components/ShoppableVideoPlayer';
import { ProductSidePanel } from '@/components/ProductSidePanel';
import { PageHeadline } from '@/components/PageHeadline';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';

export default function ShoppableSection() {
  const [currentTime, setCurrentTime] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);

  // replay wiring (unchanged)
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

  function handleReplay() {
    setResetSignal((n) => n + 1);
    setCurrentTime(0);
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col items-center space-y-8'
    >
      <PageHeadline />

      <div className='flex flex-col lg:flex-row gap-6 max-w-6xl w-full px-4 sm:px-6 md:px-8'>
        <ShoppableVideoPlayer onTimeUpdate={setCurrentTime} />
        <ProductSidePanel
          products={SHOPPABLE_CONFIG.shoppable.products}
          currentTime={currentTime}
          resetSignal={resetSignal}
        />
      </div>
    </motion.section>
  );
}
