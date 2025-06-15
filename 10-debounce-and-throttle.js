// Debounce and Throttle:
// check here: https://web.archive.org/web/20220117092326/http://demo.nimius.net/debounce_throttle/

// Debounce polyfill
function myDebounce(cb, delay) {
  let timer;

  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
/*

Usage:
const handleSearch = myDebounce((value) => {
  if (get(fetchData, "search") !== value.trim()) {
    setFetchData({ search: value.trim(), page: 1 });
  }
}, 500);

const handleBlurSearch = (e) => {
  handleSearch(e.target.value);
};
*/

// Throttle polyfill

function myThrottle(cb, delay) {
  let last = 0;

  return (...args) => {
    let now = new Date().getTime();

    if (now - last < delay) return;

    last = now;
    cb(...args);
  };
}
