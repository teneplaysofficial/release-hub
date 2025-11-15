import sylog from 'sylog';
import { config } from './config/loadConfig';
import { runHook } from './run/hook';
import { TargetKeys, TargetVersionMap } from './types/schema/config/targets';
import { updateVersionInFile } from './utils/content';

export const writeVersion = async (version: TargetVersionMap) => {
  if (config.dryRun) {
    sylog.info('Skipping version write', { label: 'Dry-run' });
    return;
  }

  await runHook('before:version');

  /** OCP */
  for (const target in config.targets) {
    const t = target as TargetKeys;
    if (config.targets[t] && version[t]) {
      await updateVersionInFile(t, version[t]!);
    }
  }

  await runHook('after:version');
};
