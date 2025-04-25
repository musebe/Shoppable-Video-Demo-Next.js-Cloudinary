/* Only spec-compliant keys */
export const SHOPPABLE_CONFIG = {
    shoppable: {
        transformation: { crop: 'pad', aspect_ratio: '1' },

        /* runtime-overridden in the component */
        startState: 'closed' as const,
        autoClose: 0,

        /* Post-roll gallery */
        showPostPlayOverlay: true,
        bannerMsg: 'Shop the Video',

        products: [
            {
                productId: 1,
                productName: 'Sunglasses',
                startTime: 0.2,
                endTime: 2,
                publicId: 'shoppable-video/sunglasses',
                onClick: {
                    action: 'goto',
                    pause: true,
                    args: { url: '/shop/sunglasses' },
                },
            },
            {
                productId: 2,
                productName: 'Green Dress',
                startTime: 2,
                endTime: 5,
                publicId: 'shoppable-video/shoppable_dress2',
                onClick: {
                    action: 'goto',
                    pause: true,
                    args: { url: '/shop/green-dress' },
                },
            },
            {
                productId: 3,
                productName: 'Brown Bag',
                startTime: 7,
                endTime: 11,
                publicId: 'shoppable-video/brown_bag',
                onHover: {
                    action: 'switch',
                    args: { publicId: 'shoppable-video/brown_bag2' },
                },
                onClick: {
                    action: 'goto',
                    pause: true,
                    args: { url: '/shop/brown-bag' },
                },
            },
        ],
    },
} as const
