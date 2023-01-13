This repo uses Github Actions and [semantic-release](https://github.com/semantic-release/semantic-release) to automatically run tests and handle the release creation.
When a new PR is merged into the main branch, a github action is automatically triggered (see [pullrequest action](.github/workflows/push-to-main.yml)).
This action validates that all tests are passing, then calls semantic-release to handle the release process (see Release step in the pullrequest action):
- semantic-release analyzes the new commit messages 
- using the commits types and releaseRules listed in the config file [release.config.js](release.config.js), it determines if the current lib version should be incremented
- if it finds that the lib version has changed, it generates a new release notes, then uploads the new lib to npm and writes those release notes to the github repository

For semantic-release to work, commit messages must follow the [Conventional Commit convention](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).
[commitlint](https://github.com/conventional-changelog/commitlint) is used to enforce this commit format. See [commitlint.config.js](commitlint.config.js) for the config file.