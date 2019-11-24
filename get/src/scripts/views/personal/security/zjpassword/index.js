import React, { Component } from 'react';
import './index.scss'
import { Input, Button, message } from 'antd';
import lang from '@/utils/language';
import Biaoti from '../../componetn/biaoti';
import { hex_md5 } from '@/utils/md5'
import { history } from '@/utils/history'
import { Xfn } from '../../../../../utils/axiosfn';
import { openNotificationWithIcon } from '../../../../../utils/NotificationCONF';

var times
class Zjpassword extends Component {
  constructor() {
    super()
    this.state = {
      tou: "设置资金密码",
      yfs: "",
      zjpsdInp: "",
      zjpsdInps: "",
      yzmInp: "",
      butFlg: true,
      fasongzi: "发送验证码",
      timeFlg: true

    }
  }
  zjpsdInp = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    this.setState({
      zjpsdInp: val.target.value
    })
    if (val.target.value !== "" && this.state.zjpsdInps !== "" && this.state.yzmInp !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
  }
  zjpsdInps = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    if (val.target.value !== "" && this.state.zjpsdInp !== "" && this.state.yzmInp !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      zjpsdInps: val.target.value
    })
  }
  yzmInp = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    if (value !== "" && this.state.zjpsdInp !== "" && this.state.zjpsdInps !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      yzmInp: value
    })
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  yzphone = () => {
    Xfn({
      _u: "send_installed_fundpwd_sms",
      _m: "post",
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        let time = 60
        this.setState({
          timeFlg: false,
          fasongzi: 60
        })
        times = setInterval(() => {
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
        if (res.data.data.notify_address.indexOf("@") == -1) {
          this.setState({
            yfs: <span style={{ width: 300 }}><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>已发送</span>{res.data.data.notify_address.substr(0, 3) + "****" + res.data.data.notify_address.substr(-4)}</span>
          })
        } else {
          let a = res.data.data.notify_address.replace(/\"/g, "")
          this.setState({
            yfs: <span style={{ width: 300 }}><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>已发送</span> <span>
              {a.substr(0, 3) + "****"}
            </span>
              <span>
                {a.split("@")[1]}
              </span></span>
          })
        }
      }
    }, "验证码发送成功")

  }
  sbmiltaxios = () => {
    if (this.state.zjpsdInp.length < 6) { return openNotificationWithIcon("opne-warning", "警告", '密码不能小于6位') }
    if (this.state.zjpsdInp.length > 20) { return openNotificationWithIcon("opne-warning", "警告", '密码不能大于20位') }
    if (this.state.zjpsdInp == this.state.zjpsdInps) {
      Xfn({
        _u: "installed_fundpwd",
        _m: "post",
        _p: {
          fund_pwd: hex_md5(this.state.zjpsdInp),
          confirm_pwd: hex_md5(this.state.zjpsdInps),
          sms_code: this.state.yzmInp,
        }
      }, (res, code) => {
        if (code == 0) {
          history.push('/personal/security/index')
        }
      })
    } else {
      openNotificationWithIcon("opne-warning", "警告", "两次密码输入不一致")
    }
  }
  render() {
    const { tou, yfs, butFlg, zjpsdInp, zjpsdInps, yzmInp } = this.state
    return (
      <div className="zjpassword-warp">
        <Biaoti flg={false} title={tou}></Biaoti>
        <div className="cengdlk-wgr">
          <div className="lebal clear" style={{ marginTop: 24 }}>
            <span>资金密码</span>
            <Input onChange={this.zjpsdInp} type="password" value={zjpsdInp} placeholder="请输入密码" style={{ width: 340, height: 42 }} />
          </div>

          <div className="lebal clear" style={{ marginTop: 12 }}>
            <span>确认密码</span>
            <Input onChange={this.zjpsdInps} type="password" value={zjpsdInps} placeholder="请输入密码" style={{ width: 340, height: 42 }} />
          </div>

          <div className="lebal clear" style={{ marginTop: 12 }}>
            <span>短信验证码</span>
            <Input onChange={this.yzmInp} value={yzmInp} placeholder="请输入验证码" style={{ width: 200, height: 42, float: "left", marginRight: 10 }} />
            <Button disabled={!this.state.timeFlg} onClick={this.yzphone} type="primary" style={{ width: 130, height: 42, float: "left" }}>{this.state.fasongzi}</Button>
            <span style={{ width: 300, textAlign: "left" }}>{yfs}</span>
          </div>
          <Button disabled={butFlg} onClick={this.sbmiltaxios} type="primary" style={{ width: 340, height: 42, float: "left", marginLeft: 120, marginTop: 40 }}>确认</Button>

        </div>
      </div >
    );
  }
}

export default Zjpassword;