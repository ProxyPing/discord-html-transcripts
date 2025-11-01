import React from 'react';
import { type MessageActionRowComponent, ComponentType } from 'discord.js';
declare function DiscordSelectMenu({ component, }: {
    component: Exclude<MessageActionRowComponent, {
        type: ComponentType.Button;
    }>;
}): React.JSX.Element;
export default DiscordSelectMenu;
