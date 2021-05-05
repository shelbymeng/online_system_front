import { URL, dateFormat } from '../../config';
import axios from 'axios';
import IOrder from '../../ts/interface/IOrder';
import moment from 'moment';
async function getStudentHelpOrderService(account: number) {
  const res = await axios.post(`${URL}/getStudentHelpOrder`, {
    account: account,
  });

  if (!res.data.data) {
    return {
      error: res.data.error,
      msg: res.data.msg,
      data: [],
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
export default getStudentHelpOrderService;
