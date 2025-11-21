import sylog from 'sylog';
import { knownFlags } from '../src/cmd/flags';
import { Flag } from '../src/types';
import pkg from '../package.json';
import { printBanner, printHelp } from '../src/cmd/print';
import { config, setConfig } from '../src/config/state';
import { runPrompts } from '../src/core/prompts';
import { runHook } from '../src/run/hooks';

try {
  const args = new Set<Flag>(
    process.argv.slice(2).filter((arg): arg is Flag => knownFlags.includes(arg)),
  );

  if (args.has('-v') || args.has('--version')) {
    console.log(pkg.version);
    process.exit(0);
  }

  if (args.has('-h') || args.has('--help')) {
    printHelp();
    process.exit(0);
  }

  await printBanner();

  if (args.has('-D') || args.has('--debug')) sylog.enableDebug();

  await setConfig();
  await runHook('before:init');

  if (args.has('-d') || args.has('--dry-run')) {
    config.dryRun = true;
    sylog.dryrun('No changes will be applied, all actions are simulated');
  }

  await runPrompts();
  await runHook('after:init');
} catch (err) {
  sylog.error((err as Error).message);
  process.exit(1);
}
