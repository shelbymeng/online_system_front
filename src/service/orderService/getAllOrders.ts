import { URL, dateFormat } from '../../config';
import axios from 'axios';
import IOrder from '../../ts/interface/IOrder';
import moment from 'moment';
export default async function getAllOrderService() {
  const ordersRes = await axios.get(`${URL}/getAllOrders`);
  if (ordersRes.data.error !== 0) {
    return {
      error: ordersRes.data.error,
      msg: ordersRes.data.msg,
    };
  }
  const orders: Array<IOrder> = [];
  for (let order of ordersRes.data.data) {
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
