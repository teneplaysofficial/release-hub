import z from 'zod';
import { TargetsSchema } from './targets';
import { SyncSchema } from './sync';
import { HooksSchema } from './hooks';
import { StableReleaseTypeSchema } from '../release';

export const ConfigSchema = z
  .object({
    $schema: z.string().optional().describe('Path to the JSON schema for IDE autocompletion.'),
    dryRun: z
      .boolean()
      .default(false)
      .describe('Run commands in dry-run mode without making actual changes.')
      .optional(),
    defaultReleaseType: StableReleaseTypeSchema.default('patch')
      .describe('Default release type')
      .optional(),
    targets: TargetsSchema.default(TargetsSchema.parse({})).optional(),
    sync: SyncSchema.optional(),
    hooks: HooksSchema.optional(),
  })
  .strict();
