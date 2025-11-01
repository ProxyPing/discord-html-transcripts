"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const components_1 = require("../../components");
const SectionContent_1 = __importDefault(require("./SectionContent"));
const SectionAccessory_1 = __importDefault(require("./SectionAccessory"));
function DiscordSection({ children, accessory, id }) {
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            maxWidth: '500px',
        } },
        react_1.default.createElement(SectionContent_1.default, null, children),
        react_1.default.createElement(SectionAccessory_1.default, null, accessory && react_1.default.createElement(components_1.Component, { component: accessory, id: id }))));
}
exports.default = DiscordSection;
//# sourceMappingURL=Section.js.map