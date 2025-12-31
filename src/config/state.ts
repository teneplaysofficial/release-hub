import arglet from 'arglet';
import { Config } from '../types';
import { loadConfig } from './load';

export const config: Config = {};

export async function setConfig() {
  const _cachedConfig = await loadConfig();
  Object.assign(config, arglet<Config>(_cachedConfig));
}
