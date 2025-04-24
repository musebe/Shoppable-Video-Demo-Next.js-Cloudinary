// src/app/page.tsx
'use client';

import ProductSidePanel from '@/components/ProductSidePanel';
import { ShoppableVideoPlayer } from '@/components/ShoppableVideoPlayer';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col items-center justify-center min-h-screen px-4'
    >
      <h1 className='sr-only'>Shoppable Video Demo</h1>
      <ShoppableVideoPlayer />
    </motion.main>
  );
}
