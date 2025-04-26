import ShoppableClient from "@/components/ShoppableClient";

// src/app/page.tsx
export default function Home() {
  return (
    <main className='space-y-12 pt-12 pb-16'>
      {/* This is a client component, so Next.js will bundle it separately */}
      <ShoppableClient />
    </main>
  );
}
