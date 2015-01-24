# doublelist
A fast-lookup key-value doubly-linked list implementation for nodejs.

## Installation

    npm install doublelist

## Functionality

* __doublelist()__                      Constructor.
* __length__                            Returns the length of the list.
* __add(key, value)__                   Adds an element at the end of the list.
* __append(key, value)__                As above.
* __enqueue(key, value)__               As above.
* __push(key, value)__                  Adds an element at the beginning of the list.
* __insert(insertkey, key, value)__     Adds an element after the element with key <insertkey>.
* __pop()__                             Removes and returns the element at the beginning of the list, in the form [key, value].
* __dequeue()__                         As above.
* __remove(key)__                       Removes and returns the value of the element with key <key>.
* __clear()__                           Clears the list, removing all elements.
* __flush()__                           As above.
* __empty()__                           As above.
* __get(key)__                          Returns the value of the element with key <key>.
* __find(key)__                         As above.
* __set(key, value)__                   Assigns the value <value> to the element with key <key>.
* __update(key, value)__                As above.
* __hasKey(key)__                       Returns whether or not the key <key> exists.
* __foreach(callback)__                 Iterates over the list, executing the callback <callback> on each element. Callback expects the signature: callback(key, value).
* __toArray()__                         Returns an array representation of the list, in the form [[key1, value1], [key2, value2], ...].
* __toDict()__                          Returns a dictionary representation of the list, in the form {key1: value1, key2: value2, ...}.

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