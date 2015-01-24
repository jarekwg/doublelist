/* (The MIT License)
*
* Copyright (c) 2015 Jarek Glowacki <jarekwg@outlook.com>
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
* associated documentation files (the 'Software'), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge, publish, distribute,
* sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included with all copies or
* substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
* BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

module.exports = DoubleList

// Constructor.
function DoubleList() {
    this.index = {}
    this.head = null
    this.tail = null
    this.length = 0
}

// Generic node object.
function Node(key, value) {
    this.next = null
    this.prev = null
    this.key = key
    this.value = value
}

// Adds an element at the end of the list.
DoubleList.prototype.add = function(key, value) {
    if (this.index.hasOwnProperty(key)) throw new Error('Key ' + key + ' already exists! Key must be unique.')
    var node = new Node(key, value)
    this.index[key] = node
    if (this.length === 0) {
        this.head = node
    } else {
        node.prev = this.tail
        this.tail.next = node
    }
    this.tail = node
    this.length++
}
DoubleList.prototype.append = DoubleList.prototype.add
DoubleList.prototype.enqueue = DoubleList.prototype.add

// Adds an element at the beginning of the list.
DoubleList.prototype.push = function(key, value) {
    if (this.index.hasOwnProperty(key)) throw new Error('Key ' + key + ' already exists! Key must be unique.')
    var node = new Node(key, value)
    this.index[key] = node
    if (this.length === 0) {
        this.tail = node
    } else {
        node.next = this.head
        this.head.prev = node
    }
    this.head = node
    this.length++
}

// Adds an element after the element with key <insertkey>.
DoubleList.prototype.insert = function(insertkey, key, value) {
    if (!this.index.hasOwnProperty(insertkey)) throw new Error('Key ' + key + ' does not exist!')
    if (this.index.hasOwnProperty(key)) throw new Error('Key ' + key + ' already exists! Key must be unique.')
    var node = new Node(key, value)
    this.index[key] = node
	var insertnode = this.index[insertkey]
	if (insertnode.next === null) {
		this.tail = node
	} else {
		insertnode.next.prev = node
	}
	node.next = insertnode.next
	node.prev = insertnode
	insertnode.next = node
    this.length++
}

// Removes and returns the element at the beginning of the list, in the form [key, value].
DoubleList.prototype.pop = function() {
	if (this.length === 0) throw new Error('Cannot remove from an empty list!')
    var node = this.head
    delete this.index[node.key]
    if (this.length === 1){
        this.tail = null
    } else {
		node.next.prev = null
    }
	this.head = node.next
    this.length--
    return [node.key, node.value]
}
DoubleList.prototype.dequeue = DoubleList.prototype.pop

// Removes and returns the value of the element with key <key>.
DoubleList.prototype.remove = function(key) {
    if (!this.index.hasOwnProperty(key)) throw new Error('Key ' + key + ' does not exist!')
    var node = this.index[key]
    delete this.index[key]
    if (this.length === 1){
        this.head = null
        this.tail = null
    } else {
        if (node.prev === null){
            this.head = node.next
            node.next.prev = null
        } else if (node.next === null) {
            this.tail = node.prev
            node.prev.next = null
        } else {
            node.prev.next = node.next
            node.next.prev = node.prev
        }
    }
    this.length--
    return node.value
}


// Clears the list, removing all elements.
DoubleList.prototype.clear = function() {
    var node = this.head
    var i = this.length

    while (i--) {
        node.prev = null
        node = node.next
    }
    
    this.index = {}
    this.head = null
    this.tail = null
    this.length = 0
}
DoubleList.prototype.flush = DoubleList.prototype.clear
DoubleList.prototype.empty = DoubleList.prototype.clear

// Returns the value of the element with key <key>.
DoubleList.prototype.get = function(key) {
    if (!this.index.hasOwnProperty(key)) throw new Error('Key ' + key + ' does not exist!')
    return this.index[key].value
}
DoubleList.prototype.find = DoubleList.prototype.get

// Assigns the value <value> to the element with key <key>.
DoubleList.prototype.set = function(key, value) {
    if (!this.index.hasOwnProperty(key)) throw new Error('Key ' + key + ' does not exist!')
    this.index[key].value = value
}
DoubleList.prototype.update = DoubleList.prototype.set

// Returns whether or not the key <key> exists.
DoubleList.prototype.hasKey = function(key) {
    return this.index.hasOwnProperty(key)
}


// Iterates over the list, executing the specified callback function for each element.
//  The callback function must have the signature: callback(key, value).
DoubleList.prototype.foreach = function(callback) {
    var node = this.head
    var i = this.length

    while (i--) {
        callback(node.key, node.value)
        node = node.next
    }
}

// Returns an array representation of this list.
//  Each array element is assigned a key-value pair from the list.
DoubleList.prototype.toArray = function() {
    var arr = []
    var node = this.head
    var i = this.length

    while (i--) {
        arr[arr.length] = [node.key, node.value]
        node = node.next
    }
    return arr
}

// Returns a dictionary representation of this list.
//  The returned object is assigned keys from the list, which point to the corresponding values.
DoubleList.prototype.toDict = function() {
    var dict = []
    var node = this.head
    var i = this.length

    while (i--) {
        dict[node.key] = node.value
        node = node.next
    }
    return dict
}
