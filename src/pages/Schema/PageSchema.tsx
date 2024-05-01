import { useState } from 'react';
import { Table, Drawer, Descriptions, Typography, Button, Input } from 'antd';
import { Record } from '../../types';
import { useTranslation } from 'react-i18next';
import { getColumns } from './columns';
import { useRecords } from './hooks';
import { downloadMockFile } from '../../utils';
import styles from './PageSchema.module.scss';

const { Paragraph, Text } = Typography;

export const PageSchema = () => {
  const [domain, setDomain] = useState('');
  const { records } = useRecords();
  const showRecordDetails = (record: Record) => {
    setSelectedRecord(record);
  };
  // @ts-ignore
  const columns = getColumns({ showRecordDetails });
  const { t } = useTranslation();
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const onDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
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
              <div className={styles.actions}>
                <div className={styles.item}>
                  <Button
                    type="primary"
                    onClick={() => downloadMockFile(records, domain)}
                  >
                    {t('schema.actions.download')}
                  </Button>
                </div>
                <div className={styles.item}>
                  <Input
                    onChange={onDomainChange}
                    placeholder={t('schema.domain.placeholder')}
                  ></Input>
                </div>
              </div>
            </div>
            <div className={styles.side}>
              <Button disabled={true} type="dashed" onClick={console.log}>
                {t('schema.actions.settings')} (soon)
              </Button>
            </div>
          </div>
        )}
        dataSource={records}
        //@ts-ignore
        columns={columns}
        rowKey="url"
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
