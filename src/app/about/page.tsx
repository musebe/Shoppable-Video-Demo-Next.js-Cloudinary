// src/app/about/page.tsx

'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center text-center min-h-screen px-4 py-16'
    >
      <h1 className='text-5xl font-extrabold mb-4'>
        🛒 Shoppable Videos for Your Store
      </h1>
      <p className='text-lg max-w-2xl mb-8'>
        Learn how to integrate Cloudinary’s Shoppable Video Player into your
        Next.js store, with interactive hotspots, a slide-in product panel, and
        delightful animations powered by Motion.dev and styled with shadcn/ui.
      </p>
      <Link href='/' passHref>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size='lg'>View Shoppable Demo</Button>
        </motion.div>
      </Link>
      <Image
        src='/demo3.png'
        alt='Shoppable Video Demo Preview'
        width={800}
        height={450}
        className='mt-12 rounded-lg shadow-lg'
        priority
      />
    </motion.main>
  );
}
