import semver from 'semver';
import { NpmDistTags, PreReleaseType, ReleaseType } from '../types';
import sylog from 'sylog';
import { NPM_DIST_TAGS } from '../types/schemas/config/npm';

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

export function getDistTag(version: string): NpmDistTags | undefined {
  const parsed = semver.parse(version);
  if (!parsed) return;

  const tag = parsed.prerelease[0];
  if (!tag) return 'latest';

  const res = NPM_DIST_TAGS.safeParse(tag);
  return res.success ? res.data : 'latest';
}
