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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscriptImageDownloader = exports.DiscordMessages = void 0;
exports.generateFromMessages = generateFromMessages;
exports.createTranscript = createTranscript;
const discord_js_1 = require("discord.js");
const generator_1 = __importDefault(require("./generator"));
const types_1 = require("./types");
const images_1 = require("./downloader/images");
// re-exports
var transcript_1 = require("./generator/transcript");
Object.defineProperty(exports, "DiscordMessages", { enumerable: true, get: function () { return __importDefault(transcript_1).default; } });
var images_2 = require("./downloader/images");
Object.defineProperty(exports, "TranscriptImageDownloader", { enumerable: true, get: function () { return images_2.TranscriptImageDownloader; } });
// version check
const versionPrefix = discord_js_1.version.split('.')[0];
if (!versionPrefix || (versionPrefix !== '14' && versionPrefix !== '15')) {
    console.error(`[discord-html-transcripts] Versions v3.x.x of discord-html-transcripts are only compatible with discord.js v14.x.x and v15.x.x, and you are using v${discord_js_1.version}.` +
        `    For v13.x.x support, please install discord-html-transcripts v2.x.x using "npm install discord-html-transcripts@^2".`);
    process.exit(1);
}
/**
 *
 * @param messages The messages to generate a transcript from
 * @param channel  The channel the messages are from (used for header and guild name)
 * @param options  The options to use when generating the transcript
 * @returns        The generated transcript
 */
async function generateFromMessages(messages, channel, options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    // turn messages into an array
    const transformedMessages = messages instanceof discord_js_1.Collection ? Array.from(messages.values()) : messages;
    // figure out how the user wants images saved
    let resolveImageSrc = (_b = (_a = options.callbacks) === null || _a === void 0 ? void 0 : _a.resolveImageSrc) !== null && _b !== void 0 ? _b : ((attachment) => attachment.url);
    if (options.saveImages) {
        if ((_c = options.callbacks) === null || _c === void 0 ? void 0 : _c.resolveImageSrc) {
            console.warn(`[discord-html-transcripts] You have specified both saveImages and resolveImageSrc, please only specify one. resolveImageSrc will be used.`);
        }
        else {
            resolveImageSrc = new images_1.TranscriptImageDownloader().build();
            console.log('Using default downloader');
        }
    }
    // render the messages
    const html = await (0, generator_1.default)({
        messages: transformedMessages,
        channel,
        saveImages: (_d = options.saveImages) !== null && _d !== void 0 ? _d : false,
        callbacks: Object.assign({ resolveImageSrc, resolveChannel: async (id) => channel.client.channels.fetch(id).catch(() => null), resolveUser: async (id) => channel.client.users.fetch(id).catch(() => null), resolveRole: channel.isDMBased() ? () => null : async (id) => { var _a; return (_a = channel.guild) === null || _a === void 0 ? void 0 : _a.roles.fetch(id).catch(() => null); } }, ((_e = options.callbacks) !== null && _e !== void 0 ? _e : {})),
        favicon: (_f = options.favicon) !== null && _f !== void 0 ? _f : 'guild',
        hydrate: (_g = options.hydrate) !== null && _g !== void 0 ? _g : false,
    });
    // get the time it took to render the messages
    // const renderTime = process.hrtime(startTime);
    // console.log(
    //   `[discord-html-transcripts] Rendered ${transformedMessages.length} messages in ${renderTime[0]}s ${
    //     renderTime[1] / 1000000
    //   }ms`
    // );
    // return the html in the specified format
    if (options.returnType === types_1.ExportReturnType.Buffer) {
        return Buffer.from(html);
    }
    if (options.returnType === types_1.ExportReturnType.String) {
        return html;
    }
    return new discord_js_1.AttachmentBuilder(Buffer.from(html), {
        name: (_h = options.filename) !== null && _h !== void 0 ? _h : `transcript-${channel.id}.html`,
    });
}
/**
 *
 * @param channel The channel to create a transcript from
 * @param options The options to use when creating the transcript
 * @returns       The generated transcript
 */
async function createTranscript(channel, options = {}) {
    // validate type
    if (!channel.isTextBased()) {
        // @ts-expect-error(2339): run-time check
        throw new TypeError(`Provided channel must be text-based, received ${channel.type}`);
    }
    // fetch messages
    let allMessages = [];
    let lastMessageId;
    const { limit, filter } = options;
    const resolvedLimit = typeof limit === 'undefined' || limit === -1 ? Infinity : limit;
    // until there are no more messages, keep fetching
    while (true) {
        // create fetch options
        const fetchLimitOptions = { limit: 100, before: lastMessageId };
        if (!lastMessageId)
            delete fetchLimitOptions.before;
        // fetch messages
        const messages = await channel.messages.fetch(fetchLimitOptions);
        const filteredMessages = typeof filter === 'function' ? messages.filter(filter) : messages;
        // add the messages to the array
        allMessages.push(...filteredMessages.values());
        // Get the last key of 'messages', not 'filteredMessages' because you will be refetching the same messages
        lastMessageId = messages.lastKey();
        // if there are no more messages, break
        if (messages.size < 100)
            break;
        // if the limit has been reached, break
        if (allMessages.length >= resolvedLimit)
            break;
    }
    if (resolvedLimit < allMessages.length)
        allMessages = allMessages.slice(0, resolvedLimit);
    // generate the transcript
    return generateFromMessages(allMessages.reverse(), channel, options);
}
exports.default = {
    createTranscript,
    generateFromMessages,
};
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map