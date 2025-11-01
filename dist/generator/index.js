"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = render;
const static_1 = require("react-dom/static");
const react_1 = __importDefault(require("react"));
const buildProfiles_1 = require("../utils/buildProfiles");
const client_1 = require("../static/client");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const hydrate_1 = require("@derockdev/discord-components-core/hydrate");
const transcript_1 = __importDefault(require("./transcript"));
const utils_1 = require("../utils/utils");
// read the package.json file and get the @derockdev/discord-components-core version
let discordComponentsVersion = '^3.6.1';
try {
    const packagePath = path_1.default.join(__dirname, '..', '..', 'package.json');
    const packageJSON = JSON.parse((0, fs_1.readFileSync)(packagePath, 'utf8'));
    discordComponentsVersion = (_a = packageJSON.dependencies['@derockdev/discord-components-core']) !== null && _a !== void 0 ? _a : discordComponentsVersion;
    // eslint-disable-next-line no-empty
}
catch (_b) { } // ignore errors
async function render(_a) {
    var _b;
    var { messages, channel, callbacks } = _a, options = __rest(_a, ["messages", "channel", "callbacks"]);
    const profiles = (0, buildProfiles_1.buildProfiles)(messages);
    const { prelude } = await (0, static_1.prerenderToNodeStream)(react_1.default.createElement("html", null,
        react_1.default.createElement("head", null,
            react_1.default.createElement("meta", { charSet: "utf-8" }),
            react_1.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            react_1.default.createElement("link", { rel: "icon", type: "image/png", href: options.favicon === 'guild'
                    ? channel.isDMBased()
                        ? undefined
                        : ((_b = channel.guild.iconURL({ size: 16, extension: 'png' })) !== null && _b !== void 0 ? _b : undefined)
                    : options.favicon }),
            react_1.default.createElement("title", null, channel.isDMBased() ? 'Direct Messages' : channel.name),
            react_1.default.createElement("script", { dangerouslySetInnerHTML: {
                    __html: client_1.scrollToMessage,
                } }),
            !options.hydrate && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("script", { dangerouslySetInnerHTML: {
                        __html: `window.$discordMessage={profiles:${JSON.stringify(await profiles)}}`,
                    } }),
                react_1.default.createElement("script", { type: "module", src: `https://cdn.jsdelivr.net/npm/@derockdev/discord-components-core@${discordComponentsVersion}/dist/derockdev-discord-components-core/derockdev-discord-components-core.esm.js` })))),
        react_1.default.createElement("body", { style: {
                margin: 0,
                minHeight: '100vh',
            } },
            react_1.default.createElement(transcript_1.default, Object.assign({ messages: messages, channel: channel, callbacks: callbacks }, options))),
        options.hydrate && react_1.default.createElement("script", { dangerouslySetInnerHTML: { __html: client_1.revealSpoiler } })));
    const markup = await (0, utils_1.streamToString)(prelude);
    if (options.hydrate) {
        const result = await (0, hydrate_1.renderToString)(markup, {
            beforeHydrate: async (document) => {
                document.defaultView.$discordMessage = {
                    profiles: await profiles,
                };
            },
        });
        return result.html;
    }
    return markup;
}
//# sourceMappingURL=index.js.map