/**
 * Map, Filter and Reduce
 */

// map
// it returns a completely new array in memory
const nums = [1, 2, 3, 4];

const multiply3 = nums.map((num, i, arr) => {
  return num * 3;
});
console.log(multiply3); // [ 3, 6, 9, 12 ]

// filter
// it returns a completely new array in memory
const moreThan2 = nums.filter((num, i, arr) => {
  return num > 2;
});

console.log(moreThan2); // [ 3, 4 ]

// reduce
// it returns a single value
const sumAll = nums.reduce((acc, curr, i, arr) => {
  return acc + curr;
}, 0);
console.log(sumAll); // 10

/**
 * NOTE: if we don't provide the initial value of accumulator, then it takes as the first ele of the array as initial value
 */

// Polyfill of map

// Ref:
// Array.map((num, i, arr) => { })

Array.prototype.myMap = function (cb) {
  let temp = [];

  // this would be the referencing array object on which map is being called
  for (let i = 0; i < this.length; i++) {
    let newValue = cb(this[i], i, this);
    temp.push(newValue);
  }

  return temp;
};

const multiply4 = nums.myMap((num, i, arr) => {
  return num * 4;
});
console.log(multiply4); // [ 4, 8, 12, 16 ]

// Polyfill of filter
// Ref:
// Array.filter((num, i, arr) => {});

Array.prototype.myFilter = function (cb) {
  let temp = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

const moreThan1 = nums.myFilter((num, i, arr) => {
  return num > 1;
});

console.log(moreThan1); // [ 2, 3, 4 ]

// Polyfill of reduce
// Ref:
// Array.reduce((acc, curr, i, arr) => {}, initialValue);

Array.prototype.myReduce = function (cb, initialValue) {
  let result = initialValue ?? this[0];

  for (let i = 0; i < this.length; i++) {
    result = cb(result, this[i], i, this);
  }

  return result;
};

const mulAll = nums.myReduce((acc, curr, i, arr) => {
  return acc * curr;
}, 1);
console.log(mulAll);

/**
 * Question
 */

// 1 map vs forEach
/**
 * - Map returns a new array, whereas forEach is used for iteration only doesn't return a new array
 * - We can chain stuffs on map, whereas it's not possible in case of forEach
 */

// 2 operation questions
let students = [
  { name: "Piyush", rollNo: 31, marks: 80 },
  { name: "Deepak", rollNo: 15, marks: 69 },
  { name: "Kaushal", rollNo: 16, marks: 35 },
  { name: "Dilpreet", rollNo: 7, marks: 55 },
];

// Return the names of students with capital letters

const names = students.map((obj, i, arr) => {
  return obj.name.toUpperCase();
});
console.log(names);

// Return only details who scored more than 60 marks

const moreThan60 = students.filter((e, i, arr) => e.marks > 60);
console.log(moreThan60);

// More than 60 marks and roll no gt 15

const result1 = students.filter((e, i, arr) => e.marks > 60 && e.rollNo > 15);
console.log(result1);

// sum of marks of all students

const sumMarks = students.reduce((acc, curr, i, arr) => {
  return acc + curr.marks;
}, 0);
console.log(sumMarks);

// Return only names students who scored more than 60

const result2 = students
  .filter((v, i, arr) => {
    return v.marks > 60;
  })
  .map((v, i, arr) => {
    return v.name.toUpperCase();
  });

console.log(result2);

// Return total marks of students with mark > 60 after adding 20 marks more those who scored less than 60

const totalMarks = students
  .map((e, i, arr) => {
    if (e.marks < 60) {
      e.marks += 20;
    }
    return e;
  })
  .filter((v, i, arr) => {
    return v.marks > 60;
  })
  .reduce((acc, curr, i, arr) => {
    return acc + curr.marks;
  }, 0);

console.log(totalMarks);
