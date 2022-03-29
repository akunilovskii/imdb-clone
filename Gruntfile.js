/*
 * grunt-svgstore
 * https://github.com/FWeinb/grunt-svgstore
 *
 * Copyright (c) 2014 Fabrice Weinberg
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    svgstore: {
      options: {
        prefix: "shape-",
      },
      default: {
        files: {
          "icons/svg-defs.svg": ["icons/*.svg"],
        },
      },
    },
  });
  // Actually load this plugin's task(s).
  grunt.loadNpmTasks("grunt-svgstore");
};
