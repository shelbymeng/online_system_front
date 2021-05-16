import React, { useState, useEffect } from 'react';
import {
  PageHeader,
  List,
  Button,
  Table,
  Divider,
  Modal,
  Input,
  message,
  Popconfirm,
} from 'antd';
import IOrderType from '../../ts/interface/IOrderType';
import getOrderTypeService from '@/service/orderService/getOrderTypeService';
import getAllOrderService from '../../service/orderService/getAllOrders';
import sessionStorageService from '@/service/sessionStorageService';
import setOrderTypeService from '@/service/orderService/setOrderTypeService';
import { history } from 'umi';
import IOrder from '../../ts/interface/IOrder';
import deleteOrderTypeService from '@/service/orderService/deleteOrderTypeService';
import lockOrderService from '@/service/orderService/lockOrderService';

const { Item } = List;
export default () => {
  const [orderType, setOrderType] = useState<Array<IOrderType>>();
  const [orders, setOrders] = useState<Array<IOrder>>();
  const [listVisible, setListVisible] = useState<boolean>(false);
  const [type, setType] = useState('');
  const user = sessionStorageService.getUser();

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
    },
    {
      title: '订单状态',
      dataIndex: 'locked',
      key: 'locked',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (text: string, record: IOrder) => (
        <Popconfirm
          title="是否冻结订单"
          onConfirm={() => abnormalOrder(record.orderId)}
        >
          <Button type="link">冻结</Button>
        </Popconfirm>
      ),
    },
  ];
  async function abnormalOrder(orderId: string) {
    console.log(
      `ML ~ file: orderManager.tsx ~ line 90 ~ abnormalOrder ~ orderId`,
      orderId,
    );
    const res = await lockOrderService(orderId);
    if (res?.error === 0) {
      message.success('冻结成功');
      getOrders();
    }
  }
  async function setOrderTypefun(orderType: string) {
    const res = await setOrderTypeService(orderType);
    if (res?.error === 0) {
      message.success('添加成功');
      getOrderType();
      setListVisible(false);
    }
  }
  async function delectOrderType(id: number) {
    const res = await deleteOrderTypeService(id);
    if (res && res.error === 0) {
      message.success('删除成功');
      getOrderType();
    }
  }
  async function getOrderType() {
    const ordertype = await getOrderTypeService();
    if (ordertype?.error === 0) {
      setOrderType(ordertype.data);
    }
  }
  async function getOrders() {
    if (!user) {
      history.push('/login');
      return;
    }
    const orders = await getAllOrderService();
    if (orders.data && orders.data.length !== 0) {
      setOrders(orders.data);
    }
  }
  function onCancel() {
    setListVisible(false);
  }
  useEffect(() => {
    getOrders();
    getOrderType();
  }, []);
  return (
    <div>
      <PageHeader title="订单管理"></PageHeader>
      <Divider orientation="left">订单查看</Divider>
      <Table
        columns={ordersColumn}
        dataSource={orders}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 1500 }}
        sticky
      ></Table>
      <Divider orientation="left">订单类型</Divider>
      <List
        header={
          <div>
            <Button type="primary" onClick={() => setListVisible(true)}>
              添加
            </Button>
          </div>
        }
        pagination={{ pageSize: 5 }}
        dataSource={orderType}
        renderItem={(item) => (
          <Item
            extra={
              <div>
                <Popconfirm
                  title="是否删除"
                  onConfirm={() => delectOrderType(item.id)}
                >
                  <Button type="link">删除</Button>
                </Popconfirm>
              </div>
            }
          >
            {item.orderType}
          </Item>
        )}
      >
        <Modal
          visible={listVisible}
          onCancel={onCancel}
          footer={null}
          title="订单类型配置"
        >
          <Input
            placeholder="填写订单类型"
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></Input>
          <Button
            type="primary"
            style={{ marginTop: 20 }}
            onClick={() => setOrderTypefun(type)}
          >
            保存
          </Button>
        </Modal>
      </List>
    </div>
  );
};
