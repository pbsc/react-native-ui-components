module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'major',
        'ci',
        'build',
        'chore',
        'perf',
        'test',
        'revert',
        'refactor',
      ],
    ],
  },
};
