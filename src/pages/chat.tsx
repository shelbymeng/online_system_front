// import { Divider, Row, Col, Button, Input } from 'antd';
// import {
//   ChatList,
//   MessageBox,
//   MessageList,
//   ChatItem,
// } from 'react-chat-elements';
// import 'react-chat-elements/dist/main.css';
// import { io } from 'socket.io-client';
// import sessionStorageService from '@/service/sessionStorageService';
// import { handleMessagePosition, handleChatData } from '../tools/handleParams';
// import { useEffect, useState } from 'react';
// import { chatConnection } from '../service/index';
// import IMessage from '../ts/interface/IMessage';
// const url = 'ws://127.0.0.1:3000/';
// const socket = io(`${url}`);

// export default () => {
//   const [userMessage, setUserMessage] = useState('');
//   const [content, setContent] = useState<Array<IMessage>>();
//   const [onlineUsers, setOnlineUsers] = useState();
//   const [toId, setToId] = useState();
//   const user = sessionStorageService.getUser();

//   function send() {
//     const obj = {
//       user: user.account,
//       text: userMessage,
//       date: new Date().getTime(),
//     };

//     socket.emit('send', obj);
//     // socket.on('msgfromServer', (value: userMsg[]) => {
//     //   console.log('服务器返回数据', +'   ' + JSON.stringify(value, null, 2));
//     //   setContent(value);
//     // });
//   }
//   function getUsers() {
//     socket.emit('handleOnlineUsers', user.account);
//     socket.on('getOnlineUsers', (users: any) => {
//       console.log(`ML ~ file: index.ts ~ line 42 ~ socket.on ~ users`, users);
//       setOnlineUsers(users);
//     });
//   }
//   useEffect(() => {
//     getUsers();
//   }, [content]);

//   useEffect(() => {
//     socket.on('msgfromServer', (value: IMessage[]) => {
//       console.log('服务器返回数据', +'   ' + JSON.stringify(value, null, 2));
//       setContent(value);
//     });
//   }, []);

//   return (
//     <div>
//       <Row>
//         <Col span={8}>
//           <Divider orientation="left">好友列表</Divider>
//           <ChatList
//             className="chat-list"
//             onClick={(e: any) => setToId(e.title)}
//             dataSource={onlineUsers && handleChatData(onlineUsers)}
//           ></ChatList>
//         </Col>
//         <Col span={15} style={{ marginLeft: 20 }}>
//           <Divider orientation="left">消息列表</Divider>

//           <MessageList
//             className="message-list"
//             lockable={true}
//             toBottomHeight={'100%'}
//             dataSource={content && handleMessagePosition(content)}
//             onTitleClick={(e: any) => console.log(e)}
//           />
//           <div style={{ display: 'flex', marginTop: 20 }}>
//             <Input
//               id="input"
//               placeholder="请输入..."
//               onPressEnter={send}
//               onChange={(e) => setUserMessage(e.target.value)}
//             ></Input>
//             <Button onClick={send} type="primary">
//               send
//             </Button>
//           </div>
//         </Col>
//       </Row>
//       <Button onClick={getUsers}>获取</Button>
//     </div>
//   );
// };
