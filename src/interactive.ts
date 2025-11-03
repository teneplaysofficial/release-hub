import sylog from 'sylog';
import inquirer from 'inquirer';
import { config } from './config/loadConfig';
import { PreReleaseSchema } from './types/schema/release';
import { version } from './version';
import { writeVersion } from './write';

export default async function interactive() {
  sylog.info('Starting interactive mode');

  await version.logCurrentVersions();

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'isMajor',
      message: 'Do you want to release a major version?',
      default: config.defaultReleaseType === 'major',
      filter(input) {
        return input && 'major';
      },
    },
    {
      type: 'confirm',
      name: 'isMinor',
      message: 'Do you want to release a minor version?',
      default: config.defaultReleaseType === 'minor',
      when: (ans) => !ans.isMajor,
      filter(input) {
        return input && 'minor';
      },
    },
    {
      type: 'confirm',
      name: 'isPatch',
      message: 'Do you want to release a patch version?',
      default: (ans) => config.defaultReleaseType === 'patch' || (!ans.isMajor && !ans.isMinor),
      when: (ans) => !ans.isMajor && !ans.isMinor,
      filter(input) {
        return input && 'patch';
      },
    },
    {
      type: 'confirm',
      name: 'isPreRelease',
      message: 'Do you want to create a pre-release?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'hasPreReleaseTag',
      message: 'Should the pre-release include a tag?',
      default: true,
      when: (ans) => ans.isPreRelease,
    },
    {
      type: 'list',
      name: 'preReleaseType',
      message: 'Select a pre-release type:',
      choices: PreReleaseSchema.options,
      when: (ans) => ans.isPreRelease && ans.hasPreReleaseTag,
    },
  ]);

  let releaseType =
    answers.isMajor || answers.isMinor || answers.isPatch || config.defaultReleaseType;

  if (answers.isPreRelease) releaseType = `pre${releaseType}`;

  const upVer = await version.newVersions(releaseType, answers.preReleaseType);

  console.log(upVer);

  await writeVersion(upVer);
}
