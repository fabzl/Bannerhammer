module.exports.tasks = {
	htmlbuild: {
		dist: {
			files : [{
				expand : true,
				cwd    : '<%=config.srcDir%>',
				src    : ['**/index.html'],
				dest   : '<%=config.distDir%>'
			}],
			options: {
				prefix: '//Banner',
				relative: false,
				logOptions: true,
				scripts: {
					js: '<%=config.distDir%>/lib/initial.js'
				},
				styles: {
					css: '<%=config.srcDir%>/lib/initial.css'
				}
			}
		}
	},


	/**
	* Copy
	* https://github.com/gruntjs/grunt-contrib-copy
	*/
	copy: {
		main: {
			files: [
				{
					expand: true,
					cwd : '<%=config.srcDir%>',
					// Copies all css, ttf and map files but not anything in the lib directory
					src: ['**/*.css', '**/*.ttf', '**/*.map', '**/*.png', '**/*.jpg', '**/*.gif', '!lib/**/*.*'],
					dest: '<%=config.distDir%>'
				}
			]
		}
	},


	/**
	* Concat
	* https://github.com/gruntjs/grunt-contrib-concat
	*/
	concat: {
		basic: {
			src: ['<%=config.srcDir%>/lib/plugins.min.js', '<%=config.srcDir%>/**/polite.js'],
			dest: 'dist/built.js'
		}
	},


	/**
	 * https://github.com/vanetix/grunt-includes
	 */
	includes: {
		js: {
			options: {
				duplicates: false,
				debug: true
			},
			files: [{
				cwd: '<%=config.srcDir%>',
				src: '**/*.js',
				dest: '<%=config.distDir%>',
			}],
		},
	},


	clean: ["bannersDist"]
};