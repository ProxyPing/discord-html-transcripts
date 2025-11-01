import React from 'react';
import type { ButtonComponent, ThumbnailComponent } from 'discord.js';
interface DiscordSectionProps {
    children: React.ReactNode;
    accessory?: ButtonComponent | ThumbnailComponent;
    id: number;
}
declare function DiscordSection({ children, accessory, id }: DiscordSectionProps): React.JSX.Element;
export default DiscordSection;
