import z, { ZodRawShape } from 'zod';
import { defaultPaths } from '../../../utils/content';

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
      .describe('Update version in deno.json (Deno project).')
      .optional(),
  })
  .describe('Defines which manifest files to update their version fields.');

export type Targets = z.infer<typeof TargetsSchema>;
export type TargetKeys = keyof Targets;
export type TargetVersionMap = Partial<Record<TargetKeys, string | null>>;

const TargetsPathShape = Object.fromEntries(
  Object.entries(defaultPaths).map(([k, v]) => [
    k,
    z.string().default(v).describe(`Path for ${k} manifest file.`).optional(),
  ]),
) satisfies ZodRawShape;

export const TargetsPathSchema = z
  .object(TargetsPathShape)
  .describe('Defines custom paths to manifest files for each target.');
