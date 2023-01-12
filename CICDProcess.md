We use [semantic-release](https://github.com/semantic-release/semantic-release) and Github Actions to automatically handle the release creation. 
We use the [Conventional Commit convention](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) to write commit messages that can be parsed by semantic-release.
The semantic-release config can be viewed in the package.json under "release".

To validate commit messages, we use [commitlint](https://github.com/conventional-changelog/commitlint). See commitlint.config.js for the config file.

To help developers write a good commit message, we use [commitizen](https://github.com/commitizen/cz-cli).

Using husky, hooks are put in place to validate that the commit is in the right format before pushing to the repository. See .husky folderfor more details.
