import sylog from 'sylog';
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
      const bumped = bumpVersion(v, type, preReleaseType);
      if (bumped) nextVersions[k as TargetKeys] = bumped;
    }
    return nextVersions;
  }

  const targetKeys = Object.keys(currentVersions) as TargetKeys[];

  // Syncing versions, bump based on highest version including pre-releases
  if (config.sync === true) {
    const versions = Object.values(currentVersions).filter((v) => typeof v === 'string');
    const highestVersion = getMaxVersion(versions);
    if (!highestVersion) {
      sylog.debug('No valid version found for sync mode');
      return nextVersions;
    }

    const bumpedVersion = bumpVersion(highestVersion, type, preReleaseType);
    if (!bumpedVersion) {
      sylog.debug('Failed to bump version in sync mode');
      return nextVersions;
    }

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
    if (!highestGroupVersion) continue;

    const bumpedGroupVersion = bumpVersion(highestGroupVersion, type, preReleaseType);
    if (!bumpedGroupVersion) continue;

    // Assign bumped version to all targets in the group
    for (const k of group) {
      nextVersions[k] = bumpedGroupVersion;
      remaining.delete(k);
    }
  }

  // Bump remaining targets individually
  for (const k of remaining) {
    const version = currentVersions[k];
    if (!version) continue;

    const bumped = bumpVersion(version, type, preReleaseType);
    if (bumped) nextVersions[k] = bumped;
  }

  return nextVersions;
}
