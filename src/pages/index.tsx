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
  Col,
  Row,
} from 'antd';
import getOrderService from '../service/orderService/getOrderService';
import handleOrderInfoService from '../service/orderService/handleOrderInfoService';
import approveOrderService from '../service/orderService/approveOrderService';
import getOrderTypeService from '@/service/orderService/getOrderTypeService';
import { getUserInfoService, getAddressService } from '../service/index';
import IOrder from '../ts/interface/IOrder';
import ECategory from '../ts/enum/ECategory';
import ELocation from '../ts/enum/ELocation';
import sessionStorageService from '@/service/sessionStorageService';
import { history } from 'umi';
import IOrderType from '../ts/interface/IOrderType';
import Styles from './index.css';
import IUsers from '../ts/interface/IUsers';
import IAddress from '../ts/interface/IAddress';
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default function IndexPage() {
  const [User, setUser] = useState<IUsers>();
  const [orders, setOrders] = useState<Array<IOrder>>();
  const [visible, setVisible] = useState(false);
  const [orderType, setOrderType] = useState<Array<IOrderType>>();
  const [addressArr, setAddressArr] = useState<Array<IAddress>>();

  const [form] = Form.useForm();
  const user = sessionStorageService.getUser();
  const ACCOUNT = user && user.account;
  // const USERNAME = user.username;
  // const PHONENUMBER = user.phonenumber;

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
      width: 100,
    },
    {
      title: '期望时间',
      dataIndex: 'expectTime',
      key: 'expectTime',
      width: 100,
    },
    {
      title: '接单状态',
      dataIndex: 'state',
      key: 'state',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (text: string, record: IOrder) => (
        <Popconfirm title="是否接单" onConfirm={() => approveOrder(record)}>
          <Button type="link">接单</Button>
        </Popconfirm>
      ),
    },
  ];
  async function getAddress() {
    const addressValue = await getAddressService();
    if (addressValue.error === 0) {
      setAddressArr(addressValue.data);
    }
  }
  async function getOrderType() {
    const res = await getOrderTypeService();
    if (res && res.error === 0) {
      setOrderType(res.data);
    }
  }
  async function getUserInfo() {
    const user = await getUserInfoService(ACCOUNT);
    if (user) {
      setUser(user);
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
    console.log(`ML ~ file: index.tsx ~ line 138 ~ getOrders ~ orders`, orders);
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
      extra,
      urgency,
    } = form.getFieldsValue();
    const params = {
      account: account,
      userName: userName,
      category: category,
      info: info,
      location: location,
      releaseTime: new Date().getTime(),
      expectTime: expectTime,
      urgency: urgency,
      extra: extra,
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
    getUserInfo();
    getOrderType();
    getAddress();
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
        scroll={{ x: 1500 }}
        sticky
      ></Table>
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        title="填写求助信息"
        width={900}
      >
        <Form form={form} layout="inline" onFinish={handleSubmit} {...layout}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="account" label="学号" initialValue={ACCOUNT}>
                <Input disabled={true}></Input>
              </Form.Item>
              <Form.Item
                name="info"
                label="求助信息"
                style={{ margin: '20px 0' }}
              >
                <Input></Input>
              </Form.Item>
              <Form.Item name="extra" label="金额">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="userName"
                label="姓名"
                initialValue={User?.username}
              >
                <Input disabled={true}></Input>
              </Form.Item>
              <Form.Item
                name="location"
                label="地点"
                style={{ margin: '20px 0' }}
              >
                <Select>
                  {addressArr &&
                    addressArr.map((item) => (
                      <Option key={item.id} value={item.address}>
                        {item.address}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item name="urgency" label="紧急程度">
                <Select style={{ width: 200 }}>
                  <Option value="紧急">紧急</Option>
                  <Option value="一般">一般</Option>
                  <Option value="不急">不急</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="phonenumber"
                label="手机号"
                initialValue={User?.phonenumber}
              >
                <Input disabled={true}></Input>
              </Form.Item>
              <Form.Item
                name="category"
                label="求助类别"
                style={{ margin: '20px 0' }}
              >
                <Select style={{ width: 200 }}>
                  {orderType &&
                    orderType.map((item) => (
                      <Option value={item.orderType}>{item.orderType}</Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item name="expectTime" label="期望时间">
                <DatePicker showTime></DatePicker>
              </Form.Item>
            </Col>
            <Col span={8} style={{ marginTop: '20px' }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
