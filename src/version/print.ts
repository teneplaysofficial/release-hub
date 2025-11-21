import sylog from 'sylog';
import { TargetKeys, TargetsMap } from '../types';

export function printVersions(data: TargetsMap, label: 'current' | 'next') {
  for (const k in data) {
    const v = data[k as TargetKeys];
    if (!v) continue;
    sylog.info(`${k} ${label} version: ${v}`);
  }
}
