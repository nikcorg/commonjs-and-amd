/*global module:false, __dirname:false*/
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-simple-mocha");
    grunt.loadNpmTasks("grunt-contrib-requirejs");

    /* Define loaders */
    var loaders = {
            almond: "client/components/almond/almond.js",
            cajon: "client/components/cajon/cajon.js",
            requirejs: "client/components/requirejs/require.js"
        };

    /* Some defaults */
    var defaults = {
            build: {
                amdloader: loaders.requirejs
            },
            debug: {
                amdloader: loaders.cajon
            },
            dirs: {
                src: "client",
                build: "client-build",
                debug: "client-debug",
                server: "server",
                temp: "temp",
                tests: "tests"
            },
            requireConfig: "client/bootstrap.js"
        };

    /* This is ugly, but it works. I know there's a bower-package I could use
     * but as this is just a concept demo (for now), I'm happy with the quick
     * and dirty solution.
     *
     * For all packages listed in component.json, create a "library":"empty:"
     * entry in the map we use for building the application monolith, because
     * the libs are built separately.
     */
    var emptyDeps = Object.keys(require("./component.json").dependencies).
        reduce(function (map, key) {
            map[key] = "empty:";
            return map;
        }, {});

    /* Compile actual Tasks config */
    var config = {
            defaults: defaults,
            loaders: loaders,
            simplemocha: {
                options: {
                    globals: [],
                    timeout: 3000,
                    ignoreLeaks: false,
                    ui: "bdd",
                    reporter: "dot"
                },
                all: {
                    src: ['tests/**/*.spec.js']
                }
            },
            requirejs: {
                options: {
                    baseUrl: "<%= defaults.dirs.src %>/app",
                    mainConfigFile: "<%= defaults.requireConfig %>",
                    keepBuildDir: true
                },
                application: {
                    options: {
                        appDir: "<%= defaults.dirs.src %>/app",
                        baseUrl: "../app",
                        cjsTranslate: true,
                        dir: "<%= defaults.dirs.build %>/app",
                        findNestedDependencies: true,
                        optimize: "uglify",
                        modules: [
                            { name: "main" }
                        ],
                        paths: emptyDeps
                    }
                },
                components: {
                    options: {
                        cjsTranslate: false,
                        include: ["bootstrap"],
                        out: "<%= defaults.dirs.temp %>/components.js",
                        paths: {
                            "bootstrap": "../bootstrap",
                            "app/main": "empty:"
                        }
                    }
                }
            },

            uglify: {
                build: {
                    src: ["<%= defaults.build.amdloader %>", "<%= defaults.dirs.temp %>/components.js"],
                    dest: "<%= defaults.dirs.build %>/amdloader.js"
                },
                debug: {
                    src: ["<%= defaults.debug.amdloader %>", "<%= defaults.dirs.temp %>/components.js"],
                    dest: '<%= defaults.dirs.debug %>/amdloader.js'
                }
            },

            copy: {
                build: {
                    files: [
                        {
                            cwd: "<%= defaults.dirs.src %>",
                            dest: "<%= defaults.dirs.build %>/",
                            expand: true,
                            src: ["*.html", "assets/**"]
                        }
                    ]
                },
                debug: {
                    files: [
                        {
                            cwd: "<%= defaults.dirs.src %>",
                            dest: "<%= defaults.dirs.debug %>/",
                            expand: true,
                            src: ["*.html", "app/**"]
                        }
                    ]
                },
                assets_debug: {
                    files: [
                        {
                            cwd: "<%= defaults.dirs.src %>/assets",
                            dest: "<%= defaults.dirs.debug %>/assets/",
                            expand: true,
                            src: ["**"]
                        }
                    ]
                }
            },

            jshint: {
                options: {
                    // The Good Parts.
                    "asi"           : false,  // Tolerate Automatic Semicolon Insertion (no semicolons).
                    "bitwise"       : true,  // Prohibit bitwise operators (&, |, ^, etc.).
                    "boss"          : false,  // Tolerate assignments inside if, for & while. Usually conditions & loops are for comparison, not assignments.
                    "curly"         : true,   // Require {} for every new block or scope.
                    "eqeqeq"        : true,   // Require triple equals i.e. `===`.
                    "eqnull"        : true,  // Tolerate use of `== null`.
                    "evil"          : false,  // Tolerate use of `eval`.
                    "expr"          : false,  // Tolerate `ExpressionStatement` as Programs.
                    "forin"         : false,  // Tolerate `for in` loops without `hasOwnPrototype`.
                    "immed"         : true,   // Require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
                    "latedef"       : true,   // Prohibit variable use before definition.
                    "laxbreak"      : false,   // Tolerate unsafe line breaks e.g. `return [\n] x` without semicolons.
                    "loopfunc"      : false,  // Allow functions to be defined within loops.
                    "noarg"         : true,   // Prohibit use of `arguments.caller` and `arguments.callee`.
                    "regexdash"     : false,  // Tolerate unescaped last dash i.e. `[-...]`.
                    "regexp"        : false,   // Prohibit `.` and `[^...]` in regular expressions.
                    "scripturl"     : true,   // Tolerate script-targeted URLs.
                    "shadow"        : false,  // Allows re-define variables later in code e.g. `var x=1; x=2;`.
                    "supernew"      : false,  // Tolerate `new function () { ... };` and `new Object;`.
                    "undef"         : true,   // Require all non-global variables be declared before they are used.

                    // Personal styling preferences.
                    "indent"        : 4,       // Specify indentation spacing
                    "newcap"        : false,   // Require capitalization of all constructor functions e.g. `new F()`.
                    "noempty"       : true,   // Prohibit use of empty blocks.
                    "nomen"         : false,  // Prohibit use of initial or trailing underbars in names.
                    "nonew"         : true,   // Prohibit use of constructors for side-effects.
                    "onevar"        : false,  // Allow only one `var` statement per function.
                    "plusplus"      : false,  // Prohibit use of `++` & `--`.
                    "sub"           : false,  // Tolerate all forms of subscript notation besides dot notation e.g. `dict['key']` instead of `dict.key`.
                    "trailing"      : true,   // Prohibit trailing whitespaces.
                    "white"         : false   // Check against strict whitespace and indentation rules.
                },
                client: {
                    options: {
                        "browser": true,
                        globals: {
                            "console": true,
                            "define": true,
                            "module": true,
                            "require": true
                        }
                    },
                    files: {
                        src: [
                            "<%= defaults.dirs.src %>/bootstrap.js",
                            "<%= defaults.dirs.src %>/app/**/*.js"
                        ]
                    }
                },
                server: {
                    options: {
                        node: true
                    },
                    files: {
                        src: ["<%= defaults.dirs.server %>/**/*.js"]
                    }
                }
            },

            clean: {
                all: ["temp", "client-build", "client-debug"]
            },

            watch: {
                client: {
                    files: [
                        "<%= defaults.dirs.src %>/*.html",
                        "<%= defaults.dirs.src %>/app/**/*"
                    ],
                    tasks: ["jshint:client", "copy:debug"]
                },
                assets: {
                    files: [
                        "<%= defaults.dirs.src %>/assets/**"
                    ],
                    tasks: ["copy:assets_debug"]
                },
                components: {
                    files: [
                        "<%= defaults.dirs.src %>/bootstrap.js"
                    ],
                    tasks: ["requirejs:components", "uglify:debug"]
                },
                server: {
                    files: [
                        "<%= defaults.dirs.server %>/**/*.js"
                    ],
                    tasks: ["jshint:server"]
                }
            }
        };

    grunt.initConfig(config);

    /* Build final front end */
    grunt.registerTask(
        "build",
        [
            "clean",
            "jshint:client",
            "requirejs:application",
            "requirejs:components",
            "uglify:build",
            "copy:build"
        ]
    );

    grunt.registerTask(
        "test",
        [
            "jshint:client",
            "jshint:server",
            "simplemocha:all"
        ]
    );

    /* Build debug front end */
    grunt.registerTask(
        "debug",
        [
            "clean",
            "requirejs:components",
            "uglify:debug",
            "jshint:client",
            "copy:debug",
            "copy:assets_debug",
            "watch"
        ]
    );
};
