import path from 'path';
import { CONFIG_FILES } from './constants';
import { isFile, readFileContent } from '../utils/fs';
import sylog from 'sylog';
import { parseJSON } from '../utils/json';
import { Config } from '../types';
import { ConfigSchema } from '../types/schemas/config';
import z from 'zod';
import { createJiti } from 'jiti';

export async function loadConfig(cwd = process.cwd()) {
  sylog.debug('Starting config load');

  let userConfig: Config = {};

  for (const file of CONFIG_FILES) {
    const filePath = path.join(cwd, file);

    if (!(await isFile(filePath))) {
      sylog.debug(`Not found: ${file}`);
      continue;
    }

    sylog.debug(`Found: ${file}`);

    if (file.endsWith('.json')) {
      userConfig = await parseJSON(await readFileContent(filePath));
    } else {
      const jiti = createJiti(import.meta.url);
      const mod = (await jiti.import(filePath)) as Record<string, unknown>;
      const exported = mod.default ?? mod;

      if (typeof exported === 'object' && exported !== null) userConfig = exported;
      else sylog.debug(`Skipped invalid export in ${file}, expected an object.`);
    }
    sylog.info(`Loaded configuration from ${file}`);
    break;
  }

  sylog.debug('Finished scanning config files');

  if (!Object.keys(userConfig).length) {
    sylog.debug('Config not found in files, Checking package.json');

    const pkgPath = path.join(cwd, 'package.json');

    if (await isFile(pkgPath)) {
      sylog.debug('Found package.json');

      const pkg = parseJSON(await readFileContent(pkgPath));

      if (pkg && typeof pkg === 'object' && pkg['release-hub']) {
        userConfig = pkg['release-hub'];
        sylog.info('Loaded configuration from package.json (release-hub field)');
      } else sylog.debug('No configuration found in package.json (release-hub field missing)');
    } else {
      sylog.debug('package.json does not exist');
    }
  }

  if (!Object.keys(userConfig).length)
    sylog.debug('No configuration file found - using default config.');

  sylog.debug('Validating configuration');

  const parsed = ConfigSchema.safeParse(userConfig);

  if (!parsed.success) {
    sylog.error(`Invalid configuration:\n ${z.treeifyError(parsed.error)}`);
    process.exit(1);
  }

  sylog.debug('Configuration validated successfully');

  return parsed.data;
}
