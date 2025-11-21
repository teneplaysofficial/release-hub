import z from 'zod';
import { options } from '../cmd/flags';
import { ConfigSchema } from './schemas/config';
import { PreReleaseSchema, ReleaseTypeSchema } from './schemas/release';
import { TargetsSchema } from './schemas/config/targets';
import { JSON_MANIFEST_FILES } from '../config/constants';
import { NPM_ACCESS_LEVELS } from './schemas/config/npm';

export type HookPhase = 'before' | 'after';
export type HookEvent = 'init' | 'version' | 'commit' | 'tag' | 'push' | 'publish';
export type HookPublishTarget = 'npm' | 'jsr';
export type HookName = `${HookPhase}:${HookEvent}` | `${HookPhase}:publish:${HookPublishTarget}`;

export type Config = z.infer<typeof ConfigSchema>;

type RawFlag = (typeof options)[number]['flags'];
export type Flag = RawFlag extends `${infer A}, ${infer B}` ? A | B : RawFlag;

export type PreReleaseType = z.infer<typeof PreReleaseSchema>;
export type ReleaseType = z.infer<typeof ReleaseTypeSchema>;

export type Targets = z.infer<typeof TargetsSchema>;
export type TargetKeys = keyof Targets;
export type TargetsMap = Partial<Record<TargetKeys, string>>;

export type JSONManifestFile = (typeof JSON_MANIFEST_FILES)[number];
export interface JSONManifestContent extends JSONLockManifestContent {
  version: string;
  [key: string]: unknown;
}
export interface JSONLockManifestContent {
  packages?: Record<
    string,
    {
      version?: string;
      [key: string]: unknown;
    }
  >;
}

export type NpmAccessLevels = z.infer<typeof NPM_ACCESS_LEVELS>;
