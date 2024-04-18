import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export const getColumns = () => {
  return [
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
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
      render: () => {
        return (
          <Button onClick={() => {}} type="primary" icon={<EyeOutlined />} />
        );
      },
    },
  ];
};
