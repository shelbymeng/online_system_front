import IOrder from '../../ts/interface/IOrder';
import { handleOrderId } from '../../tools/handleParams';
import axios from 'axios';
import moment from 'moment';
import { URL } from '../../config';
async function handleOrderInfoService(params: any) {
  const { releaseTime, expectTime, ...item } = params;
  const orderId = handleOrderId(releaseTime);
  const fTime = moment(expectTime).format('x');
  const res = await axios.post(`${URL}/handleOrderInfo`, {
    ...item,
    releaseTime: releaseTime,
    expectTime: fTime,
    orderId: orderId,
    state: '未接单',
  });
  console.log(
    `ML ~ file: handleOrderInfoService.ts ~ line 13 ~ handleOrderInfoService ~ res`,
    res,
  );
  return {
    error: res.data.error,
    msg: res.data.msg,
  };
}
export default handleOrderInfoService;
