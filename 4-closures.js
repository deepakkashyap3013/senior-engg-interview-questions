// Closures in js

// Lexical scope
// - Lexical scope is js means, a variable defined outside a function can be accessible inside of another function defined after variable declaration but the opposite is not true i.e variable defined inside the function is not accessible outside the function

// global scope
function local() {
  // local scope
}

// global scope
function subscribe() {
  var name = "Deepak Kashyap";
  // inner scope 2
  function displayName() {
    // inner scope 1
    console.log(name);
  }
  displayName();
}
// here displayName is a closure to subscribe
subscribe();

/*
Q: What is closure ?
Ans: A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives a function access to its outer scope. In JavaScript, closures are created every time a function is created, at function creation time.
*/

function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc();

// Closure scope chain
/*
A nested function's access to the outer function's scope includes the enclosing scope of the outer function—effectively creating a chain of function scopes. To demonstrate, consider the following example code.
*/

// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20

// Questions

// 1 write a function that would allow you to do thi:
// var addSix = createBase(6);
// addSix(5); // 11
// addSix(10); // 16

function createBase(n) {
  return function (val) {
    console.log(n + val);
  };
}

var addSix = createBase(6);

addSix(5);
addSix(10);

// 2 Optimize the below code:

// function find(index) {
//   let a = [];
//   for (let i = 0; i < 1000000; i++) {
//     a[i] = i * i;
//   }

//   console.log(a[index]);
// }

// console.time("6");
// find(6);
// console.timeEnd("6");
// console.time("12");
// find(12);
// console.timeEnd("12");

/**
 * o/p:
 * 36
 * 6: 14.114ms
 * 144
 * 12: 6.611ms
 *
 */

function find() {
  let a = [];
  for (let i = 0; i < 1000000; i++) {
    a[i] = i * i;
  }

  return function (index) {
    console.log(a[index]);
  };
}

const closure = find(); // <- acts as a cache/preprocessing is done

console.time("6");
closure(6);
console.timeEnd("6");
console.time("12");
closure(12);
console.timeEnd("12");

/**
 * 36
 * 6: 0.116ms
 * 144
 * 12: 0.021ms
 */

// 2. Function scope: guess the output

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

// You are not allowed to use let to print 0, 1, 2, 3, 4, how can you do it ?

// Ans: using closure

// for (var i = 0; i < 5; i++) {
//   function inner(i) {
//     setTimeout(() => {
//       console.log(i);
//     }, i * 1000);
//   }
//   inner(i);
// }

// Q: How would you use a closure to create a private counter ?

function counter() {
  let _counter = 0;

  function add(increment) {
    _counter += increment;
  }

  function retrieve() {
    return "Counter = " + _counter;
  }

  return {
    add,
    retrieve,
  };
}

const c = counter();

c.add(5);
console.log(c.retrieve());

// Q: What is module design pattern

var Module = (function () {
  function privateMethod() {
    console.log("private");
  }

  return {
    publicMethod: function () {
      // call the privateMethod
      // do stuffs...
      console.log("public method");
      console.log("Invoking private methode");
      privateMethod();
    },
  };
})();

Module.publicMethod();

// Q Make this run only once

// let view;
// function likeTheVideo() {
//   view = "Deepak kashyap";
//   console.log(view);
// }

// likeTheVideo();
// likeTheVideo();
// likeTheVideo();
// likeTheVideo();
// likeTheVideo();

let view;
function likeTheVideo() {
  let called = false;
  return function () {
    if (!called) {
      view = "Deepak kashyap Liked the video";
      console.log(view);
      called = true;
    } else {
      console.log("Already called");
    }
  };
}

const fnLike = likeTheVideo();

fnLike();
fnLike();
fnLike();
fnLike();
fnLike();

// Q: There is a once method in lodash, Can you create a polyfill for that ?

function once(func, context) {
  let runner;
  return function () {
    if (func) {
      runner = func.apply(context || this, arguments);
      func = null;
    }
    return runner;
  };
}

const helloFunc = () => {
  console.log("Hello func log");
};

const helloRunner = once(helloFunc);
helloRunner(); // <- Only prints once
helloRunner();
helloRunner();
helloRunner();

// Q: Memoize polyfill, given function implement memoize

function clummyMultiply(n1, n2) {
  for (let i = 0; i < 10000000; i++) {}
  return n1 * n2;
}

// console.time("first call");
// clummyMultiply(4, 2);
// console.timeEnd("first call"); // first call: 0.827ms

function memoize(fn, context) {
  let cache = {};
  return function (...args) {
    let argCacheKey = JSON.stringify(args);
    if (cache[argCacheKey]) {
      return cache[argCacheKey];
    } else {
      let result = fn.call(context || this, ...args);
      cache[argCacheKey] = result;
      return result;
    }
  };
}

let memoMultiply = memoize(clummyMultiply);

console.time("first call");
memoMultiply(4, 2);
console.timeEnd("first call"); // first call: 4.175ms
console.time("second call");
memoMultiply(4, 2);
console.timeEnd("second call"); // second call: 0.003ms
