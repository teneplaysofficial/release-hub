import sylog from 'sylog';
import { config } from '../config/loadConfig';
import { HookName } from '../types/schema/config/hooks';
import ansi from 'ansilory';
import { runCommand } from './command';

export const runHook = async (hook: HookName) => {
  const rawCmd = config.hooks?.[hook];

  if (!rawCmd) {
    sylog.debug(`No command(s) defined for ${ansi.brightCyan.apply(hook)} hook - skipping.`);
    return;
  }

  if (config.dryRun) {
    sylog.info(`Would execute ${ansi.brightCyan.apply(hook)} hook`, { label: 'Dry-run' });
    return;
  }

  sylog.debug(`Executing the ${ansi.brightCyan.apply(hook)} hook`);

  const cmds = Array.isArray(rawCmd) ? rawCmd : [rawCmd];

  try {
    for (const cmd of cmds) {
      await runCommand(cmd);
    }
  } catch (error) {
    sylog.error(`${hook} hook failed: ${(error as Error).message}`);
    throw error;
  }
};
