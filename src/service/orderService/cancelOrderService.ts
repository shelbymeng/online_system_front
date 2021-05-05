import axios from 'axios';
import { URL } from '../../config';

interface ICancelOrder {
  orderId: string;
  account: number;
}
async function cancelOrderService(params: ICancelOrder) {
  const { orderId, account } = params;
  const res = await axios.post(`${URL}/cancelOrder`, params);
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
export default cancelOrderService;
