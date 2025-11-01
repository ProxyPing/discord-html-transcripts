import { ChannelType } from 'discord.js';
import React from 'react';
import type { SingleASTNode } from 'simple-markdown';
import type { RenderMessageContext } from '../';
export declare enum RenderType {
    EMBED = 0,
    REPLY = 1,
    NORMAL = 2,
    WEBHOOK = 3
}
type RenderContentContext = RenderMessageContext & {
    type: RenderType;
    _internal?: {
        largeEmojis?: boolean;
    };
};
/**
 * Renders discord markdown content
 * @param content - The content to render
 * @param context - The context to render the content in
 * @returns
 */
export default function MessageContent({ content, context }: {
    content: string;
    context: RenderContentContext;
}): Promise<React.JSX.Element>;
export declare function MessageSingleASTNode({ node, context }: {
    node: SingleASTNode;
    context: RenderContentContext;
}): Promise<any>;
export declare function getChannelType(channelType: ChannelType): 'channel' | 'voice' | 'thread' | 'forum';
export {};
