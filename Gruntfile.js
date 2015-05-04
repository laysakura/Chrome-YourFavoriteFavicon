module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    browserify: {
      sample: {
        files: {
          "dist/your-favorite-favicon-options.dev.js": ["src/options-main.js"],
          "dist/your-favorite-favicon-popup.dev.js": ["src/popup-main.js"],
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify']);
};
