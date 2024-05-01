import { Record } from '../types';
import { MessageTypes } from '../types';
export const startRecordHttp = () => {
  chrome.runtime.sendMessage({ type: MessageTypes.REC_START });
};

export const stopRecordHttp = () => {
  chrome.runtime.sendMessage({ type: MessageTypes.REC_STOP });
};

const toJsObjectString = (obj: unknown): string => {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      return `[${obj.map(toJsObjectString).join(', ')}]`;
    } else {
      const props = Object.keys(obj).map(key => {
        // @ts-ignore
        const value = obj[key];
        const valueString = toJsObjectString(value);
        return `${/^[a-zA-Z_$][a-zA-Z_$0-9]*$/.test(key) ? key : `'${key}'`}: ${valueString}`;
      });
      return `{${props.join(', ')}}`;
    }
  }
  // Для примитивов используем JSON.stringify для корректного представления строк и чисел
  return JSON.stringify(obj);
};

export const generateMock = (record: Record, domain: string) => {
  const url = record.url.replace(domain, '');
  const method = record.method.toUpperCase();
  try {
    const parsedBody = JSON.parse(record.responseBody);

    // @ts-ignore
    return `
      '${method} ${url}': (req, res) => {
        res.json(${toJsObjectString(parsedBody)});
      },
    `;
  } catch (error) {
    console.error(`Error parsing JSON for URL ${record.url}:`, error);
    return `
      '${method} ${url}': (req, res) => {
        res.status(500).json({ error: "Failed to parse response body" });
      },
    `;
  }
};

export const downloadMockFile = (records: Record[], domain: string) => {
  const uniqueUrls = new Set();
  const mocks = records
    .filter(record =>
      uniqueUrls.has(record.url) ? false : uniqueUrls.add(record.url),
    )
    .map(record => generateMock(record, domain))
    .join('\n');

  // Оборачиваем сгенерированные моки в module.exports
  const moduleExports = `module.exports = {\n${mocks}\n};`;

  const blob = new Blob([moduleExports], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mocks.js';
  a.click();
  URL.revokeObjectURL(url);
};
