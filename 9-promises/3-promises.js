// Basic example of promise:

console.log("Start");

const starred = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = true;
    if (result) resolve("Starred this repo");
    else reject("Failed to star this repo");
  }, 1000);
});

starred
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("End");

// Q: How you gonna refactor the below code using promises ?

// console.log("start");

// function importantAction(username, cb) {
//   setTimeout(() => {
//     cb(`Subscribe to ${username}`);
//   }, 0);
// }

// function likeTheVideo(video, cb) {
//   setTimeout(() => {
//     cb(`Like the ${video}`);
//   }, 0);
// }

// function shareTheVideo(video, cb) {
//   setTimeout(() => {
//     cb(`Share the ${video}`);
//   }, 0);
// }

// importantAction("Deepak", (msg) => {
//   console.log(msg);
//   likeTheVideo("Javascript interview question notes", (action) => {
//     console.log(action);
//     shareTheVideo("Javascript interview question notes", (action) => {
//       console.log(action);
//     });
//   });
// });

// console.log("stop");

console.log("start");

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

// Approach 1:

importantAction("Deepak")
  .then((res) => {
    console.log(res);

    likeTheVideo("Javascript interview question notes")
      .then((res) => {
        console.log(res);

        shareTheVideo("Javascript interview question notes")
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

// WOOOWWW!! this is again a pyramid like structure...
// How can we resolve it
// Now we will see promise chaining...

// Approach 2:

importantAction("Deepak")
  .then((res) => {
    console.log(res);
    return likeTheVideo("Javascript interview question notes");
  })
  .then((res) => {
    console.log(res);
    return shareTheVideo("Javascript interview question notes");
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

// Approach 3:  promise combinator

// Either all promise gets resovled or if any one promise rejected then all promises gets rejected
Promise.all([
  importantAction("Deepak"),
  likeTheVideo("Javascript interview question notes"),
  shareTheVideo("Javascript interview question notes"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log("error: " + err));

// Prints only the promise that got resolved first
Promise.race([
  importantAction("Deepak"),
  likeTheVideo("Javascript interview question notes"),
  shareTheVideo("Javascript interview question notes"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

// Continues to return the resolved and rejected promise
Promise.allSettled([
  importantAction("Deepak"),
  likeTheVideo("Javascript interview question notes"),
  shareTheVideo("Javascript interview question notes"),
])
  .then((res) => {
    for (const p of res) {
      if (p.status == "fulfilled") {
        console.log(p.value);
      }

      if (p.status == "rejected") {
        console.log("Rejected: promise got rejected ❌");
      }
    }
  })
  .catch((err) => console.log(err));

// promise.any
Promise.any([
  importantAction("Deepak"),
  likeTheVideo("Javascript interview question notes"),
  shareTheVideo("Javascript interview question notes"),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log("error: " + err));

/*
Difference between Promise.race vs Promise.any
- Promise.race returns a new promise that settles (either resolves or rejects) as soon as any of the promises in the input iterable settles. (Settles with the first settled promise)
- Promise.any returns a new promise that fulfills as soon as the first promise in the iterable fulfills (resolves with a value) (Fulfills with the first fulfilled promise). 
*/

// Approach 4: More modern way of handling promises
// async/await

const result = async () => {
  try {
    const msg1 = await importantAction("Deepak");
    const msg2 = await likeTheVideo("Javascript interview question notes");
    const msg3 = await shareTheVideo("Javascript interview question notes");

    console.log("async/await function called---------");
    console.log(msg1);
    console.log(msg2);
    console.log(msg3);
    console.log("async/await function call end---------");
  } catch (error) {
    console.log("Error: " + err);
  }
};

result();

console.log("stop");
