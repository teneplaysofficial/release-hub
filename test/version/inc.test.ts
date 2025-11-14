import { expect, it } from 'vitest';
import { PreReleaseType, ReleaseType } from '../../src/types/release';
import { version } from '../../src/version';

type IncCase = {
  v: string;
  t: ReleaseType;
  i?: PreReleaseType;
  e: string;
};

const b = '1.2.3';

const CASES: IncCase[] = [
  { v: b, t: 'major', e: '2.0.0' },
  { v: b, t: 'minor', e: '1.3.0' },
  { v: b, t: 'patch', e: '1.2.4' },

  { v: b, t: 'prerelease', e: '1.2.4-0' },
  { v: b, t: 'prepatch', e: '1.2.4-0' },
  { v: b, t: 'preminor', e: '1.3.0-0' },
  { v: b, t: 'premajor', e: '2.0.0-0' },
];

it.each(
  CASES.map((d) => [`should inc ${d.v} -> ${d.e} base on (${d.t}${d.i ? `, ${d.i}` : ''})`, d]),
)('%s', (_, d: IncCase) => {
  expect(version.inc(d.v, d.t, d.i)).toBe(d.e);
});
