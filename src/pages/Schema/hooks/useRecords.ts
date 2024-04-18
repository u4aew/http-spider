import { useEffect, useState } from 'react';
const KEY_STORAGE = 'records';
export function useRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(KEY_STORAGE, function (result) {
      if (result.records) {
        console.log(JSON.stringify(result.records));
        setRecords(result.records);
      } else {
        console.log('No records found');
      }
    });
  }, []);
  return { records, setRecords };
}
