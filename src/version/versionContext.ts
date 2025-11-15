import sylog from 'sylog';
import { config } from '../config/loadConfig';
import { isFile, readFileContent } from '../utils/content';
import { TargetKeys, TargetVersionMap } from '../types/schema/config/targets';
import { PreReleaseType, ReleaseType } from '../types/release';
import { version } from './index';

export class VersionContext {
  private _cachedCurrentVersions?: TargetVersionMap;

  async logCurrentVersions(): Promise<void> {
    const versions = await this.currentVersions();

    Object.entries(versions).forEach(([key, value]) => {
      sylog.info(`${key} current version: ${value}`);
    });
  }

  async logNewVersions(versions: TargetVersionMap): Promise<void> {
    Object.entries(versions).forEach(([key, value]) => {
      sylog.info(`${key} new version: ${value}`);
    });
  }

  async currentVersions(): Promise<TargetVersionMap> {
    if (this._cachedCurrentVersions) return this._cachedCurrentVersions;

    const targetsCurrentVersion: TargetVersionMap = {};

    if (config.targets?.node && (await isFile('package.json'))) {
      const content = await readFileContent('package.json');
      targetsCurrentVersion.node = content.version;
    }

    if (config.targets?.jsr && (await isFile('jsr.json'))) {
      const content = await readFileContent('jsr.json');
      targetsCurrentVersion.jsr = content.version;
    }

    if (config.targets?.deno) {
      if (await isFile('deno.json')) {
        const content = await readFileContent('deno.json');
        targetsCurrentVersion.deno = content.version;
      }
    }
    this._cachedCurrentVersions = targetsCurrentVersion;

    return targetsCurrentVersion;
  }

  async newVersions(type: ReleaseType, preReleaseType?: PreReleaseType): Promise<TargetVersionMap> {
    const targetsNewVersion: TargetVersionMap = {};
    const currentVersions = await this.currentVersions();

    if (!config.sync) {
      for (const [k, v] of Object.entries(currentVersions))
        if (v) targetsNewVersion[k as TargetKeys] = version.inc(v, type, preReleaseType);
      return targetsNewVersion;
    }

    if (config.sync === true) {
      const valid = Object.values(currentVersions).filter((v) => typeof v === 'string');
      const maxVer = version.max(valid);
      if (!maxVer) return targetsNewVersion;

      const newVer = version.inc(maxVer, type, preReleaseType);
      if (newVer)
        for (const k of Object.keys(currentVersions)) targetsNewVersion[k as TargetKeys] = newVer;
      return targetsNewVersion;
    }

    const remaining = new Set(Object.keys(currentVersions));

    for (const group of config.sync) {
      const versions = group
        .map((k) => currentVersions[k as TargetKeys])
        .filter((v): v is string => typeof v === 'string');

      if (!versions.length) continue;

      const maxVer = version.max(versions);
      if (!maxVer) continue;

      const newVer = version.inc(maxVer, type, preReleaseType);
      for (const key of group) {
        targetsNewVersion[key as TargetKeys] = newVer;
        remaining.delete(key);
      }
    }

    for (const key of remaining) {
      const v = currentVersions[key as TargetKeys];
      if (v) targetsNewVersion[key as TargetKeys] = version.inc(v, type, preReleaseType);
    }

    return targetsNewVersion;
  }
}
