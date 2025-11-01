"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComponentRow;
exports.Component = Component;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils/utils");
const Select_Menu_1 = __importDefault(require("./components/Select Menu"));
const Container_1 = __importDefault(require("./components/Container"));
const Section_1 = __importDefault(require("./components/section/Section"));
const Media_Gallery_1 = __importDefault(require("./components/Media Gallery"));
const Spacing_1 = __importDefault(require("./components/Spacing"));
const Button_1 = __importDefault(require("./components/Button"));
const Thumbnail_1 = __importDefault(require("./components/Thumbnail"));
const content_1 = __importDefault(require("./content"));
const content_2 = require("./content");
const styles_1 = require("./components/styles");
function ComponentRow({ component, id, context, }) {
    switch (component.type) {
        case discord_js_1.ComponentType.ActionRow:
            return (react_1.default.createElement(discord_components_react_1.DiscordActionRow, { key: id },
                react_1.default.createElement(react_1.default.Fragment, null, component.components.map((nestedComponent, id) => (react_1.default.createElement(Component, { component: nestedComponent, id: id, key: id }))))));
        case discord_js_1.ComponentType.Container:
            return (react_1.default.createElement(Container_1.default, { key: id },
                react_1.default.createElement(react_1.default.Fragment, null, component.components.map((nestedComponent, id) => (react_1.default.createElement(ComponentRow, { component: nestedComponent, id: id, key: id, context: context }))))));
        case discord_js_1.ComponentType.File:
            return (react_1.default.createElement(react_1.default.Fragment, null, component.spoiler ? (react_1.default.createElement(discord_components_react_1.DiscordSpoiler, { key: component.id, slot: "attachment" },
                react_1.default.createElement(discord_components_react_1.DiscordAttachment, { type: "file", key: component.id, slot: "attachment", url: component.file.url, alt: "Discord Attachment" }))) : (react_1.default.createElement(discord_components_react_1.DiscordAttachment, { type: "file", key: component.id, slot: "attachment", url: component.file.url, alt: "Discord Attachment" }))));
        case discord_js_1.ComponentType.MediaGallery:
            return react_1.default.createElement(Media_Gallery_1.default, { component: component, key: id });
        case discord_js_1.ComponentType.Section:
            return (react_1.default.createElement(Section_1.default, { key: id, accessory: component.accessory, id: id }, component.components.map((nestedComponent, id) => (react_1.default.createElement(ComponentRow, { component: nestedComponent, id: id, key: id, context: context })))));
        case discord_js_1.ComponentType.Separator:
            return react_1.default.createElement(Spacing_1.default, { key: id, spacing: component.spacing, divider: component.divider });
        case discord_js_1.ComponentType.TextDisplay:
            return react_1.default.createElement(content_1.default, { key: id, content: component.content, context: Object.assign(Object.assign({}, context), { type: content_2.RenderType.NORMAL }) });
        default:
            return null;
    }
}
function Component({ component, id, }) {
    var _a;
    switch (component.type) {
        case discord_js_1.ComponentType.Button:
            return (react_1.default.createElement(Button_1.default, { key: id, type: styles_1.ButtonStyleMapping[component.style], url: (_a = component.url) !== null && _a !== void 0 ? _a : undefined, emoji: component.emoji ? (0, utils_1.parseDiscordEmoji)(component.emoji) : undefined }, component.label));
        case discord_js_1.ComponentType.StringSelect:
        case discord_js_1.ComponentType.UserSelect:
        case discord_js_1.ComponentType.RoleSelect:
        case discord_js_1.ComponentType.MentionableSelect:
        case discord_js_1.ComponentType.ChannelSelect:
            return react_1.default.createElement(Select_Menu_1.default, { key: id, component: component });
        case discord_js_1.ComponentType.Thumbnail:
            return react_1.default.createElement(Thumbnail_1.default, { key: id, url: component.media.url });
        default:
            return undefined;
    }
}
//# sourceMappingURL=components.js.map