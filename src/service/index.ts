import ILogin from '../ts/interface/ILogin';
import axios from 'axios';
import { io } from 'socket.io-client';
import sessionStorageService from '@/service/sessionStorageService';
import IUsers from '../ts/interface/IUsers';

const URL = 'http://127.0.0.1:3000';
const SOCKETURL = 'ws://127.0.0.1:4000/';
// const socket = io(`${SOCKETURL}`);
/**
 * 注册
 */
async function registryService(params: any) {
  const result = await axios.post(`${URL}/register`, params);
  if (result.data.error !== 0) {
    return {
      error: 1231,
      msg: '注册失败',
    };
  }
  return {
    error: 0,
    msg: 'success',
  };
}
/**
 * 登录
 *
 * @param {ILogin}
 */
async function userLogin(params: ILogin) {
  const loginResult = await axios.post(`${URL}/login`, params);
  if (loginResult.data.error !== 0) {
    return {
      error: 1001,
      msg: '用户名或密码错误',
    };
  }
  if (loginResult.data.data[0].locked === '冻结') {
    return {
      error: 1,
      msg: '该账户已冻结,请联系管理员',
    };
  }
  //  设置session
  sessionStorageService.setUser({
    account: loginResult.data.data[0].account,
    username: loginResult.data.data[0].username,
    role: loginResult.data.data[0].role,
    phonenumber: loginResult.data.data[0].phonenumber,
  });
  // socket.emit('login', {
  //   account: loginResult.data.data[0].account,
  //   id: socket.id,
  // });
  return loginResult.data.data[0];
}
/**
 * 获取用户信息除管理员外
 */
async function getUserService() {
  const res = await axios.get(`${URL}/getUsers`);
  if (res.data.error === 0) {
    return {
      error: 0,
      msg: 'success',
      data: res.data.data,
    };
  }
}
/**
 * 修改用户状态
 */
async function setUserStatusService(params: IUsers) {
  const res = await axios.post(`${URL}/updateUserStatus`, params);
  if (res.data.error === 0) {
    return {
      error: 0,
      msg: 'success',
    };
  }
}
/**
 * 获取地址信息
 */
async function getAddressService() {
  const res = await axios.get(`${URL}/getAddress`);
  if (res.data.error !== 0) {
    return {
      error: 9823,
      msg: 'undefined',
    };
  }
  return {
    error: 0,
    msg: 'success',
    data: res.data.data,
  };
}
/**
 * 学生获取个人信息
 */
async function getUserInfoService(account: number) {
  const res = await axios.post(`${URL}/getUserInfo`, { account: account });
  if (res.data.error === 0) {
    return res.data.data[0];
  }
}
/**
 * 学生修改个人信息
 */
async function updateUserInfoService(params: IUsers) {
  const res = await axios.post(`${URL}/updateUserInfo`, params);
  if (res.data.error === 0) {
    return {
      error: 0,
    };
  }
}
/**
 * 建立socket
 *
 */
async function chatConnection() {
  // const user = sessionStorageService.getUser();
  // //  获取在线好友
  // socket.emit('handleOnlineUsers', user.account);
  // socket.on('getOnlineUsers', (users: any) => {
  //   console.log(`ML ~ file: index.ts ~ line 42 ~ socket.on ~ users`, users);
  //   return users;
  // });
}
export {
  registryService,
  userLogin,
  getUserService,
  getAddressService,
  chatConnection,
  setUserStatusService,
  getUserInfoService,
  updateUserInfoService,
};
