import ansi from 'ansilory';
import figlet from 'figlet';
import pkg from '../../package.json';

export const printName = async () => {
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
};
