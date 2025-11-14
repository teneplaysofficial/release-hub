import sylog from 'sylog';
import { config } from './config/loadConfig';
import { runHook } from './run/hook';
import { TargetVersionMap } from './types/schema/config/targets';
import { updateVersionInFile } from './utils/content';

export const writeVersion = async (version: TargetVersionMap) => {
  if (config.dryRun) {
    sylog.info('Skipping version write', { label: 'Dry-run' });
    return;
  }

  await runHook('before:version');

  if (config.targets?.node && version.node) {
    await updateVersionInFile('package.json', version.node);
  }

  if (config.targets?.jsr && version.jsr) {
    await updateVersionInFile('jsr.json', version.jsr);
  }

  if (config.targets?.deno && version.deno) {
    await updateVersionInFile('deno.json', version.deno);
  }

  await runHook('after:version');
};
