module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
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
          {
            type: 'major',
            release: 'major',
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
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
        presetConfig: {
          types: [
            {
              type: 'docs',
              hidden: false,
              section: 'Documentation',
            },
            {
              type: 'feat',
              hidden: false,
              section: 'Features',
            },
            {
              type: 'fix',
              hidden: false,
              section: 'Bug Fixes',
            },
            {
              type: 'style',
              hidden: false,
              section: 'Style Changes',
            },
            {
              type: 'perf',
              hidden: false,
              section: 'Performance',
            },
            {
              type: 'ci',
              hidden: false,
              section: 'Other',
            },
            {
              type: 'chore',
              hidden: false,
              section: 'Other',
            },
            {
              type: 'revert',
              hidden: false,
              section: 'Other',
            },
          ],
        },
      },
    ],
    '@semantic-release/github',
    '@semantic-release/npm',
  ],
};
