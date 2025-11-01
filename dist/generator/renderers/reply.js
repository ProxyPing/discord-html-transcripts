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
exports.default = MessageReply;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const content_1 = __importStar(require("./content"));
async function MessageReply({ message, context }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (!message.reference)
        return null;
    if (message.reference.guildId !== ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.id))
        return null;
    const referencedMessage = context.messages.find((m) => m.id === message.reference.messageId);
    if (!referencedMessage)
        return react_1.default.createElement(discord_components_react_1.DiscordReply, { slot: "reply" }, "Message could not be loaded.");
    const isCrossPost = referencedMessage.reference && referencedMessage.reference.guildId !== ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.id);
    const isCommand = referencedMessage.interaction !== null;
    return (react_1.default.createElement(discord_components_react_1.DiscordReply, { slot: "reply", edited: !isCommand && referencedMessage.editedAt !== null, attachment: referencedMessage.attachments.size > 0, author: (_e = (_d = (_c = referencedMessage.member) === null || _c === void 0 ? void 0 : _c.nickname) !== null && _d !== void 0 ? _d : referencedMessage.author.displayName) !== null && _e !== void 0 ? _e : referencedMessage.author.username, avatar: (_f = referencedMessage.author.avatarURL({ size: 32 })) !== null && _f !== void 0 ? _f : undefined, roleColor: (_h = (_g = referencedMessage.member) === null || _g === void 0 ? void 0 : _g.displayHexColor) !== null && _h !== void 0 ? _h : undefined, bot: !isCrossPost && referencedMessage.author.bot, verified: (_j = referencedMessage.author.flags) === null || _j === void 0 ? void 0 : _j.has(discord_js_1.UserFlags.VerifiedBot), op: ((_l = (_k = message === null || message === void 0 ? void 0 : message.channel) === null || _k === void 0 ? void 0 : _k.isThread) === null || _l === void 0 ? void 0 : _l.call(_k)) && referencedMessage.author.id === ((_m = message === null || message === void 0 ? void 0 : message.channel) === null || _m === void 0 ? void 0 : _m.ownerId), server: isCrossPost !== null && isCrossPost !== void 0 ? isCrossPost : undefined, command: isCommand }, referencedMessage.content ? (react_1.default.createElement("span", { "data-goto": referencedMessage.id },
        react_1.default.createElement(content_1.default, { content: referencedMessage.content, context: Object.assign(Object.assign({}, context), { type: content_1.RenderType.REPLY }) }))) : isCommand ? (react_1.default.createElement("em", { "data-goto": referencedMessage.id }, "Click to see command.")) : (react_1.default.createElement("em", { "data-goto": referencedMessage.id }, "Click to see attachment."))));
}
//# sourceMappingURL=reply.js.map