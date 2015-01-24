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

// The DoubleList constructor.
function DoubleList() {
    this.index = {}
    this.head = null
    this.tail = null
    this.length = 0
}

// Generic node construct.
function Node(key, value) {
    this.next = null
    this.prev = null
    this.key = key
    this.value = value
}

// Adds a new key-value pair at the end of the list.
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

// Adds a new key-value pair at the beginning of the list.
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

// Adds a new key-value pair after the specified key in the list.
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

// Removes an element from the start of the list. Returns the key-value pair that was removed.
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
    return (node.key, node.value)
}
DoubleList.prototype.dequeue = DoubleList.prototype.pop

// Removes an element from the list as specified by the key. Returns the corresponding value of the removed element.
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


// Clears the list.
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

// Returns the value held by the node at the specified key.
DoubleList.prototype.get = function(key) {
    if (!this.index.hasOwnProperty(key)) throw new Error('Key ' + key + ' does not exist!')
    return this.index[key].value
}
DoubleList.prototype.find = DoubleList.prototype.get

// Sets the value at the specified key to the new value.
DoubleList.prototype.set = function(key, value) {
    if (!this.index.hasOwnProperty(key)) throw new Error('Key ' + key + ' does not exist!')
    this.index[key].value = value
}
DoubleList.prototype.update = DoubleList.prototype.set

// Returns whether or not the specified key exists.
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
