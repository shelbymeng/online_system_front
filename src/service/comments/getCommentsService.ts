import moment from 'moment';
import { URL, dateFormat } from '../../config';
import axios from 'axios';
import IComments from '../../ts/interface/IComments';
async function getCommentsService() {
  const res = await axios.get(`${URL}/getComments`);
  if (res.data.error !== 0) {
    return {
      error: res.data.error,
      msg: res.data.msg,
    };
  }
  const comments: IComments[] = [];
  for (let comment of res.data.data) {
    const { datetime, ...item } = comment;
    comments.push({
      ...item,
      datetime: moment(datetime).format(dateFormat),
    });
  }
  return {
    error: 0,
    data: comments,
  };
}
export default getCommentsService;
