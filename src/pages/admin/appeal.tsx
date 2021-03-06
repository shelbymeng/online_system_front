import React, { useState, useEffect } from 'react';
import { PageHeader, Button, Table, Popconfirm, message } from 'antd';
import getAbnormalOrderService from '@/service/orderService/getAbnormalOrders';
import IOrder from '@/ts/interface/IOrder';
import dealAppealOrderService from '@/service/orderService/dealAppealOrderService';

export default () => {
  const [order, setOrder] = useState<Array<IOrder>>();
  const ordersColumn = [
    {
      title: '学生学号',
      dataIndex: 'account',
      key: 'account',
      fixed: 'left',
    },
    {
      title: '学生姓名',
      dataIndex: 'userName',
      key: 'userName',
      fixed: 'left',
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
      title: '费用￥',
      dataIndex: 'extra',
      key: 'extra',
      sorter: (a:IOrder, b:IOrder) => a.extra - b.extra,
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
    },
    {
      title: '申诉状态',
      dataIndex: 'appeal',
      key: 'appeal',
      fixed: 'right',
    },
    {
      title: '订单状态',
      dataIndex: 'locked',
      key: 'locked',
      fixed: 'right',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (text: string, record: IOrder) => (
        <Popconfirm
          title="是否申诉"
          onConfirm={() => finishOrder(record.orderId)}
        >
          <Button type="link">解决申诉</Button>
        </Popconfirm>
      ),
    },
  ];
  async function finishOrder(orderId: string) {
    console.log(
      `ML ~ file: appeal.tsx ~ line 69 ~ finishOrder ~ orderId`,
      orderId,
    );
    const res = await dealAppealOrderService(orderId);
    if (res && res.error === 0) {
      message.success('解决成功');
      getAbnormalOrders();
    }
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
      <PageHeader title="异常订单"></PageHeader>
      <Table
        columns={ordersColumn}
        dataSource={order}
        scroll={{ x: 1500 }}
        sticky
      ></Table>
    </div>
  );
};
