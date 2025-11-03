import z from 'zod';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { createJiti } from 'jiti';
import sylog from 'sylog';
import { Config } from '../types/config';
import { ConfigSchema } from '../types/schema/config';

const CONFIG_FILES = [
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

async function loadConfig(cwd = process.cwd()) {
  let userConfig: Config = {};

  for (const file of CONFIG_FILES) {
    const fullPath = join(cwd, file);
    if (!existsSync(fullPath)) continue;

    if (file.endsWith('.json')) {
      userConfig = JSON.parse(readFileSync(fullPath, 'utf8'));
    } else {
      const jiti = createJiti(import.meta.url);
      const mod = (await jiti.import(fullPath)) as Record<string, unknown>;
      const exported = mod.default ?? mod;
      if (typeof exported === 'object' && exported !== null) userConfig = exported as Config;
      else sylog.warn(`Skipped invalid export in ${file}, expected an object.`);
    }

    sylog.info(`Loaded configuration from ${file}`);
    break;
  }

  if (!Object.keys(userConfig).length) {
    const pkgPath = join(cwd, 'package.json');
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
      if (pkg['release-hub']) {
        userConfig = pkg['release-hub'];
        sylog.info('Loaded configuration from package.json (release-hub field)');
      } else sylog.warn('No configuration file found - using default config.');
    } else sylog.warn('No configuration file found - using default config.');
  }

  const parsed = ConfigSchema.safeParse(userConfig);
  if (!parsed.success) {
    console.error('Invalid configuration:\n', z.treeifyError(parsed.error));
    process.exit(1);
  }

  return parsed.data;
}

export const config = await loadConfig();
