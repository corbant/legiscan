const esbuild = require('esbuild');
const { globSync } = require('node:fs');

const allFiles = globSync('src/**/*.ts');

const entryPoints = allFiles.filter((file) => !file.endsWith('.test.ts'));

const baseConfig = {
  entryPoints: entryPoints,
  bundle: false,
  platform: 'node',
};

esbuild.buildSync({
  ...baseConfig,
  format: 'cjs',
  outdir: 'dist/cjs',
});

esbuild.buildSync({
  ...baseConfig,
  format: 'esm',
  outdir: 'dist/esm',
});
