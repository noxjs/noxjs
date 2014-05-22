module.exports = function(grunt) {
  'use strict';

  var tasks = [
    'grunt-contrib-jshint',
    'grunt-contrib-concat',
    'grunt-contrib-jasmine',
    'grunt-contrib-watch'
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
  // jshint
  config.jshint = {};
  config.jshint.all = ['src/**/*.js'];

  // =============================================
  // concat
  config.concat = {};
  config.concat.options = {
    banner: '<%= banner.full %>'
  }
  config.concat.dist = {
    src: [
      'src/core/nox.js',
      'src/core/module.js',
      'src/methods/*.js'
    ],
    dest: 'dist/nox.js'
  }

  // =============================================
  // jasmine
  config.jasmine = {};
  config.jasmine.pivotal = {
    src: [
      'src/core/nox.js',
      'src/core/module.js',
      'src/methods/*.js',
      'src/modules/*.js'
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
  // config
  grunt.initConfig(config);

  // Load all tasks
  tasks.forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat']);

};