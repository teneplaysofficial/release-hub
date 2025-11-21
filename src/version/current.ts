import sylog from 'sylog';
import { config } from '../config/state';
import { TargetKeys, TargetsMap } from '../types';
import { isFile, readFileContent } from '../utils/fs';
import { getManifestPath } from '../utils/helpers';
import { parseJSON } from '../utils/json';
import { isValidVersion } from './semver';

export async function getCurrentVersions() {
  const versions: TargetsMap = {};
  const targets = Object.entries(config.targets ?? {})
    .filter(([, v]) => v)
    .map(([k]) => k as TargetKeys);

  sylog.debug(`Fetching current versions for targets: ${targets.join(', ')}`);

  for (const target of targets) {
    const manifestPath = getManifestPath(target);

    if (!(await isFile(manifestPath))) {
      continue;
    }

    const content = await parseJSON(await readFileContent(manifestPath));

    if (!content?.version) {
      sylog.debug(`No "version" field found for target "${target}" in file: ${manifestPath}`);
      continue;
    }

    if (isValidVersion(content.version)) versions[target] = content.version;
    else
      sylog.warn(
        `Invalid version "${content.version}" found for target "${target}" in file: ${manifestPath}`,
      );
  }

  return versions;
}
