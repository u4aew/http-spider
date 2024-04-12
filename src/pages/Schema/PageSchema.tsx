import { useEffect, useState } from 'react';
import { Table } from 'antd';

export const PageSchema = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    chrome.storage.local.get('records', function (result) {
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

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Response',
      dataIndex: 'responseBody',
      key: 'responseBody',
      render: (text: never) => <pre>{JSON.stringify(text, null, 2)}</pre>,
    },
  ];

  return (
    <div>
      {/*@ts-ignore*/}
      <Table dataSource={records} columns={columns} rowKey="url" />
    </div>
  );
};
