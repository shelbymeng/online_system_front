import axios from 'axios';
import { URL } from '../../config';

export default async function lockOrderService(orderId: string) {
  const res = await axios.post(`${URL}/lockOrder`, { orderId: orderId });
  if (res.data.error === 0) {
    return {
      error: 0,
    };
  }
}
