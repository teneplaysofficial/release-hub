import { readFile, stat, writeFile } from 'fs/promises';
import sylog from 'sylog';

export async function isFile(filePath: string) {
  try {
    return (await stat(filePath)).isFile();
  } catch (err) {
    sylog.debug((err as Error).message);
    return false;
  }
}

export async function readFileContent(filePath: string, encoding: BufferEncoding = 'utf-8') {
  try {
    return await readFile(filePath, { encoding });
  } catch (err) {
    sylog.debug(`Failed to read file (${filePath}): ${(err as Error).message}`);
  }
}

export async function writeFileContent(
  filePath: string,
  data: string,
  encoding: BufferEncoding = 'utf-8',
) {
  try {
    await writeFile(filePath, data, { encoding });
  } catch (err) {
    sylog.debug(`Failed to write file (${filePath}): ${(err as Error).message}`);
  }
}
