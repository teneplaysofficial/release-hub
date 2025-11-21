import sylog from 'sylog';
import { config } from '../config/state';
import { JSONManifestContent, TargetKeys, TargetsMap } from '../types';
import { runHook } from '../run/hooks';
import { getManifestDir, getManifestPath } from '../utils/helpers';
import { isFile, readFileContent, writeFileContent } from '../utils/fs';
import { parseJSON, stringifyJSON } from '../utils/json';

export async function saveVersions(data: TargetsMap) {
  if (config.dryRun) {
    sylog.info('Skipping version(s) write');
    return;
  }

  await runHook('before:version');

  for (const k in config.targets) {
    const target = k as TargetKeys;
    if (config.targets[target] && data[target]) {
      sylog.info(`Writing version to ${target}`);
      await writeTargetVersions(target, data[target]);
    }
  }

  await runHook('after:version');
}

export async function writeTargetVersions(target: TargetKeys, version: string) {
  const filePath = getManifestPath(target);

  if (!(await isFile(filePath))) {
    sylog.debug(`Manifest file missing, skipping version write: ${filePath}`);
    return;
  }

  const content: JSONManifestContent = await parseJSON(await readFileContent(filePath));

  if (!content) {
    sylog.debug(`Failed to parse manifest file: ${filePath}`);
    return;
  }

  if ('version' in content) content.version = version;

  await writeFileContent(filePath, stringifyJSON(content));

  switch (target) {
    case 'node': {
      const lockFilePath = getManifestDir(filePath) + 'package-lock.json';

      if (!(await isFile(lockFilePath))) {
        sylog.debug(`package-lock.json not found, skipping version write: ${lockFilePath}`);
        return;
      }

      const lockContent: JSONManifestContent = await parseJSON(await readFileContent(lockFilePath));

      if (!lockContent) {
        sylog.debug(`Failed to parse package-lock.json: ${lockFilePath}`);
        return;
      }

      if ('version' in lockContent) lockContent.version = version;
      if (lockContent.packages && lockContent.packages?.[''])
        lockContent.packages[''].version = version;

      await writeFileContent(lockFilePath, stringifyJSON(lockContent));

      break;
    }
  }
}
