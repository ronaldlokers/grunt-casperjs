module.exports = function( grunt ) {

    // Create a new multi task.
    grunt.registerMultiTask( 'casperjs', 'This triggers casperjs.', function() {

        // Tell grunt this task is asynchronous.
        var done = this.async(),
            files = grunt.file.expandFiles(this.file.src);

        grunt.file.expandFiles(this.file.src).forEach(function(filepath) {
            grunt.helper('casperjs', filepath, function(err){
                if (err) {
                    grunt.warn(err);
                    done(false);
                } else {
                    done();
                }
            });
        });
    });

    grunt.registerHelper('casperjs', function(filepath, callback) {
        var command = 'casperjs "' + filepath + '"',
            exec = require('child_process').exec;

        function puts( error, stdout, stderr ) {

            grunt.log.write( '\nRunning tests from "' + filepath + '":\n' );
            grunt.log.write( stdout );
            //grunt.log.error( stderr );

            if ( error !== null ) {
                callback(error);
            }
        }

        exec( command, puts );
    });
};