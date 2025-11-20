import z from 'zod';
import { TargetsPathSchema, TargetsSchema } from './targets';
import { StableReleaseTypeSchema } from '../release';
import { SyncSchema } from './sync';
import { HooksSchema } from './hooks';

export const ConfigSchema = z
  .object({
    $schema: z.string().optional().describe('Path to the JSON schema for IDE autocompletion.'),
    dryRun: z
      .boolean()
      .default(false)
      .describe('Run commands in dry-run mode without making actual changes.'),
    defaultReleaseType: StableReleaseTypeSchema.default('patch').describe('Default release type'),
    targets: TargetsSchema.default(TargetsSchema.parse({})).describe(
      'Which manifest targets to update their version fields.',
    ),
    targetsPath: TargetsPathSchema.default(TargetsPathSchema.parse({})).describe(
      'Custom file paths for each manifest target, overriding their default locations.',
    ),
    sync: SyncSchema.describe(
      'Defines how versions across multiple targets should stay synchronized.',
    ),
    hooks: HooksSchema.describe('Lifecycle hooks to run before/after release commands.'),
  })
  .partial()
  .strict();
