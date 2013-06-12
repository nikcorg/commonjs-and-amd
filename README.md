# A miniscule study in sharing code between CommonJS and AMD environments

In my current project, I'm sharing a large portion of code between the server and the browser. Initially I used a customised [UMDJS](https://gist.github.com/nikcorg/4444301) signature for this purpose. Eventually, it proved problematic when building a monolith; <code>r.js</code> understood absolutely nothing and all my modules were nameless. And let's admit it, it's not pretty.

At first, I tried finding a solution to make <code>r.js</code> understand UMDJS, but quite quickly gave up and decided I need to look elsewhere for a better solution.

That solution was writing everything as CommonJS. Which is nice.

## How it's done

* All application code is written in CommonJS format
* [Cajon](https://github.com/requirejs/cajon) is used during development
* [RequireJS](http://requirejs.org/) (or possibly [Almond](https://github.com/jrburke/almond) if all your code is in the monolith) is used in the final build, where the CommonJS code is transformed into AMD-modules, using <code>r.js</code> with <code>cjsTranslate: true</code>
* Components (means contrib libraries) are always built into a separate monolith, with a little help from <code>bootstrap.js</code> in the <code>client</code>-folder. They are built separately, because the <code>cjsTranslate</code> setting would mess up some libraries during the build

## Application startup

* Application startup is always done by loading the components monolith, which using <code>bootstrap.js</code> loads the application startup script
* As a benefit the <code>script</code>-tag for "booting up" remains unchanged between dev and release

## Demo

NB! Requires Grunt 0.4.

Fetch dependencies by commanding <code>npm install</code>. Run tests by commanding <code>npm test</code>.

Build by commanding <code>npm run-script debug</code> (dev version) or <code>grunt run-script build</code> (release version).

Run the server by commanding <code>npm start</code>, then visit <code>http://localhost:3000</code> (default port) in your browser.

## Demo app

The codebase contains a simple Todo MVC style app as an example, with a ridiculously large dependency graph. All for the sake of demonstrating something really, really simple.
