module.exports = {
  // based on cz-customizable
  types: [
    { value: ':sparkles: feat', name: '✨ feat:\tAdding a new feature' },
    { value: ':bug: fix', name: '🐛 fix:\tFixing a bug' },
    { value: ':memo: docs', name: '📝 docs:\tAdd or update documentation' },
    {
      value: ':lipstick: style',
      name: '💄 style:\tAdd or update styles, ui or ux',
    },
    {
      value: ':recycle: refactor',
      name: '♻️ refactor:\tCode change that neither fixes a bug nor adds a feature',
    },
    {
      value: ':zap: perf',
      name: '⚡️ perf:\tCode change that improves performance',
    },
    {
      value: ':white_check_mark: test',
      name: '✅ test:\tAdding tests cases',
    },
    {
      value: ':truck: chore',
      name: '🚚 chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation',
    },
    { value: ':rewind: revert', name: '⏪️ revert:\tRevert to a commit' },
    { value: ':construction: wip', name: '🚧 wip:\tWork in progress' },
    {
      value: ':construction_worker: build',
      name: '👷 build:\tAdd or update regards to build process',
    },
    {
      value: ':green_heart: ci',
      name: '💚 ci:\tAdd or update regards to CI/CD process',
    },
  ],
  allowBreakingChanges: [
    ':sparkles: feat',
    ':bug: fix',
    ':recycle: refactor',
    ':lipstick: style',
    ':zap: perf',
    ':truck: chore',
    ':rewind: revert',
    ':construction_worker: build',
    ':green_heart: ci',
  ],
  askForBreakingChangeFirst: false,
  scopes: [
    { name: 'ui' },
    { name: 'style'},
    { name: 'android' },
    { name: 'ios' },
    { name: 'unitTests' },
    { name: 'documentation' },
    { name: 'CI/CD' },
  ],
  allowCustomScopes: true,
};
