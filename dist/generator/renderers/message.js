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
exports.default = DiscordMessage;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils/utils");
const attachment_1 = require("./attachment");
const components_1 = __importDefault(require("./components"));
const content_1 = __importStar(require("./content"));
const embed_1 = require("./embed");
const reply_1 = __importDefault(require("./reply"));
const systemMessage_1 = __importDefault(require("./systemMessage"));
async function DiscordMessage({ message, context, }) {
    var _a;
    if (message.system)
        return react_1.default.createElement(systemMessage_1.default, { message: message });
    const isCrosspost = message.reference && message.reference.guildId !== ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id);
    return (react_1.default.createElement(discord_components_react_1.DiscordMessage, { id: `m-${message.id}`, timestamp: message.createdAt.toISOString(), key: message.id, edited: message.editedAt !== null, server: isCrosspost !== null && isCrosspost !== void 0 ? isCrosspost : undefined, highlight: message.mentions.everyone, profile: message.author.id },
        react_1.default.createElement(reply_1.default, { message: message, context: context }),
        message.interaction && (react_1.default.createElement(discord_components_react_1.DiscordCommand, { slot: "reply", profile: message.interaction.user.id, command: '/' + message.interaction.commandName })),
        message.content && (react_1.default.createElement(content_1.default, { content: message.content, context: Object.assign(Object.assign({}, context), { type: message.webhookId ? content_1.RenderType.WEBHOOK : content_1.RenderType.NORMAL }) })),
        react_1.default.createElement(attachment_1.Attachments, { message: message, context: context }),
        message.embeds.map((embed, id) => (react_1.default.createElement(embed_1.DiscordEmbed, { embed: embed, context: Object.assign(Object.assign({}, context), { index: id, message }), key: id }))),
        message.components.length > 0 && (react_1.default.createElement(discord_components_react_1.DiscordAttachments, { slot: "components" }, message.components.map((component, id) => (react_1.default.createElement(components_1.default, { key: id, id: id, component: component, context: context }))))),
        message.reactions.cache.size > 0 && (react_1.default.createElement(discord_components_react_1.DiscordReactions, { slot: "reactions" }, message.reactions.cache.map((reaction, id) => {
            var _a;
            return (react_1.default.createElement(discord_components_react_1.DiscordReaction, { key: `${message.id}r${id}`, name: (_a = reaction.emoji.name) !== null && _a !== void 0 ? _a : 'Unknown', emoji: (0, utils_1.parseDiscordEmoji)(reaction.emoji), count: reaction.count }));
        }))),
        message.hasThread && message.thread && (react_1.default.createElement(discord_components_react_1.DiscordThread, { slot: "thread", name: message.thread.name, cta: message.thread.messageCount
                ? `${message.thread.messageCount} Message${message.thread.messageCount > 1 ? 's' : ''}`
                : 'View Thread' }, message.thread.lastMessage ? (react_1.default.createElement(discord_components_react_1.DiscordThreadMessage, { profile: message.thread.lastMessage.author.id },
            react_1.default.createElement(content_1.default, { content: message.thread.lastMessage.content.length > 128
                    ? message.thread.lastMessage.content.substring(0, 125) + '...'
                    : message.thread.lastMessage.content, context: Object.assign(Object.assign({}, context), { type: content_1.RenderType.REPLY }) }))) : (`Thread messages not saved.`)))));
}
//# sourceMappingURL=message.js.map