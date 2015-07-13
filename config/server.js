module.exports.tasks = {

	/**
	 * Connect
	 * https://github.com/gruntjs/grunt-contrib-connect
	 * Start a static web server
	 */
	connect: {
		site: {
			options: {
				open: 'http://0.0.0.0:8000/bannersDist/banners',
				livereload: true
			}
		}
	}
};
