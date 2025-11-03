export const JS_MANIFEST_FILES = [
  'package.json',
  'package-lock.json',
  'jsr.json',
  'deno.json',
  'deno.jsonc',
] as const;

export type JSManifestFile = (typeof JS_MANIFEST_FILES)[number];

export interface JSManifestContent {
  version: string;
  [key: string]: unknown;
}

export interface JSLockManifestContent extends JSManifestContent {
  packages?: Record<
    string,
    {
      version?: string;
      [key: string]: unknown;
    }
  >;
}
