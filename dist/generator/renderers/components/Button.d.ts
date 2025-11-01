import React from 'react';
interface DiscordButtonProps {
    type: string;
    url?: string;
    emoji?: string;
    children: React.ReactNode;
}
export declare function DiscordButton({ type, url, emoji, children }: DiscordButtonProps): React.JSX.Element;
export default DiscordButton;
