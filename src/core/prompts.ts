import inquirer from 'inquirer';
import sylog from 'sylog';
import { config } from '../config/state';
import { PreReleaseSchema } from '../types/schemas/release';
import { getCurrentVersions } from '../version/current';
import { printVersions } from '../version/print';
import { computeNextVersions } from '../version/next';
import { saveVersions } from '../version/write';

export async function runPrompts() {
  sylog.debug('Running interactive flow');

  const currentVersions = await getCurrentVersions();

  printVersions(currentVersions, 'current');

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

  const nextVersions = computeNextVersions(currentVersions, releaseType, answers.preReleaseType);

  printVersions(nextVersions, 'next');

  await saveVersions(nextVersions);

  sylog.debug('Interactive flow completed');
}
