import z from 'zod';

export const TargetsSchema = z
  .object({
    node: z
      .boolean()
      .default(true)
      .describe('Update version in package.json (Node.js).')
      .optional(),
    jsr: z
      .boolean()
      .default(false)
      .describe('Update version in jsr.json (JSR registry).')
      .optional(),
    deno: z
      .boolean()
      .default(false)
      .describe('Update version in deno.json or deno.jsonc (Deno project).')
      .optional(),
  })
  .describe('Defines which manifest files to update their version fields.');

export type Targets = z.infer<typeof TargetsSchema>;
export type TargetKeys = keyof Targets;
export type TargetVersionMap = Partial<Record<TargetKeys, string | null>>;
