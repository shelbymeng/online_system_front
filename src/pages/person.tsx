import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Modal,
  PageHeader,
  Descriptions,
  Form,
  Input,
  message,
} from 'antd';
import { history } from 'umi';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import sessionStorageService from '@/service/sessionStorageService';
import { getUserInfoService, updateUserInfoService } from '../service/index';
import IUsers from '@/ts/interface/IUsers';
export default () => {
  const [User, setUser] = useState<IUsers>();
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const user = sessionStorageService.getUser();
  const ACCOUNT = user.account;
  function logout() {
    sessionStorage.clear();
    history.push('/login');
  }
  async function getUserInfo() {
    const user = await getUserInfoService(ACCOUNT);
    if (user) {
      setUser(user);
    }
  }
  async function handleSubmit(params: IUsers) {
    const res = await updateUserInfoService(params);
    if (res?.error === 0) {
      message.success('修改成功');
      getUserInfo();
      setVisible(false);
    }
  }
  function onCancel() {
    setVisible(false);
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div>
      <PageHeader title="个人中心"></PageHeader>
      <Card style={{ marginBottom: 20 }}>
        <Descriptions>
          <Descriptions.Item label="学号">{User?.account}</Descriptions.Item>
          <Descriptions.Item label="姓名">{User?.username}</Descriptions.Item>
          <Descriptions.Item label="手机号">
            {User?.phonenumber}
          </Descriptions.Item>
          <Descriptions.Item label="地址">{User?.address}</Descriptions.Item>
          <Descriptions.Item label="余额">{User?.balance}</Descriptions.Item>
        </Descriptions>
        <Button onClick={() => setVisible(true)}>修改</Button>
        <Button onClick={logout}>退出</Button>
      </Card>
      <Button onClick={() => history.push('/person/ownHelpOrders')}>
        个人提交订单
      </Button>
      <Button onClick={() => history.push('/person/ownApproveHelpOrders')}>
        个人接单
      </Button>
      <Button onClick={() => history.push('/person/abnormalOrders')}>
        异常订单
      </Button>
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        title="个人信息修改"
      >
        <Form form={form} layout="inline" onFinish={handleSubmit}>
          <Form.Item
            name="account"
            label="学号"
            initialValue={User?.account}
            style={{ marginBottom: 15 }}
          >
            <Input disabled={true}></Input>
          </Form.Item>
          <Form.Item
            name="username"
            label="姓名"
            initialValue={User?.username}
            style={{ marginBottom: 15 }}
          >
            <Input disabled={true}></Input>
          </Form.Item>
          <Form.Item
            name="phonenumber"
            label="手机号"
            initialValue={User?.phonenumber}
            style={{ marginBottom: 15 }}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            initialValue={User?.address}
            style={{ marginBottom: 15 }}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="balance"
            label="余额"
            initialValue={User?.balance}
            style={{ marginBottom: 15 }}
          >
            <Input disabled={true}></Input>
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
};
