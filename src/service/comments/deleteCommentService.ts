import { URL } from '../../config';
import axios from 'axios';

export default async function deleteCommentService(commentId: string) {
  const res = await axios.post(`${URL}/deleteComment`, {
    commentId: commentId,
  });
  if (res.data.error === 0) {
    return {
      error: 0,
    };
  }
}
