// Promise, callbacks, sync and async code in js

// The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

/*
A Promise is in one of these states:
pending: initial state, neither fulfilled nor rejected.
fulfilled: meaning that the operation was completed successfully.
rejected: meaning that the operation failed.
*/

// Sync vs Async code
// Synchronous code executes sequentially, meaning each instruction waits for the previous one to complete before proceeding.
// Asynchronous code, on the other hand, allows multiple tasks to run concurrently, without waiting for each other to finish.
// In Javascript, first all sync code gets executed then async code get's the chance to enter the callstack to get executed

// Sync
// console.log("sync start");
// console.log("sync code is getting executed");
// console.log("sync end");

/* o/p:
sync start
sync code is getting executed
sync end
*/

// Async
// console.log("async start");
// setTimeout(() => {
//   console.log("async code now got executed");
// }, 0);
// console.log("async code end");

/* o/p:
async start
async code end
async code now got executed
*/

console.log("start");
function importantAction(username) {
  setTimeout(() => {
    return `Subscribe to ${username}`;
  }, 0);
}
const msg = importantAction("Deepak");

console.log(msg);

console.log("stop");

/*
start
undefined
stop
*/
