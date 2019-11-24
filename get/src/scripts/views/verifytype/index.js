import React, { Component } from 'react';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { Tabs, Input, Button } from 'antd';
import { connect } from "react-redux";
import { hex_md5, hex_hmac_md5 } from '@/utils/md5'
import { history } from '@/utils/history'
import store from '@/scripts/store.js'
import './index.scss'
import { tokenfun, zhutiyanzheng } from '../../action';
import { Xfn } from '../../../utils/axiosfn';
@connect(
  state => {
    return {
      userxinxi: state.datum.userxinxi,
    }
  }
)
class Verify_type extends Component {
  constructor() {
    super()
    this.state = {
      yanczmval: ''
    }
  }
  yanczm = (val) => {
    console.log(val.target.value)
    this.setState({
      yanczmval: val.target.value
    })
  }
  yanngzhengtonguo = () => {
    const { userxinxi } = this.props
    userxinxi.verify_code = this.state.yanczmval
    Xfn({
      _u:'check_verify',
      _m:"post",
      _p:userxinxi
    },(res,code)=>{
      if(code==0){
        localStorage.theme = "light"
        store.dispatch(zhutiyanzheng('light', 1))
        sessionStorage.userInfo = res.data.data.token
        sessionStorage.userName = res.data.data.user_name
        store.dispatch(tokenfun(res.data.data.token))
        history.push("/transaction")
      }
    })
  
  }
  render() {
    const { yanczmval } = this.state
    return (
      <div className="Verify-type-warp">
        <Header></Header>
        <div className="content-box">
          <div className="map">
            <div className="title">手机验证</div>
            <div className="inp">
              <Input value={yanczmval} onChange={this.yanczm} placeholder="请输入验证码"></Input>
            </div>
            <div className="but clear">
              <Button onClick={this.yanngzhengtonguo} type="primary">验证</Button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Verify_type;