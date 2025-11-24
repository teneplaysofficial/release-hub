import { runCommand } from '../run/commands';
import { JSONManifestContent } from '../types';
import { readFileContent } from '../utils/fs';
import { getManifestPath } from '../utils/helpers';
import { parseJSON } from '../utils/json';

class Npm {
  private content!: JSONManifestContent;

  async loadContent() {
    this.content = parseJSON(await readFileContent(getManifestPath('node')));

    return this.content;
  }

  async getVersions(): Promise<string[]> {
    const list = await runCommand(`npm view ${this.content.name} versions --json`, {
      stdio: 'pipe',
    });

    return parseJSON(String(list));
  }

  async isPublished() {
    const versions = await this.getVersions();
    return versions.includes(this.content.version);
  }
}

const npm = new Npm();
export default npm;
