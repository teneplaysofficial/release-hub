import { readFile, stat, writeFile } from 'fs/promises';
import { JSLockManifestContent, JSManifestContent } from '../types/manifest-files';
import { config } from '../config/loadConfig';
import { TargetKeys } from '../types/schema/config/targets';
import path from 'path';

export const readFileContent = async (filePath: string): Promise<JSManifestContent> => {
  const content = await readFile(filePath, 'utf-8');
  return parseJSON(content);
};

export const writeFileContent = async (
  filePath: string,
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

export const isFile = async (filePath: string): Promise<boolean> => {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
};

export const defaultPaths: Record<TargetKeys, string> = {
  node: './package.json',
  jsr: './jsr.json',
  deno: './deno.json',
};

export const getManifestPath = (target: TargetKeys) => {
  return config.targetsPath?.[target] ?? defaultPaths[target];
};

export const getManifestDir = (filePath: string): string => {
  const normalized = filePath.replace(/\\/g, '/');
  const ext = path.extname(normalized);
  const dir = ext ? path.dirname(normalized) : normalized;
  const clean = dir.replace(/\\/g, '/');

  return clean.endsWith('/') ? clean : clean + '/';
};

export const updateVersionInFile = async (target: TargetKeys, version: string) => {
  const filePath = getManifestPath(target);

  if (!(await isFile(filePath))) return;

  const content = await readFileContent(filePath);

  if ('version' in content) content.version = version;

  await writeFileContent(filePath, content);

  if (target === 'node') {
    const lockFilePath = getManifestDir(filePath);
    if (await isFile(lockFilePath + 'package-lock.json')) {
      const lock = (await readFileContent(
        lockFilePath + 'package-lock.json',
      )) as JSLockManifestContent;
      if (lock.packages && lock.packages?.['']) lock.packages[''].version = version;
      if ('version' in lock) lock.version = version;
      await writeFileContent(lockFilePath + 'package-lock.json', lock);
    }
  }

  if (target === 'deno') {
    if (!(await isFile(filePath))) {
      const jsonCFilePath = getManifestDir(filePath);
      if (!(await isFile(jsonCFilePath + 'deno.jsonc'))) return;
      const denoC = await readFileContent(jsonCFilePath + 'deno.jsonc');
      if ('version' in denoC) denoC.version = version;
      await writeFileContent(jsonCFilePath + 'deno.jsonc', denoC);
    }
  }
};
