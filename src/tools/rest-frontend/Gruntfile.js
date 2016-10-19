module.exports = function(grunt) {

    var dstFileBanner = '/**\n * @application <%= pkg.name %>\n * @version <%= pkg.version %>\n * @updated <%= grunt.template.today("yyyy-mm-dd") %>\n * @author <%= pkg.author %>\n * @license <%= pkg.license %>\n */\n';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'create-website-structure': {
            options: {

            },
            build: {
				repo_root: '../../../..',
				input: 'resources/structure.json.in',
                output: 'resources/structure.json'
            }
		},
		'copy-website-content': {
			options: {

			},
			build: {
				repo_root: '../../../..',
				input: 'resources/structure.json',
				target_dir: '../public/website'
			}
		},
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            build: ['Gruntfile.js', 'resources/assets/js/**/*.js']
        },
        less: {
            build: {
                files: {
                    'public/assets/skin/default/css/theme.css': 'resources/assets/skin/default/less/theme.less'
                }
            }
        },
        cssmin: {
            options: {
                banner: dstFileBanner
            },
            build: {
                files: {
                    'public/assets/skin/default/css/theme.min.css': 'public/assets/skin/default/css/theme.css'
                }
            }
        },
        preprocess: {
            options: {
                context: {
                    CONFIGURATION: grunt.file.read('application-config.json'),
					WEBSTRUCTURE: grunt.file.read('resources/structure.json')
                },
				type: 'js'
            },
            config: {
                src: 'resources/assets/js/config/constants.config.js.in',
                dest: 'resources/assets/js/config/constants.config.js'
            }
        },
        uglify: {
            options: {
                banner: dstFileBanner
            },
            build: {
                files: {
                    'public/assets/js/application.js': 'resources/assets/js/**/*.js'
                }
            }
        },
        watch: {
            less: {
                files: ['resources/assets/skin/**/*'],
                tasks: ['less','cssmin']
            },
			preprocess: {
				files: [
					'resources/assets/js/config/constants.config.js.in',
					'application-config.json',
					'resources/structure.json'
				],
				tasks: ['preprocess', 'uglify']
			},
            js: {
                files: ['resources/assets/js/**/*'],
                tasks: ['uglify']
            }
        },
        'http-server': {

            dev: {

                // the server root directory
                root: 'public',

                // the server port
                port: 9000,

                // the host ip address
                // If specified to, for example, "127.0.0.1" the server will
                // only be available on that ip.
                // Specify "0.0.0.0" to be available everywhere
                host: "0.0.0.0",

                cache: 0,
                showDir : false,
                autoIndex: true,

                // server default file extension
                ext: "html",

                // run in parallel with other tasks
                runInBackground: false,

                // specify a logger function. By default the requests are
                // sent to stdout.
                logFn: function(req, res, error) { },

                // Proxies all requests which can't be resolved locally to the given url
                // Note this this will disable 'showDir'
                //proxy: "http://someurl.com",

                /// Use 'https: true' for default module SSL configuration
                /// (default state is disabled)
                //https: {
                //    cert: "cert.pem",
                //    key : "key.pem"
                //},

                // Tell grunt task to open the browser
                //openBrowser : false,

                // customize url to serve specific pages
                //customPages: {
                //    "/readme": "README.md",
                //    "/readme.html": "README.html"
                //}

            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.loadTasks('./resources/grunt-tasks');

    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('full', ['less', 'cssmin', 'create-website-structure', 'copy-website-content', 'preprocess', 'uglify']);
    grunt.registerTask('server', ['http-server']);

};
