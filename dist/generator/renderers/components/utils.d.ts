import { ComponentType } from 'discord.js';
export declare function getSelectTypeLabel(type: ComponentType): string;
/**
 * Gets the grid layout for media galleries based on count
 */
export declare function getGalleryLayout(count: number): {
    gridTemplateColumns: string;
    gridTemplateRows: string;
    display: "grid";
    gap: string;
    width: string;
    maxWidth: string;
    borderRadius: string;
    overflow: "hidden";
};
/**
 * Gets the style for an individual image based on its position and total count
 */
export declare function getImageStyle(idx: number, count: number): {
    overflow: "hidden";
    position: "relative";
    background: string;
} | {
    gridRow: string;
    gridColumn: string;
    aspectRatio: string;
    overflow: "hidden";
    position: "relative";
    background: string;
} | {
    gridRow: string;
    gridColumn: string;
    overflow: "hidden";
    position: "relative";
    background: string;
};
