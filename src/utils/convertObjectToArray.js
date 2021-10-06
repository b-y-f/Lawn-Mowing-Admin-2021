export function convertOccurrenceObjToArray(obj) {
  return Object.keys(obj).map((singleKey) => ({
    name: singleKey,
    number: obj[singleKey]
  }));
}
