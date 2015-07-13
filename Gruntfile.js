module.exports = function (grunt) {

	'use strict';

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	var options = {
		pkg: require('./package'), // e.g. <%=pkg.name%>

		/**
		 * Config - Edit this section
		 * ==========================
		 * Choose javascript dist filename
		 * Choose javascript dist location
		 * Choose javascript files to be uglified
		 */
		config : {

			srcDir: 'bannersSrc', // <%=config.srcDir%>
			distDir: 'bannersDist', // <%=config.distDir%>

			scss : {
				cssFile : 'initial' // <%=config.scss.cssFile%>
			},

			plugins : {
				// <%=config.js.distDir%>
				distDir  : '<%=config.distDir%>/lib/',

				// <%=config.js.distFile%>
				distFile : 'plugins.min.js',
 
				// <%=config.js.fileList%>
				fileList : [
					'assets/js/move.js',

				]
			}
		}
	};

	// Load grunt configurations automatically
	var configs = require('load-grunt-configs')(grunt, options);

	// Define the configuration for all the tasks
	grunt.initConfig(configs);

	/* ==========================================================================
	 * Available tasks:
	 * grunt            : run jshint, uglify and sass:banners
	 * grunt watch      : run sass:banners, uglify and livereload
	 * grunt dev        : run sass:banners & autoprefixer:banners
	 * grunt deploy     : run jshint, sass:banners and csso
	 * grunt serve      : watch js & scss and run a local server
		 ========================================================================== */

	/**
	* GRUNT * Default task
	* run sass:banners and autoprefixer:banners & sass:initial & autoprefixer:initial
	*/
	grunt.registerTask('default', [
		'newer:sass:banners',
		'autoprefixer:banners',
		'includes',
		'browserify:dev',
		'uglify',
		'htmlbuild',
		'copy'
	]);


	/**
	 * GRUNT DEV * A task for development
	 * run sass:banners & autoprefixer:banners & sass:initial & autoprefixer:initial
	 */
	grunt.registerTask('dev', [
		//'clean',
		'newer:sass:banners',
		'autoprefixer:banners',
		'includes',
		'browserify:dev',
		'uglify',
		'htmlbuild',
		'copy'
	]); 


	/**
	* GRUNT DEPLOY * A task for your production environment
	* run sass:banners, autoprefixer:banners & sass:initial & autoprefixer:initial and csso
	*/
	grunt.registerTask('deploy', [
		'newer:sass:banners',
		'autoprefixer:banners',
		// 'csso',
		'includes',
		'browserify:deploy',
		'uglify',
		'htmlbuild',
		'copy'
	]);

	/**
	 * GRUNT SERVE * A task for for a static server with a watch
	 * run connect and watch
	 */
	grunt.registerTask('serve', [
		'newer:sass:banners',
		'autoprefixer:banners',
		'includes',
		'browserify:dev',
		'uglify',
		'htmlbuild',
		'copy',
		'connect:site',
		'watch'
	]);
};