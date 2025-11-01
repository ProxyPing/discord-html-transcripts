"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function DiscordContainer({ children }) {
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            width: '500px',
            flexDirection: 'column',
            backgroundColor: '#3f4248',
            padding: '16px',
            border: '1px solid #4f5359',
            marginTop: '2px',
            marginBottom: '2px',
            borderRadius: '10px',
            gap: '8px',
        } }, children));
}
exports.default = DiscordContainer;
//# sourceMappingURL=Container.js.map