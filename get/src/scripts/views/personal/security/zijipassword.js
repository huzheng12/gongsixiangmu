import React, { Component } from 'react';
import './index.scss'
import { Button } from 'antd';
import Biaoti from '../componetn/biaoti';
import { history } from '@/utils/history'
import lang from '@/utils/language';
import { hex_md5 } from '@/utils/md5'
import { Input_A_B, Input_A_B_C } from '../../../components/A_Input_a_b';
import { Xfn } from '../../../../utils/axiosfn';
import { openNotificationWithIcon } from '@/utils/NotificationCONF';
var times
class ZjAssembly extends Component {
  constructor() {
    super()
    this.state = {
      tou: "修改资金密码",
      ypsd: "",
      xpsd: "",
      xpsds: "",
      yzm: "",
      butFlg: true,
      fasongzi: "发送验证码",
      timeFlg: true,
      sty: null
    }
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  ypsd = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    this.setState({
      ypsd: val.target.value
    })
  }
  xpsd = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    this.setState({
      xpsd: val.target.value
    })
  }
  xpsds = (val) => {
    if (val.target.value.indexOf(" ") != -1) { return false }
    this.setState({
      xpsds: val.target.value
    })
  }
  yzm = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    this.setState({
      yzm: value
    })
  }
  fasongyanz = () => {
    Xfn({
      _u: this.props.type == "1" ? "sendResetFundpwdSms" : "send_change_fundpwd_sms",
      _p: {
        time: new Date().getTime().toString()
      },
      _m: "post"
    }, (res, code) => {
      if (code == 0) {
        let time = 60
        this.setState({
          timeFlg: false,
          fasongzi: 60
        })
        console.log(res)
        if (res.data.data.notify_address.indexOf("@") == -1) {
          this.setState({
            sty: <span style={{ width: 300, textAlign: "left" }}><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>已发送</span>{res.data.data.notify_address.substr(0, 3) + "****" + res.data.data.notify_address.substr(-4)}</span>
          })
        } else {
          let a = res.data.data.notify_address.replace(/\"/g, "")
          this.setState({
            sty: <span style={{ width: 300, textAlign: "left" }}><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>已发送</span> <span>
              {a.substr(0, 3) + "****"}
            </span>
              <span>
                {a.split("@")[1]}
              </span></span>
          })
        }
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

      }
    }, "验证码发送成功")
  }
  aonsubmi = () => {
    const obj = {
      a: {
        old_fund_pwd: hex_md5(this.state.ypsd),
        fund_pwd: hex_md5(this.state.xpsd),
        confirm_pwd: hex_md5(this.state.xpsds),
        sms_code: this.state.yzm,
        time: new Date().getTime().toString()
      },
      b: {
        fund_pwd: hex_md5(this.state.xpsd),
        confirm_pwd: hex_md5(this.state.xpsds),
        sms_code: this.state.yzm,
        time: new Date().getTime().toString()
      },
    }
    if (this.state.xpsd.length < 6) { return openNotificationWithIcon("opne-warning", "警告", '密码不能小于6位') }
    if (this.state.xpsd.length > 20) { return openNotificationWithIcon("opne-warning", "警告", '密码不能大于20位') }
    if (this.state.xpsd === this.state.xpsds) {
      Xfn({
        _u: this.props.type == "1" ? 'resetFundPwd' : 'change_fund_pwd',
        _m: "post",
        _p: this.props.type == "1" ? obj.b : obj.a
      }, (res, code) => {
        if (code == 0) {
          history.push('/personal/security/index')
        }
      })
    } else {
      openNotificationWithIcon("opne-warning", "警告", '两次密码输入不一致')
    }
  }
  render() {
    const { tou, sty, xpsds, xpsd, yzm, ypsd } = this.state
    const { type } = this.props
    return (
      <div className="xgloginpass-warp">
        <Biaoti flg={(() => {
          if (type == "1") {
            return true
          }
          return false
        })()} title={tou} content="更换资金密码后，24小时以内禁止提币" ></Biaoti>
        <div className="cengdlk-wgr">
          {
            (() => {
              if (type !== "1") {
                return <Input_A_B onChange={this.ypsd} avalue={ypsd} placeholder="请输入密码" title={"原密码"}></Input_A_B>
              }
            })()
          }
          <Input_A_B type="password" onChange={this.xpsd} avalue={xpsd} placeholder="请输入密码" title={"新密码"}></Input_A_B>
          <Input_A_B onChange={this.xpsds} avalue={xpsds} placeholder="请输入密码" title={"确认新密码"}></Input_A_B>
          <Input_A_B_C
            onChange={this.yzm}
            avalue={yzm}
            title="短信验证码"
            butContent={this.state.fasongzi}
            disabled={!this.state.timeFlg}
            placeholder="请输入验证码"
            onClick={this.fasongyanz}
            sty={sty}
          />
          <Button disabled={(() => {
            if (type == "1") {
              if (xpsd != "" && xpsds != "" && yzm != "") {
                return false
              }
              return true
            } else {
              if (xpsd != "" && xpsds != "" && yzm != "" && ypsd != "") {
                return false
              }
              return true
            }
          })()} onClick={this.aonsubmi} type="primary" style={{ width: 340, height: 42, float: "left", marginLeft: 120, marginTop: 40 }}>确认</Button>
        </div>
      </div >
    );
  }
}

export default ZjAssembly;