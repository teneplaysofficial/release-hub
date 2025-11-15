import { expect, it } from 'vitest';
import { version } from '../../src/version';

type Case = {
  n: string;
  i: string[];
  e: string | null;
};

const CASES: Case[] = [
  {
    n: 'empty array returns null',
    i: [],
    e: null,
  },
  {
    n: 'single version returns same version',
    i: ['1.2.3'],
    e: '1.2.3',
  },
  {
    n: 'returns highest version',
    i: ['1.0.0', '1.2.3', '2.0.0', '1.5.0'],
    e: '2.0.0',
  },
  {
    n: 'handles prerelease versions',
    i: ['1.0.0', '1.0.1-beta.1', '1.0.1', '2.0.0-alpha'],
    e: '2.0.0-alpha',
  },
  {
    n: 'highest prerelease among prereleases only',
    i: ['1.0.0-alpha.1', '1.0.0-alpha.5', '1.0.0-alpha.2'],
    e: '1.0.0-alpha.5',
  },
  {
    n: 'ignores invalid versions',
    i: ['1.0.0', 'invalid', 'trash', '2.0.0'],
    e: '2.0.0',
  },
  {
    n: 'all invalid returns null',
    i: ['abc', 'v1', 'not-semver'],
    e: null,
  },
  {
    n: 'correctly compares major/minor/patch',
    i: ['1.9.9', '1.10.0', '1.10.1'],
    e: '1.10.1',
  },
  {
    n: 'mixed prerelease and stable versions',
    i: ['1.0.0-alpha', '1.0.0', '1.1.0-beta'],
    e: '1.1.0-beta',
  },
  {
    n: 'handles duplicated versions',
    i: ['1.0.0', '1.0.0', '2.0.0', '2.0.0'],
    e: '2.0.0',
  },
];

it.each(CASES)('$n', ({ i, e }) => {
  expect(version.max(i)).toBe(e);
});
