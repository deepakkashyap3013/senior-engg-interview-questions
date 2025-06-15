//  TODO: Promise polyfill

// Promise.all polyfill:
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

Promise.allPolyfill = function (promises) {
  return new Promise((resolve, reject) => {
    let result = [];

    if (!promises.length) {
      resolve(result);
      return;
    }

    let pending = promises.length;

    promises.forEach((promise, idx) => {
      Promise.resolve(promise).then((res) => {
        result[idx] = res;

        pending--;

        if (pending === 0) {
          resolve(result);
        }
      }, reject);
    });
  });
};

Promise.allPolyfill([
  importantAction("Deepak"),
  likeTheVideo("Javascript interview question notes"),
  shareTheVideo("Javascript interview question notes"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error("ERROR: ", err));
