import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

type Props = {
  showRecordDetails: (record: Record<never, never>) => void;
};

export const getColumns = ({ showRecordDetails }: Props) => {
  return [
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (_: never, record: Record<never, never>) => {
        // @ts-ignore
        return <div className="record-details">{record?.url}</div>;
      },
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'dateTime',
      key: 'dateTime',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_: never, record: Record<never, never>) => {
        return (
          <Button
            // ts-ignore
            onClick={() => {
              showRecordDetails(record);
            }}
            type="primary"
            icon={<EyeOutlined />}
          />
        );
      },
    },
  ];
};
