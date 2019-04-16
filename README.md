# CardX Digital Design System Starter Kit ( / Bootstrap 4.3)

## Features

Node 10.7.0 / NPM 6.4.1
https://www.npmjs.com/

Patternlab (Node Version) 3.0 Beta
https://github.com/pattern-lab/patternlab-node/

Bootstrap 4.3:
https://getbootstrap.com/docs/4.1/getting-started/introduction/

## Installation

1. Ensure NodeJS (Important - Version 10) and the Node Package Manager (NPM) are installed on your system.
2. In the project root, run:
   `npm install`
3. All build tasks are done with npm scripts, so preface each build command with `npm run`. The main dev build task, that should automagically fire up a local dev server is:
   `npm run build -s`
4. Please use ESLint and Prettier to ensure code quality.
5. Modify and save files in the `source/` directory, and watch your browser auto-reload. Files are served from the `public/` folder.
6. To modify the Patternlab "wrapper" around the actual patterns, surf to `source/uikit-workshop` and run `npm install`. From there, you can run Webpack build commands such as `npm run build` to build the Patternlab wrapper from the `src/` folder. Other commands are available and listed in `uikit-workshop/package.json`.

## Known Issues

- When modifying and saving data.json, the browser reloads but the data is not updated. Quick fix: save your component / module / template, which should throw a browser reload and the data should update.

## How's It Work, Anyways?

The main body section of the CardX Patternlab site is basically an iFrame, wrapped with a set of controls that manipulate the width of that iFrame. The controls, in this case XS > XL, are designed to calculate a random browser width within that standard Bootstrap 4 breakpoint. This discourage designers, developers, and business people from becoming too device-centric.

Patternlab constructs the contents of the iFrame frame by first rendering a global head section of the iFrame, building any combination of pattern includes, and then adding a footer. The global header and footer are found in \_meta/\_00-head.mustache, and \_01-foot.mustache.

Our strategy with the atomic design aspects of Patternlab, has to be to identify major page templates first, like the T02-Home template. Then, we decided that importantly, modules would be width-defining blocks. It is extremely important to understand and maintain that it is only on the module level, that the width of a major section on the page is defined - templates are just a collection of width-defining modules, and components sit inside modules and expand to whatever widths the module has defined. That means most of the code is on the module level.

On a global style level, Bootstrap is installed an an NPM dependency, and is upgradeable. In our root scss file (/source/scss/style.scss), we import all the Bootstrap components, include the grid, typography, spacer classes, etc., so that we can always build something right away and not have to worry what files to include. If that isn't sufficient out-of-the-box, we add module-specific custom scss files in source/scss/modules to give a module whatever extra style is necessary (and likewise do the same with JS).

For items that are seen throughout the site, like forms inputs, or modals, or tables, we have often created a global file modal.scss, or tables.scss to handle that. General.scss handles global items that didn't fit into any other category, but are site wide.

For modules that required 3rd party plugins to accomplish, we put all those 3rd party files under css/vendor, or js/vendor.

JavaScript is handled in a similar, modularized manner. There is a root index.js file, and that imports a list of ES6 modules, with functionality specific to their names, like modals.js. The index.js tries to only be a place to listen for the Document Ready event, then attach a number of event listeners.
