import axios from 'axios';
import { URL } from '../../config';

export default async function getOrderTypeService() {
  const res = await axios.get(`${URL}/getOrderType`);
  if (res.data.error === 0) {
    return {
      error: 0,
      msg: 'success',
      data: res.data.data,
    };
  }
}
