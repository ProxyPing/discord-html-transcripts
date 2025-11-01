"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const discord_js_1 = require("discord.js");
const utils_1 = require("../../../utils/utils");
const utils_2 = require("./utils");
function DiscordSelectMenu({ component, }) {
    const isStringSelect = component.type === discord_js_1.ComponentType.StringSelect;
    const placeholder = component.placeholder || (0, utils_2.getSelectTypeLabel)(component.type);
    return (react_1.default.createElement("div", { className: "discord-select-menu" },
        react_1.default.createElement("div", { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, placeholder),
        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', marginLeft: '8px' } },
            react_1.default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24" },
                react_1.default.createElement("path", { fill: "currentColor", d: "M7 10L12 15L17 10H7Z" }))),
        isStringSelect && component.options && component.options.length > 0 && (react_1.default.createElement("div", { style: {
                display: 'none',
                position: 'absolute',
                top: '44px',
                left: '0',
                width: '100%',
                backgroundColor: '#2b2d31',
                borderRadius: '4px',
                zIndex: 10,
                border: '1px solid #1e1f22',
                maxHeight: '320px',
                overflowY: 'auto',
            } }, component.options.map((option, idx) => (react_1.default.createElement("div", { key: idx, style: {
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                borderBottom: idx < component.options.length - 1 ? '1px solid #1e1f22' : 'none',
            } },
            option.emoji && react_1.default.createElement("span", { style: { marginRight: '8px' } }, (0, utils_1.parseDiscordEmoji)(option.emoji)),
            react_1.default.createElement("span", null, option.label))))))));
}
exports.default = DiscordSelectMenu;
//# sourceMappingURL=Select%20Menu.js.map