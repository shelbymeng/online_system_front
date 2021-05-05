import axios from 'axios';
import { URL } from '../../config';
import IComments from '../../ts/interface/IComments';
async function addCommentsService(params: IComments) {
  const res = await axios.post(`${URL}/addComments`, params);
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
export default addCommentsService;
