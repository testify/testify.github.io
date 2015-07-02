/*
 * site
 *
 * Michael O'Connor
 * https://github.com/testify/site
 *
 * Copyright (c) 2015
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
'use strict';

  // Project configuration.
  grunt.initConfig({

    // Project metadata
    pkg   : grunt.file.readJSON('package.json'),
    vendor: grunt.file.readJSON('.bowerrc').directory,
    site  : grunt.file.readYAML('_config.yml'),
    bootstrap: '<%= vendor %>/bootstrap',


    // Before generating any new files, remove files from previous build.
    clean: {
      site: ['<%= site.dest %>'],
    },


    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'templates/helpers/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    bower: {
      install: {
        options: {
          dest: 'vendor'
        }
    }
  },

    // Build HTML from templates and data
    assemble: {
      options: {
        flatten: true,
        production: false,
        assets: '<%= site.assets %>',
        postprocess: require('pretty'),

        // Metadata
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        data: ['<%= site.data %>'],

        // Templates
        partials: '<%= site.partials %>',
        layoutdir: '<%= site.layouts %>',
        layout: '<%= site.layout %>',

        // Extensions
        helpers: '<%= site.helpers %>',
        plugins: '<%= site.plugins %>',
        collections: [{ name: 'categories', sortBy: 'title', sortOrder: 'descending'}]
      },
      docs: {
        files: [
          {
            expand: true,
            cwd: '<%= site.docs %>',
            src: ['**/*.{hbs,md}'],
            dest: '<%= site.dest %>/docs'
          }
        ]
      },
      blog: {
        files: [
          {
            expand: true,
            cwd: '<%= site.blog %>',
            src: ['**/*.{hbs,md}'],
            dest: '<%= site.dest %>/blog'
          }
        ]
      },
      about: {
        files: [
          {
            expand: true,
            cwd: '<%= site.about %>',
            src: ['**/*.{hbs,md}'],
            dest: '<%= site.dest %>/about'
          }
        ]
      },
      main: {
        files: [
          {
            expand: true,
            cwd: '<%= site.main %>',
            src: ['**/*.{hbs,md}'],
            dest: '<%= site.dest %>'
          }
        ]
      }
    },


    // Compile LESS to CSS
    less: {
      options: {
        vendor: 'vendor',
        paths: [
          '<%= site.theme %>',
          '<%= site.theme %>/bootstrap',
          '<%= site.theme %>/components',
          '<%= site.theme %>/utils'
        ],
      },
      site: {
        src: ['<%= site.theme %>/site.less'],
        dest: '<%= site.assets %>/css/site.css'
      }
    },


    // Copy Bootstrap's assets to site assets
    copy: {
      // Delete this target after first run!!! Afterwards you'll need to
      // decide on a strategy for adding javascripts, fonts etc.
      once: {
        files: [
          {expand: true, cwd: '<%= bootstrap %>/less', src: ['*', '!{var*,mix*,util*}'], dest: '<%= site.theme %>/bootstrap/'},
          {expand: true, cwd: '<%= bootstrap %>/less', src: ['{util*,mix*}.less'], dest: '<%= site.theme %>/utils'},
          {expand: true, cwd: '<%= bootstrap %>/less', src: ['variables.less'], dest: '<%= site.theme %>/'},
          {expand: true, cwd: 'node_modules/showup', src: ['showup.js'], dest: '<%= site.assets %>/js/'},
          {expand: true, cwd: 'node_modules/showup', src: ['showup.css'], dest: '<%= site.theme %>/components/', ext: '.less'},
        ]
      },
      // Keep this target as a getting started point
      assets: {
        files: [
          {expand: true, cwd: '<%= bootstrap %>/dist/fonts', src: ['*.*'], dest: '<%= site.assets %>/fonts/'},
          {expand: true, cwd: '<%= bootstrap %>/dist/js',    src: ['*.*'], dest: '<%= site.assets %>/js/'},
        ]
      },
      cname: {
        files: [
          {expand: true, cwd: '<%= site.main %>', src: ['*CNAME*'], dest: '<%= site.dest %>'}
        ]
      }
    },
    watch: {
      all: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint', 'nodeunit']
      },
      site: {
        files: ['Gruntfile.js', '<%= less.options.paths %>/*.less', 'theme/**/*.less', 'templates/**/*.hbs', 'content/**/*.md'],
        tasks: ['assemble']
      }
    },

    connect: {
        server: {
          options: {
            base: '<%= site.dest %>',
            port: 8000,
            hostname: '*',
            livereload: true
          }
        }
      },
      buildcontrol: {
        options: {
          dir: '<%= site.dest %>',
          commit: true,
          push: true,
          message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        pages: {
          options: {
            remote: 'git@github.com:testify/testify.github.io.git',
            branch: 'master'
          }
        },
        local: {
          options: {
            remote: '../',
            branch: 'master'
          }
        }
      }
    });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('docs', ['sync']);
  grunt.registerTask('build', ['clean', 'jshint', 'bower:install', 'copy', 'assemble', 'less', 'docs']);

  grunt.registerTask('serve', ['assemble', 'less', 'connect:server', 'watch']);
  grunt.registerTask('deploy', ['build', 'buildControl:pages']);
  grunt.registerTask('default', ['build']);
};
