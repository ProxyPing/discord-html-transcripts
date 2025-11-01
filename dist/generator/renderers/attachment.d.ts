import React from 'react';
import type { Attachment as AttachmentType, Message } from 'discord.js';
import type { RenderMessageContext } from '..';
/**
 * Renders all attachments for a message
 * @param message
 * @param context
 * @returns
 */
export declare function Attachments(props: {
    message: Message;
    context: RenderMessageContext;
}): Promise<React.JSX.Element>;
/**
 * Renders one Discord Attachment
 * @param props - the attachment and rendering context
 */
export declare function Attachment({ attachment, context, message, }: {
    attachment: AttachmentType;
    context: RenderMessageContext;
    message: Message;
}): Promise<React.JSX.Element>;
