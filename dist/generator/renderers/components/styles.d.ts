export declare const containerStyle: {
    display: "grid";
    gap: string;
    width: string;
    maxWidth: string;
    borderRadius: string;
    overflow: "hidden";
};
export declare const baseImageStyle: {
    overflow: "hidden";
    position: "relative";
    background: string;
};
export declare const ButtonStyleMapping: {
    readonly 1: "primary";
    readonly 2: "secondary";
    readonly 3: "success";
    readonly 4: "destructive";
    readonly 5: "secondary";
};
export declare const globalStyles = "\n  .discord-container {\n    display: grid;\n    gap: 4px;\n    width: 100%;\n    max-width: 500px;\n    border-radius: 8px;\n    overflow: hidden;\n  }\n\n  .discord-base-image {\n    overflow: hidden;\n    position: relative;\n    background: #2b2d31;\n  }\n\n  .discord-button {\n    color: #ffffff !important;\n    padding: 2px 16px;\n    border-radius: 8px;\n    text-decoration: none !important;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 14px;\n    font-weight: 500;\n    height: 32px;\n    min-height: 32px;\n    min-width: 60px;\n    cursor: pointer;\n    font-family: Whitney, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    text-align: center;\n    box-sizing: border-box;\n    border: none;\n    outline: none;\n    transition: background-color 0.2s ease;\n  }\n\n  .discord-button-primary {\n    background-color: hsl(234.935 calc(1*85.556%) 64.706% /1);\n  }\n\n  .discord-button-secondary {\n    background-color: hsl(240 calc(1*4%) 60.784% /0.12156862745098039);\n  }\n\n  .discord-button-success {\n    background-color: hsl(145.97 calc(1*100%) 26.275% /1);\n  }\n\n  .discord-button-destructive {\n    background-color: hsl(355.636 calc(1*64.706%) 50% /1);\n  }\n\n  .discord-select-menu {\n    margin-top: 2px;\n    margin-bottom: 2px;\n    position: relative;\n    width: 100%;\n    max-width: 500px;\n    height: 40px;\n    background-color: #2b2d31;\n    border-radius: 4px;\n    color: #b5bac1;\n    cursor: pointer;\n    font-family: Whitney, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 14px;\n    display: flex;\n    align-items: center;\n    padding: 0 8px;\n    justify-content: space-between;\n    box-sizing: border-box;\n    border: 1px solid #1e1f22;\n  }\n";
