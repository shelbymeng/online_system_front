import React, { useEffect, useState } from 'react';
import { Button, PageHeader, Table, Popconfirm, message } from 'antd';
import { history } from 'umi';
import IOrder from '../ts/interface/IOrder';
import getAbnormalOrderService from '@/service/orderService/getAbnormalOrders';

export default () => {
  const [order, setOrder] = useState<Array<IOrder>>();
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
        <Popconfirm title="是否申诉" onConfirm={() => appeal(record.orderId)}>
          <Button type="link">申诉</Button>
        </Popconfirm>
      ),
    },
  ];
  async function appeal(orderId: string) {
    console.log(
      `ML ~ file: abnormalOrders.tsx ~ line 71 ~ appeal ~ orderId`,
      orderId,
    );
  }
  async function getAbnormalOrders() {
    const res = await getAbnormalOrderService();
    if (res?.error === 0) {
      setOrder(res.data);
    }
  }
  useEffect(() => {
    getAbnormalOrders();
  }, []);
  return (
    <div>
      <PageHeader
        onBack={() => history.push('/person')}
        title="异常订单"
      ></PageHeader>
      <Table columns={ordersColumn} dataSource={order}></Table>
    </div>
  );
};
