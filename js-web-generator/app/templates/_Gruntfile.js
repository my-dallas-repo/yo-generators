module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat'); // -- NEED TO IMPLEMENT THIS
    grunt.loadNpmTasks('grunt-contrib-qunit');    // -- NEED TO IMPLEMENT THIS
    

        //  --  VARIABLES
    var _source = 'src/';
    var _destination='build/';

    grunt.initConfig({
        uglify: {
                options: {
                    mangle: true,
                    compress: {},
                },
                my_target: {
                    files: {
                        'build/js/master.min.js':
                        [
                            _source + 'js/sample1.js',
                            _source + 'js/sample2.js'
                        ]
                    }
                }
            },
        watch: {
            main: {
                files: [
                    _source + '*',
                    _source + 'js/*',
                    _source + 'css/*',
                    '*'
                ],
                tasks: [
                    'clean',
                    'uglify',
                    'copy',
                    //'replace',
                    'connect',
                    'jshint'
                ],
                options: {
                    spawn: false,
                    atBegin: true
                }
            }
        },
        copy: {
           main: {
               files: [
                    {
                        src: _source + 'css/sample1.css',
                        dest: _destination + 'css/sample1.css'
                    },
                    {
                        src: _source + 'js/libs/jquery-3.3.1.min.js',
                        dest: _destination + 'js/jquery-3.3.1.min.js'
                    },
                    {
                        src: _source + 'css/img/favicon.ico',
                        dest: _destination + 'favicon.ico'
                    }
               ]
            }
        },
        jshint: {
            options: {
                reporterOutput: ''
            },
            pre: ['Gruntfile.js', 'src/js/*.js']
        },
        replace: {
            dist: {
              options: {
                patterns: [
                  {
                    match: 'sampleReplace',
                    replacement: '<%= grunt.file.read("src/includes/SampleReplace.html") %>'
                  }
                ]
              },
              files: [
                {expand: true, flatten: true, src: [_source + '*.html'], dest: _destination}
              ]
            }
        },
        connect: {
             server: {
               options: {
                 port: 8000,
                 hostname: 'localhost',
                 base: 'build'
               },
               livereload: {
                   options: { open: true }
               }
             }
          },
        clean: [_destination]
    });
    grunt.registerTask('default', ['watch']);

};
