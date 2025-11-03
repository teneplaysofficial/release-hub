import ansi from 'ansilory';
import pkg from '../../package.json';

const options = [
  { flags: '-h, --help', desc: 'Show this help message' },
  { flags: '-v, --version', desc: 'Show CLI version' },
  { flags: '--dry-run', desc: 'Run commands in dry-run mode (no changes applied)' },
  { flags: '--interactive', desc: 'Run interactive mode' },
];

const examples = ['', '-h', '-v', '--dry-run', '--interactive'];

const maxFlagLength = Math.max(...options.map((opt) => opt.flags.length));

export const help = () =>
  console.log(`
${ansi.bold.apply('Usage:')} ${ansi.cyan.apply(pkg.name)} [options]

${ansi.bold.apply('Options:')}
${options.map((opt) => `  ${ansi.yellow.apply(opt.flags.padEnd(maxFlagLength))}  ${opt.desc}`).join('\n')}

${ansi.bold.apply('Examples:')}
${examples.map((e) => `  ${ansi.cyan.apply(`${pkg.name} ${e}`)}`).join('\n')}
`);
