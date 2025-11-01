import { type Message as MessageType } from 'discord.js';
import React from 'react';
import type { RenderMessageContext } from '..';
export default function DiscordMessage({ message, context, }: {
    message: MessageType;
    context: RenderMessageContext;
}): Promise<React.JSX.Element>;
