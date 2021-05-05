import sessionStorageService from '@/service/sessionStorageService';
import IMessage from '../ts/interface/IMessage';
import EPosition from '../ts/enum/EPosition';

function handleMessagePosition(params: IMessage[]) {
  const account = sessionStorageService.getUser().account;
  const message = params.map((item: IMessage) => {
    const { user, ...other } = item;
    const position = user === account ? EPosition.RIGHT : EPosition.LEFT;
    return {
      position: position,
      title: user,
      ...other,
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      status: 'read',
    };
  });

  return message;
}
function handleChatData(params: any) {
  if (params.length === 0) {
    return;
  }
  const list = [];
  for (let item of params) {
    const { account, id } = item;
    list.push({
      title: account,
      subtitle: 'fuck you bitch',
      date: new Date(),
      avatar:
        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',

      unread: 1,
    });
  }
  return list;
}
function handleOrderId(releaseTime: string) {
  return `ORDER${releaseTime}`;
}
function handleCommentId(datetime: number) {
  return `COMMENT${datetime}`;
}
export {
  handleMessagePosition,
  handleChatData,
  handleOrderId,
  handleCommentId,
};
