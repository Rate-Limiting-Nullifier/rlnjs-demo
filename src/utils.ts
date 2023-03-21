export function toString(data) {
  return JSON.stringify(JSON.parse(JSON.stringify(data, (key, value) =>
      typeof value === 'bigint'
          ? value.toString()
          : value // return everything else unchanged
  )));
}

type KeyValue = {
  key: string;
  value: any;
};

export function getObjectKeysAndValues(obj: Record<string, any>): KeyValue[] {
  const keyValuePairs: KeyValue[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keyValuePairs.push({ key, value: obj[key] });
    }
  }

  return keyValuePairs;
}