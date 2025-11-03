import z from 'zod';

type HookPhase = 'before' | 'after';
type HookEvent = 'init' | 'version' | 'commit' | 'tag' | 'push' | 'release' | 'publish';
type HookPublishTarget = 'npm' | 'jsr';

export type HookName = `${HookPhase}:${HookEvent}` | `${HookPhase}:publish:${HookPublishTarget}`;

export const HooksSchema = z
  .record(
    z.string().regex(/^(before|after):(init|version|commit|tag|push|publish(?::(npm|jsr))?)$/, {
      error: 'Hook key must match pattern',
    }),
    z.union([z.string(), z.array(z.string())]),
  )
  .describe(
    'Shell commands to run at various lifecycle stages. Each key is a lifecycle hook name and the value is the command(s) to run.',
  );

export type Hooks = z.infer<typeof HooksSchema>;
