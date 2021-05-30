import React, { useEffect, useState } from 'react';
import IComments from '../../ts/interface/IComments';
import getCommentsService from '../../service/comments/getCommentsService';
import getMessageService from '../../service/comments/getMessageService';
import { List, Comment, Avatar, Modal, message } from 'antd';
import deleteCommentService from '@/service/comments/deleteCommentService';
export default () => {
  const [comments, setComments] = useState<Array<IComments>>();
  const [viewVisible, setViewVisible] = useState(false);
  const [id, setId] = useState(''); //设置单个留言id
  async function getComments() {
    const res = await getCommentsService();
    if (res.error === 0) {
      setComments(res.data);
    }
  }
  async function deleteComment(commentId: string) {
    const res = await deleteCommentService(commentId);
    if (res?.error === 0) {
      message.success('删除成功');
      getComments();
    }
  }
  function onViewCancel() {
    setViewVisible(false);
  }
  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <List
        itemLayout="horizontal"
        pagination={{ pageSize: 4 }}
        dataSource={comments}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a
                onClick={() => {
                  deleteComment(item.commentId);
                  setId(item.commentId);
                }}
              >
                删除
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
        title="详情"
        visible={viewVisible}
        footer={null}
        onCancel={onViewCancel}
        destroyOnClose={true}
      >
        <CommentList id={id}></CommentList>
      </Modal>
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
