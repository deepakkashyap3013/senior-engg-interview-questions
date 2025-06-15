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

// How you gonna run it correctlly ?

console.log("start");

function importantAction(username, cb) {
  setTimeout(() => {
    cb(`Subscribe to ${username}`);
  }, 0);
}

function likeTheVideo(video, cb) {
  setTimeout(() => {
    cb(`Like the ${video}`);
  }, 0);
}

function shareTheVideo(video, cb) {
  setTimeout(() => {
    cb(`Share the ${video}`);
  }, 0);
}

importantAction("Deepak", (msg) => {
  console.log(msg);
  likeTheVideo("Javascript interview question notes", (action) => {
    console.log(action);
    shareTheVideo("Javascript interview question notes", (action) => {
      console.log(action);
    });
  });
});

console.log("stop");

/*
start
stop
Subscribe to Deepak
Like the Javascript interview question notes
Share the Javascript interview question notes
*/

/*
The blow code block is called callback hell and creates difficulty in reading and understanding code because of deep nesting
so promises have a better syntax through then and catch

bdw this is also called as "pyramid of doom"

importantAction("Deepak", (msg) => {
  console.log(msg);
  likeTheVideo("Javascript interview question notes", (action) => {
    console.log(action);
    shareTheVideo("Javascript interview question notes", (action) => {
      console.log(action);
    });
  });
});
*/
