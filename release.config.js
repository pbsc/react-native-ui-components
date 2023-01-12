require('debug').enable('semantic-release:*');

module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          {
            type: 'docs',
            release: 'patch',
          },
          {
            type: 'refactor',
            release: 'patch',
          },
          {
            type: 'style',
            release: 'patch',
          },
          {
            type: 'feat',
            release: 'minor',
          },
          {
            type: 'fix',
            release: 'patch',
          },
          {
            type: 'perf',
            release: 'patch',
          },
          {
            type: 'chore',
            release: 'patch',
          },
          {
            type: 'build',
            release: 'patch',
          },
          {
            type: 'ci',
            release: 'patch',
          },
          {
            type: 'revert',
            release: 'patch',
          },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'chore', section: 'Other', hidden: false },
          { type: 'ci', section: 'Other', hidden: false },
          { type: 'docs', section: 'Documentation', hidden: false },
          { type: 'style', section: 'Other', hidden: false },
          { type: 'refactor', section: 'Other', hidden: false },
          { type: 'perf', section: 'Other', hidden: false },
          { type: 'test', hidden: true },
        ],
      },
    ],
    '@semantic-release/npm',
    '@semantic-release/git',
    '@semantic-release/github',
  ],
};
