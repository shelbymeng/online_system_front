import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  List,
  Comment,
  Avatar,
  Tooltip,
  Modal,
  PageHeader,
  message,
} from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import IComments from '../ts/interface/IComments';
import getCommentsService from '../service/comments/getCommentsService';
import addCommentsService from '../service/comments/addCommentsService';
import { handleCommentId } from '../tools/handleParams';
import sessionStorageService from '@/service/sessionStorageService';
import getMessageService from '../service/comments/getMessageService';
import addMessageService from '../service/comments/addMessageService';
export default (props: any) => {
  const [comments, setComments] = useState<Array<IComments>>();
  const [replyVisible, setReplyVisible] = useState(false);
  const [viewVisible, setViewVisible] = useState(false);
  const [content, setContent] = useState('');
  const [id, setId] = useState(''); //设置单个留言id
  const [reply, setReply] = useState(''); //设置用户留言
  const user = sessionStorageService.getUser();

  async function getComments() {
    const res = await getCommentsService();
    if (res.error === 0) {
      setComments(res.data);
    }
  }
  async function addComments() {
    console.log(content);
    const params = {
      commentId: handleCommentId(new Date().getTime()),
      account: user.account,
      author: user.username,
      content: content,
      datetime: new Date().getTime(),
    };
    const res = await addCommentsService(params);
    if (res.error !== 0) {
      message.error('提交失败');
    }
    if (res.error === 0) {
      message.success('提交成功');
    }
    getComments();
    setContent('');
  }
  async function addMessages() {
    const params = {
      commentId: id,
      account: user.account,
      author: user.username,
      content: reply,
      datetime: new Date().getTime(),
    };
    const res = await addMessageService(params);
    if (res.error !== 0) {
      message.error('回复失败');
    }
    if (res.error === 0) {
      message.success('回复成功');
    }
    setReplyVisible(false);
  }
  function onReplyCalcel() {
    setReplyVisible(false);
  }
  function onViewCancel() {
    setViewVisible(false);
  }

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <PageHeader title="校园论坛"></PageHeader>
      <List
        itemLayout="horizontal"
        pagination={{ pageSize: 4 }}
        dataSource={comments}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                onClick={() => {
                  setReplyVisible(true);
                  setId(item.commentId);
                }}
              >
                回复
              </a>,
              <a
                onClick={() => {
                  setViewVisible(true);
                  setId(item.commentId);
                }}
              >
                查看
              </a>,
            ]}
            key={item.commentId}
          >
            <Comment
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              author={item.author}
              content={item.content}
              datetime={item.datetime}
            />
          </List.Item>
        )}
      ></List>
      <Modal
        title="回复"
        visible={replyVisible}
        footer={null}
        onCancel={onReplyCalcel}
        destroyOnClose={true}
      >
        <Input.TextArea
          onChange={(e) => setReply(e.target.value)}
          onPressEnter={addMessages}
        ></Input.TextArea>
        <Button onClick={addMessages}>提交</Button>
      </Modal>
      <Modal
        title="详情"
        visible={viewVisible}
        footer={null}
        onCancel={onViewCancel}
        destroyOnClose={true}
      >
        <CommentList id={id}></CommentList>
      </Modal>
      <div style={{ marginTop: 20, display: 'flex' }}>
        <Input
          onChange={(e) => setContent(e.target.value)}
          onPressEnter={addComments}
          allowClear
          value={content}
        ></Input>
        <Button type="primary" onClick={addComments}>
          发布
        </Button>
      </div>
    </div>
  );
};
const CommentList = (props: { id: string }) => {
  const [messages, setMessages] = useState<Array<IComments>>();

  async function getMessages() {
    const res = await getMessageService(props.id);
    if (res.error === 0) {
      setMessages(res.data);
    }
    if (res.error !== 0) {
      message.error(res.msg);
      setMessages([]);
    }
  }
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <div>
      <List
        itemLayout="horizontal"
        pagination={{ pageSize: 4 }}
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <Comment
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo"
                />
              }
              author={item.author}
              content={item.content}
              datetime={item.datetime}
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
};
