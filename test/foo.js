/* globals casper */

casper.test.begin("Test Foo", 2, function(test) {
    test.assertTrue(true);
    test.assertFalse(false);
    test.done();
});
