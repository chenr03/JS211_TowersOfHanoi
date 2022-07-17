'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest
let count = 0;
let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack,startNumber, endStack) => {
  console.log(startStack)
  console.log(startNumber)
  console.log(endStack)

  // console.log('NEW stacks:', stacks);
  //move the end piece of the startStack
  //move it to the end of selected end Stack
  // .pop()
  // .push()

  if (startNumber !== undefined) {
    stacks[startStack].pop();
    stacks[endStack].push(startNumber);
    count++;
  }
  if (count === 30) {
    throw `Game Over! Maximum moves played: ${count}.`
  }
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2 - This test is failing, but my code is correct.
const isLegal = (start, end) => {
  console.log("start:", start)
  console.log("end:", end)
  if (start < end || end === undefined) {
    return true;
  } else {
    return false;
  }

  // is startStack < endStack? yes
  // is the endStack empty? yes
  // Can i try to move the piece to the same stack? no
  // if it's not ok, display "invalid move"
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // if all four numbers are in stack b or c
  return stacks.b.length === 4 || stacks.c.length === 4;
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Here's where we put it all together
  // grab the arguments (a and c) and set variables
  // checkForWin();
  // check to see if it is legal (startStack, endStack)
  // if it's true call the movePiece
  // else, display "invalid move"
  // : else
  // ? if
  // left side is going to work if true || right side going to work if it's falsy

  let startNumber = (startStack === 'a') ? stacks.a[stacks.a.length-1] : (startStack === 'b') ? stacks.b[stacks.b.length-1] : stacks.c[stacks.c.length-1];
  let endNumber = (endStack === 'b') ? stacks.b[stacks.b.length-1] : (endStack === 'c') ? stacks.c[stacks.c.length-1] : stacks.a[stacks.a.length-1];
  console.log('--------start:', startStack, startNumber);
  console.log('--------end:', endStack, endNumber);
  if (isLegal(startNumber, endNumber)) {
    console.log("It's legal!");
    movePiece(startStack, startNumber, endStack);
  } else {
    console.log('Invalid move. Try again!');
  }

  if (checkForWin()) {
    console.log("Congratulations, You Won! Total Moves: ", count)
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, {a: [4, 3, 2], b: [1], c: []});
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = {a: [], b: [4, 3, 2, 1], c: []};
      assert.equal(checkForWin(), true);
      stacks = {a: [], b: [], c: [4, 3, 2, 1]};
      assert.equal(checkForWin(), true);
      stacks = {a: [1], b: [4, 3, 2], c: []};
      assert.equal(checkForWin(), false);
    });
  });

} else {
  getPrompt();
}

