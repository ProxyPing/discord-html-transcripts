"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function SectionAccessory({ children }) {
    if (!children)
        return null;
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            width: '100%',
            maxWidth: '500px',
            justifyContent: 'flex-end',
            alignItems: 'center',
        } }, children));
}
exports.default = SectionAccessory;
//# sourceMappingURL=SectionAccessory.js.map