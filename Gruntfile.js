module.exports = function(grunt) {
  'use strict';

  var tasks = [
    'grunt-contrib-jshint',
    'grunt-contrib-concat',
    'grunt-contrib-jasmine',
    'grunt-contrib-watch',
    'grunt-contrib-uglify',
    'grunt-bump'
  ];

  var config = {};

  // =============================================
  // Metadata
  config.pkg = grunt.file.readJSON('package.json');
  config.banner = {
    full:  '/** <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today(\'yyyy-mm-dd\') %>\n' +
              '* Copyright (c) <%= grunt.template.today(\'yyyy\') %> Mauricio Soares de Oliveira;\n' +
              '* Licensed <%= pkg.license %> \n*/\n\n'
  }

  // =============================================
  // bump

  config.bump = {};
  config.bump.options = {
    files: ['package.json'],
    updateConfigs: [],
    commit: true,
    commitMessage: 'Release v%VERSION%',
    commitFiles: ['package.json'],
    createTag: true,
    tagName: 'v%VERSION%',
    tagMessage: 'Version %VERSION%',
    push: true,
    pushTo: 'https://github.com/noxjs/noxjs.git',
    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
  };

  // =============================================
  // jshint
  config.jshint = {};
  config.jshint.all = ['src/**/*.js'];

  // =============================================
  // concat
  config.concat = {
    options: {
      banner: '<%= banner.full %>'
    },
    dist: {
      src: [
        'src/core/nox.js',
        'src/core/module.js',
        'src/core/decorator.js',
        'src/methods/*.js'
      ],
      dest: 'dist/nox.js'
    }
  }

  // =============================================
  // jasmine
  config.jasmine = {};
  config.jasmine.pivotal = {
    src: [
      'src/core/nox.js',
      'src/core/module.js',
      'src/core/decorator.js',
      'src/methods/*.js',
      'tests/helpers/*.js'
    ],
    options: {
      specs: 'tests/**/*Spec.js'
    }
  }

  // =============================================
  // watch
  config.watch = {};
  config.watch.scripts = {
    files: ['src/**/*.js'],
    tasks: ['jshint', 'concat'],
    options: {
      spawn: false,
    }
  }

  // =============================================
  // uglify
  config.uglify = {};
  config.uglify.all = {
    files: {
      'dist/nox.min.js': [ 'dist/nox.js' ]
    },
    options: {
      preserveComments: false,
      sourceMap: 'dist/nox.min.map',
      sourceMappingURL: 'nox.min.map',
      report: 'min',
      beautify: {
        ascii_only: true
      },
      banner: '<%= banner.full %>',
      compress: {
        hoist_funs: false,
        loops: false,
        unused: false
      }
    }
  }

  // =============================================
  // config
  grunt.initConfig(config);

  // Load all tasks
  tasks.forEach(grunt.loadNpmTasks);

  // Tasks
  grunt.registerTask('dev', ['jshint', 'jasmine', 'concat']);

  grunt.registerTask('default', ['dev', 'uglify']);

};