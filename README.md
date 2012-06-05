# grunt.js task for CasperJS

With this grunt.js task you can run tests with CasperJS.

1. [Install CasperJS](http://casperjs.org/installation.html)
2. Call `grunt.loadNpmTasks('grunt-casperjs')` in your gruntfile.
3. Add the following to your configuration file:

	```javascript
	casperjs: {
		files: ['tests/casperjs/**/*.js']
	},
	```
4. Run `grunt` or `grunt casperjs` and your CasperJS test are running in grunt.js :)