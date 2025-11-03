import { defineConfig } from 'tsdown';
import pkg from './package.json' with { type: 'json' };

const external = Object.keys(pkg.dependencies);

const now = new Date();
const buildDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

export default defineConfig([
  {
    entry: 'bin/index.ts',
    platform: 'node',
    format: 'esm',
    minify: true,
    banner: `#!/usr/bin/env node
/*!
 * ${pkg.displayName} v${pkg.version}
 * ${pkg.description}
 *
 * Copyright (c) ${buildDate} ${pkg.author.name}
 * Homepage: ${pkg.homepage}
 * Repository: ${pkg.repository.url}
 * License: ${pkg.license}
 *
 * This software is provided "as-is", without any express or implied warranty.
 */`,
    shims: true,
    external,
  },
  {
    entry: 'src/config/index.ts',
    outDir: 'dist/config',
    platform: 'node',
    format: ['esm', 'cjs'],
    minify: true,
    external,
    dts: true,
  },
]);
