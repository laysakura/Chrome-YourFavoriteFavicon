module.exports = function (grunt) {
  'use strict';
  var source = {
    build: [
      'src/miscs/*.js',
      'src/viewModels/*.js',
      'src/models/*.js',
      'src/your-favorite-favicon.js'
    ]
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        src : source.build,
        dest: 'dist/your-favarite-favicon.dev.js'
      }
    },

    uglify: {
      build: {
        src : 'dist/your-favarite-favicon.dev.js',
        dest: 'dist/your-favarite-favicon.min.js',
        options: {
          banner: '/*! <%= pkg.name %> | Copyright (c) 2015 Sho Nakatani. */',
          sourceMap: true,
          sourceMapName : 'dist/your-favarite-favicon.map'
        }
      }
    },

    watch: {
      build: {
        files: source.build,
        tasks: ['concat', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['concat', 'uglify']);
  grunt.registerTask('livebuild', ['watch']);
};
