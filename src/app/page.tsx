'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppableVideoPlayer } from '@/components/ShoppableVideoPlayer';
import { ProductSidePanel } from '@/components/ProductSidePanel';
import { SHOPPABLE_CONFIG } from '@/lib/shoppable-config';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    // Wait for Cloudinary Replay button to appear and click handler
    const observer = new MutationObserver(() => {
      const replayBtn =
        document.querySelector<HTMLButtonElement>('.cld-replay-button');
      if (replayBtn) {
        console.log('🔁 Replay button found, binding reset handler');
        replayBtn.addEventListener('click', handleReplay);
        observer.disconnect();
      }
    });

    const videoContainer = document.querySelector('.cld-video-player');
    if (videoContainer) {
      observer.observe(videoContainer, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      document
        .querySelector('.cld-replay-button')
        ?.removeEventListener('click', handleReplay);
    };
  }, []);

  const handleReplay = () => {
    console.log('🔄 Replay clicked, resetting panel');
    setResetSignal((prev) => prev + 1);
    setCurrentTime(0);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col items-center justify-center min-h-screen px-4'
    >
      <h1 className='sr-only'>Shoppable Video Demo</h1>

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
