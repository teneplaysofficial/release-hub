import z from 'zod';
import { TargetKeys, TargetsSchema } from './targets';

export const SyncSchema = z
  .union([
    z.boolean().describe('Whether to sync versions across all or none of the targets.'),
    z
      .array(
        z
          .array(z.enum(Object.keys(TargetsSchema.shape) as [TargetKeys, ...TargetKeys[]]))
          .min(2)
          .refine((arr) => new Set(arr).size === arr.length, {
            error: 'Each sync group must contain unique target values.',
          })
          .describe('A group of targets to sync together.'),
      )
      .describe('Sync only specific groups of targets.'),
  ])
  .default(true)
  .describe('Controls version sync behavior for targets.');
