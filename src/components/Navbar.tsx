'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className='fixed inset-x-0 top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between'>
        <Link href='/' className='text-2xl font-extrabold'>
          ShoppableVideo
        </Link>
        <div className='flex gap-4'>
          {['Home', 'Shop'].map((label) => (
            <Link key={label} href={label === 'Home' ? '/' : '/shop'}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant='ghost' size='sm'>
                  {label}
                </Button>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
