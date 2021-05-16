import axios from 'axios';
import { URL } from '../../config';

export default async function userAppealOrderService(orderId: string) {
  const res = await axios.post(`${URL}/userAppealOrder`, { orderId: orderId });
  if (res.data.error === 0) {
    return {
      error: 0,
    };
  }
}
