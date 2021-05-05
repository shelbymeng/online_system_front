import React from 'react';
import { Button, Modal } from 'antd';
import styles from './index.css';
import { history } from 'umi';
const { confirm } = Modal;
function CHeader() {
  const logout = () => {
    confirm({
      title: '退出登录',
      content: '您确定要退出吗？',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk() {
        sessionStorage.clear();
        history.replace('/login');
      },
      onCancel() {},
    });
  };
  return (
    <header className={styles.NHeader}>
      <span style={{ color: '#ffffff' }}>test</span>
      <div>
        <span>11</span>
        <Button type="primary" onClick={() => logout()}>
          退出
        </Button>
      </div>
    </header>
  );
}
export default CHeader;
