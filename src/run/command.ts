import ansi from 'ansilory';
import { spawn } from 'child_process';
import sylog from 'sylog';

export const runCommand = async (
  cmd: string,
  options: {
    shell?: boolean;
    stdio?: 'inherit' | 'pipe';
    cwd?: string;
    env?: NodeJS.ProcessEnv;
  } = {},
): Promise<void | string> => {
  const { shell = true, stdio = 'inherit', cwd = process.cwd(), env = process.env } = options;

  sylog.info(ansi.gray.apply(cmd));

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, { shell, stdio, cwd, env });

    if (stdio === 'pipe') {
      let output = '';
      child.stdout?.on('data', (data) => (output += data.toString()));
      child.stderr?.on('data', (data) => (output += data.toString()));
      child.on('close', (code) =>
        code === 0 ? resolve(output.trim()) : reject(new Error(output)),
      );
    } else {
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(`Command failed: ${cmd}`)),
      );
    }
  });
};
