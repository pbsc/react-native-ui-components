We use [semantic-release](https://github.com/semantic-release/semantic-release) and Github Actions to automatically handle the release creation. 
We use the Angular commit convention to write commit messages that can be parsed by semantic-release.
The semantic-release config can be viewed in the package.json under "release".

To validate commit messages, we use [commitlint](https://github.com/conventional-changelog/commitlint) with [gitmoji](https://www.npmjs.com/package/commitlint-config-gitmoji). See commitlint.config.js for the config file.

To help developers write a good commit message, we use [commitizen](https://github.com/commitizen/cz-cli) with [cz-customizable](https://github.com/leoforfree/cz-customizable). See .cz-config.js for the config file.

Using husky, hooks are put in place to validate that the commit is in the right format before pushing to the repository. See .husky folderfor more details.
