
module.exports.tasks = {


		browserify: {

			dev: {

				options : {
					debug: true,
			//		transform: ["uglifyify"]
				},

				src: "<%=config.srcDir%>/lib/initial.js",
				dest: "<%=config.distDir%>/lib/initial.js"
			},

			deploy: {

				options : {
					debug: false,
			//		transform: ["uglifyify"]
				},

				src: "<%=config.srcDir%>/lib/initial.js",
				dest: "<%=config.distDir%>/lib/initial.js"
			}
		}
};
