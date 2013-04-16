# A miniscule study in sharing code between a CommonJS and AMD environment without UMD

In my current project, I'm sharing a large portion of code between the server and the browser. Initially I used a customised [UMDJS](https://gist.github.com/nikcorg/4444301) signature for this purpose. But it proved problematic when building a monolith; <code>r.js</code> understood absolutely nothing and all my modules were nameless.

At first, I tried finding a solution to make <code>r.js</code> understand UMDJS, but quite quickly gave up and decided I need to look elsewhere for a better solution.

That solution was doing everything as CommonJS.

## How it's done

* Write all code in CommonJS format
* Use [Cajon](https://github.com/requirejs/cajon) during development
* Build monolith using <code>r.js</code> with <code>cjsTranslate: true</code>

## Demo

Fetch dependencies by commanding <code>bower install && npm install</code>

Build monolith by commanding <code>grunt build</code>. (NB! Only tested with Grunt 0.3.)

Visit <code>src/index.html</code> for the Cajon version, <code>build/single.html</code> for the built monolith.
