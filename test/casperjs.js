/*jshint strict:false*/
/*global CasperError, console, phantom, require, casper*/

casper.test.begin('default test', 4, function(test) {
    casper.start('http://www.google.com/');

    casper.waitFor(function() {
        return this.evaluate(function() {
            return document.title === 'Google';
        });
    }, function() {
        test.pass('google homepage title is the one expected');
    }, function() {
        test.fail('Failed finding title');
    });

    if (casper.cli.get('foo') === 'bar') {
        test.pass('options were passed in successfully');
    } else {
        test.fail('options were not passed in successfully');
    }

    casper.waitFor(function() {
        return this.evaluate(function() {
            return document.querySelectorAll('form[action="/search"]').length === 1;
        });
    }, function() {
        test.pass('main form is found');
    }, function() {
        test.fail('Failed finding form');
    });

    casper.then(function () {
        this.fillSelectors('form[action="/search"]', { 'input[name="q"]': 'foo' }, true);
    });

    casper.waitFor(function() {
        return this.evaluate(function() {
            return document.title === 'foo - Google Search';
        });
    }, function() {
        test.pass('google search title is the one expected');
    }, function() {
        test.fail('Failed finding search title');
    });

    casper.run(function() {
        test.done();
    });
});