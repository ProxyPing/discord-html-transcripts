import type { APIAttachment, APIMessage, Awaitable } from 'discord.js';
import type { WebpOptions } from 'sharp';
/**
 * Callback used to save an image attachment.
 * The returned string is the URL that will be used in the transcript.
 *
 * `undefined` indicates to use the original attachment URL.
 * `null` indicates to not include the attachment in the transcript.
 * `string` indicates to use the returned URL as the attachment URL (base64 or remote image).
 */
export type ResolveImageCallback = (attachment: APIAttachment, message: APIMessage) => Awaitable<string | null | undefined>;
/**
 * Builder to build a image saving callback.
 */
export declare class TranscriptImageDownloader {
    private static log;
    private log;
    private maxFileSize?;
    private compression?;
    /**
     * Sets the maximum file size for *each* individual image.
     * @param size The maximum file size in kilobytes
     */
    withMaxSize(size: number): this;
    /**
     * Sets the compression quality for each image. This requires `sharp` to be installed.
     * Optionally, images can be converted to WebP format which is smaller in size.
     * @param quality The quality of the image (1 lowest - 100 highest). Lower quality means smaller file size.
     * @param convertToWebP Whether to convert the image to WebP format
     */
    withCompression(quality?: number, convertToWebP?: boolean, options?: Omit<WebpOptions, 'quality' | 'force'>): this;
    /**
     * Builds the image saving callback.
     */
    build(): ResolveImageCallback;
}
