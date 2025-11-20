import { spawn } from 'child_process';
import sylog from 'sylog';

export function runCommand(
  cmd: string,
  options: {
    shell?: boolean;
    stdio?: 'inherit' | 'pipe';
    cwd?: string;
    env?: NodeJS.ProcessEnv;
  } = {},
): Promise<void | string> {
  const { cwd = process.cwd(), env = process.env, shell = true, stdio = 'inherit' } = options;

  sylog.info(cmd);

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, { shell, stdio, cwd, env });

    child.on('error', (err) => {
      reject(new Error(`Failed to execute command: ${cmd}\n${err.message}`));
    });

    if (stdio === 'pipe') {
      let output = '';
      child.stdout?.on('data', (data) => (output += data.toString()));
      child.stderr?.on('data', (data) => (output += data.toString()));
      child.on('close', (code) =>
        code === 0
          ? resolve(output.trim())
          : reject(new Error(`Command failed with exit code ${code}:\n${output}`)),
      );
    } else {
      child.on('close', (code) =>
        code === 0 ? resolve() : reject(new Error(`Command failed: ${cmd}`)),
      );
    }
  });
}
