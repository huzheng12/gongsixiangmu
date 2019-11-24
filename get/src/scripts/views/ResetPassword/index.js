import React, { Component } from 'react';
import { Tabs, Input, Button } from 'antd';
import './index.scss'
import NoremailmailgisterForm from './resetemailpass';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';

const { TabPane } = Tabs;
class Resetpass extends Component {
  callback = (key) => {
    console.log(key)
  }
  render() {
    return (
      <div>
        <Header></Header>
        <div className="resetpass-warp">
          <div className="box">
            <div className="title">
              重置登录密码
            </div>
            <div className="title-xiyu">
              您将收到一条验证信息，为了您的资产安全，重置登录密码后，24小时以内禁止提币
            </div>
            <NoremailmailgisterForm></NoremailmailgisterForm>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Resetpass;