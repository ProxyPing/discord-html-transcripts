"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function DiscordThumbnail({ url }) {
    return (react_1.default.createElement("img", { src: url, alt: "Thumbnail", style: {
            width: '85px',
            height: '85px',
            objectFit: 'cover',
            borderRadius: '8px',
        } }));
}
exports.default = DiscordThumbnail;
//# sourceMappingURL=Thumbnail.js.map