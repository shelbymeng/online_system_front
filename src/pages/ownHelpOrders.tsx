import { Button, PageHeader, Table, Popconfirm, message } from 'antd';
import { history } from 'umi';
import React, { useState, useEffect } from 'react';
import sessionStorageService from '@/service/sessionStorageService';
import getStudentHelpOrderService from '../service/orderService/getStudentHelpOrderService';
import IOrder from '../ts/interface/IOrder';
import cancelOrderService from '../service/orderService/cancelOrderService';
export default () => {
  const [orders, setOrders] = useState<Array<IOrder>>();
  const user = sessionStorageService.getUser().account;

  const ordersColumn = [
    {
      title: '学生学号',
      dataIndex: 'account',
      key: 'account',
      width: 100,
      fixed: true,
    },
    {
      title: '学生姓名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '求助类别',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '求助信息',
      dataIndex: 'info',
      key: 'info',
    },
    {
      title: '地点',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '发布时间',
      dataIndex: 'releaseTime',
      key: 'releaseTime',
    },
    {
      title: '期望时间',
      dataIndex: 'expectTime',
      key: 'expectTime',
    },
    {
      title: '接单状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: IOrder) => (
        <Popconfirm
          title="是否撤销"
          onConfirm={() => cancelOrder(record.orderId)}
        >
          <Button type="link">撤销</Button>
        </Popconfirm>
      ),
    },
  ];
  async function cancelOrder(orderId: string) {
    const res = await cancelOrderService({
      orderId: orderId,
      account: user,
    });
    if (res.error === 0) {
      message.success('取消成功');
      getOrders();
    }
  }
  async function getOrders() {
    const res = await getStudentHelpOrderService(user);
    if (res.error === 0) {
      setOrders(res.data);
    }
    if (res.error !== 0) {
      message.warn(res.msg);
      setOrders([]);
    }
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <PageHeader
        onBack={() => history.push('/person')}
        title="个人提交订单"
      ></PageHeader>
      <Table columns={ordersColumn} dataSource={orders}></Table>
    </div>
  );
};
