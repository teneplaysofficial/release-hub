import { describe, expect, it } from 'vitest';
import { version } from '../../src/version';

const PRE_RELEASE_VERSIONS = [
  '1.0.0-alpha',
  '1.0.0-alpha.1',
  '1.0.0-alpha.beta',
  '1.0.0-beta',
  '1.0.0-beta.2',
  '1.0.0-rc.1',
  '2.3.4-0.3.7',
  '2.3.4-alpha+build.10',
  '3.4.5-beta+meta',
  '1.2.3-pre',
  '1.2.3-dev.5',
] as const;

const NON_PRE_RELEASE_VERSIONS = [
  '1.0.0',
  '2.3.4',
  '10.20.30',
  '1.0.0+build',
  '1.2.3+exp.sha',
  'v1.2.3',
  '  1.0.0   ',
  '2025.11.15',
] as const;

describe('true', () => {
  it.each(PRE_RELEASE_VERSIONS)('should return true for pre-release version %s', (v) => {
    expect(version.isPre(v)).toBeTruthy();
  });
});

describe('false', () => {
  it.each(NON_PRE_RELEASE_VERSIONS)('should return false for version %s', (v) => {
    expect(version.isPre(v)).toBeFalsy();
  });
});
