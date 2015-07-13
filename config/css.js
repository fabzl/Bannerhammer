module.exports.tasks = {

	/**
	 * Sass compilation using grunt-sass
	 * https://github.com/gruntjs/grunt-contrib-sass
	 * Includes *.scss files
	 * Also creates source maps
	 */
	sass: {
		banners: {
			options: {
				unixNewlines : true,
				style        : 'compressed',
				lineNumbers  : false,
				debugInfo    : false,
				precision    : 8,
				sourcemap    : false
			},
			files: [{
				expand : true,
				cwd    : '<%=config.srcDir%>',
				src    : ['**/*.scss'],
				dest   : '<%=config.srcDir%>',
				ext    : '.css'
			}]
		}
	},


	/**
	 * Autoprefixer
	 * https://github.com/nDmitry/grunt-autoprefixer
	 * https://github.com/ai/autoprefixer
	 * Auto prefixes your CSS using caniuse data
	 */
	autoprefixer: {
		options: {
			// We are supporting the last 4 browsers, any browsers with >1% market share,
			// and ensuring we support IE9+ with prefixes
			browsers: ['> 5%', 'last 4 versions', 'firefox > 4', 'ie > 9'],
			map: false
		},

		banners: {
			expand: true,
			cwd    : '<%=config.srcDir%>',
			src    : ['**/*.css'],
			dest   : '<%=config.srcDir%>'
		}
	},


	/**
	 * CSSO
	 * https://github.com/t32k/grunt-csso
	 * Minify CSS files with CSSO
	 */
	csso: {
		dist: {
			options: {
				restructure: false //turns structural optimisations off as can mess up fallbacks http://bem.info/tools/optimizers/csso/description/
			},
			files: {
				'css/<%=config.scss.cssFile%>.css'       : 'css/<%=config.scss.cssFile%>.css',
				'css/<%=config.scss.cssFile%>-old-ie.css': 'css/<%=config.scss.cssFile%>-old-ie.css'
			},

		}
	}

};
