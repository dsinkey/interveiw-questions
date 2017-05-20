/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {
    //Suppose we could access yesterday's stock prices as an array, where:

    //The indices are the time in minutes past trade opening time, which was 9:30am local time.
    //The values are the price in dollars of Apple stock at that time.
    //So if the stock cost $500 at 10:30am, stockPricesYesterday[60] = 500.

    // Write an efficient function that takes stockPricesYesterday and returns the best profit
    //I could have made from 1 purchase and 1 sale of 1 Apple stock yesterday.

    // var stockPricesYesterday = [10, 7, 5, 8, 11, 9];
    //
    // getMaxProfit(stockPricesYesterday);
    // returns 6 (buying for $5 and selling for $11)
    _.getMaxProfit = function(stockPricesYesterday) {
        var minPrice = stockPricesYesterday[0];
        var maxProfit = minPrice - stockPricesYesterday[1];

        for (var i = 1; i < stockPricesYesterday.length; i++) {
            var currentPrice = stockPricesYesterday[i];
            var currentProfit = currentPrice - minPrice;

            minPrice = Math.min(minPrice, currentPrice);
            maxProfit = Math.max(maxProfit, currentProfit);
        }

        return maxProfit;
    };


    //You have an array of integers, and for each index you want to find the
    //product of every integer except the integer at that index.
    //Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of
    //integers and returns an array of the products.
    //For example, given: [1, 7, 3, 4]
    //your function would return: [84, 12, 28, 21]
    _.getProductsOfAllIntsExceptAtIndex = function(intArray) {
        var productOfIntsBeforeIndex = [];
        var product = 1;

        for (var i = 0; i < intArray.length; i++) {
            productOfIntsBeforeIndex[i] = product;
            product *= intArray[i];
        }

        var product = 1;
        for (var j = intArray.length - 1; j >= 0; j--) {
            productOfIntsBeforeIndex[j] *= product;
            product *= intArray[j];
        }
        return productOfIntsBeforeIndex;
    };

    //Given an arrayOfInts, find the highestProduct you can get from three of the integers.
    //The input arrayOfInts will always have at least three integers.
    _.highestProductOf3 = function(arrayOfInts) {
        var highest = arrayOfInts[0];
        var lowest = arrayOfInts[0];

        var highestProductOfTwo = arrayOfInts[0] * arrayOfInts[1];
        var lowestProductOfTwo = arrayOfInts[0] * arrayOfInts[1];

        var highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];

        for (var i = 1; i < arrayOfInts.length; i++) {
            var currentValue = arrayOfInts[i]
            highestProductOf3 = Math.max(highestProductOf3, highestProductOfTwo * currentValue, lowestProductOfTwo * currentValue);

            highestProductOfTwo = Math.max(lowestProductOfTwo, highest * currentValue, lowest * currentValue);
            lowestProductOfTwo = Math.min(lowestProductOfTwo, highest * currentValue, lowest * currentValue);

            lowest = Math.min(lowest, currentValue);
            highest = Math.max(highest, currentValue);
        }
        return highestProductOf3;
    };

    //Your company built an in-house calendar tool called HiCal.
    //You want to add a feature to see the times in a day when everyone is available.
    //To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting
    //is stored as objects ↴ with attributes startTime and endTime. These integers represent
    //the number of 30-minute blocks past 9:00am.
    //Write a function condenseMeetingTimes() that takes an array of meeting time ranges and
    //returns an array of condensed ranges.
    //Given:
    //[
    //{startTime: 0,  endTime: 1},
    //{startTime: 3,  endTime: 5},
    //{startTime: 4,  endTime: 8},
    //{startTime: 10, endTime: 12},
    //{startTime: 9,  endTime: 10},
    //]
    // your function would return:
    //[
    //{startTime: 0, endTime: 1},
    //{startTime: 3, endTime: 8},
    //{startTime: 9, endTime: 12},
    //]

    _.mergeRanges = function(meetings) {
        var sortedMeetings = meetings.sort(function(a, b) {
            return a.startTime > b.startTime ? 1 : -1;
        });

        var mergedMeetings = [sortedMeetings[0]];

        for (var i = 0; i < sortedMeetings.length; i++) {
            var currentMeeting = sortedMeetings[i];
            var lastMergedMeeting = mergedMeetings[mergedMeetings.length - 1];
            if (currentMeeting.startTime <= lastMergedMeeting.endTime) {
                lastMergedMeeting.endTime = Math.max(currentMeeting.endTime, lastMergedMeeting.endTime);
            } else {
                mergedMeetings.push(currentMeeting);
            }
        }

        return mergedMeetings

    };

    //Imagine you landed a new job as a cashier...
    //Your quirky boss found out that you're a programmer and has a weird request about something they've been wondering for a long time.

    //Write a function that, given:

    //an amount of money
    //an array of coin denominations
    //computes the number of ways to make amount of money with coins of the availabledenominations.

    //Example: for amount=44 (44¢) and denominations=[1,2,3][1,2,3] (11¢, 22¢ and 33¢),
    //your program would output 44—the number of ways to make 44¢ with those denominations:

    _.changePossibilitiesTopDown = function(amountLeft, denominationsLeft) {
        if (amountLeft === 0) {
            return 1;
        }
        if (amountLeft < 0) {
            return 0;
        }
        if (denominationsLeft.length === 0) {
            return 0;
        }

        var numberOfPossibilities = 0;
        var currentCoin = denominationsLeft[0];
        var remainingCoins = denominationsLeft.slice(1);

        while (amountLeft >= 0) {
            numberOfPossibilities += _.changePossibilitiesTopDown(amountLeft, remainingCoins);
            amountLeft -= currentCoin;
        }
        return numberOfPossibilities
    };



    // function Change() {
    //   this.memo = {};
    // }
    //
    // Change.prototype.changePossibilitiesTopDown = function(amountLeft, denominationsLeft){
    //   var memoKey = String([amountLeft, denominationsLeft]);
    //   if(this.memo.hasOwnProperty(memoKey)){
    //     return this.memo[memoKey];
    //   }
    //
    //   if(amountLeft === 0){
    //     return 1;
    //   }
    //   if(amountLeft < 0){
    //     return 0;
    //   }
    //
    //   if(denominationsLeft.length === 0){
    //     return 0;
    //   }
    //
    //   console.log('checking ways to make ' + amountLeft + ' with ' + denominationsLeft);
    //
    //   var currentCoin = denominationsLeft[0];
    //   var remainingCoins = denominationsLeft.slice(1);
    //
    //   var numberOfPossibilities = 0;
    //
    //   while(amountLeft >= 0){
    //     numberOfPossibilities += this.changePossibilitiesTopDown(amountLeft, remainingCoins);
    //     amountLeft -= currentCoin;
    //   }
    //
    //   this.memo[memoKey] = numberOfPossibilities;
    //   return numberOfPossibilities;
    // }

    // _.changePossibilitiesBottomUp = function(amount, denominations) {
    //   return changePossibilitiesBottomUp(amount, denominations);
    // }

    _.changePossibilitiesBottomUp = function(amount, denominations) {
        // intialize an array of zeros with indices up to amount
        var waysOfDoingNCents = [];
        for (var i = 0; i <= amount; i++) {
            waysOfDoingNCents[i] = 0;
        }
        waysOfDoingNCents[0] = 1;

        for (var j = 0; j < denominations.length; j++) {
            var currentCoin = denominations[j];
            for (var higherAmout = currentCoin; higherAmout <= amount; higherAmout++) {
                var remainingHigherAmount = higherAmout - currentCoin;
                waysOfDoingNCents[higherAmout] += waysOfDoingNCents[remainingHigherAmount];
            }
        }
        return waysOfDoingNCents[amount];
    };



    //A crack team of love scientists from OkEros (a hot new dating site) have devised a way to represent
    //dating profiles as rectangles on a two-dimensional plane.
    //They need help writing an algorithm to find the intersection of two users' love rectangles.
    //They suspect finding that intersection is the key to a matching algorithm so powerful it
    //will cause an immediate acquisition by Google or Facebook or Obama or something.

    //Write a function to find the rectangular intersection of two given love rectangles.
    //They are defined as objects ↴ like this:
    // var myRectangle = {
    //
    //     // coordinates of bottom-left corner
    //     leftX: 1,
    //     bottomY: 5,
    //
    //     // width and height
    //     width: 10,
    //     height: 4,
    //
    // };

    var findRangeOverlap = function(point1, length1, point2, length2) {
        var highestStartPoint = Math.max(point1, point2);
        var lowestEndPoint = Math.min(point1 + length1, point2 + length2);

        if (lowestEndPoint <= highestStartPoint) {
            return {
                starPoint: null,
                overlapLength: null
            };
        }

        var overlapLength = lowestEndPoint - highestStartPoint;

        return {
            startPoint: highestStartPoint,
            overlapLength: overlapLength
        }
    }

    _.findRectangularOverlap = function(rect1, rect2) {
        // console.log(rect1);
        // console.log(rect2);
        var xOverlap = findRangeOverlap(rect1.leftX, rect1.width, rect2.leftX, rect2.width);
        var yOverlap = findRangeOverlap(rect1.bottomY, rect1.height, rect2.bottomY, rect2.height);

        if (!xOverlap.overlapLength || !yOverlap.overlapLength) {
            var myRectangle = {
                leftX: null,
                bottomY: null,
                width: null,
                height: null
            }
            return myRectangle;
        };

        var returnData = {
            leftX: xOverlap.startPoint,
            bottomY: yOverlap.startPoint,
            width: xOverlap.overlapLength,
            height: yOverlap.overlapLength
        };

        return returnData;
    };


    //Write a class TempTracker with these methods:

    //insert()—records a new temperature
    //getMax()—returns the highest temp we've seen so far
    //getMin()—returns the lowest temp we've seen so far
    //getMean()—returns the mean ↴ of all temps we've seen so far
    //getMode()—returns the mode ↴ of all temps we've seen so far
    //Optimize for space and time. Favor speeding up the getter functions
    //(getMax(),getMin(), getMean(), and getMode()) over speeding up the insert() function.

    //Temperatures will all be inserted as integers. We'll record our temperatures in Fahrenheit,
    //so we can assume they'll all be in the range 0..1100..110.

    TempTracker = function(input) {

    }

    TempTracker = function() {

        // for mode
        this.occurrences = []; // array of 0s at indices 0..110
        for (var i = 0; i < 111; i++) {
            this.occurrences[i] = 0;
        }
        this.maxOccurrences = 0;
        this.mode = null;

        // for mean
        this.totalNumbers = 0;
        this.totalSum = 0;
        this.mean = null;

        // for min and max
        this.minTemp = null;
        this.maxTemp = null;
    }

    TempTracker.prototype.insert = function(temperature) {

        // for mode
        this.occurrences[temperature]++;
        if (this.occurrences[temperature] > this.maxOccurrences) {
            this.mode = temperature;
            this.maxOccurrences = this.occurrences[temperature];
        }

        // for mean
        this.totalNumbers++;
        this.totalSum += temperature;
        this.mean = this.totalSum / this.totalNumbers;

        // for min and max
        if (this.maxTemp === null || temperature > this.maxTemp) {
            this.maxTemp = temperature;
        }
        if (this.minTemp === null || temperature < this.minTemp) {
            this.minTemp = temperature;
        }
    };

    TempTracker.prototype.getMax = function() {
        return this.maxTemp;
    };

    TempTracker.prototype.getMin = function() {
        return this.minTemp;
    };

    TempTracker.prototype.getMean = function() {
        return this.mean;
    };

    TempTracker.prototype.getMode = function() {
        return this.mode;
    };

    _.makeBinarySearchTree = function(value) {
        var newTree = {};
        newTree.value = value;
        newTree.left = null;
        newTree.right = null;
        _.extend(newTree, _.makeBinarySearchTreeMethods);
        return newTree;
    };

    _.makeBinarySearchTreeMethods = {};

    _.makeBinarySearchTreeMethods.insert = function(value) {
        var newChild = _.makeBinarySearchTree(value);
        var node = this;

        var subInsert = function(node) {
            if (newChild.value > node.value) {
                if (node.right === null) {
                    node.right = newChild;
                } else {
                    subInsert(node.right);
                }
            }
            if (newChild.value < node.value) {
                if (node.left === null) {
                    node.left = newChild;
                } else {
                    subInsert(node.left);
                }
            }
        };
        subInsert(node);
    };

    _.makeBinarySearchTreeMethods.contains = function(target) {
        var found = false;
        var node = this;

        var subContains = function(node) {
            if (node.value === target) {
                found = true;
            }
            if (target > node.value) {
                if (node.right !== null) {
                    subContains(node.right);
                }
            }

            if (target < node.value) {
                if (node.left !== null) {
                    subContains(node.left);
                }
            }
        };

        subContains(node);
        return found;
    };

    _.makeBinarySearchTreeMethods.depthFirstLog = function(func) {
        var node = this;

        var subDepthFirstLog = function(node) {
            func(node.value);
            if (node.right !== null) {
                subDepthFirstLog(node.right);
            }
            if (node.left !== null) {
                subDepthFirstLog(node.left);
            }
        };

        subDepthFirstLog(node);
    };
    /*
     * Complexity: What is the time complexity of the above functions?
     */


    //Write a function to see if a binary tree is "superbalanced" (a new tree property we just made up).
    //A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.

    ///Here's a sample binary tree node class:

    //Write a function to check that a binary tree ↴ is a valid binary search tree ↴ .
    //Here's a sample binary tree node class:
    _.isBalanced = function(treeRoot) {
        var depths = []; // we short-circuit as soon as we find more than 2

        // nodes will store pairs of a node and the node's depth
        var nodes = [];
        nodes.push([treeRoot, 0]);

        while (nodes.length) {

            // pop a node and its depth from the top of our stack
            var nodePair = nodes.pop();
            var node = nodePair[0],
                depth = nodePair[1];

            // case: we found a leaf
            if (!node.left && !node.right) {

                // we only care if it's a new depth
                if (depths.indexOf(depth) < 0) {
                    depths.push(depth);

                    // two ways we might now have an unbalanced tree:
                    //   1) more than 2 different leaf depths
                    //   2) 2 leaf depths that are more than 1 apart
                    if ((depths.length > 2) ||
                        (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)) {
                        return false;
                    }
                }

                // case: this isn't a leaf - keep stepping down
            } else {
                if (node.left) {
                    nodes.push([node.left, depth + 1]);
                }
                if (node.right) {
                    nodes.push([node.right, depth + 1]);
                }
            }
        }

        return true;
    };


    _.bstCheckerRecursive = function(treeRoot, lowerBound, upperBound) {
        lowerBound = lowerBound || -Infinity;
        upperBound = upperBound || Infinity;

        if (!treeRoot) return true;

        if (treeRoot.value > upperBound || treeRoot.value < lowerBound) {
            return false;
        }

        return _.bstCheckerRecursive(treeRoot.left, lowerBound, treeRoot.value) &&
            _.bstCheckerRecursive(treeRoot.right, treeRoot.value, upperBound);

    }

    //Write a function to find the 2nd largest element in a binary search tree.
    //Our first thought might be to do an in-order traversal of the BST
    //and return the second-to-last item. This means looking at every node in the BST.
    //That would take O(n)O(n) time and O(h)O(h) space, where hh is the max height of the tree (which is lgnlgn if the tree is balanced ↴ , but could be as much as nn if not).

    //We can do better than O(n)O(n) time and O(h)O(h) space.

    //We can do this in one walk from top to bottom of our BST.
    //This means O(h)O(h) time (again, that's O(\lg{n})O(lgn) if the tree is balanced, O(n)O(n) otherwise).

    //A clean recursive implementation will take O(h)O(h) space in the call stack,
    //but we can bring our algorithm down to O(1)O(1) space overall.

    function findLargest(rootNode) {
        var current = rootNode;
        while (current) {
            if (!current.right) return current.value;
            current = current.right;
        }
    }

    _.findSecondLargest = function(rootNode) {
        if (!rootNode.left && !rootNode.right) {
            throw new Error('Tree must have at least 2 nodes');
        }

        var current = rootNode;

        while (current) {
            // case: current is largest and has a left subtree
            // 2nd largest is the largest in that subtree
            if (current.left && !current.right) {
                return findLargest(current.left);
            }

            // case: current is parent of largest, and
            // largest has no children, so
            // current is 2nd largest
            if (current.right &&
                !current.right.left &&
                !current.right.right) {
                return current.value;
            }

            current = current.right;
        }
    }

    //12) Find in Ordered Set
    //Suppose we had an array ↴ of nn integers sorted in ascending order.
    //How quickly could we check if a given integer is in the array?

    _.binarySearch = function(array, target) {
        var sub = function(low, high) {
            if (low === high) {
                return null;
            }
            var mid = Math.floor((high - low) / 2) + low;
            if (array[mid] === target) {
                return mid;
            } else if (target < array[mid]) {
                return sub(low, mid);
            } else if (target > array[mid]) {
                return sub(mid, high);
            }
        }
        return sub(0, array.length);
    };

    //13) Find Rotation Point
    //I have an array of words that are mostly alphabetical, except they start somewhere
    //in the middle of the alphabet, reach the end, and then start from the beginning of the
    //alphabet. In other words, this is an alphabetically ordered array that has been "rotated."

    //Write a function for finding the index of the "rotation point," which is where I started
    //working from the beginning of the dictionary. This array is huge (there are lots of words
    //I don't know) so we want to be efficient here.

    _.findRotationPoint = function(words) {
        const firstWord = words[0];

        var floorIndex = 0;
        var ceilingIndex = words.length - 1;

        while (floorIndex < ceilingIndex) {

            // guess a point halfway between floor and ceiling
            var guessIndex = Math.floor(floorIndex + ((ceilingIndex - floorIndex) / 2));

            // if guess comes after first word
            if (words[guessIndex] > firstWord) {
                // go right
                floorIndex = guessIndex;
            } else {
                // go left
                ceilingIndex = guessIndex;
            }

            // if floor and ceiling have converged
            if (floorIndex + 1 === ceilingIndex) {

                // between floor and ceiling is where we flipped to the beginning
                // so ceiling is alphabetically first
                break;
            }
        }

        console.log(ceilingIndex);
        return ceilingIndex;
    }

    //14) In Flight Entertainment
    //You've built an in-flight entertainment system with on-demand movie streaming.
    // Users on longer flights like to start a second movie right when their first one ends,
    //but they complain that the plane usually lands before they can see the ending.
    //So you're building a feature for choosing two movies whose total runtimes will equal the exact flight length.
    //
    // Write a function that takes an integer flightLength (in minutes) and
    //an array of integers movieLengths (in minutes) and returns a boolean
    //indicating whether there are two numbers in movieLengths whose sum equals flightLength.
    //
    // When building your function:
    //
    // Assume your users will watch exactly two movies
    // Don't make your users watch the same movie twice
    // Optimize for runtime over memory

    _.canTwoMoviesFillFlight = function(movieLengths, flightLength) {
        var movieLengthsSeen = {};

        for (var i = 0; i < movieLengths.length; i++) {
            var firstMovieLength = movieLengths[i];
            var matchingSecondMovieLength = flightLength - firstMovieLength;
            if (movieLengthsSeen.hasOwnProperty(matchingSecondMovieLength)) {
                return true;
            }
            movieLengthsSeen[firstMovieLength] = 1;
        }

        return false;
    }

    //15) Compute nth Fibonaci Number
    //Write a function fib() that a takes an integer n and returns the nnth fibonacci number.

    _.fibIterative = function(n) {

        // edge cases:
        if (n < 0) {
            throw new Error('Index was negative. No such thing as a negative index in a series.');
        } else if (n === 0 || n === 1) {
            return n;
        }

        // we'll be building the fibonacci series from the bottom up
        // so we'll need to track the previous 2 numbers at each step
        var prevPrev = 0;
        var prev = 1;
        var current;

        // since we already initialized the first 2 numbers in
        // the series we take n - 2 steps ahead to reach n
        for (var x = 2; x <= n; x++) {
            current = prev + prevPrev;
            prevPrev = prev;
            prev = current;
        }

        return current;
    }

    //16) The Cake Theif

    //You are a renowned thief who has recently switched from stealing precious metals to stealing cakes because of the insane profit margins. You end up hitting the jackpot, breaking into the world's largest privately owned stock of cakes—the vault of the Queen of England.
    //While Queen Elizabeth has a limited number of types of cake, she has an unlimited supply of each type.

    //Each type of cake has a weight and a value, stored in an object with two properties:

    //weight: the weight of the cake in kilograms
    //value: the monetary value of the cake in British pounds
    //For example:

    // weighs 7 kilograms and has a value of 160 pounds
    //{weight: 7, value: 160}

    // weighs 3 kilograms and has a value of 90 pounds
    //{weight: 3, value: 90}

    //You brought a duffel bag that can hold limited weight, and you want to make off
    //with the most valuable haul possible.
    //Write a function maxDuffelBagValue() that takes an array of cake type objects
    //and a weight capacity, and returns the maximum monetary value the duffel bag can hold.

    _.maxDuffelBagValue = function(cakeTypes, weightCapacity) {
        var maxValuesAtCapacity = [];
        for (var i = 0; i <= weightCapacity; i++) {
            maxValuesAtCapacity[i] = 0;
        }

        for (var currentCapacity = 0; currentCapacity <= weightCapacity; currentCapacity++) {
            var maxValueAtCapacity = 0;
            for (var j = 0; j < cakeTypes.length; j++) {
                var cakeType = cakeTypes[j];
                if (cakeType.weight <= currentCapacity) {
                    var valueWithCake = cakeType.value + maxValuesAtCapacity[currentCapacity - cakeType.weight];
                    maxValueAtCapacity = Math.max(valueWithCake, maxValueAtCapacity);
                }
            }
            maxValuesAtCapacity[currentCapacity] = maxValueAtCapacity;
        }
        return maxValuesAtCapacity[weightCapacity];
    }



    //18)
    //Here's what we have so far. Something's going wrong though. Can you tell what it is?
    // <button id = "btn-0" > Button 1! < /button>
    // <button id = "btn-1" > Button 2! < /button>
    // <button id = "btn-2" > Button 3! < /button>


    // var prizes = ['A Unicorn!', 'A Hug!', 'Fresh Laundry!'];
    //
    // for (var btnNum = 0; btnNum < prizes.length; btnNum++) {
    //     // for each of our buttons, when the user clicks it...
    //     document.getElementById('btn-' + btnNum).onclick = function() {
    //         // tell her what she's won!
    //         alert(prizes[btnNum]);
    //     };
    // }


    //Solution
    //The user's prize is always undefined!

    //The Problem

    //The anonymous function we're assigning to the buttons' onclicks has access to variables
    //in the scope outside of it (this is called a closure ↴ ). In this case, it has access to btnNum.

    //When a function accesses a variable outside its scope, it accesses that variable,
    //not a frozen copy. So when the value held by the variable changes, the function gets that new value.
    //By the time the user starts pressing buttons, our loop will have already completed and btnNum will be 3,
    //so this is what each of our anonymous functions will get for btnNum!

    //Why 3? The for loop will increment btnNum until the conditional in the middle is no longer met—that is,
    //until it's not true that btnNum < prizes.length. So the code in the for loop won't run withbtnNum = 3,
    //but btnNum will be 3 when the loop is done.

    //Why undefined? prizes has 3 elements, but they are at indices 0,1,2. Array indices start at 0,
    //remember? (Write this down—forgetting this is an easy way to create an off-by-one error in a whiteboard interview.)
    //In JavaScript, accessing a nonexistant index in an array returns undefined(Python throws an IndexError, but Ruby returns nil).

    //The Solution

    //We can solve this by wrapping our anonymous function in another anonymous function that takesbtnNum as an argument. Like so:

    // var prizes = ['A Unicorn!', 'A Hug!', 'Fresh Laundry!'];
    // for (var btnNum = 0; btnNum < prizes.length; btnNum++) {
    //     // for each of our buttons, when the user clicks it...
    //     document.getElementById('btn-' + btnNum).onclick = function(frozenBtnNum) {
    //         return function() {
    //             // tell her what she's won!
    //             alert(prizes[frozenBtnNum]);
    //         };
    //     }(btnNum); // LOOK! We're passing btnNum to our anonymous function here!
    // }

    //This "freezes" the value of btnNum. Why? Well...

    //Primitives vs. Objects

    //btnNum is a number, which is a primitive type in JavaScript.

    //Primitives are "simple" data types (string, number, boolean, null, and undefined in JavaScript).
    //Everything else is an object in JavaScript (functions, arrays, Date() values, etc).

    //Arguments Passed by Value vs. Arguments Passed by Reference

    //One important property of primitives in JS is that when they are passed as arguments
    //to a function, they are copied ("passed by value"). So for example




    //18) What's wrong with this JavaScript
    // If we execute this Javascript, what will the browser 's console show?
    // var text = 'outside';
    //
    // function logIt() {
    //     console.log(text);
    //     var text = 'inside';
    // };
    // logIt();
    // JavaScript
    // Gotchas
    // It 's not "outside".
    //
    // It 's not "inside".
    //
    // The script won 't throw an error!
    //
    // Solution
    // The console will log undefined.
    //
    // To understand this, we need to explain a few things about Javascript.
    //
    // Function - level scope.Functions create new scopes in Javascript:
    //
    //     function setVar() {
    //         // inside this function we have a new scope
    //         // so this variable, declared in this function's scope, won't be available outside the function
    //         var varInFunction = 'inside a function';
    //     }
    // setVar();
    // console.log(varInFunction); // throws 'ReferenceError: varInFunction is not defined'
    // JavaScript
    // Blocks like
    // if statements and
    // for loops do not create a new scope(this is also true of Python and recent versions of Ruby, but untrue of Java and C):
    //
    //     if (true) {
    //         // this if statement doesn't create a new scope
    //         // so varInIf is available in the global scope
    //         var varInIf = 'inside an if statement';
    //     }
    // console.log(varInIf); // logs 'inside an if statement'
    // JavaScript
    // Declaration vs.assignment.A variable declaration simply tells the interpreter that a variable exists.By
    // default it initializes the variable to undefined:
    //
    //     var unicorn;
    // console.log(unicorn); // logs undefined (NOT a ReferenceError)
    // JavaScript
    // A variable assignment assigns a value to the variable:
    //
    //     unicorn = 'Sparkles McGiggleton';
    // JavaScript
    // We can both declare and assign in the same line:
    //
    //     var centaur = 'Horsey McPersonhead';
    // JavaScript
    // Hoisting.In Javascript, variable declarations are "hoisted"
    // to the top of the current scope.Variable assignments, however, are not.
    //
    // So returning to the original problem:
    //
    //     var text = 'outside';
    //
    // function logIt() {
    //     console.log(text);
    //     var text = 'inside';
    // };
    // logIt();
    // JavaScript
    // The declaration(but not the assignment) of text gets hoisted to the top of logIt().So our code gets interpreted as though it were:
    //
    //     var text = 'outside';
    //
    // function logIt() {
    //     var text;
    //     console.log(text);
    //     text = 'inside';
    // };
    // logIt();
    // JavaScript
    // So we have a new variable text inside of logIt() that is initialized to undefined, which is what it holds when we hit our log statement.
    //
    // What We Learned
    // Remember: when you declare a variable in JavaScript(using "var"), that variable declaration is "hoisted"
    // to the top of the current scope— meaning the top of the current
    // function or the top of the script
    // if the variable isn 't in a function.
    //
    // Hoisting can cause unexpected behavior, so a good way to keep things clear is to always declare your variables at the top of the scope.

    //19) Implement a queue with 2 stacks. Your queue should have an enqueue and a dequeue function and it should be "first in first out" (FIFO).
    //Optimize for the time cost of mm function calls on your queue. These can be any mix of enqueue and dequeue calls.

    //Assume you already have a stack implementation and it gives O(1)O(1) time push and pop.





    //20) You want to be able to access the largest element in a stack.
    //You've already implemented this Stack class:

    //Use your Stack class to implement a new class MaxStack with a function getMax()
    //that returns the largest element in the stack. getMax() should not remove the item.


    // function Stack() {
    //     // initialize an empty array
    //     this.items = [];
    // }
    //
    // // push a new item to the last index
    // Stack.prototype.push = function(item) {
    //     this.items.push(item);
    // };
    //
    // // remove the last item
    // Stack.prototype.pop = function() {
    //     // if the stack is empty, return null
    //     // (it would also be reasonable to throw an exception)
    //     if (!this.items.length) {
    //         return null;
    //     }
    //     return this.items.pop();
    // };
    //
    // // see what the last item is
    // Stack.prototype.peek = function() {
    //     if (!this.items.length) {
    //         return null;
    //     }
    //     return this.items[this.items.length - 1];
    // };
    //
    // //Solution
    // //We define two new stacks within our MaxStack class—stack holds all of our integers, and maxsStackholds our "maxima." We use maxsStack to keep our max up to date in constant time as we push()and pop():
    //
    // //Whenever we push() a new item, we check to see if it's greater than or equal to the current max, which is at the top of maxsStack. If it is, we also push() it onto maxsStack.
    // //Whenever we pop(), we also pop() from the top of maxsStack if the item equals the top item in maxsStack.
    //
    // function MaxStack() {
    //     this.stack = new Stack();
    //     this.maxsStack = new Stack();
    // }
    //
    // // Add a new item to the top of our stack. If the item is greater
    // // than or equal to the the last item in maxsStack, it's
    // // the new max! So we'll add it to maxsStack.
    // MaxStack.prototype.push = function(item) {
    //     this.stack.push(item);
    //     if (!this.maxsStack.peek() || item >= this.maxsStack.peek()) {
    //         this.maxsStack.push(item);
    //     }
    //     return item;
    // };
    //
    // // Remove and return the top item from our stack. If it equals
    // // the top item in maxsStack, they must have been pushed in together.
    // // So we'll pop it out of maxsStack too.
    // MaxStack.prototype.pop = function() {
    //     var item = this.stack.pop();
    //     if (item === this.maxsStack.peek()) {
    //         this.maxsStack.pop();
    //     }
    //     return item;
    // };
    //
    // // The last item in maxsStack is the max item in our stack.
    // MaxStack.prototype.getMax = function() {
    //     return this.maxsStack.peek();
    // };




    //22) Delete Node
    //Delete a node from a singly-linked list, given onlya variable pointing to that node.
    //We can do this in O(1)O(1) time and space! But our answer is tricky, and it could have some side effects...

    //It might be tempting to try to traverse the list from the beginning until we encounter the node we want to delete.
    //But in this situation, we don't know where the head of the list is—we only have a reference to the node we want to delete.

    //But hold on—how do we even delete a node from a linked list in general,
    //when we do have a reference to the first node?

    //We'd change the previous node's pointer to skip the node we want to delete,
    //so it just points straight to the node after it.

    //So we need a way to skip over the current node and go straight to the next node.
    //But we don't even have access to the previous node!

    //Other than rerouting the previous node's pointer, is there another way to skip from the previous pointer's value to the next pointer's value?

    //What if we modify the current node instead of deleting it?

    //We take the value and next from the input node's next node and copy them into the input node.
    //Now the input node's previous node effectively skips the input node's old value!

    _.deleteNode = function(nodeToDelete) {
        // get the input node's next node, the one we want to skip to
        var nextNode = nodeToDelete.next;

        if (nextNode) {

            // replace the input node's value and pointer with the next
            // node's value and pointer. the previous node now effectively
            // skips over the input node
            nodeToDelete.value = nextNode.value;
            nodeToDelete.next = nextNode.next;
        } else {
            // eep, we're trying to delete the last node!
            throw new Error("Can't delete the last node with this method!");
        }
    }


    //You have a singly-linked list and want to check if it contains a cycle.
    //A singly-linked list is built with nodes, where each node has:

    //node.next—the next node in the list.
    //node.data—the data held in the node.
    //For example, if our linked list stores people in line at the movies,
    //node.data might be the person's name.

    //A cycle occurs when a node’s next points back to a previous node in the list.
    //The linked list is no longer linear with a beginning and end—instead,
    //it cycles through a loop of nodes.

    //Write a function containsCycle() that takes the first node in a singly-linked
    //list and returns a boolean indicating whether the list contains a cycle.

    _.checkCycle = function(firstNode) {

        // start both runners at the beginning
        var slowRunner = firstNode;
        var fastRunner = firstNode;

        // until we hit the end of the list
        while (fastRunner && fastRunner.next) {
            slowRunner = slowRunner.next;
            fastRunner = fastRunner.next.next;

            // case: fastRunner is about to "lap" slowRunner
            if (fastRunner === slowRunner) {
                return true;
            }
        }

        // case: fastRunner hit the end of the list
        return false;
    }

    //Hooray! It's opposite day. Linked lists go the opposite way today.
    //Write a function for reversing a linked list ↴ . Do it in-place ↴ .
    //Your function will have one input: the head of the list.
    //Your function should return the new head of the list.

    //We can do this in O(1)O(1) space. So don't make a new list; use the existing list nodes!
    //We can do this is in O(n)O(n) time.
    //Careful—even the right approach will fail if done in the wrong order.
    //Try drawing a picture of a small linked list and running your function by hand. Does it actually work?
    //The most obvious edge cases are:
    //1) the list has 0 elements
    //2) the list has 1 element

    //Our first thought might be to build our reversed list "from the beginning," starting with the head of the final reversed linked list.
    //The head of the reversed list will be the tail of the input list.
    //To get to that node we'll have to walk through the whole list once (O(n)O(n) time). And that's just to get started.
    //That seems inefficient. Can we reverse the list while making just one walk from head to tail of the input list?
    //We can reverse the list by changing the next pointer of each node. Where should each node'snext pointer...point?
    //Each node's next pointer should point to the previous node.
    //How can we move each node's next pointer to its previous node in one pass from head to tail of our current list?

    //In one pass from head to tail of our input list, we point each node's next pointer to the previousitem.

    //The order of operations is important here! We're careful to copy current.next into next beforesetting
    //current.next to previous. Otherwise "stepping forward" at the end could actually mean stepping back to previous!

    //We return previous because when we exit the list, current is null.
    //Which means that the last node we visited—previous—was the tail of the original list, and thus the head of our reversed list.

    //Complexity
    //O(n)O(n) time and O(1)O(1) space.
    //We pass over the list only once, and maintain a constant number of variables in memory.

    _.reverseLinkedList = function(headOfList) {
        var current = headOfList;
        var previous = null;
        var nextNode = null;

        // until we have 'fallen off' the end of the list
        while (current) {

            // copy a pointer to the next element
            // before we overwrite current.next
            nextNode = current.next;

            // reverse the 'next' pointer
            current.next = previous;

            // step forward in the list
            previous = current;
            current = nextNode;
        }

        return previous;
    }

    //25)
    //You have a linked list and want to find the kkth to last node.
    //Write a function kthToLastNode() that takes an integer kk and the
    //headNode of a singly linked list, and returns the kkth to last node in the list.

    //Gotchas
    //We can do this in O(n)O(n) time.

    //We can do this in O(1)O(1) space. If you're recursing, you're probably
    //taking O(n)O(n) space on the call stack!

    _.kthToLastNode = function(k, head) {

        if (k < 1) {
            throw new Error('Impossible to find less than first to last node: ' + k);
        }

        var leftNode = head;
        var rightNode = head;

        // move rightNode to the kth node
        for (var x = 0; x < k - 1; x++) {

            // but along the way, if a rightNode doesn't have a next,
            // then k is greater than the length of the list and there
            // can't be a kth-to-last node! we'll raise an error
            if (!rightNode.next) {
                throw new Error('k is larger than the length of the linked list: ' + k);
            }

            rightNode = rightNode.next;
        }

        // starting with leftNode on the head,
        // move leftNode and rightNode down the list,
        // maintaining a distance of k between them,
        // until rightNode hits the end of the list
        while (rightNode.next) {
            leftNode = leftNode.next;
            rightNode = rightNode.next;
        }

        // since leftNode is k nodes behind rightNode,
        // leftNode is now the kth to last node!
        return leftNode;
    }

    //26 Reverse String in Place
    //Write a function to reverse a string in-place.
    //Since strings in JavaScript are immutable, first convert the string into an
    //array of characters, do the in-place reversal on that array, and re-join that
    //array into a string before returning it. This isn't technically "in-place" and
    //the array of characters will cost O(n)O(n) additional space, but it's a reasonable
    //way to stay within the spirit of the challenge. If you're comfortable coding in a
    //language with mutable strings, that'd be even better!

    _.reverseStringInPlace = function(string) {

        var stringArray = string.split('');

        var startIndex = 0;
        var endIndex = stringArray.length - 1;

        while (startIndex < endIndex) {

            // swap characters
            var temp = stringArray[startIndex];
            stringArray[startIndex] = stringArray[endIndex];
            stringArray[endIndex] = temp;

            // move towards middle
            startIndex++;
            endIndex--;
        }
        var returnString = stringArray.join('');
        console.log(returnString);
        return returnString;
    }

    //27) Reverse Words
    //Your team is scrambling to decipher a recent message, worried it's a plot to
    //break into a major European National Cake Vault. The message has been mostly deciphered,
    //but all the words are backwards! Your colleagues have handed off the last step to you.
    //Write a function reverseWords() that takes a string message and
    //reverses the order of the words in-place.

    //Gotchas
    //Are you sure you're operating on the array of characters in-place?
    //We can do this in O(n)O(n) time.

    //If you're swapping individual words one at a time, consider what happens when
    //the words are different lengths. Isn't each swap O(n)O(n) time in the worst case?

    //We'll write a helper function reverseCharacters() that reverses all the characters
    //in a string between a frontIndex and backIndex. We use it to:

    //1) Reverse all the characters in the entire message, giving us the correct word order but with each word backwards.
    //2) Reverse the characters in each individual word.

    _.reverseWords = function(message) {

        var messageArray = message.split('');

        // first we reverse all the characters in the entire messageArray
        reverseCharacters(messageArray, 0, messageArray.length - 1);
        // this gives us the right word order
        // but with each word backwards

        // now we'll make the words forward again
        // by reversing each word's characters

        // we hold the index of the /start/ of the current word
        // as we look for the /end/ of the current word
        var currentWordStartIndex = 0;
        for (var i = 0; i <= messageArray.length; i++) {

            // found the end of the current word!
            if (i === messageArray.length || messageArray[i] === ' ') {

                // if we haven't exhausted the string our
                // next word's start is one character ahead
                reverseCharacters(messageArray, currentWordStartIndex, i - 1);
                currentWordStartIndex = i + 1;
            }
        }

        return messageArray.join('');
    }

    function reverseCharacters(messageArray, startIndex, endIndex) {

        // walk towards the middle, from both sides
        while (startIndex < endIndex) {

            // swap the front char and back char
            var temp = messageArray[startIndex];
            messageArray[startIndex] = messageArray[endIndex];
            messageArray[endIndex] = temp;
            startIndex++;
            endIndex--;
        }
    }


    //28) Parenthesis Matching
    //I like parentheticals (a lot).
    //"Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing."
    //
    // Write a function that, given a sentence like the one above, along with the position of an opening parenthesis,
    //finds the corresponding closing parenthesis.
    //
    // Example: if the example string above is input with the number 10 (position of the first parenthesis),
    //the output should be 79 (position of the last parenthesis).
    //

    _.getClosingParen = function(sentence, openingParenIndex) {
        var openNestedParens = 0;
        for (var position = openingParenIndex + 1; position < sentence.length; position++) {
            var char = sentence[position];
            if (char === "(") {
                openNestedParens += 1
            } else if (char === ")") {
                if (openNestedParens === 0) {
                    return position;
                } else {
                    openNestedParens -= 1;
                }
            }
        }
        return "No matching parentheses";
    }

    // You're working with an intern that keeps coming to you with JavaScript code that won't run
    //because the braces, brackets, and parentheses are off. To save you both some time, you decide
    //to write a braces/brackets/parentheses validator.
    // Let's say:
    //
    // '(', '{', '[' are called "openers."
    // ')', '}', ']' are called "closers."
    // Write an efficient function that tells us whether or not an input string's openers and closers
    //are properly nested.
    //
    // Examples:
    //
    // "{ [ ] ( ) }" should return true
    // "{ [ ( ] ) }" should return false
    // "{ [ }" should return false

    _.isValid = function(code) {
        var stack = [];
        var charHash = {
            "{": "}",
            "(": ")",
            "[": "]"
        };

        for (var i = 0; i < code.length; i++) {
            var char = code[i];
            if (charHash[char]) {
                stack.push(charHash[char]);
            } else if (char === "}" || char === ")" || char === "]") {
                if (stack.pop() !== char) {
                    return false;
                }
            }
        }
        return stack.length === 0;
    }


    // Write an efficient function that checks whether any permutation of an input string is a palindrome.
    // Examples:
    //
    // "civic" should return true
    // "ivicc" should return true
    // "civil" should return false
    // "livci" should return false
    // "But 'ivicc' isn't a palindrome!"
    //
    // If you had this thought, read the question again carefully.
    //We're asking if any permutation of the string is a palindrome.
    //Spend some extra time ensuring you fully understand the question before starting.
    //Jumping in with a flawed understanding of the problem doesn't look good in an interview.

    _.hasPalindromePermutation = function(theString) {
        var unpairedCharacters = {};

        for (var i = 0; i < theString.length; i++) {
            var char = theString[i];
            if (unpairedCharacters[char]) {
                delete unpairedCharacters[char]
            } else {
                unpairedCharacters[char] = true;
            }
        }

        var unpairedCharactersKeys = Object.keys(unpairedCharacters);
        return unpairedCharactersKeys.length <= 1;
    }

    // Write a recursive function for generating all permutations of an input string.
    //Return them as a set.
    // Don't worry about time or space complexity—if we wanted efficiency we'd write an iterative version.
    //
    // To start, assume every character in the input string is unique.
    //
    // Your function can have loops—it just needs to also be recursive.
    //
    // Gotchas
    // Make sure you have a base case Otherwise your function may never terminate!

    _.getPermutations = function(str) {
        var uniqueOutput = {};
        var getAnagrams = function(ana, str) {
            if (str === "") {
                uniqueOutput[ana] = 1;
                return;
            }

            for (var i = 0; i < str.length; i++) {
                var string1 = str.slice(0, i);
                var string2 = str.slice(i + 1);
                getAnagrams(ana + str[i], string1 + string2);
            }
        }

        getAnagrams('', str);
        var uniqueOutputKeys = Object.keys(uniqueOutput);
        return uniqueOutputKeys;
    }

    //You created a game that is more popular than Angry Birds.
    //You rank players in the game from highest to lowest score.
    //So far you're using an algorithm that sorts in O(n\lg{n})O(nlgn) time,
    //but players are complaining that their rankings aren't updated fast enough.
    //You need a faster sorting algorithm.
    //
    // Write a function that takes:
    //
    // an array of unsortedScores
    // the highestPossibleScore in the game
    // and returns a sorted array of scores in less than O(n\lg{n})O(nlgn) time.
    //
    // For example:
    //
    // var unsortedScores = [37, 89, 41, 65, 91, 53];
    // const HIGHEST_POSSIBLE_SCORE = 100;
    //
    // sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE);
    // // returns [37, 41, 53, 65, 89, 91]
    //
    // We’re defining nn as the number of unsortedScores because we’re expecting the number
    //of players to keep climbing.
    //
    // And we'll treat highestPossibleScore as a constant instead of factoring it into our
    //big O time and space costs, because the highest possible score isn’t going to change.
    //Even if we do redesign the game a little, the scores will stay around the same order of magnitude.

    _.sortScores = function(unorderedScores, highestPossibleScore) {
        var scoresToCount = [];
        for (var i = 0; i <= highestPossibleScore; i++) {
            scoresToCount[i] = 0;
        }

        unorderedScores.forEach(function(score) {
            scoresToCount[score]++;
        });

        var sortedScores = [];

        scoresToCount.forEach(function(value, index) {
            for (var i = 0; i < value; i++) {
                sortedScores.push(index);
            }
        });

        return sortedScores
    }



}).call(this);


// // we make an array to hold the maximum possible value at every
// // duffel bag weight capacity from 0 to weightCapacity
// // starting each index with value 0
// var maxValuesAtCapacities = [];
// for (var i = 0; i <= weightCapacity; i++) {
//     maxValuesAtCapacities[i] = 0;
// }
//
// for (var currentCapacity = 0; currentCapacity <= weightCapacity; currentCapacity++) {
//
//     // set a variable to hold the max monetary value so far for currentCapacity
//     var currentMaxValue = 0;
//
//     // we use a for loop here instead of forEach because we return infinity
//     // if we get a cakeType that weighs nothing and has a value. but forEach
//     // loops always return undefined and you can't break out of them without
//     // throwing an exception
//     for (var j = 0; j < cakeTypes.length; j++) {
//         var cakeType = cakeTypes[j];
//
//         // if a cake weighs 0 and has a positive value the value of our duffel bag is infinite!
//         if (cakeType.weight === 0 && cakeType.value !== 0) {
//             return Infinity;
//         }
//
//         // if the current cake weighs as much or less than the current weight capacity
//         // it's possible taking the cake would give get a better value
//         if (cakeType.weight <= currentCapacity) {
//
//             // so we check: should we use the cake or not?
//             // if we use the cake, the most kilograms we can include in addition to the cake
//             // we're adding is the current capacity minus the cake's weight. we find the max
//             // value at that integer capacity in our array maxValuesAtCapacities
//             var maxValueUsingCake = cakeType.value + maxValuesAtCapacities[currentCapacity - cakeType.weight];
//
//             // now we see if it's worth taking the cake. how does the
//             // value with the cake compare to the currentMaxValue?
//             currentMaxValue = Math.max(maxValueUsingCake, currentMaxValue);
//         }
//     }
//
//     // add each capacity's max value to our array so we can use them
//     // when calculating all the remaining capacities
//     maxValuesAtCapacities[currentCapacity] = currentMaxValue;
// }
//
// return maxValuesAtCapacities[weightCapacity];
