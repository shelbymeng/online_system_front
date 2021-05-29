import { io } from 'socket.io-client';
interface msg {
  user: string;
  text: string;
  date: string;
  position?: string;
}
interface user {
  account: number;
  username: string;
}
const url = 'ws://127.0.0.1:3000/';
const socket = io(`${url}`);

async function online(params: user) {
  socket.emit('onlineUser', params);
}
function getUserOnline() {
  socket.on('getUserOnline', (users: any) => {
    console.log(`ML ~ file: chat.ts ~ line 17 ~ socket.on ~ users`, users);
  });
}
export default { online, getUserOnline, socket };
