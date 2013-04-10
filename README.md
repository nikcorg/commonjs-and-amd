# A miniscule study in sharing code between a CommonJS and AMD environment without UMD.

How it's done

* Write all code in CommonJS format
* Use [Cajon](https://github.com/requirejs/cajon) during development
* Build monolith using <code>r.js</code> with ```cjsTranslate: true```

# Demo

Fetch dependencies by commanding <code>bower install && npm install</code>

Build monolith by commanding <code>grunt build</code>. (NB! Only tested with Grunt 0.3.)

Visit <code>index.html</code> for the Cajon version, <code>single.html</code> for the built monolith.

