"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInlineIndex = calculateInlineIndex;
function calculateInlineIndex(fields, currentFieldIndex) {
    const startIndex = currentFieldIndex - 1;
    for (let i = startIndex; i >= 0; i--) {
        const field = fields[i];
        if (!field || field.inline === undefined)
            continue;
        if (field.inline === false) {
            const amount = startIndex - i;
            return (amount % 3) + 1;
        }
    }
    return (currentFieldIndex % 3) + 1;
}
//# sourceMappingURL=embeds.js.map