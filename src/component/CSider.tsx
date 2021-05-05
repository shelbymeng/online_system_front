import React from 'react';
import { history } from 'umi';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import styles from './index.css';
const { Sider } = Layout;
function CSider() {
  return (
    <div>
      {/* <div className={styles.logo} /> */}

      <Sider style={{ height: '100%' }} breakpoint="lg" collapsedWidth="0">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            onClick={() => history.push('/')}
          >
            广场
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<TeamOutlined />}
            onClick={() => history.push('/forum')}
          >
            论坛
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<MessageOutlined />}
            onClick={() => history.push('/chat')}
          >
            聊天
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<UserOutlined />}
            onClick={() => history.push('/person')}
          >
            个人中心
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
}
export default CSider;
