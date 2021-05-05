import axios from 'axios';
import { URL } from '../../config';

async function cancelApproveOrderService(orderId: string) {
  const res = await axios.post(`${URL}/cancelApproveOrder`, {
    orderId: orderId,
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
export default cancelApproveOrderService;
