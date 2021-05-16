import axios from 'axios';
import { URL } from '../../config';

export default async function deleteOrderTypeService(id: number) {
  const res = await axios.post(`${URL}/deleteOrderType`, { id: id });
  if (res.data.error === 0) {
    return {
      error: 0,
    };
  }
}
