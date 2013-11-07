/* globals casper, __utils__ */

casper.test.begin("Test CasperJS", function(test) {
    casper.start('http://www.google.nl/', function() {
        test.assertTitle('Google', 'google homepage title is the one expected');
        test.assertExists('form[action="/search"]', 'main form is found');
        this.fill('form[action="/search"]', {
            q: 'foo'
        }, true);
    });

    casper.then(function() {
        test.assertTitle('foo - Google zoeken', 'google title is ok');
        test.assertUrlMatch(/q=foo/, 'search term has been submitted');
        test.assertEval(function() {
            return __utils__.findAll('h3.r').length >= 10;
        }, 'google search for "foo" retrieves 10 or more results');
    });

    casper.run(function() {
        test.done();
    });
});
