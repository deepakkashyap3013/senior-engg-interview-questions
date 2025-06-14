// var, let, const
// Scope

// Read article here: https://roadsidecoder.hashnode.dev/javascript-interview-questions-on-var-let-and-const

/**
 * NOTE
 * - var is function scoped
 * - let and var are block scoped
 *
 */

// Global scope (window object inside browser), on server side it is empty object {}

function func() {
  // function scope
  var hi = "Hi"; // -> it can't be accessed outside of function
}
// console.log(hi); // -> ERROR: ReferenceError: hi is not defined ❌

{
  // block scope
  var hi = "Hi";
  let var1 = "var1";
  const var2 = "var2";
  console.log(var1, var2); // Works fine ✅
}

console.log(hi); // -> No error, hi can be accessed outside of a block scope
// console.log(var1, var2); // error: var1/var2 are not defined in scope ❌

var a = 5;

console.log(a);

{
  var b = 10;
}

console.log(b);

{
  let c = 5;
  console.log(c); // success ✅
}

// console.log(c); // ReferenceError: c is not defined ❌

/**
 * Shadowing
 */
function test() {
  let a = "Hello";

  if (true) {
    let a = "hi";
    console.log(a); // --> hi
  }

  console.log(a); // --> Hello
}

test();

/**
 * NOTE: var can be shadowed by let but not vice versa
 */

// Declaration

var a;
var a; // -> completely fine

// let a;
// let a; // SyntaxError: Identifier 'a' has already been declared

// var b;
// let b; // SyntaxError: Identifier 'b' has already been declared

// Hoisting
/**
 * creation phase then execution phase
 *
 * creation phase
 * - all the variables and functions are moved up and put inside the scope
 * - all variables are assigned undefined
 * - all functions are copied as is
 *
 * execution phase
 * - this goes line by line
 * - variables gets assinged value
 *
 */

console.log(value); // undefined
var value = 5;

// how would it be for let
// console.log(myName);
// let myName = "deepak"; // ReferenceError: Cannot access 'myName' before initialization ❌
// does that mean, it doesn't get hoisted ?
// Ans-> it is hoisted but put in temporal dead zone(TDZ)
// TDZ is the time between the declaration and initialization of `let` and `const` variable

// NOTE: let is more strict than var that is introduced in ES6

/**
 * Question
 */

function abc() {
  console.log(a); // -> undefined
  var a = 10;
}
abc();

/**
 * What if there would be more variables with let and const and logged before
 * - All the variables will be hoisted
 * - var variable will be undefined
 * - let and const will throw error as it's not been initialized and we are accessing beforehand
 */
