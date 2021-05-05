import axios from 'axios';
import IOrder from '../../ts/interface/IOrder';
import moment from 'moment';
import { URL, dateFormat } from '../../config';
/**
 *  获取全部订单信息
 *  @param {IOrder}
 *
 */
async function getOrderService(account: number) {
  const ordersRes = await axios.post(`${URL}/getHelpInfo`, { account: account });
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
export default getOrderService;
