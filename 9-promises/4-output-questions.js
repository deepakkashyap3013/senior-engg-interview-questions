// 1. Q

console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
  console.log(3);
});

promise1.then((res) => {
  console.log(res);
});

console.log("end");

/*
o/p:
start
1
3
end
2
*/

/**
 * Concepts:
 * - Rem -> first all sync code then async code
 * - while initializing promise, we execute all the sync code that is why 1 and 3 are printed first
 * - and when we do .then(()=> {...}) then asyn code gets triggered and prints 2
 */

// 2. Q (variation of q1)

console.log("start");

const promise2 = new Promise((resolve, reject) => {
  console.log(1);
  console.log(3);
});

promise2.then((res) => {
  console.log("result is");
});

console.log("end");

/*
o/p:
start
1
3
end
*/

/**
 * Concepts:
 * - since in this case no resolve statement is there inside promise initialization, .then(()=>{...}) will not at all work
 */

// 3. Q

console.log("start");

const fn = () =>
  new Promise((resolve, reject) => {
    console.log(1);
    resolve("fn success");
  });

console.log("middle");

fn().then((res) => {
  console.log(res);
});

console.log("end");

/*
o/p:
start
middle
1
end
success
*/

// 4. Q

function job(state) {
  return new Promise((res, rej) => {
    if (state) {
      res("success");
    } else {
      rej("error");
    }
  });
}

let promise = job(true); // resolve("success")

promise
  .then((data) => {
    console.log(data); // success
    return job(true);
  })
  .then((data) => {
    if (data !== "victory") {
      throw "Defeat";
    }
    return job(true);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err); // Defeat
    return job(false);
  })
  .then((data) => {
    console.log(data);
    return job(true);
  })
  .catch((err) => {
    console.log(err); // error
    return "Error caught"; // <- it's resolved
  })
  .then((data) => {
    console.log(data); // Error caught
    return new Error("test"); // <- it's not a reject, rather it's a Error object which hasn't been thrown
  })
  .then((data) => {
    console.log("Success:", data.message); // Success: test
  })
  .catch((data) => {
    console.log("Error:", data.message);
  });

/*
o/p:
success
Defeat
error
Error caught
Success: test
*/

// 5. Q:
/**
 * Create a firstPromise that will resolve to a text "first", then create a secondPromise which will resolve our firstPromis, then
 * resolve secondPromise and output of which will be passed to the firstPromise and then print the firstPromise
 */

const firstPromise = new Promise((res, rej) => {
  res("first!!");
});

const secondPromise = new Promise((res, rej) => {
  res(firstPromise);
});

secondPromise
  .then((res) => {
    return res;
  })
  .then((msg) => {
    console.log(msg);
  });

/*
o/p:
first!!
*/

// 6. Q
// Solve promises recursively

// Given 3 promises, resolve them recursively

function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Subscribe to ${username}`);
    }, 0);
  });
}

function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Like the ${video}`);
    }, 500);
  });
}

function shareTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Share the ${video}`);
    }, 1000);
  });
}

function promRecursive(funcPromises) {
  // write your logic here!

  if (funcPromises.length === 0) return;

  let currPromise = funcPromises.shift();

  console.log(currPromise);

  currPromise.then((res) => console.log(res)).catch((err) => console.log(err));

  promRecursive(funcPromises);
}

promRecursive([
  importantAction("deepak"),
  likeTheVideo("JS interview questions"),
  shareTheVideo("JS interview questions"),
]);
