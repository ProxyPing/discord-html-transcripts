"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalStyles = exports.ButtonStyleMapping = exports.baseImageStyle = exports.containerStyle = void 0;
const discord_js_1 = require("discord.js");
// Container styles
exports.containerStyle = {
    display: 'grid',
    gap: '4px',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
};
// Base image style
exports.baseImageStyle = {
    overflow: 'hidden',
    position: 'relative',
    background: '#2b2d31',
};
// Button style mapping
exports.ButtonStyleMapping = {
    [discord_js_1.ButtonStyle.Primary]: 'primary',
    [discord_js_1.ButtonStyle.Secondary]: 'secondary',
    [discord_js_1.ButtonStyle.Success]: 'success',
    [discord_js_1.ButtonStyle.Danger]: 'destructive',
    [discord_js_1.ButtonStyle.Link]: 'secondary',
};
exports.globalStyles = `
  .discord-container {
    display: grid;
    gap: 4px;
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    overflow: hidden;
  }

  .discord-base-image {
    overflow: hidden;
    position: relative;
    background: #2b2d31;
  }

  .discord-button {
    color: #ffffff !important;
    padding: 2px 16px;
    border-radius: 8px;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    height: 32px;
    min-height: 32px;
    min-width: 60px;
    cursor: pointer;
    font-family: Whitney, "Helvetica Neue", Helvetica, Arial, sans-serif;
    text-align: center;
    box-sizing: border-box;
    border: none;
    outline: none;
    transition: background-color 0.2s ease;
  }

  .discord-button-primary {
    background-color: hsl(234.935 calc(1*85.556%) 64.706% /1);
  }

  .discord-button-secondary {
    background-color: hsl(240 calc(1*4%) 60.784% /0.12156862745098039);
  }

  .discord-button-success {
    background-color: hsl(145.97 calc(1*100%) 26.275% /1);
  }

  .discord-button-destructive {
    background-color: hsl(355.636 calc(1*64.706%) 50% /1);
  }

  .discord-select-menu {
    margin-top: 2px;
    margin-bottom: 2px;
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 40px;
    background-color: #2b2d31;
    border-radius: 4px;
    color: #b5bac1;
    cursor: pointer;
    font-family: Whitney, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    justify-content: space-between;
    box-sizing: border-box;
    border: 1px solid #1e1f22;
  }
`;
//# sourceMappingURL=styles.js.map