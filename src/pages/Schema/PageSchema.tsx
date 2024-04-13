import { Table } from 'antd';
import { getColumns } from './columns';
import { useRecords } from './hooks';

export const PageSchema = () => {
  const { records } = useRecords();
  const columns = getColumns();

  return (
    <div>
      <Table dataSource={records} columns={columns} rowKey="url" />
    </div>
  );
};
