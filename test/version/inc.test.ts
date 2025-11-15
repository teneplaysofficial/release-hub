import { describe, expect, it } from 'vitest';
import { PreReleaseType, ReleaseType } from '../../src/types/release';
import { version } from '../../src/version';

describe('Valid', () => {
  type IncCase = {
    v: string;
    t: ReleaseType;
    i?: PreReleaseType;
    e: string;
  };

  const b = '1.2.3';

  const VALID_CASES: IncCase[] = [
    { v: b, t: 'major', e: '2.0.0' },
    { v: b, t: 'minor', e: '1.3.0' },
    { v: b, t: 'patch', e: '1.2.4' },

    { v: b, t: 'prerelease', e: '1.2.4-0' },
    { v: b, t: 'prepatch', e: '1.2.4-0' },
    { v: b, t: 'preminor', e: '1.3.0-0' },
    { v: b, t: 'premajor', e: '2.0.0-0' },

    { v: b, t: 'premajor', i: 'alpha', e: '2.0.0-alpha.0' },
    { v: b + '-alpha.0', t: 'premajor', i: 'alpha', e: '1.2.3-alpha.1' },
    { v: b + '-alpha.1', t: 'premajor', i: 'alpha', e: '1.2.3-alpha.2' },
    { v: b + '-alpha.2', t: 'major', e: '2.0.0' },
  ];

  it.each(
    VALID_CASES.map((d) => [
      `should inc ${d.v} -> ${d.e} base on (${d.t}${d.i ? `, ${d.i}` : ''})`,
      d,
    ]),
  )('%s', (_, d: IncCase) => {
    expect(version.inc(d.v, d.t, d.i)).toBe(d.e);
  });
});

describe('Invalid', () => {
  const INVALID_CASES: [string, ReleaseType][] = [
    ['', 'patch'],
    ['a.b.c', 'major'],
    ['1.0', 'minor'],
    ['1.0.', 'patch'],
    ['1.0.0', 'not-a-type' as unknown as ReleaseType],
  ];

  it.each(INVALID_CASES)('should return null for invalid input "%s" (%s)', (v, t) => {
    expect(version.inc(v, t)).toBeNull();
  });
});
