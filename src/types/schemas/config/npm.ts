import z from 'zod';
import { PreReleaseSchema } from '../release';

export const NPM_ACCESS_LEVELS = z.enum(['public', 'restricted']);

export const NPM_DIST_TAGS = PreReleaseSchema.or(z.literal('latest'));

export const npmSchema = z
  .object({
    access: NPM_ACCESS_LEVELS.default('public').describe(
      'The access level for the published package.',
    ),
    publish: z.boolean().default(false).describe('Whether to publish the package to npm.'),
    publishArgs: z
      .array(z.union([z.string(), z.enum(['--provenance'])]))
      .refine(
        (args) => new Set(args).size === args.length,
        'publishArgs must contain unique values',
      )
      .describe('Additional arguments to pass to the npm publish command.'),
    tag: NPM_DIST_TAGS.default('latest').describe('The npm dist-tag to use when publishing.'),
    otp: z
      .number()
      .int()
      .min(100000, 'OTP must be a 6-digit number')
      .max(999999, 'OTP must be a 6-digit number')
      .describe('One-time password for npm two-factor authentication.'),
  })
  .partial();
