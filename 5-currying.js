// Curring in js
// Example:  f(a,b) into f(a)(b)

function f(a) {
  return function (b) {
    console.log(a, b);
  };
}

f(5)(6);

// Q: why do we use currying
// - To avoid passing the same argument over n over again
// - To create higher order function
// - To create function pure and less prone to errors
// -  It is a checking method that checks if you have all the things before you proceed.
// - It divides one function into multiple functions so that one handles one set of responsibility.

// Q: sum(a)(b)(c) => a + b + c

function sum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(sum(5)(4)(2));

// Q:
/**
 * evaluate("sum")(2)(3) => 5
 * evaluate("multiply")(2)(4) => 8
 * evaluate("divide")(4)(2) => 2
 * evaluate("substract")(4)(1) => 3
 */

function evaluate(operation) {
  return function (a) {
    return function (b) {
      switch (operation) {
        case "sum":
          return a + b;
        case "multiply":
          return a * b;
        case "divide":
          return b ? a / b : NaN;
        case "substract":
          return a - b;
        default:
          break;
      }
    };
  };
}

console.log(evaluate("sum")(2)(3));
console.log(evaluate("multiply")(2)(4));
console.log(evaluate("divide")(4)(2));
console.log(evaluate("substract")(4)(1));

// Q: Infinite currying sum(1)(2)(3)....(n)()

// Recursion
function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}
const val = add(2)(3)(4)(5)();
console.log(val);

// Q: Currying vs partial application

function sum1(a) {
  return function (b, c) {
    return a + b + c;
  };
}

const x = sum1(10);
console.log(x(4, 2));
console.log(x(3, 8));

// or

console.log(sum1(4)(3, 4));

// currying: n arguments = n nested functions
// partial applications: n arguments and not n nested functions

// Q: Curry implementation
// i.e create a func that converts f(a,b,c) =>  f(a)(b)(c)

// Learning: In JavaScript, func.length refers to the number of parameters that a function func is defined to accept—not the number of arguments passed when it's called.

function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...next) {
        return curriedFunc(...args, ...next);
      };
    }
  };
}

const sum2 = (a, b, c, d) => a + b + c + d;

const totalSumFunc = curry(sum2);

console.log(totalSumFunc(2)(3)(4)(4));
