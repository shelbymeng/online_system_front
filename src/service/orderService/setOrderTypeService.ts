import axios from 'axios';
import { URL } from '../../config';
import IOrderType from '../../ts/interface/IOrderType';

export default async function setOrderTypeService(orderType: string) {
  console.log(`ML ~ file: setOrderTypeService.ts ~ line 6 ~ setOrderTypeService ~ orderType`, orderType);
  const res = await axios.post(`${URL}/setOrderType`, { orderType: orderType });
  console.log(`ML ~ file: setOrderTypeService.ts ~ line 8 ~ setOrderTypeService ~ res`, res);
  if (res.data.error === 0) {
    return {
      error: 0,
    };
  }
}
