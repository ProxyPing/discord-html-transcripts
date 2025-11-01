"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectTypeLabel = getSelectTypeLabel;
exports.getGalleryLayout = getGalleryLayout;
exports.getImageStyle = getImageStyle;
const discord_js_1 = require("discord.js");
const styles_1 = require("./styles");
/**
 * Gets the appropriate label for different select menu types
 */
const SELECT_LABEL_MAP = {
    [discord_js_1.ComponentType.UserSelect]: 'Select User',
    [discord_js_1.ComponentType.RoleSelect]: 'Select Role',
    [discord_js_1.ComponentType.MentionableSelect]: 'Select Mentionable',
    [discord_js_1.ComponentType.ChannelSelect]: 'Select Channel',
    [discord_js_1.ComponentType.StringSelect]: 'Make a Selection',
};
function getSelectTypeLabel(type) {
    var _a;
    return (_a = SELECT_LABEL_MAP[type]) !== null && _a !== void 0 ? _a : 'Select Option';
}
/**
 * Gets the grid layout for media galleries based on count
 */
function getGalleryLayout(count) {
    switch (count) {
        case 1:
            return Object.assign(Object.assign({}, styles_1.containerStyle), { gridTemplateColumns: '1fr', gridTemplateRows: 'auto' });
        case 2:
            return Object.assign(Object.assign({}, styles_1.containerStyle), { gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto' });
        case 3:
        case 4:
            return Object.assign(Object.assign({}, styles_1.containerStyle), { gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' });
        case 5:
            return Object.assign(Object.assign({}, styles_1.containerStyle), { gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto' });
        default:
            if (count >= 7) {
                return Object.assign(Object.assign({}, styles_1.containerStyle), { gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto auto auto' });
            }
            else {
                return Object.assign(Object.assign({}, styles_1.containerStyle), { gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto' });
            }
    }
}
/**
 * Gets the style for an individual image based on its position and total count
 */
function getImageStyle(idx, count) {
    switch (count) {
        case 3:
            if (idx === 0) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '1 / span 2', gridColumn: '1', aspectRatio: '1/2' });
            }
            break;
        case 5:
            if (idx < 2) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '1', gridColumn: idx === 0 ? '1 / span 2' : '3' });
            }
            else {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '2', gridColumn: `${idx - 2 + 1}` });
            }
        case 7:
            if (idx === 0) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '1', gridColumn: '1 / span 3' });
            }
            else if (idx <= 3) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '2', gridColumn: `${idx - 0}` });
            }
            else {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '3', gridColumn: `${idx - 3}` });
            }
        case 8:
            if (idx < 2) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '1', gridColumn: idx === 0 ? '1 / span 2' : '3' });
            }
            else if (idx < 5) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '2', gridColumn: `${idx - 2 + 1}` });
            }
            else {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '3', gridColumn: `${idx - 5 + 1}` });
            }
        case 10:
            if (idx === 0) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '1', gridColumn: '1 / span 3' });
            }
            else if (idx <= 3) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '2', gridColumn: `${idx - 0}` });
            }
            else if (idx <= 6) {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '3', gridColumn: `${idx - 3}` });
            }
            else {
                return Object.assign(Object.assign({}, styles_1.baseImageStyle), { gridRow: '4', gridColumn: `${idx - 6}` });
            }
    }
    return styles_1.baseImageStyle;
}
//# sourceMappingURL=utils.js.map