import React, { Component } from 'react';
import Biaoti from '../../componetn/biaoti';
import './index.scss'
import { Select, Input, Button, message } from 'antd';
import { history } from '@/utils/history'
import { FormattedMessage } from 'react-intl';
import lang from '@/utils/language';
import { Xfn } from '../../../../../utils/axiosfn';
import { openNotificationWithIcon } from '../../../../../utils/NotificationCONF';
// import { Link } from "react-router-dom";
const { Option } = Select;

var times
class Szemail extends Component {
  constructor() {
    super()
    this.state = {
      tiele: lang().No_withdrawal_within_24_hours,
      tou: lang().Set_up_mailbox,
      area: [],
      phoneInp: "",
      butFlg: true,
      msgPhone: "",
      errcolor: "",
      yzmInp: "",
      yfs1: "",
      fasongzi: lang().Send_Verification_Code,
      timeFlg: true
    }
  }

  axisosubmit = () => {
    const obj = {
      email: this.state.phoneInp,
      email_code: this.state.yzmInp,
      time: new Date().getTime().toString()
    }
    Xfn({
      _u: "bind_email2",
      _m: "post",
      _p: {
        email: this.state.phoneInp,
        email_code: this.state.yzmInp,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        sessionStorage.userName = this.state.phoneInp
        setTimeout(() => {
          history.push('/personal/security')
        }, 1000)
      }
    }, "邮箱绑定成功")
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  componentDidMount() {
    Xfn({
      _m: "post",
      _u: "area",
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          area: res.data.data.area
        })
      }
    })
  }
  xphone = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    if (this.state.yzmInp !== "" && val.target.value !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      phoneInp: val.target.value
    })
  }
  xphoneB = (cb, fn) => {
    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (ePattern.test(this.state.phoneInp)) {
      if (cb) { cb() }
    } else {
      if (fn) {
        fn()
      }
    }
  }
  yzphone = () => {
    this.xphoneB(() => {
      Xfn({
        _u: "bind_email",
        _m: "post",
        _p: {
          email: this.state.phoneInp,
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        if (code == 0) {
          if (this.state.phoneInp) {
            const str = this.state.phoneInp.substr(0, 3) + "****" + this.state.phoneInp.split("@")[1]
            this.setState({
              yfs1: <span><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>已发送</span>{str}</span>
            })

          }
          let time = 60
          this.setState({
            timeFlg: false,
            fasongzi: 60
          })
          times = setInterval(() => {
            console.log(time)
            time = time - 1
            this.setState({
              fasongzi: time
            })
            if (time === 0) {
              clearInterval(times)
              this.setState({
                timeFlg: true,
                fasongzi: "发送验证码"
              })
            }
          }, 1000)
        }
      }, "验证码发送成功")

    }, () => {
      if (this.state.phoneInp) {
        openNotificationWithIcon("opne-warning", "警告", "邮箱格式不正确")
      } else {
        openNotificationWithIcon("opne-warning", "警告", "请输入邮箱")
      }
    })
  }
  yzmInp = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    this.setState({
      yzmInp: value
    })
    if (this.state.phoneInp !== "" && value !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
  }
  render() {
    const { tou, phoneInp, butFlg, msgPhone, errcolor, yfs1, yzmInp } = this.state
    return (
      <div className="xgphone-warp szemial">
        <Biaoti flg={false} title={tou} ></Biaoti>
        <div className="cengdlk-wgr">
          <div className="lebal clear">
            <span>邮箱号码
            </span>
            <Input value={phoneInp} onBlur={() => this.xphoneB()} onChange={this.xphone} placeholder="请输入邮箱号码" style={{ width: 340, height: 42, borderColor: errcolor }} />
          </div>
          <p>{msgPhone}</p>
          <div className="lebal clear">
            <span>邮箱验证码</span>
            <Input onChange={this.yzmInp} value={yzmInp} placeholder="请输入验证码" style={{ width: 200, height: 42, float: "left", marginRight: 10 }} />
            <Button disabled={!this.state.timeFlg} onClick={this.yzphone} type="primary" style={{ width: 130, height: 42, float: "left" }}>{this.state.fasongzi}</Button>
            <span style={{ width: 300 }}>{yfs1}</span>
          </div>
          <p></p>
          <Button disabled={butFlg} onClick={this.axisosubmit} type="primary" style={{ width: 340, height: 42, float: "left", marginLeft: 120, marginTop: 40 }}>确认</Button>
        </div>
      </div >
    );
  }
}

export default Szemail;