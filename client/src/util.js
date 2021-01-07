// Merges an array of objects into a single object
export function mergeObjectArrayToObject(arr) {
  if (arr.length === 0) {
    return {};
  }

  return arr.reduce((res, item) => Object.assign(res, item));
}
