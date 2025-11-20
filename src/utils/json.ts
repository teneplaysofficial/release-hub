import sylog from 'sylog';
import { JSONManifestContent } from '../types';

export function parseJSON(data: string | Buffer | undefined) {
  try {
    if (!data) return;
    const text = typeof data === 'string' ? data : data.toString('utf-8');
    return JSON.parse(text);
  } catch (err) {
    sylog.debug((err as Error).message);
  }
}

export function stringifyJSON(data: JSONManifestContent) {
  return JSON.stringify(data, null, 2) + '\n';
}
