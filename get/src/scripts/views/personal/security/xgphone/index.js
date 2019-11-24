import React, { Component } from 'react';
import Biaoti from '../../componetn/biaoti';
import './index.scss'
import { Select, Input, Button, message } from 'antd';
import { history } from '@/utils/history'
import lang from '@/utils/language';
import store from '@/scripts/store.js'
import { Xfn } from '../../../../../utils/axiosfn';
const { Option } = Select;
var times
class Xgphone extends Component {
  constructor() {
    super()
    this.state = {
      tiele: "更换绑定手机后，24小时以内禁止提币",
      tou: "修改手机号码",
      area: [],
      area_code: "86",
      phoneInp: "",
      butFlg: true,
      msgPhone: "",
      errcolor: "",
      yzmInp: "",
      yfs: "",
      fasongzi: "发送验证码",
      timeFlg: true
    }
  }
  guojixuanze = (value) => {
    this.setState({
      area_code: value
    })
  }
  axisosubmit = () => {
    Xfn({
      _u: "xgchange_phone",
      _m: "post",
      _p: {
        area_code: this.state.area_code,
        phone: this.state.phoneInp,
        sms_code: this.state.yzmInp,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        history.push('/personal/security/index')
        sessionStorage.userName = this.state.phoneInp
        store.dispatch({ type: 'headerZX', headerZX: this.state.phoneInp })
      }
    }, "手机号码修改成功")
  }
  componentWillUnmount() {
    clearInterval(times)
  }
  componentDidMount() {
    Xfn({
      _u: "area",
      _m: "post",
      _p: {

      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          area: res.data.data.area
        })
      }
    })
  }
  xphone = (val) => {
    if (this.state.yzmInp.length > 4 && val.target.value !== "") {
      this.setState({
        butFlg: false
      })
    } else {
      this.setState({
        butFlg: true
      })
    }
    this.setState({
      phoneInp: val.target.value.replace(/[^0-9-]+/, '')
    })
  }
  xphoneB = (cb) => {
    if (this.state.phoneInp.length > 4) {
      if (cb) { cb() }
    } else {

    }
  }
  yzphone = () => {
    this.xphoneB(() => {
      Xfn({
        _u: "send_change_phone_sms",
        _m: "post",
        _p: {
          time: new Date().getTime().toString()
        }
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
          if (res.data.data.notify_address) {
            const str = res.data.data.notify_address.substr(0, 3) + "****" + res.data.data.notify_address.substr(-4)
            this.setState({
              yfs: <span><span style={{ color: "rgb(189, 179, 179)", marginRight: 5 }}>已发送</span>{str}</span>
            })

          }
        }
      }, "验证码发送成功")
    })
  }
  yzmInp = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    this.setState({
      yzmInp: value
    })
    if (value.length == 4 && this.state.phoneInp !== "") {
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
    const { tiele, tou, area, area_code, phoneInp, butFlg, msgPhone, errcolor, yfs, yzmInp } = this.state
    return (
      <div className="xgphone-warp">
        <Biaoti content={tiele} flg={true} title={tou} ></Biaoti>
        <div className="cengdlk-wgr">
          <div className="lebal clear" style={{ marginTop: 24, height: 42 }}>
            <span>国籍</span>
            <Select defaultValue={"中国 + 86"} style={{ width: 340 }} onChange={this.guojixuanze}>
              {
                area.map((item, index) => {
                  return (
                    <Option value={item.area_code} key={"_inde" + index}>{item.area_name}+{item.area_code}</Option>
                  )
                })
              }
            </Select>
          </div>
          <p></p>
          <div className="lebal clear">
            <span>手机号码
            </span>
            <Input maxLength={11} value={phoneInp} onBlur={() => this.xphoneB()} onChange={this.xphone} placeholder="请输入手机号" style={{ width: 340, height: 42, borderColor: errcolor }} />
          </div>
          <p>{msgPhone}</p>
          <div className="lebal clear">
            <span>短信验证码</span>
            <Input onChange={this.yzmInp} value={yzmInp} placeholder="请输入验证码" style={{ width: 200, height: 42, float: "left", marginRight: 10 }} />
            <Button disabled={!this.state.timeFlg} onClick={this.yzphone} type="primary"
              style={{ width: 130, height: 42, float: "left" }}>{this.state.fasongzi}</Button>
            <span style={{ width: 300 }}>{yfs}</span>
          </div>
          <p></p>
          <Button disabled={butFlg} onClick={this.axisosubmit} type="primary" style={{ width: 340, height: 42, float: "left", marginLeft: 120, marginTop: 40 }}>确认</Button>
        </div>
      </div >
    );
  }
}

export default Xgphone;