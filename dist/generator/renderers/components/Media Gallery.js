"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const utils_1 = require("./utils");
function DiscordMediaGallery({ component }) {
    if (!component.items || component.items.length === 0) {
        return null;
    }
    const count = component.items.length;
    const imagesToShow = component.items.slice(0, 10);
    const hasMore = component.items.length > 10;
    return (react_1.default.createElement("div", { style: (0, utils_1.getGalleryLayout)(count) }, imagesToShow.map((media, idx) => (react_1.default.createElement("div", { key: idx, style: (0, utils_1.getImageStyle)(idx, count) },
        react_1.default.createElement("img", { src: media.media.url, alt: media.description || 'Media content', style: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            } }),
        hasMore && idx === imagesToShow.length - 1 && (react_1.default.createElement("div", { style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
            } },
            "+",
            component.items.length - 10)))))));
}
exports.default = DiscordMediaGallery;
//# sourceMappingURL=Media%20Gallery.js.map