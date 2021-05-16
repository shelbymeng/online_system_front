

import axios from 'axios';
import { URL } from '../../config';

export default async function dealAppealOrderService(orderId: string) {
  const res = await axios.post(`${URL}/dealAppealOrder`, { orderId: orderId });
  if (res.data.error === 0) {
    return {
      error: 0,
    };
  }
}
