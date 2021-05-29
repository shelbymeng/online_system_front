import { Divider, Row, Col, Button, Input } from 'antd';
import {
  ChatList,
  MessageBox,
  MessageList,
  ChatItem,
} from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import sessionStorageService from '@/service/sessionStorageService';
import { handleMessagePosition, handleChatData } from '../tools/handleParams';
import { useEffect, useState } from 'react';
import { getUserChat } from '../service/index';
import IMessage from '../ts/interface/IMessage';
import socketUtils from '../service/chat';
const { socket } = socketUtils;

export default () => {
  const [userMessage, setUserMessage] = useState('');
  const [content, setContent] = useState<Array<IMessage>>();
  const [onlineUsers, setOnlineUsers] = useState();
  const [toId, setToId] = useState<number>();
  const [chatVisible, setCahtVisible] = useState(false);
  const user = sessionStorageService.getUser();

  function getChatAccount(params: number) {
    console.log(params);
    setToId(params);
    setCahtVisible(true);
  }
  function send() {
    const obj = {
      user: user.account,
      text: userMessage,
      date: new Date().getTime(),
      receiver: toId,
    };
    socket.emit(`send`, obj);
    setUserMessage('');
  }

  async function getUsers() {
    const res = await getUserChat(user.account);
    if (res.error === 0) {
      setOnlineUsers(res.data);
    }
  }
  user.account &&
    socket.on(`receive`, (value: IMessage[]) => {
      console.log(`ML ~ file: chat.tsx ~ line 35 ~ socket.on ~ value`, value);
      setContent(value);
    });
  useEffect(() => {}, [content]);
  useEffect(() => {
    user.account && getUsers();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '500px' }}>
        <Divider orientation="left">好友列表</Divider>
        <ChatList
          className="chat-list"
          onClick={(e: any) => getChatAccount(e.title)}
          dataSource={onlineUsers && handleChatData(onlineUsers)}
        ></ChatList>
      </div>
      {chatVisible ? (
        <div
          style={{
            marginLeft: 50,
            height: '80vh',
            overflow: 'auto',
            width: '100%',
          }}
        >
          <Divider orientation="left">消息列表</Divider>
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={content && handleMessagePosition(content)}
            onTitleClick={(e: any) => console.log(e)}
          />
          <div id="input-position" style={{ display: 'flex', marginTop: 20 }}>
            <Input
              id="input"
              placeholder="请输入..."
              onPressEnter={send}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            ></Input>
            <Button onClick={send} type="primary">
              send
            </Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
