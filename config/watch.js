module.exports.tasks = {

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	* Watches your scss, js etc for changes and compiles them
	*/
	watch: {
		scss: {
			files: ['<%=config.srcDir%>/**/*.scss'],
			tasks: [
				'newer:sass:banners',
				'autoprefixer:banners',
				'htmlbuild',
				'copy'
			]
		},

		livereload: {
			options: {
				livereload: true
			},
			files: [
				'<%=config.distDir%>/**/*.{css,html,js}'
			]
		},

		html : {
			files: '<%=config.srcDir%>/**/*.html',
			tasks: [
				'htmlbuild',
				'copy'
			]
		},

		js : {
			files: [
				'<%=config.srcDir%>/**/*.js',
				'!<%=config.srcDir%>/**/*.min.js',
				'<%=config.plugins.fileList%>',
				'Gruntfile.js',
				'config/*.js'
			],
			tasks: [
				'clean',
				'includes',
				'browserify:dev',
				'uglify',
				'htmlbuild',
				'copy'
			]
		},

		images : {
			files: [
				'<%=config.srcDir%>/**/*.{png,jpg,gif}'
			],
			tasks: [
				'htmlbuild',
				// 'clean',
				'copy'
			]
		}
	}
};