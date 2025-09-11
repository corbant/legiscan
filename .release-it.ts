import type { Config } from 'release-it';

export default {
  git: {
    commitMessage: 'chore: release v${version}',
    requireCommits: true,
  },
  npm: {
    publish: true,
    skipChecks: true,
  },
  hooks: {
    'after:bump': 'yarn build',
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: {
        name: 'conventionalcommits',
      },
      infile: 'CHANGELOG.md',
      commitsOpts: {
        ignore: /^(chore|docs)/i,
      },
    },
  },
} satisfies Config;
