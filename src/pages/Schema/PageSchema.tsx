import { useState } from 'react';
import { Table, Drawer, Descriptions, Typography, Button } from 'antd';
import { getColumns } from './columns';
import { useRecords } from './hooks';

const { Paragraph, Text } = Typography;

interface Record {
  url: string;
  method: string;
  status: number;
  statusText: string;
  dateTime: string;
  duration: number;
  responseSize: number;
  type: string;
  responseBody: string;
  requestBody: string;
  responseHeaders: string;
}

export const PageSchema = () => {
  const { records } = useRecords();
  const columns = getColumns();

  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const showRecordDetails = (record: Record) => {
    setSelectedRecord(record);
  };

  const closeDrawer = () => {
    setSelectedRecord(null);
  };

  const generateMock = (record: { url: string; responseBody: string }) => {
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

  const downloadMockFile = (
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
  return (
    <div>
      <Button type="primary" onClick={() => downloadMockFile(records)}>
        Download Mocks
      </Button>
      <Table<Record>
        dataSource={records}
        columns={columns}
        rowKey="url"
        onRow={record => ({
          onClick: () => showRecordDetails(record),
        })}
      />
      <Drawer
        title="Record Details"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        open={selectedRecord !== null}
        width={1000}
      >
        {selectedRecord && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="URL">
              {selectedRecord.url}
            </Descriptions.Item>
            <Descriptions.Item label="Method">
              {selectedRecord.method}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {selectedRecord.status}
            </Descriptions.Item>
            <Descriptions.Item label="Status Text">
              {selectedRecord.statusText}
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {selectedRecord.dateTime}
            </Descriptions.Item>
            <Descriptions.Item label="Duration">
              {selectedRecord.duration} ms
            </Descriptions.Item>
            <Descriptions.Item label="Response Size">
              {selectedRecord.responseSize} bytes
            </Descriptions.Item>
            <Descriptions.Item label="Type">
              {selectedRecord.type}
            </Descriptions.Item>
            <Descriptions.Item label="Response Body">
              <Paragraph>
                <Text code>
                  {selectedRecord.responseBody.replace(/\r\n/g, ', ')}
                </Text>
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Response Headers">
              <Paragraph>
                <Text>
                  {selectedRecord.responseHeaders.replace(/\r\n/g, ', ')}
                </Text>
              </Paragraph>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};
