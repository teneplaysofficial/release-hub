import ansi from 'ansilory';
import sylog from 'sylog';
import { config } from '../config/state';
import { HookName } from '../types';
import { runCommand } from './commands';

export async function runHook(hook: HookName) {
  const rawCmd = config.hooks?.[hook];

  if (!rawCmd) {
    sylog.debug(`No command(s) defined for ${ansi.brightCyan.apply(hook)} hook - skipping`);
    return;
  }

  if (config.dryRun) {
    sylog.dryrun(`Would execute ${ansi.brightCyan.apply(hook)} hook`);
    return;
  }

  sylog.debug(`Executing the ${ansi.brightCyan.apply(hook)} hook`);

  const cmds = Array.isArray(rawCmd) ? rawCmd : [rawCmd];

  try {
    for (const cmd of cmds) {
      await runCommand(cmd);
    }
  } catch (err) {
    sylog.error(`${hook} hook failed: ${(err as Error).message}`);
    throw err;
  }
}
