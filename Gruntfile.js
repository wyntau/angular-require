module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    uglify: {
      options: {
        mangle: {
          except: ['angular', 'require']
        },
        preserveComments: 'some'
      },
      dist: {
        files: {
          'angular-require.min.js': 'angular-require.js'
        }
      }
    }
  });
  grunt.registerTask('default', ['uglify']);
}