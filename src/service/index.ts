import ILogin from '../ts/interface/ILogin';
import axios from 'axios';

import sessionStorageService from '@/service/sessionStorageService';
import IUsers from '../ts/interface/IUsers';
import socketUtils from './chat';
const URL = 'http://127.0.0.1:3000';

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
  const obj = {
    account: loginResult.data.data[0].account,
    username: loginResult.data.data[0].username,
  };
  socketUtils.online(obj);
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
async function getUserChat(account: number) {
  const res = await axios.post(`${URL}/getuserChat`, { account: account });
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  return {
    error: 0,
    data: res.data.data,
  };
}
export {
  registryService,
  userLogin,
  getUserService,
  getAddressService,
  getUserChat,
  setUserStatusService,
  getUserInfoService,
  updateUserInfoService,
};
