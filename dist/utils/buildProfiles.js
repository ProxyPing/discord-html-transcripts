"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProfiles = buildProfiles;
const discord_js_1 = require("discord.js");
async function buildProfiles(messages) {
    const profiles = {};
    // loop through messages
    for (const message of messages) {
        // add all users
        const author = message.author;
        if (!profiles[author.id]) {
            // add profile
            profiles[author.id] = buildProfile(message.member, author);
        }
        // add interaction users
        if (message.interaction) {
            const user = message.interaction.user;
            if (!profiles[user.id]) {
                profiles[user.id] = buildProfile(null, user);
            }
        }
        // threads
        if (message.thread && message.thread.lastMessage) {
            profiles[message.thread.lastMessage.author.id] = buildProfile(message.thread.lastMessage.member, message.thread.lastMessage.author);
        }
    }
    // return as a JSON
    return profiles;
}
function buildProfile(member, author) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
        author: (_b = (_a = member === null || member === void 0 ? void 0 : member.nickname) !== null && _a !== void 0 ? _a : author.displayName) !== null && _b !== void 0 ? _b : author.username,
        avatar: (_c = member === null || member === void 0 ? void 0 : member.displayAvatarURL({ size: 64 })) !== null && _c !== void 0 ? _c : author.displayAvatarURL({ size: 64 }),
        roleColor: member === null || member === void 0 ? void 0 : member.displayHexColor,
        roleIcon: (_e = (_d = member === null || member === void 0 ? void 0 : member.roles.icon) === null || _d === void 0 ? void 0 : _d.iconURL()) !== null && _e !== void 0 ? _e : undefined,
        roleName: (_g = (_f = member === null || member === void 0 ? void 0 : member.roles.hoist) === null || _f === void 0 ? void 0 : _f.name) !== null && _g !== void 0 ? _g : undefined,
        bot: author.bot,
        verified: (_h = author.flags) === null || _h === void 0 ? void 0 : _h.has(discord_js_1.UserFlags.VerifiedBot),
    };
}
//# sourceMappingURL=buildProfiles.js.map