import { useState } from 'react';
import { Table, Drawer, Descriptions, Typography, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { getColumns } from './columns';
import { useRecords } from './hooks';
import { downloadMockFile } from '../../utils';
import styles from './PageSchema.module.scss';

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
  const { t } = useTranslation();
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const showRecordDetails = (record: Record) => {
    setSelectedRecord(record);
  };

  const closeDrawer = () => {
    setSelectedRecord(null);
  };

  return (
    <div>
      <Table<Record>
        title={() => (
          <div className={styles.header}>
            <div className={styles.main}>
              <Button type="primary" onClick={() => downloadMockFile(records)}>
                {t('schema.actions.download')}
              </Button>
            </div>
            <div className={styles.side}>
              <Button type="dashed" onClick={console.log}>
                {t('schema.actions.settings')}
              </Button>
            </div>
          </div>
        )}
        dataSource={records}
        columns={columns}
        rowKey="url"
        onRow={record => ({
          onClick: () => showRecordDetails(record),
        })}
      />
      <Drawer
        title={t('schema.details.title')}
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
