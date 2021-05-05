import axios from 'axios';
import { URL } from '../../config';
import IOrder from '../../ts/interface/IOrder';
async function approveOrderService(params: IOrder) {
  const { orderId, helperAccount, helper } = params;
  const res = await axios.post(`${URL}/approveHelpInfo`, {
    orderId: orderId,
    helperAccount: helperAccount,
    helper: helper,
    state: '已接单',
    startTime: new Date().getTime(),
  });
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  return {
    error: 0,
    msg: 'success',
  };
}
export default approveOrderService;
