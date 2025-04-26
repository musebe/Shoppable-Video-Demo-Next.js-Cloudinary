// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: 'Home', href: '/' },
    { label: 'About Shoppable', href: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      className='fixed inset-x-0 top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between'>
        {/* Brand */}
        <Link href='/' className='text-2xl font-extrabold whitespace-nowrap'>
          ShoppableVideo
        </Link>

        {/* Desktop links */}
        <div className='hidden sm:flex gap-4'>
          {links.map(({ label, href }) => (
            <Link key={href} href={href} className='whitespace-nowrap'>
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

        {/* Mobile toggle */}
        <button
          className='sm:hidden p-2 rounded-md hover:bg-gray-200'
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='sm:hidden bg-white border-t border-gray-200'
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className='block px-4 py-3 hover:bg-gray-100'
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
