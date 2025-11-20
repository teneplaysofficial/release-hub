import ansi from 'ansilory';
import figlet from 'figlet';
import pkg from '../../package.json';
import { options } from './flags';

const examples = ['', '-h', '-v', '--dry-run', '--debug', '--dry-run --debug'];
const maxFlagLength = Math.max(...options.map((opt) => opt.flags.length));

export function printHelp() {
  console.log(`
${ansi.bold.apply('Usage:')} ${ansi.cyan.apply(pkg.name)} [options]

${ansi.bold.apply('Options:')}
${options.map((opt) => `  ${ansi.yellow.apply(opt.flags.padEnd(maxFlagLength))}  ${opt.desc}`).join('\n')}

${ansi.bold.apply('Examples:')}
${examples.map((e) => `  ${ansi.cyan.apply(`${pkg.name} ${e}`)}`).join('\n')}
`);
}

export function printBanner() {
  return new Promise<void>((resolve, reject) => {
    figlet.text(pkg.displayName || pkg.name, { font: 'Slant' }, (err, data) => {
      if (err) {
        console.error('Figlet error:', err);
        reject(err);
        return;
      }

      if (!data) {
        console.error('Failed to generate ASCII banner');
        resolve();
        return;
      }

      const lines = data.split('\n');
      const versionText = ansi.italic.dim.apply(`v${pkg.version}`);
      const lastLineIndex = lines.findLastIndex((line) => line.trim().length > 0);

      if (lastLineIndex !== -1) {
        lines[lastLineIndex] += versionText;
      }

      console.log(ansi.brightCyan.apply(lines.join('\n')));
      resolve();
    });
  });
}
