import React, { useState, useEffect } from 'react';
import { Table, PageHeader, Popconfirm, Button, message } from 'antd';
import { history } from 'umi';
import sessionStorageService from '@/service/sessionStorageService';
import getStudentApproveOrderService from '../service/orderService/getStudentApproveOrderService';
import IOrder from '../ts/interface/IOrder';
import cancelApproveOrderService from '../service/orderService/cancelApproveOrderService';
import finishOrderService from '../service/orderService/finishOrderService';
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
      width: 220,
      fixed: 'right',
      render: (text: string, record: IOrder) => (
        <div>
          <Popconfirm
            title="是否取消接单"
            onConfirm={() => cancelApproveOrder(record)}
          >
            <Button type="link">取消接单</Button>
          </Popconfirm>
          <Popconfirm
            title="是否完成接单"
            onConfirm={() => finishOrder(record)}
          >
            <Button type="link">完成接单</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  async function finishOrder(params: IOrder) {
    const res = await finishOrderService({
      account: params.account,
      orderId: params.orderId,
      helperAccount: params.helperAccount!,
      finishTime: new Date().getTime(),
      extra: params.extra,
    });
    if (res.error !== 0) {
      message.error('完成订单失败');
    }
    if (res.error === 0) {
      message.success('完成订单');
      getOrders();
    }
  }
  async function cancelApproveOrder(params: IOrder) {
    const res = await cancelApproveOrderService(params.orderId);
    if (res.error !== 0) {
      message.error('撤销失败');
    }
    if (res.error === 0) {
      message.success('撤销成功');
      getOrders();
    }
  }
  async function getOrders() {
    const res = await getStudentApproveOrderService(user);
    if (res.error === 0 && res.data.length !== 0) {
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
        title="个人接单"
        onBack={() => history.push('/person')}
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
