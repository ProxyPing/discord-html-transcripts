"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefined = isDefined;
exports.formatBytes = formatBytes;
exports.parseDiscordEmoji = parseDiscordEmoji;
exports.streamToString = streamToString;
const twemoji_1 = __importDefault(require("twemoji"));
function isDefined(value) {
    return value !== undefined && value !== null;
}
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
function parseDiscordEmoji(emoji) {
    if (emoji.id) {
        return `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`;
    }
    if (!emoji.name) {
        return 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2753.svg'; // question mark emoji fallback
    }
    const codepoints = twemoji_1.default.convert
        .toCodePoint(emoji.name.indexOf(String.fromCharCode(0x200d)) < 0 ? emoji.name.replace(/\uFE0F/g, '') : emoji.name)
        .toLowerCase();
    return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codepoints}.svg`;
}
/**
 * Converts a stream to a string
 * @param stream - The stream to convert
 */
function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}
//# sourceMappingURL=utils.js.map