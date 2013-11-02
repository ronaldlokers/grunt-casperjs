// Simple casperjs script to echo the casperjs path.

/* global phantom */
var casper = require('casper').create();

casper.start();

casper.then(function getVersion() {
    // phantom is a global variable created by casperjs.
    this.echo(phantom.casperPath);
});

casper.run();