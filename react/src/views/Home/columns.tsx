import { del } from '@/apis/student';
import { inital } from '@/store/useStudenStore';
import { Modal, Button, message } from 'antd';
import { Link } from 'react-router-dom';

const { confirm } = Modal;

function showDeleteConfirm(uuid: string) {
  confirm({
    title: 'Are you sure delete this student?',
    content: 'Once deleted, the information cannot be recovered',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      message.success('Deleted successfully');
      del(uuid).then(() => inital());
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export const columns = [
  {
    title: 'StudentId',
    dataIndex: 'studentId',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.studentId - b.studentId,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    onFilter: (value: any, record: any) => record.name.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filterMultiple: false,
    onFilter: (value: any, record: any) => record.address.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filterMultiple: false,
    onFilter: (value: any, record: any) => record.address.indexOf(value) === 0,
    sorter: (a: any, b: any) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Oprations',
    dataIndex: 'oprations',
    render: (...args:any[]) => {
      const [,record] = args
      return (
        <div className="flex items-center gap-2">
          <Link to={`/student/detail/${record.uuid}`}>
            <Button>Edit</Button>
          </Link>
          <Button
            type="primary"
            className="bg-red-500 hover:bg-red-400"
            onClick={() => showDeleteConfirm(record.uuid)}
          >
            delete
          </Button>
        </div>
      );
    },
  },
];
