/*jshint eqnull:true, expr:true*/

//var _ = {};

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
    getMaxProfit = function(stockPricesYesterday) {
        var minPrice = stockPricesYesterday[0];
        var maxProfit = stockPricesYesterday[1] - minPrice;

        for (var i = 0; i < stockPricesYesterday.length; i++) {
            var currentPrice = stockPricesYesterday[i];
            var currentProfit = currentPrice - minPrice;

            minPrice = Math.min(currentPrice, minPrice);
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
    getProductsOfAllIntsExceptAtIndex = function(intArray) {
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
    highestProductOf3 = function(arrayOfInts) {
        var highest = arrayOfInts[0];
        var lowest = arrayOfInts[0];

        var highestProductOfTwo = arrayOfInts[0] * arrayOfInts[1];
        var lowestProductOfTwo = arrayOfInts[0] * arrayOfInts[1];

        var highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];

        for (var i = 1; i < arrayOfInts.length; i++) {
            var currentValue = arrayOfInts[i];
            highestProductOf3 = Math.max(highestProductOf3, highestProductOfTwo * currentValue, lowestProductOfTwo * currentValue);

            highestProductOfTwo = Math.max(highestProductOfTwo, highest * currentValue, lowest * currentValue);
            lowestProductOfTwo = Math.min(lowestProductOfTwo, highest * currentValue, lowest * currentValue);

            highest = Math.max(highest, currentValue);
            lowest = Math.min(lowest, currentValue);
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

    mergeRanges = function(meetings) {
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

    changePossibilitiesTopDown = function(amountLeft, denominationsLeft) {
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
            numberOfPossibilities += changePossibilitiesTopDown(amountLeft, remainingCoins);
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

    // changePossibilitiesBottomUp = function(amount, denominations) {
    //   return changePossibilitiesBottomUp(amount, denominations);
    // }

    changePossibilitiesBottomUp = function(amount, denominations) {
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

    findRangeOverlap = function(point1, length1, point2, length2) {
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

    findRectangularOverlap = function(rect1, rect2) {
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
    //getMean()—returns the mean of all temps we've seen so far
    //getMode()—returns the mode of all temps we've seen so far
    //Optimize for space and time. Favor speeding up the getter functions
    //(getMax(),getMin(), getMean(), and getMode()) over speeding up the insert() function.

    //Temperatures will all be inserted as integers. We'll record our temperatures in Fahrenheit,
    //so we can assume they'll all be in the range 0..100..110.

    //The first thing we want to optimize is our getter functions (per the instructions).

    //Our first thought might be to throw our temperatures into an array or linked list as
    //they come in. With this method, getting the maxTemp and minTemp would take O(n)O(n) time.
    //It would also cost us O(n)O(n)space. But we can do better.

    //What if we kept track of the maxTemp and minTemp as each new number was inserted?

    //This wins us O(1) O(1) time for getMax() and getMin(), while keeping O(1) O(1) time
    //for insert() and removing the need to store all the values.

    //Can we do something similar for getMean()? Unlike with minTemp and maxTemp, the new
    //temp and the previous mean won 't give us enough information to calculate the new mean.
    //What other information will we need to track?

    //To calculate the mean of a list of values, we need to know:
    //the sum of all the values the total number of values So we can augment our class to
    //keep track of the totalNumbers and totalSum. Then we can compute the mean as values are inserted:

    //Can we do something similar for the mode? What other information will we need to track to compute the mode?

    //To calculate the mode, we need to know how many times each value has been inserted.

    //How can we track this? What data structures should we use?

    TempTracker = function() {

        // for mode - The number which appears most often in a set of numbers.
        this.occurrences = []
        for (var i = 0; i < 111; i++) {
            this.occurrences[i] = 0;
        }
        this.maxOccurrences = 0;
        this.mode = 0;

        // for mean - average of the numbers: a calculated "central" value of a set of numbers.
        this.totalNumbers = 0;
        this.totalSum = 0;
        this.mean = null;

        // for min and max
        this.maxTemp = null;
        this.minTemp = null;
    }

    TempTracker.prototype.insert = function(temperature) {
        // for mode
        this.occurrences[temperature]++;
        if (this.occurrences[temperature] > this.maxOccurrences) {
            this.maxOccurrences = this.occurrences[temperature]
            this.mode = temperature;
        }


        // for mean
        this.totalNumbers++;
        this.totalSum += temperature;
        this.mean = this.totalSum / this.totalNumbers;

        // for min and max
        if (this.minTemp === null || temperature < this.minTemp) {
            this.minTemp = temperature;
        }
        if (this.maxTemp === null || temperature > this.maxTemp) {
            this.maxTemp = temperature;
        }
    }

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

    makeBinarySearchTree = function(value) {
        var newTree = {};
        newTree.value = value;
        newTree.left = null;
        newTree.right = null;
        _.extend(newTree, makeBinarySearchTreeMethods);
        return newTree;
    };

    makeBinarySearchTreeMethods = {};

    makeBinarySearchTreeMethods.insert = function(value) {
        var newNode = makeBinarySearchTree(value);
        var node = this;

        var subInsert = function(node) {
            if (newNode.value < node.value) {
                if (node.left === null) {
                    node.left = newNode;
                } else {
                    subInsert(node.left);
                }
            }

            if (newNode.value > node.value) {
                if (node.right === null) {
                    node.right = newNode;
                } else {
                    subInsert(node.right);
                }
            }
        }
        subInsert(node)
    };

    makeBinarySearchTreeMethods.contains = function(target) {
        var node = this;
        var found = false;

        var subContains = function(node) {
            if (node.value === target) {
                found = true;
            }

            if (target < node.value) {
                if (node.left) {
                    subContains(node.left);
                }
            }
            if (target > node.value) {
                if (node.right) {
                    subContains(node.right);
                }
            }
        }
        subContains(node);
        return found;
    };

    makeBinarySearchTreeMethods.depthFirstLog = function(func) {
        var node = this;

        var subDepthFirstLog = function(node) {
            func(node.value);
            if (node.left !== null) {
                subDepthFirstLog(node.left)
            }
            if (node.right !== null) {
                subDepthFirstLog(node.right)
            }
        };

        subDepthFirstLog(node);
    };
    /*
     * Complexity: What is the time complexity of the above functions?
     */

    //Problem 8
    //Write a function to see if a binary tree is "superbalanced" (a new tree property we just made up).
    //A tree is "superbalanced" if the difference between the depths of any two leaf nodes is no greater than one.

    // Your first thought might be to write a recursive function, thinking, "the tree is balanced if
    //the left subtree is balanced and the right subtree is balanced."
    // This kind of approach works well for some other tree problems.
    //
    // But this isn 't quite true. Counterexample: suppose that from the root of our tree:
    //
    // The left subtree only has leaves at depths 10 and 11.
    // The right subtree only has leaves at depths 11 and 12.


    // Both subtrees are balanced, but from the root we will have leaves at 3 different depths.
    //
    // We could instead have our recursive function get the array of distinct leaf depths for each subtree.
    //That could work fine. But let 's come up with an iterative solution instead. It's usually better
    //to use an iterative solution instead of a recursive one because it avoids stack overflow↴.
    //
    // We can do this in O(n) O(n) time and O(n) O(n) space.

    // Sometimes it 's good to start by rephrasing or "simplifying" the problem.
    //
    // The requirement of "the difference between the depths of any two leaf nodes is no greater than 1"
    // implies that we 'll have to compare the depths of all possible pairs of leaves.
    //That'd be expensive — if there are nn leaves, there are n ^ 2 n​ 2​​ possible pairs of leaves.
    //
    // But we can simplify this requirement to require less work.For example, we could equivalently say:
    //
    // "The difference between the min leaf depth and the max leaf depth is 1 or less"
    // "There are at most two distinct leaf depths, and they are at most 1 apart"
    // If you 're having trouble with a recursive approach, try using an iterative one.
    //
    // To get to our leaves and measure their depths, we 'll have to traverse the tree somehow.
    //What methods do we know for traversing a tree?
    //
    // Depth - first and breadth - first are common ways to traverse a tree. Which one should we use here ?
    //The worst - case time and space costs of both are the same— you could make a case for either.
    //
    // But one characteristic of our algorithm is that it could short - circuit and return false as
    //soon as it finds two leaves with depths more than 1 apart. So maybe we should use a traversal that will hit
    //leaves as quickly as possible...
    //
    // Depth - first traversal will generally hit leaves before breadth - first, so
    // let 's go with that. How could we write a depth-first walk that also keeps track of our depth?

    //Solution
    //We do a depth-first walk ↴ through our tree, keeping track of the depth as we go. When we find a leaf, we throw its depth into an array of depths if we haven't seen that depth already.

    //Each time we hit a leaf with a new depth, there are two ways that our tree might now be unbalanced:

    //1) There are more than 2 different leaf depths
    //2) There are exactly 2 leaf depths and they are more than 1 apart.

    //Why are we doing a depth-first walk and not a breadth-first one?
    //You could make a case for either. We chose depth-first because it reaches leaves faster,
    //which allows us to short-circuit earlier in some cases.

    isBalanced = function(treeRoot) {
        // we short-circuit as soon as we find more than 2
        var depths = [];
        // nodes will store pairs of a node and the node's depth
        var nodes = [];
        //push the tree root and it's depth 0 onto nodes
        nodes.push([treeRoot, 0]);

        while (nodes.length) {

            // pop a node and its depth from the top of our stack
            var nodePairs = nodes.pop();
            var node = nodePairs[0];
            var depth = nodePairs[1];
            // case: we found a leaf
            if (!node.left && !node.right) {
                // we only care if it's a new depth
                if (depths.indexOf(depth) < 0) {
                    //if there is a new depth push in onto the depths array
                    depths.push(depth);
                }

                // two ways we might now have an unbalanced tree:
                //  1) more than 2 different leaf depths
                //  2) If there are 2 leaf depths and they are more than 1 apart
                if (depths.length > 2 ||
                    depths.length === 2 && Math.abs((depths[0] + depths[1]) > 1)) {
                    return false;
                }
            } else {
                //case: this isn't a leaf - keep stepping down
                if (node.left) {
                    nodes.push([node.left, depth + 1])
                }
                if (node.right) {
                    nodes.push([node.right, depth + 1])
                }
            }
        }

        return true;
    };


    //Problem 9
    //Write a function to check that a binary tree is a valid binary search tree

    //Notice that when you check the blue node against its parent, it seems correct.
    //However, it's greater than the root, so it should be in the root's right subtree.
    //So we see that checking a node against its parent isn't sufficient to prove that it's in the correct spot.
    //We can do this in O(n)O(n) time and O(n)O(n) additional space, where n is the number of nodes in our tree.
    //Our additional space is O(\lg{n})O(lgn) if our tree is balanced.

    //One way to break the problem down is to come up with a way to confirm that a single node
    //is in a valid place relative to its ancestors. Then if every node passes this test,
    //our whole tree is a valid BST.
    //
    //What makes a given node "correct" relative to its ancestors in a BST?
    //Well, it must be greater than any node it is in the right subtree of, and less than any node
    //it is in the left subtree of.
    //
    //So we could do a walk through our binary tree, keeping track of the ancestors for each node
    //and whether the node should be greater than or less than each of them.
    //If each of these greater-than or less-than relationships holds true for each node, our BST is valid.
    //
    //The simplest ways to traverse the tree are depth-first and breadth-first.
    //They have the same time cost (they each visit each node once). Depth-first traversal of a tree uses memory
    //proportional to the depth of the tree, while breadth-first traversal uses memory proportional to the breadth
    //of the tree (how many nodes there are on the "level" that has the most nodes).
    //
    //Because the tree's breadth can as much as double each time it gets one level deeper, depth-first
    //traversal is likely to be more space-efficient than breadth-first traversal, though they are
    //strictly both O(n)O(n) additional space in the worst case. The space savings are obvious if we know our
    //binary tree is balanced—its depth will be O(\lg{n})O(lgn) and its breadth will be O(n)O(n).
    //
    //But we're not just storing the nodes themselves in memory, we're also storing the value from each ancestor
    //and whether it should be less than or greater than the given node. Each node has O(n)O(n) ancestors
    //(O(\lg{n})O(lgn) for a balanced binary tree), so that gives us O(n^2)O(n​2) additional memory cost (O(n\lg{n})O(nlgn)
    //for a balanced binary tree). We can do better.
    //
    // Let's look at the inequalities we'd need to store for a given node:
    //
    // Notice that we would end up testing that the blue node is <20, <30,and <50.
    //Of course, <30 and <50 are implied by <20. So instead of storing each ancestor, we can just keep track of alowerBound
    //and upperBound that our node's value must fit inside.


    bstCheckerRecursive = function(treeRoot, lowerBound, upperBound) {
        //if lowerBound or upperBound isn't defined set them to negative infinity and positive infinity
        lowerBound = lowerBound || -Infinity;
        upperBound = upperBound || Infinity;
        //if there's no tree root, return true, you made it all the way to the end of the tree
        if (!treeRoot) {
            return true;
        }

        //is the treeRoot's value is greater-than the upperBound value,
        //or less than the lowerBound value, it is not a binarySearchTree, so return false
        if (treeRoot.value > upperBound || treeRoot.value < lowerBound) {
            return false;
        }

        //transverse down the left and right branch of tree passing the lowerBound,
        //and value for the left and the value and the upperBound for the right
        return bstCheckerRecursive(treeRoot.left, lowerBound, treeRoot.value) &&
            bstCheckerRecursive(treeRoot.right, treeRoot.value, upperBound);
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

    //Let's start by solving a simplified version of the problem and see if we can adapt our
    //approach from there. How would we find the largest element in a BST?

    // A reasonable guess is to say the largest element is simply the "rightmost" element.
    //
    // So maybe we can start from the root and just step down right child pointers until we can't anymore
    //(until the right child is null). At that point the current node is the largest in the whole tree.
    //
    // Is this sufficient? We can prove it is by contradiction:
    //
    // If the largest element were not the "rightmost," then the largest element would either:
    //      1) be in some ancestor node's left subtree, or
    //      2) have a right child.
    // But each of these leads to a contradiction:
    //      1) If the node is in some ancestor node's left subtree it's smaller than that ancestor node,
    //      so it's not the largest.
    //      2) If the node has a right child that child is larger than it, so it's not the largest.
    // So the "rightmost" element must be the largest.
    //
    // How would we formalize getting the "rightmost" element in code?
    //
    // We can use a simple recursive approach. At each step:
    //      1) If there is a right child, that node and the subtree below it are all greater than the current node.
    //      So step down to this child and recurse.
    //      2) Else there is no right child and we're already at the "rightmost" element, so we return its value.

    //Okay, so we can find the largest element. How can we adapt this approach to find the secondlargest element?

    //Our first thought might be, "it's simply the parent of the largest element!"
    //That seems obviously true when we imagine a nicely balanced tree like this one:

    //Here the parent of our largest is 8, but the second largest is 11!
    //
    // Drat, okay so the second largest isn't necessarily the parent of the largest...
    //back to the drawing board... Wait. No. The second largest is the parent of the largest
    //if the largest does not have a left subtree. If we can handle the case where the largest does
    //have a left subtree, we can handle all cases, and we have a solution.
    //
    // So let's try sticking with this. How do we find the second largest when the largest has a left subtree?
    //
    // It's the largest item in that left subtree! Woah, we freaking just wrote a function for finding the
    //largest element in a tree. We could use that here!
    //
    // How would we code this up?

    function findLargest(rootNode) {
        var current = rootNode;
        while (current) {
            console.log(current);
            if (!current.right) return current.value;
            current = current.right;
        }
    }

    findSecondLargest = function(rootNode) {
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

    binarySearch = function(array, target) {
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

    findRotationPoint = function(words) {
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

        //console.log(ceilingIndex);
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

    canTwoMoviesFillFlight = function(movieLengths, flightLength) {
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

    fibIterative = function(n) {

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

    maxDuffelBagValue = function(cakeTypes, weightCapacity) {
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

    /*
     * Implement a linked list using the pseudoclassical instantiation pattern.
     *
     * Your linked list should have methods called "addToTail", "removeHead", and "contains."
     *
     */

    // EXAMPLE USAGE:
    // var list = new LinkedList();
    // list.tail.value;   //yields 'null'
    // list.addToTail(4);
    // list.addToTail(5);
    // list.head.value;   //yields '4';
    // list.contains(5);  //yields 'true';
    // list.contains(6);  //yields 'false';
    // list.removeHead(); //yields '4'
    // list.tail.value;   //yields '5';


    LinkedList = function() {
        this.head = null;
        this.tail = null;
    };

    //write methods here!

    LinkedList.prototype.addToTail = function(value) {
        var newNode = this.makeNode(value);
        if (!this.head) {
            this.head = newNode;
        }

        if (this.tail) {
            this.tail.next = newNode;
        }

        this.tail = newNode
    };

    LinkedList.prototype.removeHead = function() {
        if (!this.head) {
            return null;
        }

        var currentHead = this.head;

        if (this.head === this.tail) {
            this.head = this.tail = null;
        }

        if (this.head) {
            this.head = this.head.next;
        }

        return currentHead.value;

    };

    LinkedList.prototype.contains = function(target) {
        var currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === target) {
                return true;
            }
            currentNode = currentNode.next;
        }
        return false;
    };

    LinkedList.prototype.makeNode = function(value) {
        var node = {};
        node.value = value;
        node.next = null;
        return node;
    };



    //22) Delete Node
    //Delete a node from a singly-linked list, given only a variable pointing to that node.
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

    deleteNode = function(nodeToDelete) {
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

    checkCycle = function(firstNode) {

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

    reverseLinkedList = function(headOfList) {
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

    kthToLastNode = function(k, head) {

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

    reverseStringInPlace = function(string) {
        var stringArray = string.split('');
        var startIndex = 0;
        var endingIndex = string.length - 1;

        while (startIndex < endingIndex) {
            var temp = stringArray[startIndex];
            stringArray[startIndex] = stringArray[endingIndex];
            stringArray[endingIndex] = temp;

            startIndex++;
            endingIndex--;
        }

        var returnString = stringArray.join('');
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

    reverseWords = function(message) {

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

    getClosingParen = function(sentence, openingParenIndex) {
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

    isValid = function(code) {
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

    hasPalindromePermutation = function(theString) {
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

    getPermutations = function(str) {
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

    //32) Top Scores
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

    sortScores = function(unorderedScores, highestPossibleScore) {
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



    //Problem 33 - Which Appears Twice
    //I have an array where every number in the range 1...n1...n appears once except
    //for one number which appears twice.
    //Write a function for finding the number that appears twice.
    whichAppearsTwice = function(numberArray) {
        var numbersInArray = numberArray.length - 1;
        var correctSum = (numbersInArray * (numbersInArray + 1)) / 2;
        var arrayTotal = 0;

        for (var i = 0; i < numberArray.length; i++) {
            arrayTotal += numberArray[i];
        }

        var duplicate = arrayTotal - correctSum;

        return duplicate;
    }


    //Problem 34 - Word Cloud Data
    //You want to build a word cloud, an infographic where the size of a word corresponds
    //to how often it appears in the body of text. To do this, you'll need data.
    //Write code that takes a long string and builds its word cloud data in a map,
    //where the keys are words and the values are the number of times the words occurred.

    //We'll use a JavaScript Map instead of an object because it's more explicit — we're mapping
    //words to counts. And it'll be easier and cleaner when we want to iterate over our data.

    //Are you sure your code handles hyphenated words and standard punctuation?

    //Are you sure your code reasonably handles the same word with different capitalization?

    //What do we want to do with "After", "Dana", and "add"? In this example, your final mapshould
    //include one "Add" or "add" with a value of 22. Make reasonable (not necessarily perfect)
    //decisions about cases like "After" and "Dana". Assume the input will only contain words
    //and standard punctuation.

    //Are you sure your code handles hyphenated words and standard punctuation?

    //Are you sure your code reasonably handles the same word with different capitalization?

    //Try these sentences:

    //'We came, we saw, we conquered...then we ate Bill's (Mille-Feuille) cake.'
    //'The bill came to five dollars.'

    //We can do this in O(n)O(n) runtime and space. The final map we return should be the
    //only data structure whose length is tied to n. We should only iterate through our input string once.

    //We'll have to go through the entire input string, and we're returning a map with every unique word.
    //In the worst case every word is different, so our runtime and space cost will both be at least O(n)O(n).

    //This challenge has several parts. Let's break them down.

    //Splitting the words from the input string
    //1) Populating the map with each word
    //2) Handling words that are both uppercase and lowercase in the input string
    //3) How would you start the first part?

    //We could use a built - in split() function to separate our words, but if we just split on spaces
    //we'd have to iterate over all the words before or after splitting to clean up the punctuation.
    //And consider em dashes or ellipses, which aren't surrounded by spaces but nonetheless separate words.
    //Instead, we 'll make our own split() function, which will let us iterate over the input string only once.

    //How can we check if a character in our input string is a letter?
    //Two good options are to build a helper function or to use regular expressions.
    //Either will work for this problem. We'll build our own helper function isLetter():

    //Now how can we split each word? Let's assume, for now, that our helper function will return an array of words.

    //We'll iterate over all the characters in the input string. How can we identify when we've reached the end of a word?

    //We can store currentWord in a variable, and append its value to the array every time we hit a space.

    //Here's a simple example. It doesn't work perfectly yet—you'll need to add code to handle the end of
    //the input string, hyphenated words, punctuation, and edge cases.

    //Solution
    // In our solution, we made four decisions:
    // 1) We used a class. This allowed us to tie our functions together, calling them on instances of our class instead
    //    of passing references.
    // 2) For our method of avoiding duplicate words with different cases, we chose to make a word uppercase
    //    in our map only if it is always uppercase in the original string. While this is a reasonable approach,
    //    it is imperfect (consider proper nouns that are also lowercase words, like "Bill" and "bill").
    // 3) We built our own split() function instead of using a built-in one. This allowed us to pass each word to our
    //    addWordToMap() function as it was split, and to split words and eliminate punctuation in one iteration.
    // 4) We made our own isLetter() function instead of using regular expressions. Either approach would work for this challenge.

    // To split the words in the input string and populate a map of the unique words to the number of
    //times they occurred, we:
    //
    // 1) Split words by spaces, em dashes and ellipses—making sure to include hyphens surrounded by characters.
    //    We also include all apostrophes (which will handle contractions nicely but will break possessives into separate words).
    // 2) Populate the words in our map as they are identified, checking if the word is already in our map in its current case or another case.

    //    If the input word is uppercase and there's a lowercase version in the map, we increment the lowercase version's count.
    //    If the input word is lowercase and there's an uppercase version in the map, we "demote" the uppercase version by adding the
    //    lowercase version and giving it the uppercase version's count.

    WordCloudData = function(inputString) {
        this.wordsToCounts = new Map();
        this.populateWordsToCounts(inputString);
    }

    WordCloudData.prototype.populateWordsToCounts = function(inputString) {
        // iterates over each character in the input string, splitting
        // words and passing them to this.addWordToMap()

        var currentWord = '';
        for (var i = 0; i < inputString.length; i++) {
            var character = inputString.charAt(i);

            // if we reached the end of the string we check if the last
            // character is a letter and add the last word to our map
            if (i === inputString.length - 1) {
                if (this.isLetter(character)) currentWord += character;
                if (currentWord.length) this.addWordToMap(currentWord);

                // if we reach a space or emdash we know we're at the end of a word
                // so we add it to our map and reset our current word
            } else if (character === ' ' || character === '\u2014') {
                if (currentWord.length) this.addWordToMap(currentWord);
                currentWord = '';

                // we want to make sure we split on ellipses so if we get two periods in
                // a row we add the current word to our map and reset our current word
            } else if (character === '.') {
                if (i < inputString.length - 1 && inputString.charAt(i + 1) === '.') {
                    if (currentWord.length) this.addWordToMap(currentWord);
                    currentWord = '';
                }

                // if the character is a letter or an apostrophe, we add it to our current word
            } else if (this.isLetter(character) || character === '\'') {
                currentWord += character;

                // if the character is a hyphen, we want to check if it's surrounded by letters
                // if it is, we add it to our current word
            } else if (character === '-') {
                if (i > 0 && this.isLetter(inputString.charAt(i - 1)) &&
                    this.isLetter(inputString.charAt(i + 1))) {
                    currentWord += character;
                }
            }
        }
        return this.wordsToCounts;
    };

    WordCloudData.prototype.addWordToMap = function(word) {

        var newCount;

        // if the word is already in the map we increment its count
        if (this.wordsToCounts.has(word)) {
            newCount = this.wordsToCounts.get(word) + 1;
            this.wordsToCounts.set(word, newCount);

            // if a lowercase version is in the map, we know our input word must be uppercase
            // but we only include uppercase words if they're always uppercase
            // so we just increment the lowercase version's count
        } else if (this.wordsToCounts.has(word.toLowerCase())) {
            newCount = this.wordsToCounts.get(word.toLowerCase()) + 1;
            this.wordsToCounts.set(word.toLowerCase(), newCount);

            // if an uppercase version is in the map, we know our input word must be lowercase.
            // since we only include uppercase words if they're always uppercase, we add the
            // lowercase version and give it the uppercase version's count
        } else if (this.wordsToCounts.has(this.capitalize(word))) {
            newCount = this.wordsToCounts.get(this.capitalize(word)) + 1;
            this.wordsToCounts.set(word, newCount);
            this.wordsToCounts.delete(this.capitalize(word));

            // otherwise, the word is not in the map at all, lowercase or uppercase
            // so we add it to the map
        } else {
            this.wordsToCounts.set(word, 1);
        }
    };

    WordCloudData.prototype.capitalize = function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    WordCloudData.prototype.isLetter = function(character) {
        return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(character) >= 0;
    };

    WordCloudData.prototype.getWordCountData = function() {
        return this.wordsToCounts;
    };

    //Problem 35 - In-Place Shuffle
    //Write a function for doing an in-place ↴ shuffle of an array.
    //The shuffle must be "uniform," meaning each item in the original array
    //must have the same probability of ending up in each spot in the final array.

    //Assume that you have a function getRandom(floor, ceiling) for getting a
    //random integer that is >= floor and <= ceiling.

    //A common first idea is to walk through the array and swap each element with a random other element.
    //We choose a random item to move to the first index, then we choose a random other item to move to the second index, etc. We "place" an item in an index by swapping it with the item currently at that index.

    //Crucially, once an item is placed at an index it cant be moved.
    //So for the first index we choose from nn items, for the second index we
    //choose from n-1n−1 items, etc.

    function getRandom(floor, ceiling) {
        return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
    }

    function shuffle(theArray) {
        // if it's 1 or 0 items, just return
        if (theArray.length <= 1) return;

        // walk through from beginning to end
        for (var indexWeAreChoosingFor = 0; indexWeAreChoosingFor < theArray.length; indexWeAreChoosingFor++) {

            // choose a random not-yet-placed item to place there
            // (could also be the item currently in that spot)
            // must be an item AFTER the current item, because the stuff
            // before has all already been placed
            var randomChoiceIndex = getRandom(indexWeAreChoosingFor, theArray.length - 1);

            // place our random choice in the spot by swapping
            var valueAtIndexWeChoseFor = theArray[indexWeAreChoosingFor];
            theArray[indexWeAreChoosingFor] = theArray[randomChoiceIndex];
            theArray[randomChoiceIndex] = valueAtIndexWeChoseFor;
        }
    }

    //This is a semi-famous algorithm known as the Fisher-Yates shuffle
    //(sometimes called the Knuth shuffle).


    //Problem 36 - Single Riffle Shuffle
    //I figured out how to get rich: online poker.
    //I suspect the online poker game I'm playing shuffles cards by doing a single " riffle."

    //To prove this, let's write a function to tell us if a full deck of cards
    //shuffledDeck is a single riffle of two other halves half1 and half2.

    //We'll represent a stack of cards as an array of integers in the range 1..521..52
    //(since there are 5252 distinct cards in a deck).

    //Why do I care? A single riffle is not a completely random shuffle.

    //Watch out for bugs because your index is outside an array! Will your function ever try
    //to grab the 0th item from an empty array, or the nth item from an array with
    //n elements (where the last index would be n-1n−1)?

    function isSingleRiffle(half1, half2, shuffledDeck) {
        var half1Index = 0;
        var half2Index = 0;
        var half1MaxIndex = half1.length - 1;
        var half2MaxIndex = half2.length - 1;

        for (var i = 0; i < shuffledDeck.length; i++) {
            var card = shuffledDeck[i];

            // if we still have cards in half1
            // and the "top" card in half1 is the same
            // as the top card in shuffledDeck
            if (half1Index <= half1MaxIndex &&
                card === half1[half1Index]) {
                half1Index++;

                // if we still have cards in half2
                // and the "top" card in half2 is the same
                // as the top card in shuffledDeck
            } else if (half2Index <= half2MaxIndex &&
                card === half2[half2Index]) {
                half2Index++;

                // if the top card in shuffledDeck doesn't match the top
                // card in half1 or half2, this isn't a single riffle.
            } else {
                return false;
            }
        }

        // all cards in shuffledDeck have been "accounted for"
        // so this is a single riffle!
        return true;
    }


    //Problem 37 - Simulated 5-sided die
    //You have a function rand7() that generates a random integer from 1 to 7.
    //Use it to write a function rand5() that generates a random integer from 1 to 5.
    //rand7() returns each integer with equal probability. rand5() must also return
    //each integer with equal probability.
    //Breakdown
    //rand5() must return each integer with equal probability,
    //but we don't need to make any guarantees about its runtime...

    //In fact, the solution has a small possibility of never returning...

    //Solution
    //We simply "re-roll" whenever we get a number greater than 5.

    function rand5() {
        var result = 7; // arbitrarily large
        while (result > 5) {
            result = rand7();
        }
        return result;
    }


    //Problem 38 - Simulated 7-sided die
    //You have a function rand5() that generates a random integer from 1 to 5.
    //Use it to write a function rand7() that generates a random integer from 1 to 7.
    //rand5() returns each integer with equal probability.
    //rand7() must also return each integer with equal probability.

    function rand7() {

        while (true) {

            // do our die rolls
            var roll1 = rand5();
            var roll2 = rand5();

            var outcomeNumber = (roll1 - 1) * 5 + (roll2 - 1) + 1;

            // if we hit an extraneous
            // outcome we just re-roll
            if (outcomeNumber > 21) continue;

            // our outcome was fine. return it!
            return outcomeNumber % 7 + 1;
        }
    }


    //Problem 39 - Two Egg Problem


    //Problem 40 - Find Repeat, Space Edition
    //Solution
    //Our approach is similar to a binary search, except we divide the range of
    //possible answers in half at each step, rather than dividing the array in half.

    //1) Find the number of integers in our input array which lie within the range 1..\frac{n}{2}1..2
    //2) Compare that to the number of possible unique integers in the same range.
    //3) If the number of actual integers is greater than the number of possible integers,
    //we know there’s a duplicate in the range 1..\frac{n}{2}1..2n,
    //so we iteratively use the same approach on that range.
    //4) If the number of actual integers is not greater than the number of possible integers,
    //we know there must be duplicate in the range \frac{n}{2} + 1..n2​n +1..n,
    //so we iteratively use the same approach on that range.
    //5) At some point our range will contain just 1 integer, which will be our answer.

    function findRepeat(theArray) {

        var floor = 1;
        var ceiling = theArray.length - 1;

        while (floor < ceiling) {

            // divide our range 1..n into an upper range and lower range
            // (such that they don't overlap)
            // lower range is floor..midpoint
            // upper range is midpoint+1..ceiling
            var midpoint = Math.floor(floor + ((ceiling - floor) / 2));
            var lowerRangeFloor = floor;
            var lowerRangeCeiling = midpoint;
            var upperRangeFloor = midpoint + 1;
            var upperRangeCeiling = ceiling;

            var distinctPossibleIntegersInLowerRange = lowerRangeCeiling - lowerRangeFloor + 1;

            // count number of items in lower range
            var itemsInLowerRange = 0;
            theArray.forEach(function(item) {

                // is it in the lower range?
                if (item >= lowerRangeFloor && item <= lowerRangeCeiling) {
                    itemsInLowerRange += 1;
                }
            });

            if (itemsInLowerRange > distinctPossibleIntegersInLowerRange) {

                // there must be a duplicate in the lower range
                // so use the same approach iteratively on that range
                floor = lowerRangeFloor;
                ceiling = lowerRangeCeiling;
            } else {

                // there must be a duplicate in the upper range
                // so use the same approach iteratively on that range
                floor = upperRangeFloor;
                ceiling = upperRangeCeiling;
            }
        }

        // floor and ceiling have converged
        // we found a number that repeats!
        return floor;
    }

    //Problem 41 - Find Repeat BEAST MODE
    //Find a duplicate, Space Edition™ BEAST MODE
    //In Find a duplicate, Space Edition™, we were given an array of integers where:

    //the integers are in the range 1..n1..n
    //the array has a length of n+1n+1
    //These properties mean the array must have at least 1 duplicate.
    //Our challenge was to find a duplicate number, while optimizing for space. We used a divide and conquer approach, iteratively cutting the array in half to find a duplicate integer in O(n\lg{n})O(nlgn)time and O(1)O(1) space (sort of a modified binary search).

    //But we can actually do better. We can find a duplicate integer in O(n)O(n) time while keeping our space cost at O(1)O(1).

    //This is a tricky one to derive (unless you have a strong background in graph theory), so we'll get you started:

    //Imagine each item in the array as a node in a linked list. In any linked list,
    //each node has a value and a "next" pointer. In this case:

    //The value is the integer from the array.
    //The "next" pointer points to the value-eth node in the list
    //(numbered starting from 1). For example, if our value was 3, the "next" node would be the thirdnode.

    //Solution
    //We treat the input array as a linked list like we described at the top in the problem.

    //To find a duplicate integer:

    //A) We know the position of a node with multiple incoming pointers is a duplicate in our array
    //because the nodes that pointed to it must have the same value.
    //B) We find a node with multiple incoming pointers by finding the first node in a cycle.
    //C) We find the first node in a cycle by finding the length of the cycle and
    //advancing two pointers: one starting at the head of the linked list, and the other starting ahead as many steps as there are nodes in the cycle. The pointers will meet at the first node in the cycle.
    //D) We find the length of a cycle by remembering a position inside the cycle
    //and counting the number of steps it takes to get back to that position.
    //E) We get inside a cycle by starting at the head and walking nn steps.
    //We know the head of the list is at position n + 1n+1.
    //F) We want to think of our array as a linked list but we don't want to actually use
    //up all that space, so we traverse our array as if it were a linked list ↴ by converting positions to indices.

    function findDuplicate(intArray) {

        const n = intArray.length - 1;

        // STEP 1: GET INSIDE A CYCLE
        // start at position n+1 and walk n steps to
        // find a position guaranteed to be in a cycle
        var positionInCycle = n + 1;
        for (var x = 0; x < n; x++) {

            // we subtract 1 from the current position to step ahead:
            // the 2nd /position/ in an array is /index/ 1
            positionInCycle = intArray[positionInCycle - 1];
        }

        // STEP 2: FIND THE LENGTH OF THE CYCLE
        // find the length of the cycle by remembering a position in the cycle
        // and counting the steps it takes to get back to that position
        const rememberedPositionInCycle = positionInCycle;
        var currentPositionInCycle = intArray[positionInCycle - 1]; // 1 step ahead
        var cycleStepCount = 1;

        while (currentPositionInCycle !== rememberedPositionInCycle) {
            currentPositionInCycle = intArray[currentPositionInCycle - 1];
            cycleStepCount += 1;
        }

        // STEP 3: FIND THE FIRST NODE OF THE CYCLE
        // start two pointers
        //   (1) at position n+1
        //   (2) ahead of position n+1 as many steps as the cycle's length
        var pointerStart = n + 1;
        var pointerAhead = n + 1;
        for (var x = 0; x < cycleStepCount; x++) {
            pointerAhead = intArray[pointerAhead - 1];
        }

        // advance until the pointers are in the same position
        // which is the first node in the cycle
        while (pointerStart !== pointerAhead) {
            pointerStart = intArray[pointerStart - 1];
            pointerAhead = intArray[pointerAhead - 1];
        }

        // since there are multiple values pointing to the first node
        // in the cycle, its position is a duplicate in our array
        return pointerStart;
    }


    //Problem 42 - Find Duplicate failures
    //You left your computer unlocked and your friend decided to troll you by copying a lot of your files to random spots all over your file system.
    //Even worse, she saved the duplicate files with random, embarrassing names ("this_is_like_a_digital_wedgie.txt" was clever, I'll give her that).

    //Write a function that returns an array of all the duplicate files. We'll check them by hand before actually deleting them, since programmatically deleting files is really scary. To help us confirm that two files are actually duplicates, return an array of arrays ↴ where:

    //the first item is the duplicate file
    //the second item is the original file
    //For example:

    //[ ['/tmp/parker_is_dumb.mpg', '/home/parker/secret_puppy_dance.mpg'],
    //['/home/trololol.mov', '/etc/apache2/httpd.conf'] ]
    //You can assume each file was only duplicated once.

    //Solution
    //We walk through our whole file system iteratively. As we go, we take a "fingerprint" of each file in constant time by hashing the first few, middle few, and last few bytes. We store each file's fingerprint in an object as we go.

    //If a given file's fingerprint is already in our object, we assume we have a duplicate.
    //In that case, we assume the file edited most recently is the one created by our friend.

    // const fs = require('fs');
    // const crypto = require('crypto');

    function findDuplicateFiles(startingDirectory) {
        var filesSeenAlready = {};
        var stack = [startingDirectory];

        var duplicates = [];

        while (stack.length) {

            // var currentPath = stack.pop();
            // var currentFile = fs.statSync(currentPath);

            // if it's a directory,
            // put the contents in our stack
            if (currentFile.isDirectory()) {
                fs.readdirSync(currentPath).forEach(function(path) {
                    stack.push(currentPath + '/' + path);
                });

                // if it's a file
            } else {

                // get its hash
                var fileHash = sampleHashFile(currentPath);

                // get its last edited time
                var currentLastEditedTime = currentFile.mtime;

                // if we've seen it before
                if (filesSeenAlready.hasOwnProperty(fileHash)) {

                    var existingFile = filesSeenAlready[fileHash];

                    if (currentLastEditedTime > existingFile.lastEditedTime) {

                        // current file is the dupe!
                        duplicates.push([currentPath, existingFile.path]);

                    } else {

                        // old file is the dupe!
                        duplicates.push([existingFile.path, currentPath]);

                        // but also update the object to have the new file's info
                        filesSeenAlready[fileHash] = {
                            lastEditedTime: currentLastEditedTime,
                            path: currentPath
                        };
                    }

                    // if it's a new file, throw it in filesSeenAlready
                    // and record its path and last edited time,
                    // so we can tell later if it's a dupe
                } else {
                    filesSeenAlready[fileHash] = {
                        lastEditedTime: currentLastEditedTime,
                        path: currentPath
                    };
                }
            }
        }

        return duplicates;
    }

    function sampleHashFile(path) {
        //const file = fs.statSync(path);

        const numBytesToReadPerSample = 4000;
        const totalBytes = file.size;

        const hash = crypto.createHash('sha512');

        // if the file is too short sto take 3 samples, hash the entire file
        if (totalBytes < numBytesToReadPerSample * 3) {
            hash.update(fs.readFileSync(path));

        } else {
            const numBytesBetweenSamples = (totalBytes - numBytesToReadPerSample * 3) / 2;

            var buffer = new Buffer(numBytesToReadPerSample * 3);

            // read first, middle, and last bytes
            for (var offsetMultiplier = 0; offsetMultiplier <= 2; offsetMultiplier++) {
                var fd = fs.openSync(path, 'r');

                var offset = offsetMultiplier * numBytesToReadPerSample;
                var position = offsetMultiplier * (numBytesToReadPerSample + numBytesBetweenSamples);

                fs.readSync(fd, buffer, offset, numBytesToReadPerSample, position);
            }

            hash.update(buffer);
        }

        return hash.digest();
    }

    //Problem 43 - Merge Sorted Arrays
    //In order to win the prize for most cookies sold, my friend Alice and I are going
    //to merge our Girl Scout Cookies orders and enter as one unit.
    //Each order is represented by an "order id" (an integer).

    //We have our lists of orders sorted numerically already, in arrays.
    //Write a function to merge our arrays of orders into one sorted array.

    //Think about edge cases! What happens when we've merged in all of the elements
    //from one of our arrays but we still have elements to merge in from our other array?

    //We can do better. With this algorithm, we're not really taking advantage of the fact
    //that the input arrays are themselves already sorted. How can we save time by using this fact?

    //A good general strategy for thinking about an algorithm is to try writing out a sample input and performing the operation by hand. If you're stuck, try that!

    //Since our arrays are sorted, we know they each have their smallest item in the 0th index.
    //So the smallest item overall is in the 0th index of one of our input arrays!
    //Which 0th element is it? Whichever is smaller!  To start, let's just write a function that chooses
    //the 0th element for our sorted array.

    //Now to get our next element we can use the same approach we used to get the 0th element—it's the smallest of the earliest unmerged elements in either array! In other words, it's the smaller of the leftmost elements in either array, assuming we've removed the elements we've already merged in.

    //So in general we could say something like:

    //1) We'll start at the beginnings of our input arrays, since the smallest elements will be there.
    //2) As we put items in our final mergedArray, we'll keep track of the fact that they're "already merged."
    //3) At each step, each array has a first "not-yet-merged" item.
    //4) At each step, the next item to put in the mergedArray is the smaller of those two "not-yet-merged" items!

    //Okay, this algorithm makes sense. To wrap up, we should think about edge cases and check for bugs. What edge cases should we worry about?

    // Here are some edge cases:
    //
    // One or both of our input arrays is 0 elements or 1 element
    // One of our input arrays is longer than the other.
    // One of our arrays runs out of elements before we're done merging.
    // Actually, 3 will always happen. In the process of merging our arrays,
    //we'll certainly exhaust one before we exhaust the other.
    //
    // Does our function handle these cases correctly?


    //Solution
    // First, we allocate our answer array, getting its size by adding the size of myArray and alicesArray.
    // We keep track of a current index in myArray, a current index in alicesArray,
    //and a current index in mergedArray. So at each step, there's a "current item" in alicesArray and in myArray.
    //The smaller of those is the next one we add to the mergedArray!
    //But careful: we also need to account for the case where we exhaust one of our arrays
    //and there are still elements in the other. To handle this, we say that the current item in myArray is
    //the next item to add to mergedArray only if myArray is not exhausted AND, either:
    //
    //A) alicesArray is exhausted, or
    //B) the current item in myArray is less than the current item in alicesArray

    mergeArrays = function(myArray, alicesArray) {

        // set up our mergedArray
        var mergedArray = [];

        var currentIndexAlices = 0;
        var currentIndexMine = 0;
        var currentIndexMerged = 0;

        while (currentIndexMerged < (myArray.length + alicesArray.length)) {

            var isMyArrayExhausted = currentIndexMine >= myArray.length;
            var isAlicesArrayExhausted = currentIndexAlices >= alicesArray.length;

            // case: next comes from my array
            // my array must not be exhausted, and EITHER:
            // 1) alice's array IS exhausted, or
            // 2) the current element in my array is less
            //    than the current element in alice's array
            if (!isMyArrayExhausted && (isAlicesArrayExhausted ||
                    (myArray[currentIndexMine] < alicesArray[currentIndexAlices]))) {

                mergedArray[currentIndexMerged] = myArray[currentIndexMine];
                currentIndexMine++;

                // case: next comes from alice's array
            } else {
                mergedArray[currentIndexMerged] = alicesArray[currentIndexAlices];
                currentIndexAlices++;
            }

            currentIndexMerged++;
        }

        return mergedArray;
    }



}).call(this);
