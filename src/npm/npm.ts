import { config } from '../config/state';
import { runCommand } from '../run/commands';
import { JSONManifestContent } from '../types';
import { readFileContent } from '../utils/fs';
import { getManifestPath } from '../utils/helpers';
import { parseJSON } from '../utils/json';
import { getDistTag } from '../version/semver';

class Npm {
  private content!: JSONManifestContent;

  async init() {
    await this.loadContent();
  }

  private async loadContent() {
    this.content = parseJSON(await readFileContent(getManifestPath('node')));

    return this.content;
  }

  private async getVersions(): Promise<string[]> {
    const list = await runCommand(`npm view ${this.content.name} versions --json`, {
      stdio: 'pipe',
    });

    return parseJSON(String(list));
  }

  private async isPublished() {
    const versions = await this.getVersions();
    return versions.includes(this.content.version);
  }

  async publish() {
    if (!config.npm?.publish) return;
    const tag = getDistTag(this.content.version);
    const args = [
      tag ? `--tag ${tag}` : '',
      config.npm?.access ? `--access ${config.npm?.access}` : '',
      config.npm?.otp ? `--otp ${config.npm?.otp}` : '',
      ...(Array.isArray(config.npm?.publishArgs) ? config.npm.publishArgs : []),
    ].filter(Boolean);

    await runCommand(`npm publish ${args.join(' ')}`);
  }
}

const npm = new Npm();
export default npm;
