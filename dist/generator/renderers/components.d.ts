import { type ThumbnailComponent, type MessageActionRowComponent, type TopLevelComponent } from 'discord.js';
import React from 'react';
import type { RenderMessageContext } from '..';
export default function ComponentRow({ component, id, context, }: {
    component: TopLevelComponent;
    id: number;
    context: RenderMessageContext;
}): React.JSX.Element | null;
export declare function Component({ component, id, }: {
    component: MessageActionRowComponent | ThumbnailComponent;
    id: number;
}): React.JSX.Element | undefined;
