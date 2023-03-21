import React from 'react'
/*
This whole file is just to make to the cache object store into a pretty list
ChatGPT4 wrote this, its pretty verbose but it works
*/
interface KeyValueProps {
  keyValuePair: {
    key: string;
    value: any;
  };
}

const KeyValuePair: React.FC<KeyValueProps> = ({ keyValuePair }) => {
  return (
    <li>
      <strong>{keyValuePair.key}:</strong> {keyValuePair.value}
    </li>
  );
};

type KeyValue = {
  key: string;
  value: any;
};

function getObjectKeysAndValues(obj: Record<string, any>): KeyValue[] {
  const keyValuePairs: KeyValue[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keyValuePairs.push({ key, value: obj[key] });
    }
  }

  return keyValuePairs;
}

interface KeyValueListProps {
  obj: Record<string, any>;
}

export const KeyValueList: React.FC<KeyValueListProps> = ({ obj }) => {
  const keyValuePairs = getObjectKeysAndValues(obj);

  return (
    <ul>
      {keyValuePairs.map((pair, index) => (
        <KeyValuePair key={index} keyValuePair={pair} />
      ))}
    </ul>
  );
};