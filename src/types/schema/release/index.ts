import z from 'zod';

export const PreReleaseSchema = z
  .enum([
    'alpha',
    'beta',
    'canary',
    'dev',
    'draft',
    'edge',
    'experimental',
    'insider',
    'internal',
    'next',
    'nightly',
    'pre',
    'preview',
    'prototype',
    'rc',
    'snapshot',
    'test',
    'unstable',
  ])
  .describe('Allowed prerelease identifiers such as alpha, beta, rc, canary, etc.');

export const StableReleaseTypeSchema = z
  .enum(['major', 'minor', 'patch'])
  .describe('Stable release types');

export const PreReleaseTypeSchema = z
  .enum(['premajor', 'preminor', 'prepatch'])
  .describe('Prerelease types');

export const MetaReleaseTypeSchema = z
  .enum(['prerelease', 'release'])
  .describe('Meta release types');

export const ReleaseTypeSchema = z
  .union([StableReleaseTypeSchema, PreReleaseTypeSchema, MetaReleaseTypeSchema])
  .describe('Valid release types following semantic versioning conventions');
