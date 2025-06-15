// Functions in js

// 1 what is function expression ?
// <- anonymous function
const square = function (num) {
  return num * num;
};
console.log(square(5));

// 2 what are first class functions ?
// - A language where functions can be treated as variables, there functions are called first class functions
// passed as arg, returned from func, used, manipulated,

function displaySquare(fn) {
  console.log("Square is ", fn(5));
}
displaySquare(square);

// 3 what is IIFE ? Immediately invoked function expression
(function (n) {
  console.log(n * n);
})(5);

// Question:

// 1. Guess the o/p
((x) => {
  return ((y) => {
    console.log(x);
  })(5);
})(1);

// O/P: 1
// Concept used: Closure, scope chaining

// 2. Function scope: guess the output

for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

/**
 * o/p:
 * 5
 * 5
 * 5
 * 5
 * 5
 *
 * bcoz, var is function scoped, also remember about async code execution
 * the callstack gives preference to all the sync code first then only async code get's chance to enter the callstack
 * so here the entire loop completes and i not references to the final value i.e 5
 * then setTimeout callbacks gets executed resulted in printing 5 in the console
 */

// 3. How can you avoid 5 being printed in the console
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

/**
 * o/p:
 * 0
 * 1
 * 2
 * 3
 * 4
 *
 * bcoz, let is blocked scoped, so set timeout has reference to the current block value
 */

// Function Hoisting

functionName(); // -> this works just fine because, functions are just copied during creation phase i.e it gets copied to the scope

function functionName() {
  console.log("hello world");
}

// Question:
// Hoisting concept:

var x = 20;
var fun = function () {
  console.log(x);
  var x = 10;
};
fun();

/**
 * o/p:
 * undefined
 *
 * log x is inside function scope/local scope to function, so even if x is defined in the global scope
 * it wouldn't check the global scope since we have declared x as a variable within the function scope
 */

// Spread vs rest operator

// <- here the parameter uses rest operator
// when using rest operator, it would always be the last parameter of the function
function multiply(...nums) {
  console.log(nums);
}
var nums = [2, 3, 5, 5];
multiply(...nums); // <- here the argument uses spread operator

// Arrow function vs Normal function

// function squareFunc(n) {
//   return n * n;
// }

// const squareFunc = (n) => {
//   return n * n;
// };

// OR

// const squareFunc = (n) => n * n;

/**
 * - Syntax
 * - Implicit return keyword
 * - arguments in normal function, we can't access arguments inside arrow function
 * - this keyword, arrow function it points to global object
 */

// explaining arguments for normal functions
function fn() {
  console.log(arguments);
}

fn(1, 3, 45645, 45645);

const fnArrow = () => {
  console.log(arguments);
};

// fnArrow(345, 453, 3546); // ERROR
