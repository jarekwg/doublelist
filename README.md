# doublelist
[![npm version](https://badge.fury.io/js/doublelist.svg)](http://badge.fury.io/js/doublelist)
![Downloads](http://img.shields.io/npm/dm/doublelist.svg?style=flat)

A fast-lookup key-value doubly-linked list implementation for nodejs.

## Installation

    npm install doublelist

## Functionality

* `doublelist():`                      Constructor. Returns a new doublelist instance.
* `length:`                            Returns the length of the list.
* `add(key, value):`                   Adds an element at the end of the list.
* `append(key, value):`                As above.
* `enqueue(key, value):`               As above.
* `push(key, value):`                  Adds an element at the beginning of the list.
* `insert(insertkey, key, value):`     Adds an element after the element with key `insertkey`.
* `pop():`                             Removes and returns the element at the beginning of the list, in the form `[key, value]`.
* `dequeue():`                         As above.
* `remove(key):`                       Removes and returns the value of the element with key `key`.
* `clear():`                           Clears the list, removing all elements.
* `flush():`                           As above.
* `empty():`                           As above.
* `get(key):`                          Returns the value of the element with key `key`.
* `find(key):`                         As above.
* `set(key, value):`                   Assigns the value `value` to the element with key `key`.
* `update(key, value):`                As above.
* `hasKey(key):`                       Returns whether or not the key `key` exists.
* `foreach(callback):`                 Iterates over the list, executing the callback `callback` on each element. Callback expects the signature: `callback(key, value)`.
* `toArray():`                         Returns an array representation of the list, in the form `[[key1, value1], [key2, value2], ...]`.
* `toDict():`                          Returns a dictionary representation of the list, in the form `{key1: value1, key2: value2, ...}`.

## Example Code

    var doublelist = require('doublelist')
    
    var d = new doublelist()

    d.add('armadillo', {'baboon':'crayfish'})
    d.append('elephant', 5)
    d.insert('armadillo', 'deer', null)
    d.set('elephant', 500)
    d.append('fennec', 'gorilla')
    d.update('fennec', 'gopher')
    console.log(d.remove('elephant'))
    //500
    d.insert('deer', 'earwig', 42.69)
    
    d.foreach(function(key, value){
      console.log('KEY: ' + key + ', VALUE: ' + value)
    })
    //KEY: armadillo, VALUE: [object Object]
    //KEY: deer, VALUE: null
    //KEY: earwig, VALUE: 42.69
    //KEY: fennec, VALUE: gopher
    
    console.log(d.toArray())
    //[ [ 'armadillo', { baboon: 'crayfish' } ],
    //  [ 'deer', null ],
    //  [ 'earwig', 42.69 ],
    //  [ 'fennec', 'gopher' ] ]
    
    console.log(d.toDict())
    //[ armadillo: { baboon: 'crayfish' },
    //  deer: null,
    //  earwig: 42.69,
    //  fennec: 'gopher' ]
    
    d.clear()
    console.log(d.length)
    //0
    
Refer to the included tests for more example use.
