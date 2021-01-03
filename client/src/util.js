// Merges an array of objects into a single object
function mergeArrayObjects(arr) {
  return arr.reduce((res, item) => Object.assign(res, item));
}
