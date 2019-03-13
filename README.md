# CardX Digital Design System Starterkit ( / Bootstrap 4.3)

## Features

Node 10.7.0 / NPM 6.4.1
https://www.npmjs.com/

Patternlab (Node Version) 3.0 Beta
https://github.com/pattern-lab/patternlab-node/

Bootstrap 4.3:
https://getbootstrap.com/docs/4.1/getting-started/introduction/

## Installation

1. Ensure NodeJS (Important - Version 10) and the Node Package Manager (NPM) are installed on your system. Preferably installed via Node Version Manager (https://github.com/creationix/nvm).
   Once installed you will want to run `nvm use 10.7.0` in your bash shell to activate this version of Node. Otherwise, ensure you're running Node 10.7 or above.
2. In the project root, install all the project dependencies. Run:
   `npm install`
3. All build tasks are done with npm scripts, so preface each build command with `npm run`. The main dev build task is:
   `npm run build -s`
4. Please use ESLint and Prettier to ensure code quality.
5. Modify and save files in the `source/` directory, and watch your browser auto-reload. Files are served from the `public/` folder.
6. To modify the Patterlnab "wrapper" around the actual patterns, surf to `source/uikit-workshop` and run `npm install`. From there, you can run Webpack build commands such as `npm run build` to build the styleguide from the `src/` folder. Other commands are available and listed in `uikit-workshop/package.json`.
