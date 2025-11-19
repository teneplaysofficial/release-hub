import { config } from '../config/state';
import { PreReleaseType, ReleaseType, TargetKeys, TargetsMap } from '../types';
import { bumpVersion, getMaxVersion } from './semver';

export function computeNextVersions(
  currentVersions: TargetsMap,
  type: ReleaseType,
  preReleaseType?: PreReleaseType,
) {
  const nextVersions: TargetsMap = {};

  // Not syncing versions, bump each target individually
  if (!config.sync) {
    for (const [k, v] of Object.entries(currentVersions)) {
      nextVersions[k as TargetKeys] = bumpVersion(v, type, preReleaseType);
    }
    return nextVersions;
  }

  const targetKeys = Object.keys(currentVersions) as TargetKeys[];

  // Syncing versions, bump based on highest version including pre-releases
  if (config.sync === true) {
    const versions = Object.values(currentVersions).filter((v) => typeof v === 'string');
    const highestVersion = getMaxVersion(versions);
    const bumpedVersion = bumpVersion(highestVersion!, type, preReleaseType);

    for (const k of targetKeys) {
      nextVersions[k] = bumpedVersion;
    }

    return nextVersions;
  }

  // Syncing versions, bump based on specified target pairs
  const remaining = new Set(targetKeys);

  for (const group of config.sync) {
    const groupVersions = group.map((k) => currentVersions[k]).filter((v) => typeof v === 'string');

    if (!groupVersions.length) continue;

    const highestGroupVersion = getMaxVersion(groupVersions);
    const bumpedGroupVersion = bumpVersion(highestGroupVersion!, type, preReleaseType);

    // Assign bumped version to all targets in the group
    for (const k of group) {
      nextVersions[k] = bumpedGroupVersion;
      remaining.delete(k);
    }
  }

  // Bump remaining targets individually
  for (const k of remaining) {
    nextVersions[k] = bumpVersion(currentVersions[k]!, type, preReleaseType);
  }

  return nextVersions;
}
