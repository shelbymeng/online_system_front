import React from 'react';
import { history } from 'umi';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
export default () => {
  return (
    <div>
      <Sider style={{ height: '100%' }} breakpoint="lg" collapsedWidth="0">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            onClick={() => history.push('/admin')}
          >
            用户管理
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<TeamOutlined />}
            onClick={() => history.push('/admin/orderManager')}
          >
            订单管理
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<MessageOutlined />}
            onClick={() => history.push('/admin/appeal')}
          >
            异常订单
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<UserOutlined />}
            onClick={() => history.push('/admin/comments')}
          >
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};
