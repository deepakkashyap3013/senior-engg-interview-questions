// Objects in js
/**
 * An object is a collection of properties, and a property is an association between a name (or key) and a value. A property's value can be a function, in which case the property is known as a method.
 */

const user = {
  name: "Deepak",
  age: 25,
};

// update
user.name = "Cynefin";

// delete
delete user.age;

// add
user.newAge = 27;

console.log(user);

// Q:
const func = (function (a) {
  delete a;
  return a;
})(5);

console.log(func); // 5; delete works only on object properties

// how to add dynamic properties

const property = "firstname";
const name1 = "Deepak";

const user1 = {
  [property]: name1,
};

console.log(user1);

// Q: what's the o/p
const obj = {
  a: "one",
  b: "two",
  a: "three",
};

console.log(obj); // { a: 'three', b: 'two' }

// Q: Create a function multiplyBy2(obj) that multiplies all numeric property values of nums by 2

let nums = {
  a: 100,
  b: 200,
  title: "My Nums",
};

function multiplyBy2(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "number") {
      obj[key] *= 2;
    }
  }
}

multiplyBy2(nums);

console.log(nums);

// Q: what's the o/p

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]); // 456

// both { key: "b" } and { key: "c" } can't be a key, so it's gets converted to a string which looks like "[object, object]"
// and ultimately same key's value is overwritten to 456

// JSON.stringify and JSON.parse ?

console.log(JSON.stringify(nums));
console.log(JSON.parse(JSON.stringify(nums)));

// Q: what's the o/p

console.log([..."Deepak"]); // [ 'D', 'e', 'e', 'p', 'a', 'k' ]

// Q:  What's the output?

const setting = {
  username: "Deepak",
  level: 10,
  health: 4,
};

const data = JSON.stringify(setting, ["level", "health"]);
console.log(data); // {"level":10,"health":4} only the specified keys are stringified

// Q: O/p?

const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => {
    return 2 * Math.PI * this.radius;
  },
};

console.log(shape.diameter); // 20
console.log(shape.perimeter); // NaN, as this inside arrow function refers to Global object

// destructuring

const user2 = {
  userName: "cynefin",
  age: 25,
  fullName: {
    firstName: "deepak",
    lastName: "kaskyap",
  },
};

const {
  userName,
  age: userAge,
  fullName: { firstName },
} = user2;

console.log(userName, userAge, firstName); // cynefin 25 deepak

// Q: Object referencing

let p = { greeting: "Hi" };
let q;

q = p;

p.greeting = "Heelo";

console.log(q.greeting); // Heelo

// Q
// This condition will always return 'false' since JavaScript compares objects by reference, not value.
console.log({ a: 1 } == { a: 1 }); // false
// console.log({ a: 1 } === { a: 1 }); // false

// Q: o/p ?

const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply(); // x is copy of value so doesn't affect the main value o/p = 20
multiply(); // 20
multiply(value); // x is a reference of value now => modifies value o/p => 20
multiply(value); // x is reference of value, now value.number = 20 so o/p => 40

// Q: o/p ?

function changeAgeAndReference(person) {
  person.age = 25; // modifies the reference's key "age"

  // creates a completely new obj in memory
  person = {
    name: "John",
    age: 50,
  };

  return person;
}

const personObj1 = {
  name: "Alex",
  age: 30,
};

const personObj2 = changeAgeAndReference(personObj1); // <- reference of personObj1 is passed in func

console.log(personObj1); // { name: 'Alex', age: 25 }
console.log(personObj2); // { name: 'John', age: 50 }

// Q: what is shallow copy and deep copy of an object ?
// - when copying an object to another variable, but it stills holds reference to the parent object then it's called shallow copy
// - deep copy -> completely new object in memory

// how to create deep copy/ clone of an object ?

let userObj = {
  name: "Deepak",
  age: 35,
};

console.log(userObj);

const deepCopy1 = Object.assign({}, userObj); // but not works with nested objects
const deepCopy2 = JSON.parse(JSON.stringify(userObj));
const deepCopy3 = { ...userObj };

console.log(deepCopy1, deepCopy2, deepCopy3);
