import path from 'path';
import { DEFAULT_JSON_MANIFEST_FILES_PATH } from '../config/constants';
import { config } from '../config/state';
import { TargetKeys } from '../types';

export function getManifestPath(target: TargetKeys) {
  return config.targetsPath?.[target] || DEFAULT_JSON_MANIFEST_FILES_PATH[target];
}

export const getManifestDir = (filePath: string): string => {
  const normalized = filePath.replace(/\\/g, '/');
  const ext = path.extname(normalized);
  const dir = ext ? path.dirname(normalized) : normalized;
  const clean = dir.replace(/\\/g, '/');

  return clean.endsWith('/') ? clean : clean + '/';
};
