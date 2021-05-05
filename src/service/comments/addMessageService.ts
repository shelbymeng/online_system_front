import axios from 'axios';
import IComments from '../../ts/interface/IComments';
import { URL } from '../../config';
async function addMessageService(params: IComments) {
  const res = await axios.post(`${URL}/addMessages`, params);
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
export default addMessageService;
