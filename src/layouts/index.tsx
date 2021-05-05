import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu, Card, Select } from 'antd';
import { history } from 'umi';
import CFooter from '../component/CFooter';
import CSider from '../component/CSider';
import sessionStorageService from '@/service/sessionStorageService';

const { Header, Content, Footer } = Layout;

export default (props: any) => {
  const getUser = sessionStorageService.getUser();
  if (!getUser) {
    history.push('/login');
  }
  return (
    <div>
      <Layout>
        <CSider></CSider>
        <Content>
          <Layout>
            <Content style={{ padding: '20px', minHeight: 400 }}>
              <Card>{props.children}</Card>
            </Content>
          </Layout>
          {/* <Footer style={{ textAlign: 'center' }}>
            <CFooter></CFooter>
          </Footer> */}
        </Content>
      </Layout>
    </div>
  );
};
