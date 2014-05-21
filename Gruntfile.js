module.exports = function(grunt) {
  'use strict';

  var tasks = [
    'grunt-contrib-jshint'
  ];

  var config = {};

  // =============================================
  // jshint
  config.jshint = {};
  config.jshint.all = ['nox.js'];

  // =============================================
  // config
  grunt.initConfig(config);

  // Load all tasks
  tasks.forEach(grunt.loadNpmTasks)

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

};