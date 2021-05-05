import { io } from 'socket.io-client';
import sessionStorageService from '@/service/sessionStorageService';

interface msg {
  user: string;
  text: string;
  date: string;
  position?: string;
}

const url = 'ws://127.0.0.1:3006/';
const socket = io(`${url}`);
const user = sessionStorageService.getUser();
function send(userMessage: string) {
  const obj = {
    user: user.account,
    text: userMessage,
    date: new Date(),
  };
  console.log(
    `ML ~ file: chat.tsx ~ line 46 ~ send ~ obj`,
    JSON.stringify(obj, null, 2),
  );
  socket.emit('send', obj);
  socket.on('msgfromServer', (value: msg) => {
    console.log('服务器返回数据', +'   ' + JSON.stringify(value, null, 2));
    return value;
  });
}
