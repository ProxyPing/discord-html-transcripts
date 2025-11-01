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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DiscordMessages;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const content_1 = __importStar(require("./renderers/content"));
const message_1 = __importDefault(require("./renderers/message"));
const styles_1 = require("./renderers/components/styles");
/**
 * The core transcript component.
 * Expects window.$discordMessage.profiles to be set for profile information.
 *
 * @param props Messages, channel details, callbacks, etc.
 * @returns
 */
async function DiscordMessages(_a) {
    var _b, _c, _d, _e, _f;
    var { messages, channel, callbacks } = _a, options = __rest(_a, ["messages", "channel", "callbacks"]);
    return (react_1.default.createElement(discord_components_react_1.DiscordMessages, { style: { minHeight: '100vh' } },
        react_1.default.createElement("style", { dangerouslySetInnerHTML: { __html: styles_1.globalStyles } }),
        react_1.default.createElement(discord_components_react_1.DiscordHeader, { guild: channel.isDMBased() ? 'Direct Messages' : channel.guild.name, channel: channel.isDMBased()
                ? channel.type === discord_js_1.ChannelType.DM
                    ? ((_c = (_b = channel.recipient) === null || _b === void 0 ? void 0 : _b.tag) !== null && _c !== void 0 ? _c : 'Unknown Recipient')
                    : 'Unknown Recipient'
                : channel.name, icon: channel.isDMBased() ? undefined : ((_d = channel.guild.iconURL({ size: 128 })) !== null && _d !== void 0 ? _d : undefined) }, channel.isThread() ? (`Thread channel in ${(_f = (_e = channel.parent) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : 'Unknown Channel'}`) : channel.isDMBased() ? (`Direct Messages`) : channel.isVoiceBased() ? (`Voice Text Channel for ${channel.name}`) : channel.type === discord_js_1.ChannelType.GuildCategory ? (`Category Channel`) : 'topic' in channel && channel.topic ? (react_1.default.createElement(content_1.default, { content: channel.topic, context: Object.assign({ messages, channel, callbacks, type: content_1.RenderType.REPLY }, options) })) : (`This is the start of #${channel.name} channel.`)),
        messages.map((message) => (react_1.default.createElement(message_1.default, { message: message, context: Object.assign({ messages, channel, callbacks }, options), key: message.id })))));
}
//# sourceMappingURL=transcript.js.map