import axios from 'axios';
import { URL, dateFormat } from '../../config';
import IComments from '../../ts/interface/IComments';
import moment from 'moment';
async function getMessageService(commentId: string) {
  const res = await axios.post(`${URL}/getMessages`, { commentId: commentId });
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
export default getMessageService;
