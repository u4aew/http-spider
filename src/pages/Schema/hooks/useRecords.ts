import { useEffect, useState } from 'react';
const KEY_STORAGE = 'records';
export function useRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(KEY_STORAGE, function (result) {
      if (result.records) {
        const parsedRecords = result.records.map(
          (record: { responseBody: string }) => ({
            ...record,
            responseBody: JSON.parse(record.responseBody),
          }),
        );
        setRecords(parsedRecords);
      } else {
        console.log('No records found');
      }
    });
  }, []);

  return { records, setRecords };
}
