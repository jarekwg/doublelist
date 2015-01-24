var test = require('tap').test
var doublelist = require('../')

// TODO: Finish writing these tests..

test('list', function (t) {
    t.plan(2)

    var d = doublelist()
    t.equal(d.length, 0)

    d.add('armadillo', {'baboon':'caterpillar'})
    t.equal(d.length,1)
})