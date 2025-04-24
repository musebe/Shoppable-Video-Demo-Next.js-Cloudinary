'use client';

import { motion } from 'motion/react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className='mt-auto bg-gray-50 text-gray-600 py-8'
    >
      <div className='max-w-7xl mx-auto grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4'>
        <div>
          <h4 className='mb-2 text-lg font-semibold'>ShoppableVideo</h4>
          <p className='text-sm'>Demo store powered by Next.js & Cloudinary.</p>
        </div>
        <div>
          <h4 className='mb-2 text-lg font-semibold'>Resources</h4>
          <ul className='space-y-1 text-sm'>
            {[
              ['Cloudinary', 'https://cloudinary.com'],
              ['Next.js', 'https://nextjs.org'],
              ['Motion.dev', 'https://motion.dev'],
              ['shadcn/ui', 'https://ui.shadcn.com'],
            ].map(([name, url]) => (
              <li key={name}>
                <a
                  href={url}
                  className='hover:text-gray-900 hover:underline'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='mb-2 text-lg font-semibold'>Company</h4>
          <ul className='space-y-1 text-sm'>
            {['About', 'Blog', 'Careers'].map((item) => (
              <li key={item}>
                <a href='#' className='hover:text-gray-900 hover:underline'>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='mb-2 text-lg font-semibold'>Legal</h4>
          <ul className='space-y-1 text-sm'>
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <li key={item}>
                <a href='#' className='hover:text-gray-900 hover:underline'>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-6 text-center text-xs text-gray-400'>
        © {new Date().getFullYear()} ShoppableVideo Demo. All rights reserved.
      </div>
    </motion.footer>
  );
}
