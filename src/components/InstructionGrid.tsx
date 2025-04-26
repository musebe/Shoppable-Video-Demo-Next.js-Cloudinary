'use client';

import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { INSTRUCTIONS } from '@/lib/instructions';

export default function InstructionGrid() {
  return (
    <section className='w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-8'>
      {INSTRUCTIONS.map((inst, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <Card className={`${inst.color} hover:shadow-lg transition-shadow`}>
            <CardHeader className='flex items-center gap-2 p-4'>
              <span className='text-2xl'>{inst.emoji}</span>
              <CardTitle className='text-sm'>{inst.text}</CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
