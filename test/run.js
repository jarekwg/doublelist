var test = require('tap').test
var doublelist = require('../')

test('list', function (t) {
    var d = new doublelist()
    t.equal(d.length, 0, "new list should be empty")

    d.add('armadillo', {'baboon':'crayfish'})
    t.ok(d.hasKey('armadillo'), "list should have new key: 'armadillo'")
    t.equal(d.length, 1, "list should have 1 element")
    t.notOk(d.hasKey('baboon'), "list should not have key: 'baboon'")
    t.notOk(d.hasKey('crayfish'), "list should not have key: 'crayfish'")
    t.equal(d.get('armadillo').baboon, 'crayfish', "list object with key 'armadillo' should have 'crayfish' as its 'baboon' parameter")
    
    d.append('elephant', 5)
    t.ok(d.hasKey('elephant'), "list should have new key: 'elephant'")
    t.equal(d.length, 2, "list should have 2 elements")
    t.equal(d.get('elephant'), 5, "list object with key 'elephant' should be: 5")
    
    d.insert('armadillo', 'deer', null)
    t.ok(d.hasKey('deer'), "list should have new key: 'deer'")
    t.equal(d.length, 3, "list should have 3 elements")
    t.equal(d.get('deer'), null, "list object with key 'deer' should be: null")
    
    d.set('elephant', 500)
    t.ok(d.hasKey('elephant'), "list should still have key: 'elephant'")
    t.equal(d.length, 3, "list should still have 3 elements")
    t.equal(d.get('elephant'), 500, "list object with key 'elephant' should now be: 500")
    
    var keys = []
    var values = []
    d.foreach(function(key, value){
      keys[keys.length] = key
      values[values.length] = value
    })
    t.deepEqual(keys, ['armadillo', 'deer', 'elephant'], "list keys should be (in order): ['armadillo', 'deer', 'elephant']")
    t.deepEqual(values, [{'baboon':'crayfish'}, null, 500], "list values should be (in order): [{'baboon':'crayfish'}, null, 500]")
    
    d.append('fennec', 'gorilla')
    t.ok(d.hasKey('fennec'), "list should have new key: 'fennec'")
    t.equal(d.length, 4, "list should have 4 elements")
    t.equal(d.get('fennec'), 'gorilla', "list object with key 'fennec' should be: 'gorilla'")
    
    d.update('fennec', 'gopher')
    t.ok(d.hasKey('fennec'), "list should still have key: 'fennec'")
    t.equal(d.length, 4, "list should still have 4 elements")
    t.equal(d.find('fennec'), 'gopher', "list object with key 'elephant' should now be: 'gopher'")
    
    var val = d.remove('elephant')
    t.equal(val, 500, "removing element 'elephant' from list should yield its associated value: 500")
    t.notOk(d.hasKey('elephant'), "list should no longer have key: 'elephant'")
    t.equal(d.length, 3, "list should have 3 elements")
    
    d.insert('deer', 'earwig', 42.69)
    t.ok(d.hasKey('earwig'), "list should have new key: 'earwig'")
    t.equal(d.length, 4, "list should have 4 elements")
    t.equal(d.get('earwig'), 42.69, "list object with key 'earwig' should be: 42.69")
    
    keys = []
    values = []
    d.foreach(function(key, value){
      keys[keys.length] = key
      values[values.length] = value
    })
    t.deepEqual(keys, ['armadillo', 'deer', 'earwig', 'fennec'], "list keys should be (in order): ['armadillo', 'deer', 'earwig', 'fennec']")
    t.deepEqual(values, [{'baboon':'crayfish'}, null, 42.69, 'gopher'], "list values should be (in order): [{'baboon':'crayfish'}, null, 42.69, 'gopher']")
    
    t.deepEqual(d.toArray(), [['armadillo', {'baboon': 'crayfish'}],
                              ['deer', null],
                              ['earwig', 42.69],
                              ['fennec', 'gopher']],
                             "list should cast nicely to array" 
               )
    
    t.deepEqual(d.toDict(), {'armadillo': {'baboon': 'crayfish'},
                           'deer': null,
                           'earwig': 42.69,
                           'fennec': 'gopher'},
                          "list should cast nicely to dict" 
               )
    
    d.clear()
    t.notOk(d.hasKey('earwig'), "cleared list should no longer have key: 'earwig'")
    t.notOk(d.hasKey('fennec'), "cleared list should no longer have key: 'fennec'")
    t.equal(d.length, 0, "list should have 0 elements")
    
    t.end()
})

test('queue', function (t) {
    var q = new doublelist()
    t.equal(q.length, 0, "new queue should be empty")
    
    q.enqueue(0, 'hopscotch')
    t.ok(q.hasKey(0), "queue should have new key: 0")
    t.equal(q.length, 1, "queue should have 1 element")
    t.notOk(q.hasKey('hopscotch'), "queue should not have key: 'hopscotch'")
    t.equal(q.get(0), 'hopscotch', "queue object with key 0 should be: 'hopscotch'")
    
    q.enqueue(1, 'i spy')
    t.ok(q.hasKey(1), "queue should have new key: 1")
    t.equal(q.length, 2, "queue should have 2 elements")
    t.equal(q.get(1), 'i spy', "queue object with key 1 should be: 'i spy'")
    
    q.enqueue(-1, 'jan-ken-pon')
    t.ok(q.hasKey(-1), "queue should have new key: -1")
    t.equal(q.length, 3, "queue should have 3 element")
    t.equal(q.get(-1), 'jan-ken-pon', "queue object with key -1 should be: 'jan-ken-pon'")
    
    var keys = []
    var values = []
    q.foreach(function(key, value){
      keys[keys.length] = key
      values[values.length] = value
    })
    t.deepEqual(keys, [0, 1, -1], "queue keys should be (in order): [0, 1, -1]")
    t.deepEqual(values, ['hopscotch', 'i spy', 'jan-ken-pon'], "queue values should be (in order): ['hopscotch', 'i spy', 'jan-ken-pon']")
    
    var ele = q.dequeue()
    t.equal(ele[0], 0, "key of popped element should be: 0")
    t.equal(ele[1], 'hopscotch', "value of popped element should be: 'hopscotch'")
    t.notOk(q.hasKey(0), "queue should no longer have key: 0")
    t.equal(q.length, 2, "queue should have 2 elements")
    
    var ele = q.dequeue()
    t.equal(ele[0], 1, "key of popped element should be: 1")
    t.equal(ele[1], 'i spy', "value of popped element should be: 'i spy'")
    t.notOk(q.hasKey(1), "queue should no longer have key: 1")
    t.equal(q.length, 1, "queue should have 1 element")
    
    q.flush()
    t.notOk(q.hasKey(-1), "cleared queue should no longer have key: -1")
    t.equal(q.length, 0, "queue should have 0 elements")
    t.deepEqual(q.toArray(), [], "queue should cast to empty array")
    
    t.end()
})

test('stack', function (t) {
    var s = new doublelist()
    t.equal(s.length, 0, "new stack should be empty")
    
    s.push('kitchenhand', 'librarian')
    t.ok(s.hasKey('kitchenhand'), "stack should have new key: 'kitchenhand'")
    t.equal(s.length, 1, "stack should have 1 element")
    t.notOk(s.hasKey('librarian'), "stack should not have key: 'librarian'")
    t.equal(s.get('kitchenhand'), 'librarian', "stack object with key 'kitchenhand' should be: 'librarian'")
    
    s.push('midwife', {'nanny': {'office manager': 'panelbeater'}})
    t.ok(s.hasKey('midwife'), "stack should have new key: 'midwife'")
    t.equal(s.length, 2, "stack should have 2 elements")
    t.equal(s.get('midwife').nanny['office manager'], 'panelbeater', "stack object with key 'midwife' should have a 'nanny' parameter with 'panelbeater' as its 'office manager' parameter")
    
    t.deepEqual(s.toArray(), [['midwife', {'nanny': {'office manager': 'panelbeater'}}],
                              ['kitchenhand', 'librarian']],
                             "stack should cast nicely to array" 
               )
    t.deepEqual(s.toDict(), {'midwife': {'nanny': {'office manager': 'panelbeater'}},
                             'kitchenhand': 'librarian'},
                            "stack should cast nicely to array" 
               )
    
    var ele = s.pop()
    t.equal(ele[0], 'midwife', "key of popped element should be: 'midwife'")
    t.deepEqual(ele[1], {'nanny': {'office manager': 'panelbeater'}}, "value of popped element should be: {'nanny': {'office manager': 'panelbeater'}}")
    t.notOk(s.hasKey('midwife'), "stack should no longer have key: 'midwife'")
    t.equal(s.length, 1, "stack should have 1 element")
    
    var ele = s.pop()
    t.equal(ele[0], 'kitchenhand', "key of popped element should be: 'kitchenhand'")
    t.equal(ele[1], 'librarian', "value of popped element should be: 'librarian'")
    t.notOk(s.hasKey('kitchenhand'), "stack should no longer have key: 'kitchenhand'")
    t.equal(s.length, 0, "stack should have 0 elements")
    t.deepEqual(s.toDict(), {}, "stack should cast to empty dict")
    
    t.end()
})