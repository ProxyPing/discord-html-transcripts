"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptImageDownloader = void 0;
const undici_1 = require("undici");
const debug_1 = __importDefault(require("debug"));
/**
 * Builder to build a image saving callback.
 */
class TranscriptImageDownloader {
    constructor() {
        this.log = TranscriptImageDownloader.log;
    }
    /**
     * Sets the maximum file size for *each* individual image.
     * @param size The maximum file size in kilobytes
     */
    withMaxSize(size) {
        this.maxFileSize = size;
        return this;
    }
    /**
     * Sets the compression quality for each image. This requires `sharp` to be installed.
     * Optionally, images can be converted to WebP format which is smaller in size.
     * @param quality The quality of the image (1 lowest - 100 highest). Lower quality means smaller file size.
     * @param convertToWebP Whether to convert the image to WebP format
     */
    withCompression(quality = 80, convertToWebP = false, options = {}) {
        if (quality < 1 || quality > 100)
            throw new Error('Quality must be between 1 and 100');
        this.compression = { quality, convertToWebP, options };
        return this;
    }
    /**
     * Builds the image saving callback.
     */
    build() {
        return async (attachment) => {
            // if the attachment is not an image, return null
            if (!attachment.width || !attachment.height)
                return undefined;
            // if the max file size is set, check if the file size is within the limit
            if (this.maxFileSize && attachment.size > this.maxFileSize * 1024)
                return undefined;
            // fetch the image
            this.log(`Fetching attachment ${attachment.id}: ${attachment.url}`);
            const response = await (0, undici_1.request)(attachment.url).catch((err) => {
                console.error(`[discord-html-transcripts] Failed to download image for transcript: `, err);
                return null;
            });
            if (!response)
                return undefined;
            const mimetype = response.headers['content-type'];
            const buffer = await response.body.arrayBuffer().then((res) => Buffer.from(res));
            this.log(`Finished fetching ${attachment.id} (${buffer.length} bytes)`);
            // if the compression options are set, compress the image
            if (this.compression) {
                try {
                    const sharp = await Promise.resolve().then(() => __importStar(require('sharp')));
                    this.log(`Compressing ${attachment.id} with 'sharp'`);
                    const sharpbuf = await sharp
                        .default(buffer)
                        .webp(Object.assign({ quality: this.compression.quality, force: this.compression.convertToWebP, effort: 2 }, this.compression.options))
                        .toBuffer({ resolveWithObject: true });
                    this.log(`Finished compressing ${attachment.id} (${sharpbuf.info.size} bytes)`);
                    return `data:image/${sharpbuf.info.format};base64,${sharpbuf.data.toString('base64')}`;
                }
                catch (err) {
                    console.error(`[discord-html-transcripts] Failed to compress image. 'sharp' may not be installed. Falling back to uncompressed image.`, err);
                    // Fall through to return uncompressed image
                }
            }
            // return the base64 string
            return `data:${mimetype};base64,${buffer.toString('base64')}`;
        };
    }
}
exports.TranscriptImageDownloader = TranscriptImageDownloader;
TranscriptImageDownloader.log = (0, debug_1.default)('discord-html-transcripts:TranscriptImageDownloader');
//# sourceMappingURL=images.js.map