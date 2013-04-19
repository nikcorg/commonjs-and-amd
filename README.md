# A miniscule study in sharing code between a CommonJS and AMD environment without UMD

In my current project, I'm sharing a large portion of code between the server and the browser. Initially I used a customised [UMDJS](https://gist.github.com/nikcorg/4444301) signature for this purpose. But it proved problematic when building a monolith; <code>r.js</code> understood absolutely nothing and all my modules were nameless.

At first, I tried finding a solution to make <code>r.js</code> understand UMDJS, but quite quickly gave up and decided I need to look elsewhere for a better solution.

That solution was doing everything as CommonJS.

## How it's done

* All application code is written in CommonJS format
* [Cajon](https://github.com/requirejs/cajon) is used during development
* [RequireJS](http://requirejs.org/) (or possibly [Almond](https://github.com/jrburke/almond) if all your code is in the monolith) is used in the final build, where the CommonJS code is transformed into AMD-modules, using <code>r.js</code> with <code>cjsTranslate: true</code>
* Components (means contrib libraries) are always built into a separate monolith, with a little help from <code>bootstrap.js</code> in the <code>client</code>-folder. They are built separately, because the <code>cjsTranslate</code> setting would mess up some libraries during the build

## Application startup

* Application startup is always done by loading the components monolith, which using <code>bootstrap.js</code> loads the application startup script
* As a benefit the <code>script</code>-tag for "booting up" remains unchanged between dev and release

## Demo

Fetch dependencies by commanding <code>bower install && npm install</code>

Build monolith by commanding <code>grunt debug</code> (dev version) or <code>grunt build</code> (release version). (NB! Requires Grunt 0.4)

Visit <code>client-debug/index.html</code> for the dev version (uses Cajon), or <code>client-build/single.html</code> for the release version (uses RequireJS) in your browser.
