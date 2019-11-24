import React, { Component } from 'react';
import './index.scss'
import {
  Form, Input, Button, Select, Row,
  Col, message
} from 'antd';
import lang from '@/utils/language';
import { api } from '@/utils/api.js'
import { history } from '@/utils/history'
import { hex_md5, hex_hmac_md5 } from '@/utils/md5'
import LoginPhoneEmail from '../../../components/login';
import { Xfn } from '../../../../utils/axiosfn';
const { Option } = Select;

var times
class NormaemailaigisterForm extends Component {
  constructor() {
    super()
    this.state = {
      phone: false,
      pass: false,
      zpass: false,
      yanzengm: false,
      checkAll: true,
      timeFlg: true,
      butName: "发送验证码",
      valueErr: "", phoneOnChange: "",//手机号码
      yanzengmOnChange: "", yanzengmvalueErr: "",//验证码
      passOnChange: "", passValueErr: "",//密码
      zpassOnChange: "", zpassValueErr: "",//再次确认密码
      idOnChange: "", //id
      pwd_level: "1",
      fasongyanzhengma: false,
      fasongyanzhengmas: false,
      flgPhone: false,
    }
  }



  componentWillUnmount() {
    clearInterval(times)
  }
  // 注册提交
  redhandleSubmit = e => {
    this.phoneOnBule(1)
    this.yanzengmOnBule()
    this.passOnBule()
    this.zpassOnBule()
    if (this.state.phone && this.state.pass && this.state.zpass && this.state.yanzengm) {
      if (this.state.flgPhone) {

        Xfn({
          _m: "post",
          _u: "reset_pwd_phone",
          _p: {
            phone: this.state.phoneOnChange,
            pwd: hex_md5(this.state.passOnChange),
            conf_pwd: hex_md5(this.state.zpassOnChange),
            verify_code: this.state.yanzengmOnChange,
            pwd_level: this.state.pwd_level,
          }
        }, (res, code) => {
          if (code == 0) {
            history.push('/login')
          }
        })
      } else {

        Xfn({
          _m: "post",
          _u: "reset_pwd_email",
          _p: {
            email: this.state.phoneOnChange,
            pwd: hex_md5(this.state.passOnChange),
            conf_pwd: hex_md5(this.state.zpassOnChange),
            verify_code: this.state.yanzengmOnChange,
            pwd_level: this.state.pwd_level,
          }
        }, (res, code) => {
          if (code == 0) {
            history.push('/login')
          }
        })
      }


    }
  };


  // ====================邮箱
  phandleChange = (val) => {
    this.setState({ areas: val })
  }
  phoneOnChange = (val) => {
    let value = val.target.value
    if (value.indexOf("@") == -1) {
      this.setState({
        flgPhone: true
      })
    } else {
      this.setState({
        flgPhone: false
      })
    }
    if (value.indexOf(" ") == -1) {
      this.setState({
        phoneOnChange: value,
      })
    }
  }
  phoneOnBule = (a) => {
    this.setState({ fasongyanzhengma: true })
    if (!this.state.phoneOnChange) { return this.setState({ valueErr: "请输入手机号或邮箱", phone: false }) }
    if (!a) {
      if (this.state.flgPhone) {
        Xfn({
          _u: "check_phone",
          _m: "post",
          _p: {
            phone: this.state.phoneOnChange
          }
        }, (res, code) => {
          if (code != 0) {
            return this.setState({ phone: false, valueErr: res.data.msg })
          }
        })
      } else {
        Xfn({
          _m: "post",
          _u: "check_email",
          _p: {
            email: this.state.phoneOnChange
          }
        }, (res, code) => {
          if (code !== 0) {
            this.setState({ phone: false, valueErr: res.data.msg })
          }
        })
      }


    }
    this.setState({
      phone: true,
    })
  }
  phoneOnFocus = () => {
    this.setState({ valueErr: "" })
  }
  // ====================验证码
  yanzengmOnChange = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    this.setState({
      yanzengmOnChange: value,
    })
  }
  yanzengmOnBule = () => {
    if (!this.state.yanzengmOnChange) { return this.setState({ yanzengmvalueErr: "请输入验证码", yanzengm: false }) }
    if (this.state.yanzengmOnChange.length !== 4) { return this.setState({ yanzengmvalueErr: "验证码错误", yanzengm: false, }) }
    this.setState({
      yanzengm: true,
    })
  }
  yanzengmOnFocus = () => {
    this.setState({ yanzengmvalueErr: "" })
  }
  yzmOnClick = () => {
    if (!this.state.fasongyanzhengma) {
      if (!this.state.phoneOnChange) { return this.setState({ valueErr: "请输入手机号或邮箱", phone: false }) }
    }
    if (this.state.phone) {
      if (this.state.flgPhone) {
        Xfn({
          _u: 'send_reset_sms',
          _m: "post",
          _p: {
            phone: this.state.phoneOnChange
          }
        }, (res, c) => {
          if (c == 0) {
            let time = 60
            this.setState({
              timeFlg: false,
              butName: 60
            })
            times = setInterval(() => {
              time = time - 1
              this.setState({
                butName: time
              })
              if (time === 0) {
                clearInterval(times)
                this.setState({
                  timeFlg: true,
                  butName: "发送验证码"
                })
              }
            }, 1000)
          }
        }, "验证码发送成功")
      } else {
        Xfn({
          _m: "post",
          _u: "send_reset_email",
          _p: {
            email: this.state.phoneOnChange
          }
        }, (res, code) => {
          if (code == 0) {
            let time = 60
            this.setState({
              timeFlg: false,
              butName: 60
            })
            times = setInterval(() => {
              time = time - 1
              this.setState({
                butName: time
              })
              if (time === 0) {
                clearInterval(times)
                this.setState({
                  timeFlg: true,
                  butName: "发送验证码"
                })
              }
            }, 1000)
          }
        }, "验证码发送成功")

      }

    }
  }
  // ====================密码
  passHandleChange = (val) => {
    console.log(val)
  }
  passOnChange = (val) => {
    let value = val.target.value
    //必须包含数字，大写字母，小写字母，特殊字符四选三
    var reg = /^\d{1,}$/
    var strongRegex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$')//强
    var mediumRegex = new RegExp(reg) //中
    let a = null
    if (mediumRegex.test(val.target.value)) { a = "1" } else {
      a = "2"
    }
    if (strongRegex.test(val.target.value)) { a = "3" }
    if (value.indexOf(" ") == -1) {
      this.setState({
        passOnChange: value,
        pwd_level: a
      })
    }

  }
  passOnBule = () => {
    if (!this.state.passOnChange) { return this.setState({ passValueErr: "请输入新登录密码", pass: false, }) }
    if (this.state.passOnChange.length < 6) { return this.setState({ passValueErr: "密码不能小于6位", pass: false }) }
    if (this.state.passOnChange.length > 20) { return this.setState({ passValueErr: "密码不能大于20位", pass: false }) }
    this.setState({
      pass: true,
    })
  }
  passOnFocus = () => {
    this.setState({ passValueErr: "" })
  }
  // ====================id
  idOnChange = (val) => {
    let value = val.target.value
    if (value.indexOf(" ") == -1) {
      this.setState({
        idOnChange: value
      })
    }

  }
  // ====================确认密码
  zpassHandleChange = (val) => {
    console.log(val)
  }
  zpassOnChange = (val) => {
    let nub = true
    let value = val.target.value
    if (value.indexOf(" ") == -1) {
      this.setState({
        zpassOnChange: value
      })
    }
    if (value.length > 0) {
      for (var i = 0; i < value.length; i++) {
        if (value[i] == this.state.passOnChange[i]) {

        } else {
          nub = false
        }
      }
      if (nub == false) {
        return this.setState({ zpassValueErr: "两次密码输入不一致", pass: false })
      }
    }
    this.setState({
      zpass: true,
    })
  }
  zpassOnBule = () => {
    if (!this.state.zpassOnChange) { return this.setState({ zpassValueErr: "请输入新确认密码", pass: false, }) }
    if (this.state.zpassOnChange !== this.state.passOnChange) { return this.setState({ zpassValueErr: "两次密码输入不一致", pass: false, }) }
    this.setState({
      zpass: true,
    })
  }
  zpassOnFocus = () => {
    this.setState({ zpassValueErr: "" })
  }
  render() {
    const { area, butName, timeFlg,
      valueErr, phoneOnChange,
      yanzengmOnChange, yanzengmvalueErr,
      passOnChange, passValueErr,
      zpassOnChange, zpassValueErr,
    } = this.state
    return (
      <div>
        <LoginPhoneEmail
          type={"3"}
          placeholder="请输入手机号或邮箱"
          phoneValue={phoneOnChange}
          valueErr={valueErr}
          phoneOnChange={this.phoneOnChange}
          phoneOnBule={this.phoneOnBule}
          phoneOnFocus={this.phoneOnFocus}>
        </LoginPhoneEmail>

        <LoginPhoneEmail
          type="0"
          area={area}
          placeholder="验证码"
          butName={butName}
          butFlg={timeFlg}
          yzmOnClick={this.yzmOnClick}
          phoneOnChange={this.yanzengmOnChange}
          phoneValue={yanzengmOnChange}
          phoneOnBule={this.yanzengmOnBule}
          valueErr={yanzengmvalueErr}
          phoneOnFocus={this.yanzengmOnFocus}>
          >
      </LoginPhoneEmail>
        <LoginPhoneEmail
          type={"2"}
          placeholder="新登录密码"
          phoneOnChange={this.passOnChange}
          phoneValue={passOnChange}
          phoneOnBule={this.passOnBule}
          valueErr={passValueErr}
          phoneOnFocus={this.passOnFocus}
        >
        </LoginPhoneEmail>
        <LoginPhoneEmail
          type="2"
          placeholder="确认新密码"
          phoneOnChange={this.zpassOnChange}
          phoneValue={zpassOnChange}
          phoneOnBule={this.zpassOnBule}
          valueErr={zpassValueErr}
          phoneOnFocus={this.zpassOnFocus}
        >
        </LoginPhoneEmail>
        <Button
          onClick={this.redhandleSubmit}
          style={{ marginTop: 30, float: "left", width: "100%", backgroundColor: '#2f6fed' }}
          type="primary"
          className="login-form-button">
          <span style={{ fontSize: "16px" }}>提交</span>
        </Button>
      </div>
    );
  }

}


const NoremailmailgisterForm = Form.create({ name: 'normal_login' })(NormaemailaigisterForm);


export default NoremailmailgisterForm;