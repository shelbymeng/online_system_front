import { useEffect, useState } from 'react';
import {
  Card,
  Input,
  Button,
  message,
  Modal,
  Form,
  Divider,
  Select,
} from 'antd';
import {
  userLogin,
  registryService,
  getAddressService,
} from '../service/index';
import { history } from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import IAddress from '../ts/interface/IAddress';
import imgURL from '../public/share.png';
const { Option } = Select;
export default () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [addressArr, setAddressArr] = useState<Array<IAddress>>();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  async function getAddress() {
    const addressValue = await getAddressService();
    if (addressValue.error === 0) {
      setAddressArr(addressValue.data);
    }
  }
  async function registry() {
    const {
      account,
      username,
      password,
      phonenumber,
      role,
      address,
    } = form.getFieldsValue();
    console.log(form.getFieldsValue());

    const res = await registryService({
      account: account,
      username: username,
      password: password,
      phonenumber: phonenumber,
      role: role,
      address: address,
    });
    if (res.error === 0) {
      message.success('注册成功');
      setVisible(false);
    }
  }
  async function login() {
    if (!(account && password)) {
      message.warn('请输入用户名密码');
      return;
    }
    const param = {
      account: account,
      password: password,
    };
    const res = await userLogin(param);
    console.log(`ML ~ file: login.tsx ~ line 36 ~ login ~ res`, res);
    if (res && res.error === 1) {
      message.warn(res.msg);
      return;
    }
    if (res.error === 1001) {
      message.warn(res.msg);
      return;
    }
    if (res && res.role !== 'admin') {
      history.push('/');
    }
    if (res && res.role === 'admin') {
      history.push('/admin');
    }
  }
  function onCancel() {
    setVisible(false);
  }
  useEffect(() => {
    getAddress();
  }, []);
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <img
        src={imgURL}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <Card
        hoverable
        style={{
          width: 300,
          height: 300,
          boxShadow: ' 0px 3px 6px rgba(0, 0, 0,0.16)',
          position: 'absolute',
        }}
        title="校内综合互助服务系统"
      >
        <Input
          prefix={
            <div>
              <UserOutlined style={{ color: '#d9d9d9', paddingRight: 2 }} />
              学号：
            </div>
          }
          onChange={(e) => setAccount(e.target.value)}
          onPressEnter={login}
          allowClear
        ></Input>
        <Input.Password
          prefix={
            <div>
              <LockOutlined style={{ color: '#d9d9d9', paddingRight: 2 }} />
              密码：
            </div>
          }
          onChange={(e) => setPassword(e.target.value)}
          onPressEnter={login}
          style={{ marginTop: 20 }}
        ></Input.Password>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <Button type="primary" onClick={login}>
            登录
          </Button>
          <Button type="primary" onClick={() => setVisible(true)}>
            注册
          </Button>
        </div>
      </Card>
      <Modal title="注册" visible={visible} footer={null} onCancel={onCancel}>
        <Form form={form} onFinish={registry}>
          <Form.Item
            name="account"
            label="学号"
            rules={[
              { required: true, message: '填写学号' },
              { pattern: /^[0-9]{8}$/, message: '请输入正确的学号' },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="username"
            label="姓名"
            rules={[
              { required: true, message: '填写姓名' },
              {
                pattern: /^[\u4e00-\u9fa5]{2,4}$/,
                message: '输入2-4个中文字符',
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '填写密码' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="phonenumber"
            label="手机号"
            rules={[
              { required: true, message: '填写手机号' },
              { pattern: /^1[3578]\d{9}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="role"
            label="身份"
            rules={[{ required: true, message: '选择身份' }]}
          >
            <Select>
              <Option value="student">学生</Option>
              <Option value="teacher">教师</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '选择地址' }]}
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Form.Item />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
