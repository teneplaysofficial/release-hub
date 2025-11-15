import z from 'zod';
import { TargetsPathSchema, TargetsSchema } from './targets';
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
    targets: TargetsSchema.default(TargetsSchema.parse({}))
      .optional()
      .describe('Which manifest targets to update their version fields.'),
    targetsPath: TargetsPathSchema.default(TargetsPathSchema.parse({}))
      .optional()
      .describe('Custom file paths for each manifest target, overriding their default locations.'),
    sync: SyncSchema.optional().describe(
      'Defines how versions across multiple targets should stay synchronized.',
    ),
    hooks: HooksSchema.optional().describe('Lifecycle hooks to run before/after release commands.'),
  })
  .strict();
