import { TargetsMap } from '../types';

export const CONFIG_FILES = [
  '.release-hub.json',
  '.release-hub.config.json',
  'release-hub.json',
  'release-hub.config.json',
  '.release-hub.js',
  '.release-hub.cjs',
  '.release-hub.mjs',
  '.release-hub.ts',
  '.release-hub.cts',
  '.release-hub.mts',
  'release-hub.config.js',
  'release-hub.config.cjs',
  'release-hub.config.mjs',
  'release-hub.config.ts',
  'release-hub.config.cts',
  'release-hub.config.mts',
] as const;

export const JSON_MANIFEST_FILES = [
  'package.json',
  'package-lock.json',
  'jsr.json',
  'deno.json',
  'manifest.json',
] as const;

export const DEFAULT_JSON_MANIFEST_FILES_PATH: Required<TargetsMap> = {
  node: './package.json',
  jsr: './jsr.json',
  deno: './deno.json',
  webext: './manifest.json',
} as const;
