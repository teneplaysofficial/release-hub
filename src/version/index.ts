import semver from 'semver';
import { VersionContext } from './versionContext';
import { PreReleaseType, ReleaseType } from '../types/release';

class Version extends VersionContext {
  valid(version: string): string | null {
    return semver.valid(version);
  }

  isPre(version: string): boolean {
    return !!semver.prerelease(version);
  }

  inc(version: string, type: ReleaseType, identifier?: PreReleaseType): string | null {
    if (!this.valid(version)) return null;

    if (this.isPre(version) && type.startsWith('pre')) {
      return semver.inc(version, 'prerelease', identifier || '');
    }

    return semver.inc(version, type, identifier || '');
  }

  max(versions: string[]): string | null {
    return semver.maxSatisfying(versions, '*', {
      includePrerelease: true,
    });
  }
}

export const version = new Version();
