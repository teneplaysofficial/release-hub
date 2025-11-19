import semver from 'semver';
import { PreReleaseType, ReleaseType } from '../types';
import sylog from 'sylog';

export function isValidVersion(version: string) {
  return !!semver.valid(version);
}

export function isPreReleaseVersion(version: string) {
  return !!semver.prerelease(version);
}

export function getMaxVersion(versions: string[], includePrerelease: boolean = true) {
  return semver.maxSatisfying(versions, '*', {
    includePrerelease,
  });
}

export function bumpVersion(version: string, type: ReleaseType, identifier?: PreReleaseType) {
  if (!isValidVersion(version)) {
    sylog.debug(`Invalid version "${version}"`);
    return;
  }

  sylog.debug(`version=${version}, type=${type}${identifier ? `, identifier=${identifier}` : ''}`);

  const bumpType = isPreReleaseVersion(version) && type.startsWith('pre') ? 'prerelease' : type;

  sylog.debug(
    bumpType === 'prerelease'
      ? `Prerelease detected → bumping "prerelease"`
      : `Applying "${type}" bump`,
  );

  return semver.inc(version, bumpType, identifier || '') || undefined;
}
