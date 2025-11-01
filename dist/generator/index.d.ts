import { type Awaitable, type Channel, type Message, type Role, type User } from 'discord.js';
import type { ResolveImageCallback } from '../downloader/images';
export type RenderMessageContext = {
    messages: Message[];
    channel: Channel;
    callbacks: {
        resolveImageSrc: ResolveImageCallback;
        resolveChannel: (channelId: string) => Awaitable<Channel | null>;
        resolveUser: (userId: string) => Awaitable<User | null>;
        resolveRole: (roleId: string) => Awaitable<Role | null>;
    };
    saveImages: boolean;
    favicon: 'guild' | string;
    hydrate: boolean;
};
export default function render({ messages, channel, callbacks, ...options }: RenderMessageContext): Promise<string>;
