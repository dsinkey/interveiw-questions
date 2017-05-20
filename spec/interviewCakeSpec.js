describe('Problem 1 - Apple Stocks', function() {
    var stockPricesYesterday = [10, 7, 5, 8, 11, 9];

    it('should return returns the best profit I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday.', function() {
        expect(_.getMaxProfit(stockPricesYesterday)).to.equal(6);
    });
});

describe('Problem 2 - Product of All Other Numbers', function() {
    var input = [1, 7, 3, 4];
    var output = [84, 12, 28, 21];
    it('should be able returns an array of the products', function() {
        expect(_.getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4])).to.eql(output);
    });
});

describe('Problem 3 - Highest Product of 3', function() {
    var arrayOfInts = [1, 10, -5, 1, -100];
    it('Given an arrayOfInts, find the highestProduct you can get from three of the integers.', function() {
        expect(_.highestProductOf3(arrayOfInts)).to.equal(5000);
    });
});

describe('Problem 4 - Merging Meeting Times', function() {
    it('should take an array of meeting time ranges and returns an array of condensed ranges.', function() {
        var unmergedMeetings = [{
            startTime: 0,
            endTime: 1
        }, {
            startTime: 3,
            endTime: 5
        }, {
            startTime: 4,
            endTime: 8
        }, {
            startTime: 10,
            endTime: 12
        }, {
            startTime: 9,
            endTime: 10
        }, ];

        var mergedMeetings = [{
            startTime: 0,
            endTime: 1
        }, {
            startTime: 3,
            endTime: 8
        }, {
            startTime: 9,
            endTime: 12
        }, ];

        expect(_.mergeRanges(unmergedMeetings)).to.eql(mergedMeetings);
    });
});

describe('Problem 5 - Making Change - TopBottom', function() {
    it('if gived coins with values 1, 2 and 3 should return 184 ways of making change for 44', function() {
        var denominations = [1, 2, 3];
        var amount = 4;
        expect(_.changePossibilitiesTopDown(amount, denominations)).to.be(4);
    });
});

describe('Problem 5 - Making Change - BottomUp', function() {
    it('if gived coins with values 1, 2 and 3 should return 184 ways of making change for 44', function() {
        var denominations = [1, 2, 3];
        var amount = 44;
        expect(_.changePossibilitiesBottomUp(amount, denominations)).to.be(184);
    });
});

describe('Problem 6 - Rectangular Love', function() {
    it('should return null for all values if there is no intersection', function() {
        var rectangle1 = {
            // coordinates of bottom-left corner
            leftX: 1,
            bottomY: 5,

            // width and height
            width: 2,
            height: 2,

        };

        var rectangle2 = {
            // coordinates of bottom-left corner
            leftX: 4,
            bottomY: 5,

            // width and height
            width: 10,
            height: 4,

        };

        var noIntersect = {
            leftX: null,
            bottomY: null,
            width: null,
            height: null,
        }

        expect(_.findRectangularOverlap(rectangle1, rectangle2)).to.eql(noIntersect);

    });

    it('should find the rectangular intersection of two given love rectangles', function() {
        var rectangle1 = {
            // coordinates of bottom-left corner
            leftX: 1,
            bottomY: 5,

            // width and height
            width: 10,
            height: 4,

        };

        var rectangle2 = {
            // coordinates of bottom-left corner
            leftX: 1,
            bottomY: 5,

            // width and height
            width: 10,
            height: 4,

        };

        expect(_.findRectangularOverlap(rectangle1, rectangle2)).to.eql(rectangle1);

    });
});

// describe('binarySearchTree', function() {
//   var binarySearchTree;
//
//   beforeEach(function() {
//     binarySearchTree = _.makeBinarySearchTree(5);
//   });
//
//   it('should have methods named "insert", "contains", and "depthFirstLog', function() {
//     expect(binarySearchTree.insert).to.be.a("function");
//     expect(binarySearchTree.contains).to.be.a("function");
//     expect(binarySearchTree.depthFirstLog).to.be.a("function");
//   });
//
//   it('should insert values at the correct location in the tree', function(){
//     binarySearchTree.insert(2);
//     binarySearchTree.insert(3);
//     binarySearchTree.insert(7);
//     binarySearchTree.insert(6);
//     expect(binarySearchTree.left.right.value).to.equal(3);
//     expect(binarySearchTree.right.left.value).to.equal(6);
//   });
//
//   it('should have a working "contains" method', function(){
//     binarySearchTree.insert(2);
//     binarySearchTree.insert(3);
//     binarySearchTree.insert(7);
//     expect(binarySearchTree.contains(7)).to.equal(true);
//     expect(binarySearchTree.contains(8)).to.equal(false);
//   });
//
//   it('should execute a callback on every value in a tree using "depthFirstLog"', function(){
//     var array = [];
//     var func = function(value){ array.push(value); };
//     binarySearchTree.insert(2);
//     binarySearchTree.insert(3);
//     binarySearchTree.depthFirstLog(func);
//     console.log(array);
//     expect(array).to.eql([5,2,3]);
//   });
// });


describe('Problem 8 - Balance Binary Tree', function() {
    it('should return true if it is a balance binary tree', function() {
        function BinaryTreeNode(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        BinaryTreeNode.prototype.insertLeft = function(value) {
            this.left = new BinaryTreeNode(value);
            return this.left;
        };

        BinaryTreeNode.prototype.insertRight = function(value) {
            this.right = new BinaryTreeNode(value);
            return this.right;
        };

        var balancedBinaryTree = new BinaryTreeNode(1);
        balancedBinaryTree.insertLeft(2);
        balancedBinaryTree.insertRight(3);

        expect(_.isBalanced(balancedBinaryTree)).to.equal(true);
    });

    it('should return ture if it is a balance binary tree', function() {
        function BinaryTreeNode(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        BinaryTreeNode.prototype.insertLeft = function(value) {
            this.left = new BinaryTreeNode(value);
            return this.left;
        };

        BinaryTreeNode.prototype.insertRight = function(value) {
            this.right = new BinaryTreeNode(value);
            return this.right;
        };

        var balancedBinaryTree = new BinaryTreeNode(1);
        balancedBinaryTree.insertLeft(2);
        balancedBinaryTree.insertRight(3);
        balancedBinaryTree.left.insertLeft(4);
        balancedBinaryTree.left.left.insertLeft(5);
        balancedBinaryTree.left.left.left.insertLeft(6);

        expect(_.isBalanced(balancedBinaryTree)).to.equal(true);
    });
});

describe('Problem 9 - Balanced Search Tree Checker', function() {
    it('should return true if it is a valid Binary Tree', function() {
        function BinaryTreeNode(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        BinaryTreeNode.prototype.insertLeft = function(value) {
            this.left = new BinaryTreeNode(value);
            return this.left;
        };

        BinaryTreeNode.prototype.insertRight = function(value) {
            this.right = new BinaryTreeNode(value);
            return this.right;
        };

        var validBinaryTree = new BinaryTreeNode(1);
        validBinaryTree.insertLeft(2);
        validBinaryTree.insertRight(3);
        validBinaryTree.left.insertLeft(4);
        validBinaryTree.left.insertRight(5);
        validBinaryTree.right.insertLeft(6);
        validBinaryTree.right.insertRight(7);

        expect(_.bstCheckerRecursive(validBinaryTree)).to.equal(true);

    });

    it('should return false if it is not a valid Binary Tree', function() {
        function BinaryTreeNode(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        BinaryTreeNode.prototype.insertLeft = function(value) {
            this.left = new BinaryTreeNode(value);
            return this.left;
        };

        BinaryTreeNode.prototype.insertRight = function(value) {
            this.right = new BinaryTreeNode(value);
            return this.right;
        };

        var validBinaryTree = new BinaryTreeNode(11);
        validBinaryTree.insertLeft(9);
        validBinaryTree.insertRight(10);
        validBinaryTree.left.insertLeft(6);
        validBinaryTree.left.insertRight(7);
        validBinaryTree.right.insertLeft(9);
        validBinaryTree.right.insertRight(8);

        expect(_.bstCheckerRecursive(validBinaryTree)).to.equal(false);

    });

});

describe('Problem 10 - Second Largest Item in a Binary Tree', function() {
    it('should find and return the 2nd largest element in a binary search tree', function() {
        function BinaryTreeNode(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }

        BinaryTreeNode.prototype.insertLeft = function(value) {
            this.left = new BinaryTreeNode(value);
            return this.left;
        };

        BinaryTreeNode.prototype.insertRight = function(value) {
            this.right = new BinaryTreeNode(value);
            return this.right;
        };

        var balancedBinaryTree = new BinaryTreeNode(5);
        balancedBinaryTree.insertLeft(3);
        balancedBinaryTree.insertRight(8);
        balancedBinaryTree.left.insertLeft(1);
        balancedBinaryTree.left.insertRight(4);
        balancedBinaryTree.right.insertLeft(7);
        balancedBinaryTree.right.insertRight(2);
        balancedBinaryTree.right.right.insertLeft(10);
        balancedBinaryTree.right.right.left.insertLeft(9);
        balancedBinaryTree.right.right.left.insertRight(11);
    });

    //expect(doubled).to.eql([2, 4, 6]);
});


// describe('Problem 11 - MillionGazillion', function() {
//     it('should return values contained at a user-defined property', function() {
//         var people = [{
//             name: 'moe',
//             age: 30
//         }, {
//             name: 'curly',
//             age: 50
//         }];
//
//         //expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
//     });
// });
//
describe('Problem 12 - Find Ordered Set - (Binary Search)', function() {
    it('should return 0 for 5 in [5]', function() {
        expect(_.binarySearch([5], 5)).to.equal(0);
    });

    it('should return null for 4 in [5]', function() {
        expect(_.binarySearch([5], 4)).to.equal(null);
    });

    it('should return 0 for 1 in [1, 2, 3, 4, 5]', function() {
        expect(_.binarySearch([1, 2, 3, 4, 5], 1)).to.equal(0);
    });

    it('should return 1 for 2 in [1, 2, 3, 4, 5]', function() {
        expect(_.binarySearch([1, 2, 3, 4, 5], 2)).to.equal(1);
    });

    it('should return 2 for 3 in [1, 2, 3, 4, 5]', function() {
        expect(_.binarySearch([1, 2, 3, 4, 5], 3)).to.equal(2);
    });

    it('should return 3 for 4 in [1, 2, 3, 4, 5]', function() {
        expect(_.binarySearch([1, 2, 3, 4, 5], 4)).to.equal(3);
    });

    it('should return 4 for 5 in [1, 2, 3, 4, 5]', function() {
        expect(_.binarySearch([1, 2, 3, 4, 5], 5)).to.equal(4);
    });
});

describe('Problem 13 - Find Rotation Point', function() {
    it("should return 4 words = [ 'ptolemaic', 'retrograde', 'supplant', 'undulate', 'xenoepist','asymptote', 'babka', 'banoffee','engender', 'karpatka', 'othellolagkage'];", function() {
        var words = [
            'ptolemaic',
            'retrograde',
            'supplant',
            'undulate',
            'xenoepist',
            'asymptote', // <-- rotates here!
            'babka',
            'banoffee',
            'engender',
            'karpatka',
            'othellolagkage'
        ];
        expect(_.findRotationPoint(words)).to.equal(5);
    });
});

describe('Problem 14 - Inflight Entertainment', function() {
    it('should return true if there are two movie lengths that are exaclty equal to the length of the flight', function() {
        var movieLengths = [100, 120, 127, 98, 89, 99, 107, 140, 87, 99];
        var flightLength = 227;

        expect(_.canTwoMoviesFillFlight(movieLengths, flightLength)).to.eql(true);
    });

    it('should return false if no two movie lengths that are exaclty equal to the length of the flight', function() {
        var movieLengths = [100, 120, 127, 98, 89, 99, 107, 140, 87, 99];
        var flightLength = 350;

        expect(_.canTwoMoviesFillFlight(movieLengths, flightLength)).to.eql(false);
    });
});

describe('Problem 15 - Compute nth Fibonaci Number', function() {
    it('should handle the base cases with ease', function() {
        expect(_.fibIterative(0)).to.equal(0);
        expect(_.fibIterative(1)).to.equal(1);
    });
    it('should return the nth Fibonacci number for a given n', function() {
        expect(_.fibIterative(5)).to.equal(5);
        expect(_.fibIterative(20)).to.equal(6765);
    });
});


describe('Problem 16 - The Cake Theif', function() {
    it('Should return 555 cakes weight and values of {6, 160}, {3, 90}, {2, 15}', function() {
        var cakeTypes = [{
            weight: 7,
            value: 160
        }, {
            weight: 3,
            value: 90
        }, {
            weight: 2,
            value: 15
        }, ];

        var capacity = 20;
        // returns 555 (6 of the middle type of cake and 1 of the last type of cake)
        //maxDuffelBagValue(cakeTypes, capacity);
        expect(_.maxDuffelBagValue(cakeTypes, capacity)).to.eql(555);
    });
});


describe('Problem 17 - Javascript Scope', function() {
    it('Check out the interviewCake.js file for the answer', function() {
        expect(true).to.equal(true);
    });
});

describe("Problem 18 - What's Wrong with this Javascript", function() {
    it('Check out the interviewCake.js file for the answer', function() {
        expect(true).to.equal(true);
    });
});

// describe("Problem 19 - Queue Two Stacks", function() {
//   describe('constructor', function(){
//     it('should exist', function(){
//       //should.exist(Stack);
//     });
//     it('should be a function', function(){
//       // `typeof Stack !== 'function'` but it _should_ be a function!
//       //Stack.should.be.a.Function;
//     });
//     it('should be useable as a constructor', function(){
//       //var stack = new Stack();
//       // the constructor should return an object
//       //should.exist(stack);
//     });
//     it('should return an instance of a stack', function(){
//       //var stack = new Stack();
//       //stack.should.be.an.instanceOf(Stack);
//     });
//     it('should return difference instances each time its called using the `new` keyword', function(){
//       //var stack1 = new Stack();
//       //var stack2 = new Stack();
//       // aka, `stack === stack` but they should be two different `Stack` instances!
//       //stack1.should.not.be.equal(stack2);
//     });
//   });
//   describe('#push', function(){
//     it('should exist', function(){
//       //var stack = new Stack();
//       // stack instances should have a `push` method
//       //should.exist(stack.push);
//     });
//     it('should add an item to the stack', function(){
//     //   var stack = new Stack();
//     //   // aka, calling `push` should not throw an error
//     //   (function(){
//     //     stack.push('a');
//     //   }).should.not.throw();
//     // });
//   });
//   describe('#pop', function(){
//     it('should exist', function(){
//       // var stack = new Stack();
//       // // aka, stack instances should have a `pop` method
//       // should.exist(stack.pop);
//     });
//     // it('should not throw an error', function(){
//     //   var stack = new Stack();
//     //   stack.push('a');
//     //   // aka, calling `pop` should not throw an error
//     //   (function(){
//     //     stack.pop();
//     //   }).should.not.throw();
//     });
//   });
//   describe('#size', function(){
//     it('should exist', function(){
//       // var stack = new Stack();
//       // // aka, a stack instance should have a `size` method
//       // should.exist(stack.size);
//     });
//     it('should give the size of the queue', function(){
//       // var stack = new Stack();
//       // stack.push('a');
//       // // we just added an element so the stack's size should be 1
//       // stack.size().should.be.equal(1);
//       // stack.push('b');
//       // // we just added _another_ element so the stack's size should now be 2
//       // stack.size().should.be.equal(2);
//       // stack.pop();
//       // // we just remove an element so the stack's size should be 1
//       // stack.size().should.be.equal(1);
//       // stack.pop();
//       // // we just remove _another_ element so the stack's size should now be 0
//       // stack.size().should.be.equal(0);
//     });
//   });
// });

// describe('Queue', function(){
//   describe('constructor', function(){
//     it('should exist', function(){
//       // aka, the variable `Queue` doesn't exist when it should actually be something!
//       //should.exist(Queue);
//     });
//     it('should be a function', function(){
//       // `typeof Queue !== 'function'` but it _should_ be a function!
//       //Queue.should.be.a.Function;
//     });
//     it('should be useable as a constructor', function(){
//       //var queue = new Queue();
//       // the constructor should return an object
//       //should.exist(queue);
//     });
//     it('should return an instance of a queue', function(){
//       // var queue = new Queue();
//       // queue.should.be.an.instanceOf(Queue);
//       // aka, `queue instanceof Queue` is returning false, but it should be true!
//     });
//     it('should return different instances each time its called using the `new` keyword', function(){
//       // var queue1 = new Queue();
//       // var queue2 = new Queue();
//       // queue1.should.not.be.equal(queue2);
//       // aka, queue1 === queue2 but they should be two different queue instances!
//     });
//   });
//
//   describe('#enqueue', function(){
//     it('should exist', function(){
//       // var queue = new Queue();
//       // should.exist(queue.enqueue);
//       // queue instances should have a `enqueue` method
//     });
//     it('should add an item to the queue', function(){
//       // var queue = new Queue();
//       // queue.enqueue('a');
//       /**
//         * queue.size() should be 1 since we only added one item, but your
//         * queue.size() function is returning somethine different. this could
//         * be a problem with your `size` function or your `enqueue` function.
//         */
//       // queue.size().should.equal(1);
//     });
//     it('should add two items to the queue', function(){
//       // var queue = new Queue();
//       // queue.enqueue('a');
//       // queue.enqueue('b');
//       /**
//         * we just added two items so the queue size should be 2 but your
//         * `size()` function is returning something different
//         */
//       //queue.size().should.be.equal(2);
//     });
//   });
//
//   describe('#dequeue', function(){
//     it('should exist', function(){
//       // var queue = new Queue();
//       // should.exist(queue.dequeue);
//       // queue instances should have a `dequeue` method
//     });
//     it('should remove an item from the queue', function(){
//       // var queue = new Queue();
//       // queue.enqueue('a');
//       // var item = queue.dequeue();
//       // // `dequeue()` should return the item that was just dequeued
//       // should.exist(item);
//       // item.should.be.equal('a');
//       // queue.size() should be 0 since we just tried to add, then removed an,
//       // an item from the queue.
//       //queue.size().should.equal(0);
//     });
//     it('should be able to remove two items from the queue', function(){
//       // var queue = new Queue();
//       // queue.enqueue('y');
//       // queue.enqueue('z');
//       // queue.dequeue();
//       // queue.dequeue();
//       /**
//         * queue.size() should be 0 since we just tried to add then remove two
//         * items from the queue
//         */
//       //queue.size().should.equal(0);
//     });
//     it('should dequeue items in the order they were enqueued', function(){
//       // var queue = new Queue();
//       // queue.enqueue('1');
//       // queue.enqueue('2');
//       // var item = queue.dequeue();
//       //
//       // // aka, `dequeue()` should return the item that was just dequeued
//       // should.exist(item);
//       // // aka, the item just dequeued should be the first item we added
//       // item.should.equal('1');
//       // item = queue.dequeue();
//       // // aka, the item dequeued after the first should be the second
//       // // item we added
//       // item.should.equal('2');
//     });
//   });
//
// });
//
// describe("Problem 20 - Largest Stack", function() {
//     it('returns the first argument', function() {
//
//     });
// });

// describe('Problem 21 - The Stolen Breakfast Drone', function() {
//     it('should only run a user-defined function if it hasn\'t been run before', function() {
//     });
// });
//

describe('Problem 22 - Delete Node from linked list', function() {
    it('should delete the node from the linked list', function() {

        function LinkedListNode(value) {
            this.value = value;
            this.next = null;
        }

        var a = new LinkedListNode('A');
        var b = new LinkedListNode('B');
        var c = new LinkedListNode('C');

        a.next = b;
        b.next = c;

        _.deleteNode(b);
        expect(a.next.value).to.eql("C");
    });
});

describe('Problem 23 - Does This Link List Have A Cycle?', function() {
    it('should return false if there is not a cycle', function() {
        function LinkedListNode(value) {
            this.value = value;
            this.next = null;
        }

        var a = new LinkedListNode('A');
        var b = new LinkedListNode('B');
        var c = new LinkedListNode('C');
        var d = new LinkedListNode('D');
        var e = new LinkedListNode('E');
        var f = new LinkedListNode('F');

        a.next = b;
        b.next = c;
        c.next = d;
        d.next = e;
        e.next = f;

        expect(_.checkCycle(a)).to.eql(false);

    });
    it('should return true if there is a cycle', function() {
        function LinkedListNode(value) {
            this.value = value;
            this.next = null;
        }

        var a = new LinkedListNode('A');
        var b = new LinkedListNode('B');
        var c = new LinkedListNode('C');
        var d = new LinkedListNode('D');
        var e = new LinkedListNode('E');

        a.next = b;
        b.next = c;
        c.next = d;
        d.next = e;
        e.next = a;

        expect(_.checkCycle(a)).to.eql(true);
    });
});
describe('Problem 24 - Reverse A Linked List', function() {
    it('reverse a linked list and return the new head of the list', function() {
        function LinkedListNode(value) {
            this.value = value;
            this.next = null;
        }

        var a = new LinkedListNode('A');
        var b = new LinkedListNode('B');
        var c = new LinkedListNode('C');
        var d = new LinkedListNode('D');
        var e = new LinkedListNode('E');
        var f = new LinkedListNode('F');

        a.next = b;
        b.next = c;
        c.next = d;
        d.next = e;
        e.next = f;

        expect(_.reverseLinkedList(a)).to.eql(f);
    });
});

describe('Problem 25 - Kth to Last Node in a Singly-Linked List', function() {
    it('shoe take an integer k and the headNode of a singly linked list, and returns the kth to last node in the list.', function() {
        function LinkedListNode(value) {
            this.value = value;
            this.next = null;
        }

        var a = new LinkedListNode("Angel Food");
        var b = new LinkedListNode("Bundt");
        var c = new LinkedListNode("Cheese");
        var d = new LinkedListNode("Devil's Food");
        var e = new LinkedListNode("Eccles");

        a.next = b;
        b.next = c;
        c.next = d;
        d.next = e;

        expect(_.kthToLastNode(2, a)).to.eql(d);
    });
});


describe('Problem 26 - Reverse String in Place', function() {
    it('should reverse a sting in place. Dustin should equal nitsuD', function() {
        expect(_.reverseStringInPlace("Dustin")).to.eql("nitsuD");
    });
});

describe('Problem 27 - Reverse Words', function() {
    it("should reverse the words in a sentence in place.", function() {
        var input = 'the eagle has landed';
        var output = 'landed has eagle the';
        expect(_.reverseWords(input)).to.eql(output);
    });
});

describe('Problem 28 - Parenthesis Matching', function() {
    it('Write a function that, given a sentence like the one below, along with the position of an opening parenthesis, finds the corresponding closing parenthesis. \nSometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing.', function() {
        var sentence = "Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing.";
        var openingParenIndex = 10;

        expect(_.getClosingParen(sentence, openingParenIndex)).to.eql(79);
    });
});

describe('Problem 29 - Bracket Validator', function() {
    it("'{ [ ] ( ) }' should return true", function() {
        expect(_.isValid("{ [ ] ( ) }")).to.eql(true);
    });
    it("'{ [ ( ] ) }' should return false", function() {
        expect(_.isValid("{ [ ( ] ) }")).to.eql(false);
    });
    it("'{ [ }' should return false", function() {
        expect(_.isValid("{ [ }")).to.eql(false);
    });
});


describe("Problem 30 - Permutation Palindrome", function() {
    it("'civic' should return true", function() {
        expect(_.hasPalindromePermutation("civic")).to.eql(true);
    });
    it("'ivicc' should return true", function() {
        expect(_.hasPalindromePermutation("ivicc")).to.eql(true);
    });
    it("'civil' should return false", function() {
        expect(_.hasPalindromePermutation("civil")).to.eql(false);
    });
    it("'livci' should return false", function() {
        expect(_.hasPalindromePermutation("livci")).to.eql(false);
    });
});

describe('Problem 31 - Recursive Sting Permutations', function() {
    it('cat should return', function() {
        var catPermutations = ["cat", "cta", "act", "atc", "tca", "tac"];

        expect(_.getPermutations("cat")).to.eql(catPermutations);
    });
});

describe('Problem 32 - Top Scores', function() {
    it('[37, 89, 41, 65, 91, 53] should return [37, 41, 53, 65, 89, 91]', function() {
        var unsortedScores = [37, 89, 41, 65, 91, 53];
        var HIGHEST_POSSIBLE_SCORE = 100;
        var sorted = [37, 41, 53, 65, 89, 91];

        expect(_.sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE)).to.eql(sorted);
    });
});

// describe('Problem 33 - Which Appears Twice', function() {
//     it('should return the difference between two arrays', function() {
//
//     });
// });
//
// describe('Problem 34 - Word Cloud Data', function() {
//     it('should return the difference between two arrays', function() {
//         var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//         expect(diff).to.eql([1, 3]);
//     });
// });
//
//     describe('Problem 35 - In-Place Shuffle', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 36 - Single Riffle Shuffle', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 37 - Simulated 5-sided die', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 38 - Simulated 7-sided die', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 39 - Two Egg Problem', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 40 - Find Repeat, Space Edition', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 41 - Find Repeat BEAST MODE', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 42 - Find Duplicate failures', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 43 - Merge Sorted Arrays', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
//
//     describe('Problem 44 - Url Shortener', function() {
//         it('should return the difference between two arrays', function() {
//             var diff = _.difference([1, 2, 3], [2, 30, 40]);
//
//             expect(diff).to.eql([1, 3]);
//         });
//     });
