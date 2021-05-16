import axios from 'axios';
import { URL } from '../../config';

interface IFinish {
  account: number;
  orderId: string;
  helperAccount: number;
  finishTime: number;
  extra: number;
}
async function finishOrderService(params: IFinish) {
  console.log(
    `ML ~ file: finishOrderService.ts ~ line 9 ~ finishOrderService ~ params`,
    params,
  );
  const res = await axios.post(`${URL}/finishHelpOrder`, params);
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
export default finishOrderService;
