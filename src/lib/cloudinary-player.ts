// src/lib/cloudinary-player.ts

/**
 * Module-level variable to hold the player instance
 * once it’s been created.
 */
let playerInstance: any = null;

/**
 * Instantiate (or re-instantiate) the global Cloudinary Shoppable Video Player
 * that the UMD bundle has already registered on window.cloudinary.videoPlayer.
 *
 * Stores the instance in `playerInstance` for later control.
 */
export async function createShoppablePlayer(
    container: HTMLVideoElement | string,
    options: { cloud_name: string } & Record<string, any>,
) {
    if (typeof window === 'undefined') {
        throw new Error('createShoppablePlayer() can only run in the browser');
    }

    // @ts-ignore — injected by the UMD <Script> in your layout
    const player = window.cloudinary.videoPlayer(container, options);
    playerInstance = player;
    return player;
}

/**
 * Returns the most recently created Shoppable Video Player instance,
 * or null if none has been instantiated yet.
 */
export function getShoppablePlayer(): any {
    return playerInstance;
}
