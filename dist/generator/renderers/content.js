"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderType = void 0;
exports.default = MessageContent;
exports.MessageSingleASTNode = MessageSingleASTNode;
exports.getChannelType = getChannelType;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_markdown_parser_1 = __importDefault(require("discord-markdown-parser"));
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils/utils");
var RenderType;
(function (RenderType) {
    RenderType[RenderType["EMBED"] = 0] = "EMBED";
    RenderType[RenderType["REPLY"] = 1] = "REPLY";
    RenderType[RenderType["NORMAL"] = 2] = "NORMAL";
    RenderType[RenderType["WEBHOOK"] = 3] = "WEBHOOK";
})(RenderType || (exports.RenderType = RenderType = {}));
/**
 * Renders discord markdown content
 * @param content - The content to render
 * @param context - The context to render the content in
 * @returns
 */
async function MessageContent({ content, context }) {
    if (context.type === RenderType.REPLY && content.length > 180)
        content = content.slice(0, 180) + '...';
    // parse the markdown
    const parsed = (0, discord_markdown_parser_1.default)(content, context.type === RenderType.EMBED || context.type === RenderType.WEBHOOK ? 'extended' : 'normal');
    // check if the parsed content is only emojis
    const isOnlyEmojis = parsed.every((node) => ['emoji', 'twemoji'].includes(node.type) || (node.type === 'text' && node.content.trim().length === 0));
    if (isOnlyEmojis) {
        // now check if there are less than or equal to 25 emojis
        const emojis = parsed.filter((node) => ['emoji', 'twemoji'].includes(node.type));
        if (emojis.length <= 25) {
            context._internal = {
                largeEmojis: true,
            };
        }
    }
    return react_1.default.createElement(MessageASTNodes, { nodes: parsed, context: context });
}
// This function can probably be combined into the MessageSingleASTNode function
async function MessageASTNodes({ nodes, context, }) {
    if (Array.isArray(nodes)) {
        return (react_1.default.createElement(react_1.default.Fragment, null, nodes.map((node, i) => (react_1.default.createElement(MessageSingleASTNode, { node: node, context: context, key: i })))));
    }
    else {
        return react_1.default.createElement(MessageSingleASTNode, { node: nodes, context: context });
    }
}
async function MessageSingleASTNode({ node, context }) {
    var _a, _b;
    if (!node)
        return null;
    const type = node.type;
    switch (type) {
        case 'text':
            return node.content;
        case 'link':
            return (react_1.default.createElement("a", { href: node.target },
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        case 'url':
        case 'autolink':
            return (react_1.default.createElement("a", { href: node.target, target: "_blank", rel: "noreferrer" },
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        case 'blockQuote':
            if (context.type === RenderType.REPLY) {
                return react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context });
            }
            return (react_1.default.createElement(discord_components_react_1.DiscordQuote, null,
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        case 'br':
        case 'newline':
            if (context.type === RenderType.REPLY)
                return ' ';
            return react_1.default.createElement("br", null);
        case 'channel': {
            const id = node.id;
            const channel = await context.callbacks.resolveChannel(id);
            return (react_1.default.createElement(discord_components_react_1.DiscordMention, { type: channel ? (channel.isDMBased() ? 'channel' : getChannelType(channel.type)) : 'channel' }, channel ? (channel.isDMBased() ? 'DM Channel' : channel.name) : `<#${id}>`));
        }
        case 'role': {
            const id = node.id;
            const role = await context.callbacks.resolveRole(id);
            return (react_1.default.createElement(discord_components_react_1.DiscordMention, { type: "role", color: context.type === RenderType.REPLY ? undefined : role === null || role === void 0 ? void 0 : role.hexColor }, role ? role.name : `<@&${id}>`));
        }
        case 'user': {
            const id = node.id;
            const user = await context.callbacks.resolveUser(id);
            return react_1.default.createElement(discord_components_react_1.DiscordMention, { type: "user" }, user ? ((_a = user.displayName) !== null && _a !== void 0 ? _a : user.username) : `<@${id}>`);
        }
        case 'here':
        case 'everyone':
            return (react_1.default.createElement(discord_components_react_1.DiscordMention, { type: 'role', highlight: true }, `@${type}`));
        case 'codeBlock':
            if (context.type !== RenderType.REPLY) {
                return react_1.default.createElement(discord_components_react_1.DiscordCodeBlock, { language: node.lang, code: node.content });
            }
            return react_1.default.createElement(discord_components_react_1.DiscordInlineCode, null, node.content);
        case 'inlineCode':
            return react_1.default.createElement(discord_components_react_1.DiscordInlineCode, null, node.content);
        case 'em':
            return (react_1.default.createElement(discord_components_react_1.DiscordItalic, null,
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        case 'strong':
            return (react_1.default.createElement(discord_components_react_1.DiscordBold, null,
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        case 'underline':
            return (react_1.default.createElement(discord_components_react_1.DiscordUnderlined, null,
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        case 'strikethrough':
            return (react_1.default.createElement("s", null,
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        case 'emoticon':
            return typeof node.content === 'string' ? (node.content) : (react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context }));
        case 'spoiler':
            return (react_1.default.createElement(discord_components_react_1.DiscordSpoiler, null,
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        case 'emoji':
        case 'twemoji':
            return (react_1.default.createElement(discord_components_react_1.DiscordCustomEmoji, { name: node.name, url: (0, utils_1.parseDiscordEmoji)(node), embedEmoji: context.type === RenderType.EMBED, largeEmoji: (_b = context._internal) === null || _b === void 0 ? void 0 : _b.largeEmojis }));
        case 'timestamp':
            return react_1.default.createElement(discord_components_react_1.DiscordTime, { timestamp: parseInt(node.timestamp) * 1000, format: node.format });
        case 'heading':
            // Discord markdown headings (# text) - render as bold text with line break
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(discord_components_react_1.DiscordBold, null,
                    react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })),
                context.type !== RenderType.REPLY && react_1.default.createElement("br", null)));
        case 'subtext':
            // Discord subtext markdown (-# text) - render as smaller/lighter text
            return (react_1.default.createElement("span", { style: { fontSize: '0.875em', opacity: 0.8 } },
                react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context })));
        default: {
            console.log(`Unknown node type: ${type}`, node);
            return typeof node.content === 'string' ? (node.content) : (react_1.default.createElement(MessageASTNodes, { nodes: node.content, context: context }));
        }
    }
}
function getChannelType(channelType) {
    switch (channelType) {
        case discord_js_1.ChannelType.GuildCategory:
        case discord_js_1.ChannelType.GuildAnnouncement:
        case discord_js_1.ChannelType.GuildText:
        case discord_js_1.ChannelType.DM:
        case discord_js_1.ChannelType.GroupDM:
        case discord_js_1.ChannelType.GuildDirectory:
        case discord_js_1.ChannelType.GuildMedia:
            return 'channel';
        case discord_js_1.ChannelType.GuildVoice:
        case discord_js_1.ChannelType.GuildStageVoice:
            return 'voice';
        case discord_js_1.ChannelType.PublicThread:
        case discord_js_1.ChannelType.PrivateThread:
        case discord_js_1.ChannelType.AnnouncementThread:
            return 'thread';
        case discord_js_1.ChannelType.GuildForum:
            return 'forum';
        default:
            return 'channel';
    }
}
//# sourceMappingURL=content.js.map