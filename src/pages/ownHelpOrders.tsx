import { Button, PageHeader, Table, Popconfirm, message } from 'antd';
import { history } from 'umi';
import React, { useState, useEffect } from 'react';
import sessionStorageService from '@/service/sessionStorageService';
import getStudentHelpOrderService from '../service/orderService/getStudentHelpOrderService';
import IOrder from '../ts/interface/IOrder';
import cancelOrderService from '../service/orderService/cancelOrderService';
import userAppealOrderService from '@/service/orderService/userAppealOrderService';
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
      width: 100,
      fixed: true,
    },
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 200,
    },
    {
      title: '求助类别',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: '求助信息',
      dataIndex: 'info',
      key: 'info',
      width: 100,
    },
    {
      title: '地点',
      dataIndex: 'location',
      key: 'location',
      width: 100,
    },
    {
      title: '费用￥',
      dataIndex: 'extra',
      key: 'extra',
      sorter: (a: IOrder, b: IOrder) => a.extra - b.extra,
      width: 100,
    },
    {
      title: '发布时间',
      dataIndex: 'releaseTime',
      key: 'releaseTime',
      width: 200,
    },
    {
      title: '期望时间',
      dataIndex: 'expectTime',
      key: 'expectTime',
      width: 200,
    },
    {
      title: '接单状态',
      dataIndex: 'state',
      key: 'state',
      width: 100,
    },
    {
      title: '申诉状态',
      dataIndex: 'appeal',
      key: 'appeal',
      width: 100,
    },
    {
      title: '订单状态',
      dataIndex: 'locked',
      key: 'locked',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (text: string, record: IOrder) => (
        <div style={{ display: 'flex' }}>
          <Popconfirm
            title="是否撤销"
            onConfirm={() => cancelOrder(record.orderId)}
          >
            <Button type="link">撤销</Button>
          </Popconfirm>
          <Popconfirm title="是否申诉" onConfirm={() => appeal(record.orderId)}>
            <Button type="link">申诉</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  async function appeal(orderId: string) {
    console.log(
      `ML ~ file: ownHelpOrders.tsx ~ line 83 ~ appeal ~ orderId`,
      orderId,
    );
    const res = await userAppealOrderService(orderId);
    if (res && res.error === 0) {
      message.success('申诉成功');
      getOrders();
    }
  }
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
      <Table
        columns={ordersColumn}
        dataSource={orders}
        scroll={{ x: 1500 }}
        sticky
      ></Table>
    </div>
  );
};
