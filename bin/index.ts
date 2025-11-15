import pkg from '../package.json';
import interactive from '../src/interactive';
import sylog from 'sylog';
import { printName } from '../src/utils/printName';
import { help } from '../src/utils/help';
import { runHook } from '../src/run/hook';
import { config, setConfig } from '../src/config/loadConfig';

try {
  const args = process.argv.slice(2);

  const flags = new Set(args);

  if (flags.has('--help') || flags.has('-h')) {
    help();
    process.exit(0);
  }

  if (flags.has('--version') || flags.has('-v')) {
    console.log(pkg.version);
    process.exit(0);
  }

  await printName();

  await runHook('before:init');

  if (flags.has('--debug')) {
    sylog.enableDebug();
  }

  await setConfig();

  if (flags.has('--dry-run')) {
    config.dryRun = true;
    sylog.info('Dry Run Mode Enabled No actual changes will be made, all operations are simulated');
  }

  if (!args.length || flags.has('--interactive') || flags.has('--dry-run')) {
    await interactive();
  }

  await runHook('after:init');
} catch (error) {
  sylog.error((error as Error).message);
  process.exit(1);
}
