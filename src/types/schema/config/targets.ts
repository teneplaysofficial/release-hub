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

const defaultPaths: Record<TargetKeys, string> = {
  node: './package.json',
  jsr: './jsr.json',
  deno: './deno.json',
};

export const TargetsPathSchema = z
  .object(
    Object.fromEntries(
      Object.entries(defaultPaths).map(([k, v]) => [
        k,
        z.string().default(v).describe(`Path for ${k} manifest file.`).optional(),
      ]),
    ),
  )
  .describe('Defines custom paths to manifest files for each target.');
