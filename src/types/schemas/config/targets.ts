import z from 'zod';
import { DEFAULT_JSON_MANIFEST_FILES_PATH } from '../../../config/constants';

export const TargetsSchema = z
  .object({
    node: z.boolean().default(true).describe('Update version in package.json (Node.js).'),
    jsr: z.boolean().default(false).describe('Update version in jsr.json (JSR registry).'),
    deno: z.boolean().default(false).describe('Update version in deno.json (Deno project).'),
    webext: z
      .boolean()
      .default(false)
      .describe(
        'Update version in any WebExtension manifest.json (Chrome, Firefox, Edge, Opera, Brave, Safari).',
      ),
  })
  .partial()
  .describe('Defines which manifest files to update their version fields.');

export const TargetsPathSchema = z
  .object({
    node: z
      .string()
      .default(DEFAULT_JSON_MANIFEST_FILES_PATH.node as string)
      .describe('Path to the manifest package.json file.'),
    jsr: z
      .string()
      .default(DEFAULT_JSON_MANIFEST_FILES_PATH.jsr as string)
      .describe('Path to the manifest jsr.json file.'),
    deno: z
      .string()
      .default(DEFAULT_JSON_MANIFEST_FILES_PATH.deno as string)
      .describe('Path to the manifest deno.json file.'),
    webext: z
      .string()
      .default(DEFAULT_JSON_MANIFEST_FILES_PATH.webext as string)
      .describe('Path to the manifest manifest.json file.'),
  })
  .partial()
  .describe('Defines where each target’s manifest file is located.');
