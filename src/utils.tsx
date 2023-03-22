// This is to support JSON.stringify() of BigInt values
// Stolen from stackoverflow
export function objectToString(data) {
  return JSON.stringify(JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === 'bigint'
      ? value.toString()
      : value // return everything else unchanged
  )))
}

// Turns a Cache object into an array of key-value pairs
export function getObjectKeysAndValues(obj: any) {
  console.log(obj)
  const keyValuePairs: object[] = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keyValuePairs.push({ key, value: obj[key] })
    }
  }
  return keyValuePairs
}