import { describe, expect, it } from 'vitest';
import { version } from '../../src/version';

const VALID_VERSIONS = [
  '0.0.0',
  '1.2.3',
  'v1.2.3',
  '2025.11.15',
  '      v1.0.0',
  '       1.0.0-alpha.1    ',
  '2.3.4-alpha',
  '3.4.5-beta+exp.sha.5114f85',
  '4.5.6+20130313144700',
  '1.2.3-alpha+001',
  '1.0.0-0.3.7',
  '1.0.0--beta',
] as const;

const INVALID_VERSIONS = [
  '1',
  '1.2',
  '1.',
  '1.0.',
  '.1.0',
  '',
  'V1.0.0',
  'version1.0.0',
  '1.0.0.',
  '1.0.0-',
  '1.0.0..1',
  '1.0.0.0',
  '1.0.0.0.0',
  '0.0.0.0',
  'a.b.c',
  '1.b.3',
  'x.y.z',
  '01.0.0',
  '1.02.3',
  '1.0.03',
  '00.1.1',
  '-1.0.0',
  '999999999999999999999.0.0',
  '1.0.0-@@@',
  '1.0.0+build+extra',
  '1.0.0+',
  '1.0.0+ ',
  '1.0.0-α',
  '1.0.0-beta..1',
] as const;

describe('Valid Versions', () => {
  it.each(VALID_VERSIONS)('should return a valid result for version %s', (v) => {
    expect(version.valid(v)).toBe(v.trim().replace(/^v/, '').split('+')[0]);
  });
});

describe('Invalid Versions', () => {
  it.each(INVALID_VERSIONS)('should return null for invalid version %s', (v) => {
    expect(version.valid(v)).toBeNull();
  });
});
