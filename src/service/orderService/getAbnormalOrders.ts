import axios from 'axios';
import { URL, dateFormat } from '../../config';
import IOrder from '../../ts/interface/IOrder';
import moment from 'moment';

export default async function getAbnormalOrderService() {
  const res = await axios.get(`${URL}/getAppealOrders`);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  const orders: Array<IOrder> = [];
  for (let order of res.data.data) {
    const { releaseTime, expectTime, ...item } = order;
    orders.push({
      ...item,
      expectTime: moment(expectTime).format(dateFormat),
      releaseTime: moment(releaseTime).format(dateFormat),
    });
  }
  return {
    error: 0,
    data: orders,
  };
}
