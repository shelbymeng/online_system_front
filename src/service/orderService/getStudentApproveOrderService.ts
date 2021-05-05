import { URL, dateFormat } from '../../config';
import axios from 'axios';
import moment from 'moment';
import IOrder from '../../ts/interface/IOrder';

async function getStudentApproveOrderService(helperAccount: number) {
  const res = await axios.post(`${URL}/getStudentApproveOrder`, {
    helperAccount: helperAccount,
  });
  console.log(`ML ~ file: getStudentApproveOrderService.ts ~ line 10 ~ getStudentApproveOrderService ~ res`, res);
  if (res.data.error !== 0 || res.data.data.length === 0) {
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
export default getStudentApproveOrderService;
