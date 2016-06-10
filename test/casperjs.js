
casper.start('http://www.google.nl/', function() {
    this.test.assertEquals(casper.cli.get('foo'), 'bar', "options were passed in successfully")
    this.test.assertTitle('Google', 'google homepage title is the one expected');
    this.test.assertExists('form[action="/search"]', 'main form is found');
    this.fill('form[action="/search"]', {
        q: 'foo'
    }, true);
});

casper.then(function() {
    this.test.assertTitle('foo - Google zoeken', 'google title is ok');
    this.test.assertUrlMatch(/q=foo/, 'search term has been submitted');
    this.test.assertEval(function() {
        return __utils__.findAll('h3.r').length >= 10;
    }, 'google search for "foo" retrieves 10 or more results');
});

casper.then(function () {
    this.test.done();
});

casper.run(function() {
    this.test.renderResults(true);
});
