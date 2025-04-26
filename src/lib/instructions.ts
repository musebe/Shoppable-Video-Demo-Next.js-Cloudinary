// src/lib/instructions.ts

export type Instruction = {
    emoji: string;
    text: string;
    color: string;    // Tailwind bg color, e.g. 'bg-blue-50'
};

/** Shoppable Video demo instructions */
export const INSTRUCTIONS: Instruction[] = [
    {
        emoji: '🛒',
        text: 'Click the product inside the cart icon on the video to view the full product.',
        color: 'bg-blue-50',
    },
    {
        emoji: '🛍️',
        text: 'Click “Buy Now” on the side panel to buy or view the product.',
        color: 'bg-green-50',
    },
    {
        emoji: '🔍',
        text: 'Click a product in the side panel to jump to when it appeared in the video.',
        color: 'bg-yellow-50',
    },
    {
        emoji: '🏁',
        text: 'Once the video ends, click the icons on top of the video to view or buy the product.',
        color: 'bg-pink-50',
    },
];
