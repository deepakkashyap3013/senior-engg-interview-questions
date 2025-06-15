// this keyword js

// Implicit and explicit binding
// when function is invoked with an object using dot(.) notation, here `this` keyword will point to the object using which the func was invoked
// explicit binding is when function is ivoked using call, apply and bind, here we can pass custom context

this.a = 5;
console.log(this); // { a: 5 }
// here this refers to the global object

// behaviour of this inside normal and arrow function

let user = {
  name: "deepak",
  age: 25,
  childObject: {
    childName: "kashyap",
    getFuncChild: function () {
      console.log(this.childName, "and", this.name);
    },
  },
  getDetails: function () {
    console.log(this.name);
  },

  getDetailsArrow: () => {
    console.log(this.name);
  },

  getDetailsInsideArrowFunc() {
    const arrowFunc = () => console.log(this.name);
    arrowFunc();
  },
};

user.getDetails(); // deepak
user.getDetailsArrow(); // undefined
user.childObject.getFuncChild(); // kashyap and undefined
user.getDetailsInsideArrowFunc(); // deepak

/**
 * Concept:
 * - Normal function will only point to immediate parent or context
 * - `this` inside Arrow function will take the value from it's parent functipn (IMP), and if the parent function has some refernce to the context/object, this inside arrow function will point to that object/context
 * - In this case user.getDetailsArrow(); the arrow function doesn't has any parent function so it directly points to the global object
 */

class User {
  constructor() {
    this.name = "Deepak";
  }

  getName() {
    console.log(this.name);

    const insideArrow = () => {
      console.log(this.name);
    };

    insideArrow();
  }
}

const userObj = new User();
userObj.getName();

// Q: o/p ?

const obj1 = {
  fName: "Cynefin",
  getName() {
    const fName = "Cynefin is great";
    console.log(this.fName);
  },
};

obj1.getName(); // Cynefin

// Q: What will be the result of accessing it's ref ? Why?
function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}

let user2 = makeUser();

console.log(user2.ref.name); // undefined, as ref will point to global object as makeUser is defined on the global scope, it is not inside any object/context

// Follow up: How would you change it to print John

function makeUserCorrect() {
  return {
    name: "John",
    ref() {
      return this;
    },
  };
}

let newUser = makeUserCorrect();

console.log(newUser.ref().name); // John, now `this` is present inside a normal function and points to parent object

// Q: o/p ?

const userA = {
  name: "Deepak",
  logMessage() {
    console.log(this.name);
  },
};

setTimeout(userA.logMessage, 1000); // undefined
// Ans: Here userA.logMessage is passed as callback, basically the function is copied to the callback and the callback doesn't hold reference to parent object so it points to global object

// Follow up how would you fix ?
setTimeout(function () {
  userA.logMessage();
}, 1000); // Deepak

// Q: o/p ?

let length = 5;
function callback() {
  console.log("callback", this.length);
}

const object1 = {
  length: 10,
  method(fn) {
    fn();
  },
  method2() {
    arguments[0](); // arguments = [callback, 2, 3], and array is an object so in callback this.length will point to the property length i.e 3 in this case
  },
};

object1.method(callback); // callback 5
object1.method2(callback, 2, 3); // callback 3

// Q: Implement calc
// const result = calc.add(10).multiply(5).subtract(3).add(2);
// console.log(result.total);

const calc = {
  total: 0,
  add(v) {
    this.total += v;
    return this;
  },
  multiply(v) {
    this.total *= v;
    return this;
  },
  subtract(v) {
    this.total -= v;
    return this;
  },
};

const result = calc.add(10).multiply(5).subtract(3).add(2);
console.log(result.total); // 49
