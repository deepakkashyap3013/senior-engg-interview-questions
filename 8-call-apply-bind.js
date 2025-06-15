// call, apply and bind in js

var obj = { name: "kashyap" };

function sayHello(msg) {
  console.log("Hello " + this.name + " " + msg);
}

sayHello("Nice to meet you"); // Hello undefined Nice to meet you

// call
sayHello.call(obj, "Nice to meet you"); // Hello kashyap Nice to meet you ✅

// apply
sayHello.apply(obj, ["Nice to meet you"]); // Hello kashyap Nice to meet you ✅

// bind
const bindFunc = sayHello.bind(obj, "Nice to meet you");
bindFunc(); // Hello kashyap Nice to meet you ✅

// Q:

const age = 5;
var person = {
  name: "Cynefin",
  age: 20,
  getAge: function () {
    return this.age;
  },
};

var person2 = { age: 25 };

console.log(person.getAge.call(person2)); // 25
console.log(person.getAge.apply(person2)); // 25
console.log(person.getAge.bind(person2)()); // 25

// Q:

this.status = "😃";

setTimeout(() => {
  const status = "👍";

  const data = {
    status: "💯",
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus()); // 💯 <- here this points to data object
  console.log(data.getStatus.call(this)); // 😃 <- here this points to global obj as the callback is not inside any user defined object
}, 0);

// Q:
// call printAnimals such that it prints all animals in object

const animals = [
  { species: "Lion", name: "Kind" },
  { species: "Whale", name: "  Queen" },
];

function printAnimals(i) {
  this.print = function () {
    console.log("#" + i + " " + this.species + ": " + this.name);
  };
  this.print();
}

// observation:
// can't pass animals array as context directly, so we need to do looping over animals

for (let i = 0; i < animals.length; i++) {
  const ctx = animals[i];
  printAnimals.call(ctx, i);
}

// Q: Append an array to another array

const arr1 = ["a", "b"];
const arr2 = [0, 1, 2];

arr1.push.apply(arr1, arr2);

console.log(arr1); // [ 'a', 'b', 0, 1, 2 ]

// Q: using `apply` to enhance the built in funcitons like Math.max and Math.min
// Find max/min number in an array
// you can't use spread operator directly

const numbers = [5, 6, 2, 3, 7, 8];

const maxi = Math.max.apply(null, numbers);
console.log(maxi);

const mini = Math.min.apply(null, numbers);
console.log(mini);

// Q: o/p ?

function f() {
  console.log(this); // Ans: prints global object
}

let user = {
  g: f.bind(null),
};

user.g();

// Q: Bind chaining !!

function fn() {
  console.log(this.name);
}

fnc = fn.bind({ name: "John" }).bind({ name: "Ann" });

fnc(); // John
// There is no concept called bind chaining, once a function gets bound to an object, it doesn't change it's reference

// Q: partial application for login function

function checkPassword(ok, fail, password) {
  if (password === "call-apply-bind") ok();
  else fail();
}

let fakeuser = {
  name: "nodejs",
  login(result) {
    console.log(this.name + (result ? " login successfull" : " login failed"));
  },
};

// checkPassword(?,?,?);
checkPassword(
  fakeuser.login.bind(fakeuser, true),
  fakeuser.login.bind(fakeuser, false),
  "call-apply-bind"
);

// Explicit binding with arrow function

const age1 = 10;
var person1 = {
  age1: 20,
  getAgeArrow: () => console.log(this.age1),
  getAge: function () {
    console.log(this.age1);
  },
};

var person2 = { age1: 25 };

person1.getAge.call(person2); // 25
person1.getAgeArrow.call(person2); // undefined
// Learning: it doesn't matter if you add call, apply, bind to arrow function. it will follow the same rule as it was earlier i.e
// it takes in the context of it's parent normal function, but in this case, it doesn't have any parent normal function so it will point
// to global object

// Interesting...
// create a polyfill

let car1 = {
  color: "red",
  company: "ferrari",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price}`
  );
}

// Ref:
// purchaseCar.call(car1, "$", 20000);

// polyfill for call
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not callable");
  }

  context.fn = this;
  context.fn(...args);
};

purchaseCar.myCall(car1, "$", 20000);

// polyfill for apply
Function.prototype.myApply = function (context = {}, args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not callable");
  }

  if (!Array.isArray(args)) {
    throw new Error("arguments should be of type array");
  }

  context.fn = this;
  context.fn(...args);
};

purchaseCar.myApply(car1, ["$", 20000]);

// polyfill for bind

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " cannot be bound as it's not callable");
  }

  context.fn = this;

  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

const mypurchaseBind = purchaseCar.myBind(car1, "$", 20000);
mypurchaseBind();

// OR

const purchaseBind = purchaseCar.myBind(car1);
purchaseBind("$", 20000);
purchaseBind("$", 3000);
purchaseBind("$", 111000);
