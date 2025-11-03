import z from 'zod';
import { PreReleaseSchema, ReleaseTypeSchema } from './schema/release';

export type PreReleaseType = z.infer<typeof PreReleaseSchema>;
export type ReleaseType = z.infer<typeof ReleaseTypeSchema>;
