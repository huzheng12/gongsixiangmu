import React, { Component } from 'react';
import './index.scss'
import {
  Button, Checkbox, message
} from 'antd';
import { api } from '@/utils/api.js'
import store from '@/scripts/store.js'
import { hex_md5, hex_hmac_md5 } from '@/utils/md5'
import {
  tokenfun
} from "@/scripts/action";
import axios from '@/utils/ajax'
import { history } from '@/utils/history'
import LoginPhoneEmail from '../../../components/login';
import { Xfn } from '../../../../utils/axiosfn';
import { zhutiyanzheng } from '../../../action';
var times

class WrappedNormalregisterForm extends Component {
  constructor() {
    super()
    this.state = {
      area: [],//手机区号
      areas: "86",
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
      fasongyanzhengma: false,
      pwd_level: ""
    }
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.dengluzhuce()
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown)

    axios({
      method: "post",
      url: api.area,
      params: {
        time: new Date().getTime().toString()
      }
    }).then(res => {
      if (res.data.code == 0) {
        this.setState({
          area: res.data.data.area
        })
      } else {
        message.error(res.data.msg)
      }
    })
  }
  dengluzhuce = () => {
    this.phoneOnBule()
    this.yanzengmOnBule()
    this.passOnBule()
    this.zpassOnBule()
    if (this.state.phone && this.state.pass && this.state.zpass && this.state.yanzengm) {
      Xfn({
        _u: 'register_by_phone',
        _m: "post",
        _p: {
          area_code: this.state.areas,
          phone: this.state.phoneOnChange,
          password: hex_md5(this.state.passOnChange),
          confirm_pwd: hex_md5(this.state.zpassOnChange),
          referrerId: this.state.idOnChange,
          verify_code: this.state.yanzengmOnChange,
          pwd_level: this.state.pwd_level
        },
      }, (res, code) => {
        if (code == 0) {
            Xfn({
              _m: "post",
              _u: "loginpoSt",
              _p: {
                account: this.state.phoneOnChange,
                password: hex_md5(this.state.passOnChange)
              }
            }, (res, code) => {
              if (code == 0) {
                if (res.data.data.token == "" || res.data.data.token == null) {
                  const userxinxi = {
                    account: this.state.phoneOnChange,
                    password: hex_md5(this.state.passOnChange),
                    verify_type: res.data.data.verify_type,
                    login_type: res.data.data.login_type
                  }
                  userxinxi.area_code = this.state.areas
                  store.dispatch({ type: "zhanghaoxinxi", userxinxi })
                  history.push("/verifytype")
                } else {
                  document.getElementsByTagName("body")[0].className = "theme-light"
                  this.setState({
                    zhuti: "light"
                  })
                  localStorage.theme = "light"
                  store.dispatch(zhutiyanzheng('light', 1))
                  sessionStorage.userInfo = res.data.data.token
                  sessionStorage.userName = res.data.data.user_name
                  store.dispatch(tokenfun(res.data.data.token, 1))
                  history.push("/transaction")
                }
              }
            })
        }
      })
    }
  }

  // ====================手机
  phandleChange = (val) => {
    this.setState({ areas: val })
  }
  phoneOnChange = (val) => {
    let value = val.target.value
    value = value.replace(/\D/g, '')
    if (value.indexOf(" ") == -1) {
      this.setState({
        phoneOnChange: value,
      })
    }

  }
  phoneOnBule = () => {
    this.setState({
      fasongyanzhengma: true
    })
    if (!this.state.phoneOnChange) { return this.setState({ valueErr: "请输入手机号", phone: false }) }
    if (this.state.phoneOnChange.length < 5) { return this.setState({ valueErr: "手机号格式错误", phone: false, }) }
    Xfn({
      _u: 'check_phone',
      _m: 'post',
      _p: {
        area_code: this.state.areas,
        phone: this.state.phoneOnChange
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          phone: true,
        })
      } else {
        this.setState({ phone: false, valueErr: res.data.msg })
      }
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
      if (!this.state.phoneOnChange) { return this.setState({ valueErr: "请输入手机号", phone: false }) }
    }
    if (this.state.phone) {
      Xfn({
        _u: 'send_sms_verify_code',
        _m: 'post',
        _p: {
          area_code: this.state.areas,
          phone: this.state.phoneOnChange
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
  // ====================密码
  passHandleChange = (val) => {
    console.log(val)
  }
  passOnChange = (val) => {
    let value = val.target.value
    // value = value.replace(/\D/g, '')
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
    if (!this.state.passOnChange) { return this.setState({ passValueErr: "请输入密码", pass: false, }) }
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
    if (!this.state.zpassOnChange) { return this.setState({ zpassValueErr: "请输入确认密码", pass: false, }) }
    if (this.state.zpassOnChange !== this.state.passOnChange) { return this.setState({ zpassValueErr: "两次密码输入不一致", pass: false, }) }
    this.setState({
      zpass: true,
    })
  }
  zpassOnFocus = () => {
    this.setState({ zpassValueErr: "" })
  }
  onCheckAllChange = () => {
    this.setState({
      checkAll: !this.state.checkAll
    })
  }
  render() {
    const { area, butName, timeFlg,
      valueErr, phoneOnChange,
      yanzengmOnChange, yanzengmvalueErr,
      passOnChange, passValueErr,
      zpassOnChange, zpassValueErr,
      idOnChange, checkAll
    } = this.state
    return (
      <div className="phoneRegister-warp">
        <LoginPhoneEmail
          type={"1"}
          area={area}
          placeholder="手机号"
          phoneValue={phoneOnChange}
          valueErr={valueErr}
          handleChange={this.phandleChange}
          phoneOnChange={this.phoneOnChange}
          phoneOnBule={this.phoneOnBule}
          phoneOnFocus={this.phoneOnFocus}>
        </LoginPhoneEmail>

        <LoginPhoneEmail
          type="0"
          area={area}
          placeholder="请输入验证码"
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
          placeholder="设置密码"
          handleChange={this.passHandleChange}
          phoneOnChange={this.passOnChange}
          phoneValue={passOnChange}
          phoneOnBule={this.passOnBule}
          valueErr={passValueErr}
          phoneOnFocus={this.passOnFocus}
        >
        </LoginPhoneEmail>
        <LoginPhoneEmail
          type="2"
          placeholder="确认密码"
          handleChange={this.zpassHandleChange}
          phoneOnChange={this.zpassOnChange}
          phoneValue={zpassOnChange}
          phoneOnBule={this.zpassOnBule}
          valueErr={zpassValueErr}
          phoneOnFocus={this.zpassOnFocus}
        >
        </LoginPhoneEmail>
        <LoginPhoneEmail
          type="3"
          placeholder="邀请码（选填）"
          phoneOnChange={this.idOnChange}
          phoneValue={idOnChange}
        >
        </LoginPhoneEmail>
        <div className="qu">
          <Checkbox checked={this.state.checkAll} onChange={this.onCheckAllChange}>我已阅读并同意</Checkbox>
          <a className="login-form-forgot" href="">
            《用户协议》
          </a>
        </div>
        <Button
          disabled={!this.state.checkAll}
          onClick={this.dengluzhuce}
          style={{ marginTop: 30, float: "left", width: "100%", backgroundColor: '#2f6fed' }}
          type="primary"
          className="login-form-button">
          <span style={{ fontSize: "16px" }}>注册</span>
        </Button>
      </div>
    );
  }

}





export default WrappedNormalregisterForm;