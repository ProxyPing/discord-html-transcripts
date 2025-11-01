# Discord HTML Transcripts - AI Agent Instructions

## Project Overview

This is a **React SSR-based HTML transcript generator** for Discord.js v14/v15. It uses React components to render Discord messages into static HTML files that can be viewed in browsers, preserving Discord's visual styling and markdown formatting.

### Architecture Pattern: React SSR → Static HTML

The core workflow is:

1. **Discord.js Messages** → passed to React components
2. **React SSR** (`prerenderToNodeStream`) → generates HTML markup
3. **Two rendering modes**:
   - **Default (CDN mode)**: Loads `@derockdev/discord-components-core` web components from CDN
   - **Hydration mode**: Embeds full component library, renders with `renderToString` for fully self-contained HTML

Key files: `src/generator/index.tsx` (SSR orchestration), `src/generator/transcript.tsx` (main component), `src/index.ts` (public API).

## Critical Patterns

### 1. TSX for Server-Side Rendering

All renderer files in `src/generator/renderers/*.tsx` are **React components that run server-side only**. They never execute in a browser. Use `dangerouslySetInnerHTML` for injecting client scripts.

```tsx
// Example: src/generator/transcript.tsx
<DiscordMessagesComponent>
  {messages.map((message) => (
    <DiscordMessage message={message} context={...} />
  ))}
</DiscordMessagesComponent>
```

### 2. Profile System (Critical for Components)

User profiles are pre-built and injected via `window.$discordMessage.profiles` (see `src/utils/buildProfiles.ts`). The `@derockdev/discord-components-core` library reads this global. **Never** serialize full User objects into HTML.

### 3. Image Handling Strategy

Images can be:

- **URLs** (default): Link directly to Discord CDN
- **Base64 embedded** (via `saveImages: true`): Downloads and encodes images using `TranscriptImageDownloader`
- **Custom callback** (via `resolveImageSrc`): User-defined resolution logic

See `src/downloader/images.ts` for the builder pattern implementation with optional `sharp` compression.

### 4. Context Threading Pattern

Most renderers receive a `RenderMessageContext` object containing:

```typescript
{
  messages: Message[],      // Full message array (for lookups)
  channel: Channel,          // For guild info, channel name
  callbacks: {               // Async resolvers for entities
    resolveImageSrc,
    resolveChannel,
    resolveUser,
    resolveRole
  },
  saveImages: boolean,
  favicon: string,
  hydrate: boolean
}
```

This context is threaded through all renderer components. **Never fetch entities directly** - always use callbacks.

### 5. Discord Markdown Parsing

Uses `discord-markdown-parser` package (see `src/generator/renderers/content.tsx`). Handles:

- Standard markdown (bold, italic, strikethrough)
- Discord-specific syntax (mentions, custom emojis, timestamps)
- Two modes: `'normal'` (user messages) and `'extended'` (embeds/webhooks allow more formatting)

**Large emoji detection**: If content is only emojis (≤25), sets `context._internal.largeEmojis = true` for styling.

## Development Workflows

### Build & Test Commands

```bash
# Build TypeScript → dist/
npm run build

# Run test transcript generation (requires .env with CHANNEL and TOKEN)
npm run test:typescript

# Test component v2 features
npm run test:send-components-v2

# Lint & format
npm run lint

# Type checking without emit
npm run typecheck
```

### Testing Pattern

Test files in `tests/` use live Discord bots to fetch channels and generate transcripts. Create `.env` with:

```
CHANNEL=<channel-id>
TOKEN=<bot-token>
```

Then run `ts-node tests/generate.ts` to test end-to-end.

## Key Conventions

### Return Type Flexibility

Both main APIs (`createTranscript`, `generateFromMessages`) support 3 return types via `ExportReturnType`:

- `'attachment'` (default): Returns `AttachmentBuilder` for Discord.js
- `'buffer'`: Returns raw `Buffer`
- `'string'`: Returns HTML string

Use TypeScript generics to infer return type: `generateFromMessages<ExportReturnType.String>(...)` returns `Promise<string>`.

### Component Library Dependency

Depends on `@derockdev/discord-components-react` and `-core` (web components library). Version is dynamically read from `package.json` at runtime to construct CDN URLs (see `src/generator/index.tsx:14-22`).

### Client-Side Scripts

Static scripts in `src/static/client.ts` are minified strings injected into HTML:

- `scrollToMessage`: Handles click events on message references (data-goto attribute)
- `revealSpoiler`: Adds click handler for spoiler reveals

**Do NOT manually format these** - they're pre-minified. Rebuild from commented source if changes needed.

### XSS Protection

All user content flows through React's JSX escaping or `discord-markdown-parser`. Never use raw HTML insertion for user-generated content. The markdown parser sanitizes input.

## Common Pitfalls

1. **Don't call Discord API directly in renderers** - use callback pattern to respect user-provided resolvers
2. **TypeScript target is ES2017** - avoid newer syntax like optional chaining in production code (check `tsconfig.json`)
3. **Hydration mode requires `@derockdev/discord-components-core/hydrate`** - import path differs from default
4. **pnpm workspace** - uses `pnpm` not npm, respect lockfile
5. **Version check on import** - `src/index.ts:16-24` exits if discord.js version mismatches. Don't remove this guard.

## File Organization

- `src/generator/` - All React SSR components
  - `renderers/` - Individual Discord element renderers (message, embed, attachment, etc.)
  - `renderers/components/` - Discord UI components (buttons, select menus)
- `src/downloader/` - Image downloading and compression utilities
- `src/utils/` - Shared utilities (profiles, emoji parsing, embed calculations)
- `src/static/` - Client-side scripts (minified)
- `tests/` - Live Discord bot tests
