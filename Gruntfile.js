module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    browserify: {
      sample: {
        files: {
          "dist/your-favorite-favicon.dev.js": ["src/options-main.js"]
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify']);
};
