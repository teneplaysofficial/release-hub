import { readFile, stat, writeFile } from 'fs/promises';
import { JSLockManifestContent, JSManifestContent, JSManifestFile } from '../types/manifest-files';

export const readFileContent = async (filePath: JSManifestFile): Promise<JSManifestContent> => {
  const content = await readFile(filePath, 'utf-8');
  return parseJSON(content);
};

export const writeFileContent = async (
  filePath: JSManifestFile,
  content: string | JSManifestContent | JSLockManifestContent,
): Promise<void> => {
  if (!filePath) return;
  await writeFile(filePath, stringifyJSON(content));
};

const parseJSON = <T>(content: string): T => {
  return JSON.parse(content) as T;
};

const stringifyJSON = (content: string | JSManifestContent | JSLockManifestContent): string => {
  return JSON.stringify(content, null, 2) + '\n';
};

export const isFile = async (filePath: JSManifestFile): Promise<boolean> =>
  (await stat(filePath)).isFile();

export const updateVersionInFile = async (
  filePath: Exclude<JSManifestFile, 'package-lock.json' | 'deno.jsonc'>,
  version: string,
) => {
  if (!(await isFile(filePath))) return;

  const content = await readFileContent(filePath);

  if ('version' in content) content.version = version;

  await writeFileContent(filePath, content);

  if (filePath === 'package.json' && (await isFile('package-lock.json'))) {
    const lock = (await readFileContent('package-lock.json')) as JSLockManifestContent;
    if (lock.packages && lock.packages?.['']) lock.packages[''].version = version;
    if ('version' in lock) lock.version = version;
    await writeFileContent('package-lock.json', lock);
  }

  if (filePath === 'deno.json' && !(await isFile('deno.json'))) {
    if (!(await isFile('deno.jsonc'))) return;
    const denoC = await readFileContent('deno.jsonc');
    if ('version' in denoC) denoC.version = version;
    await writeFileContent('deno.jsonc', denoC);
  }
};
