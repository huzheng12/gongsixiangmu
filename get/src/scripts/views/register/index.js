import React, { Component } from 'react';
import './index.scss'
import { Tabs } from 'antd';
import WrappedNormalregisterForm from './phoneregis';
import NormalreemailgisterForm from './emailregist';
import { connect } from "react-redux"
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';

const { TabPane } = Tabs;
@connect(
  state => {
    return {
      // loginflg: state.data.loginflg,
    }
  }
)
class Register extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {

  }
  callback = (key) => {

    console.log(key);
  }
  //验证码
  render() {
    return (
      <div>
        <Header></Header>
        <div className="conten-register-warp">
          <div className="box">
            <div className="title">
              注册账号
            </div>
            <div className="tabpane">
              <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="手机注册" key="1">
                  <WrappedNormalregisterForm></WrappedNormalregisterForm>
                </TabPane>
                <TabPane tab="邮箱注册" key="2">
                  <NormalreemailgisterForm></NormalreemailgisterForm>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Register