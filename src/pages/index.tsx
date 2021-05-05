import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  message,
  DatePicker,
  Popconfirm,
  PageHeader,
} from 'antd';
import getOrderService from '../service/orderService/getOrderService';
import handleOrderInfoService from '../service/orderService/handleOrderInfoService';
import approveOrderService from '../service/orderService/approveOrderService';
import getOrderTypeService from '@/service/orderService/getOrderTypeService';
import IOrder from '../ts/interface/IOrder';
import ECategory from '../ts/enum/ECategory';
import ELocation from '../ts/enum/ELocation';
import sessionStorageService from '@/service/sessionStorageService';
import { history } from 'umi';
import IOrderType from '../ts/interface/IOrderType';
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default function IndexPage() {
  const [orders, setOrders] = useState<Array<IOrder>>();
  const [visible, setVisible] = useState(false);
  const [orderType, setOrderType] = useState<Array<IOrderType>>();
  const [form] = Form.useForm();
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
        <Popconfirm title="是否接单" onConfirm={() => approveOrder(record)}>
          <Button type="link">接单</Button>
        </Popconfirm>
      ),
    },
  ];
  async function getOrderType() {
    const res = await getOrderTypeService();
    if (res && res.error === 0) {
      setOrderType(res.data);
    }
  }
  async function approveOrder(params: IOrder) {
    const approveRes = await approveOrderService({
      ...params,
      helperAccount: user.account,
      helper: user.username,
    });
    if (approveRes.error === 0) {
      message.success('接单成功');
      getOrders();
    }
  }
  async function getOrders() {
    if (!user) {
      history.push('/login');
      return;
    }
    const orders = await getOrderService(user.account);
    if (orders.data && orders.data.length !== 0) {
      setOrders(orders.data);
    }
  }
  async function handleSubmit() {
    const {
      account,
      userName,
      category,
      info,
      location,
      expectTime,
    } = form.getFieldsValue();
    const params = {
      account: account,
      userName: userName,
      category: category,
      info: info,
      location: location,
      releaseTime: new Date().getTime(),
      expectTime: expectTime,
    };
    const res = await handleOrderInfoService(params);
    if (res.error !== 0) {
      message.error('提交失败');
    }
    if (res.error === 0) {
      message.success('提交成功');
      getOrders();
    }
    setVisible(false);
  }
  function onCancel() {
    setVisible(false);
  }
  useEffect(() => {
    getOrders();
    getOrderType();
  }, []);
  return (
    <div>
      <PageHeader title="求助广场"></PageHeader>
      <Button type="primary" onClick={() => setVisible(true)}>
        发布求助
      </Button>
      <Table
        columns={ordersColumn}
        dataSource={orders}
        pagination={{ pageSize: 5 }}
      ></Table>
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        title="填写求助信息"
        width={900}
      >
        <Form form={form} layout="inline" onFinish={handleSubmit} {...layout}>
          <Form.Item name="account" label="学号">
            <Input></Input>
          </Form.Item>
          <Form.Item name="userName" label="姓名">
            <Input></Input>
          </Form.Item>
          <Form.Item name="category" label="求助类别">
            <Select style={{ width: 200 }}>
              {orderType &&
                orderType.map((item) => (
                  <Option value={item.orderType}>{item.orderType}</Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="info" label="求助信息">
            <Input></Input>
          </Form.Item>
          <Form.Item name="location" label="地点">
            <Select style={{ width: 200 }}>
              <Option value={ELocation.NORTH}>北区</Option>
              <Option value={ELocation.SOUTH}>南区</Option>
            </Select>
          </Form.Item>
          <Form.Item name="expectTime" label="期望时间">
            <DatePicker showTime></DatePicker>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
