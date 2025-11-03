import z from 'zod';
import { ConfigSchema } from './schema/config';

export type Config = z.infer<typeof ConfigSchema>;
