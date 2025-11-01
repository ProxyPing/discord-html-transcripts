"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const discord_js_1 = require("discord.js");
function DiscordSeparator({ divider, spacing }) {
    return (react_1.default.createElement("div", { style: {
            width: '100%',
            height: divider ? '1px' : '0px',
            backgroundColor: '#4f5359',
            margin: spacing === discord_js_1.SeparatorSpacingSize.Large ? '8px 0' : '0',
        } }));
}
exports.default = DiscordSeparator;
//# sourceMappingURL=Spacing.js.map