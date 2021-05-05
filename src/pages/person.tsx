import { Button, Card, Avatar, PageHeader } from 'antd';
import { history } from 'umi';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import sessionStorageService from '@/service/sessionStorageService';
export default () => {
  const username = sessionStorageService.getUser().username;
  function logout() {
    sessionStorage.clear();
    history.push('/login');
  }
  return (
    <div>
      <PageHeader title="个人中心"></PageHeader>
      <Card
        style={{ width: 300 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <a onClick={logout}>退出</a>,
        ]}
      >
        <Card.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={username}
          description="This is the description This is the description This is the description"
        />
      </Card>
      <Button onClick={() => history.push('/person/ownHelpOrders')}>
        个人提交订单
      </Button>
      <Button onClick={() => history.push('/person/ownApproveHelpOrders')}>
        个人接单
      </Button>
    </div>
  );
};
