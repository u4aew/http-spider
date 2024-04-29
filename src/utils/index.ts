import { MessageTypes } from '../types';
export const startRecordHttp = () => {
  chrome.runtime.sendMessage({ type: MessageTypes.REC_START });
};

export const stopRecordHttp = () => {
  chrome.runtime.sendMessage({ type: MessageTypes.REC_STOP });
};

export const getStore = () => {};

export const generateMock = (record: { url: string; responseBody: string }) => {
  try {
    const parsedBody = JSON.parse(record.responseBody);
    return `
      'GET ${record.url}': (req, res) => {
        res.json(${JSON.stringify(parsedBody, null, 2)});
      },
    `;
  } catch (error) {
    console.error(`Error parsing JSON for URL ${record.url}:`, error);
    return `
      'GET ${record.url}': (req, res) => {
        res.status(500).json({ error: "Failed to parse response body" });
      },
    `;
  }
};

export const downloadMockFile = (
  records: { url: string; responseBody: string }[],
) => {
  const uniqueUrls = new Set();
  const uniqueRecords = records.filter(record => {
    if (!uniqueUrls.has(record.url)) {
      uniqueUrls.add(record.url);
      return true;
    }
    return false;
  });

  const mocks = uniqueRecords.map(record => generateMock(record)).join('\n');
  const blob = new Blob([mocks], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mocks.js';
  a.click();
  URL.revokeObjectURL(url);
};
