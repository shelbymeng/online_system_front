import React, { useState, useEffect } from 'react';
import { getUserService, setUserStatusService } from '@/service/index';
import IUsers from '../../ts/interface/IUsers';
import { Table, Popconfirm, Button, PageHeader, message } from 'antd';
export default () => {
  const [users, setUsers] = useState<Array<IUsers>>();
  const columns = [
    {
      title: '学生学号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '学生姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '账户余额',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: '账户状态',
      dataIndex: 'locked',
      key: 'locked',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: string, record: IUsers) => (
        <Popconfirm
          title={`是否${record.locked === '冻结' ? '启用' : '禁用'}用户`}
          onConfirm={() => lockUser(record)}
        >
          <Button type="link">
            {record.locked === '冻结' ? '启用' : '禁用'}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  async function getUsers() {
    const res = await getUserService();
    if (res && res.error === 0) {
      setUsers(res.data);
    }
  }
  async function lockUser(params: IUsers) {
    console.log(params);
    const param = {
      ...params,
      locked: params.locked === '冻结' ? '正常' : '冻结',
    };
    const res = await setUserStatusService(param);
    if (res && res.error === 0) {
      message.success('操作成功');
      await getUsers();
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <PageHeader title="用户管理"></PageHeader>
      <Table dataSource={users} columns={columns}></Table>
    </div>
  );
};
