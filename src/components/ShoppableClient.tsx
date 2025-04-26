// src/components/ShoppableClient.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamically load your interactive section client-side only
const InstructionGrid = dynamic(() => import('@/components/InstructionGrid'), {
  ssr: false,
});
const ShoppableSection = dynamic(
  () => import('@/components/ShoppableSection'),
  { ssr: false }
);

export default function ShoppableClient() {
  return (
    <>
      <ShoppableSection />
      <InstructionGrid />
    </>
  );
}
