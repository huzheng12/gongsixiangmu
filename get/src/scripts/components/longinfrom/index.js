import React, { Component } from 'react';
import './index.scss'
import { Button, message } from 'antd';
import { Link } from "react-router-dom"
import { hex_md5, hex_hmac_md5 } from '@/utils/md5'
import { history } from '@/utils/history'
import store from '@/scripts/store.js'
import { FormattedMessage } from 'react-intl';
import {
  tokenfun
} from "@/scripts/action";
import LoginPhoneEmail from '../login';
import { zhutiyanzheng } from '../../action';
import { Xfn } from '../../../utils/axiosfn';
import lang from '@/utils/language';
class WrappedNormalLoginForm extends Component {
  constructor() {
    super()
    this.state = {
      area: [],//手机区号
      phoneOnChange: "",
      valueErr: "",
      passOnChange: "",
      passValueErr: "",
      area_code: "86",
      phone: false,
      pass: false
    }
  }

  phoneSbmit = () => {
    const { type } = this.props
    this.phoneOnBule()
    this.passOnBule()
    const obj = {
      _m: "post",
      _u: "loginpoSt",
      _p: {
        account: this.state.phoneOnChange,
        password: hex_md5(this.state.passOnChange)
      }
    }
    if (this.state.phone && this.state.pass) {
      Xfn(obj, (res, code) => {
        if (code == 0) {
          if (res.data.data.token == "" || res.data.data.token == null) {
            const userxinxi = {
              account: this.state.phoneOnChange,
              password: hex_md5(this.state.passOnChange),
              verify_type: res.data.data.verify_type,
              login_type: res.data.data.login_type
            }
            // if (type == "1") { userxinxi.area_code = this.state.area_code }
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
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown)
    Xfn({
      _m: "post",
      _u: "area",
      _p: {}
    }, (res, c) => {
      if (c == 0) {
        this.setState({
          area: res.data.data.area
        })
      }
    })
  }
  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.phoneSbmit()
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown)
  }
  phandleChange = (val) => {
    console.log(val)
    this.setState({ area_code: val })
  }
  phoneOnChange = (val) => {
    let value = val.target.value
    if (this.props.type == "1") {
      value = value.replace(/\D/g, '')
    }
    if (value.indexOf(" ") == -1) {
      this.setState({
        phoneOnChange: value
      })
    }

  }
  phoneOnBule = () => {
    if (!this.state.phoneOnChange) {
      if (!this.state.phoneOnChange) { return this.setState({ valueErr: lang().PleaseEnterYourMobileNumberOrEmail, phone: false }) }
      if (this.state.phoneOnChange.length < 5) { return this.setState({ valueErr: lang().FormatError, phone: false, }) }
    }
    this.setState({
      phone: true,
    })
  }
  phoneOnFocus = () => {
    this.setState({ valueErr: "" })
  }
  passHandleChange = (val) => {
    console.log(val)
  }
  passOnChange = (val) => {
    let value = val.target.value
    if (value.indexOf(" ") == -1) {
      this.setState({
        passOnChange: value
      })
    }
  }
  passOnBule = () => {
    if (!this.state.passOnChange) { return this.setState({ passValueErr: lang().Please_input_a_password, pass: false, }) }
    if (this.state.passOnChange.length < 6) { return this.setState({ passValueErr: lang().PasswordCannotBeLessThan6Digits, pass: false }) }
    if (this.state.passOnChange.length > 20) { return this.setState({ passValueErr: lang().PasswordCannotBeGreaterThan20Digits, pass: false }) }
    this.setState({
      pass: true,
    })
  }
  passOnFocus = () => {
    this.setState({ passValueErr: "" })
  }
  render() {
    const { area, phoneOnChange, valueErr, passOnChange, passValueErr } = this.state
    const { type } = this.props
    return (
      <div className="longinfrom-warpaaa">
        <LoginPhoneEmail
          className="phone11"
          type={'3'}
          handleChange={this.phandleChange}
          placeholder={lang().PleaseEnterYourMobileNumberOrEmail}
          area={area}
          phoneOnChange={this.phoneOnChange}
          phoneValue={phoneOnChange}
          phoneOnBule={this.phoneOnBule}
          valueErr={valueErr}
          phoneOnFocus={this.phoneOnFocus}
        ></LoginPhoneEmail>
        <LoginPhoneEmail
          type={"2"}
          placeholder={lang().Please_input_a_password}
          handleChange={this.passHandleChange}
          phoneOnChange={this.passOnChange}
          phoneValue={passOnChange}
          phoneOnBule={this.passOnBule}
          valueErr={passValueErr}
          phoneOnFocus={this.passOnFocus}
        ></LoginPhoneEmail>
        <div className="but clear">
          <Button style={{ marginTop: 30 }} type="primary" onClick={this.phoneSbmit} className="login-form-button bglanse">
            <FormattedMessage id="Sign_in" defaultMessage={'登录'} />
          </Button>
        </div>
        <div className="foot-lognphone">
          <span className="re"><FormattedMessage id="No_account" defaultMessage={'没有账号'} />?</span>
          <Link style={{ marginLeft: 20 }} to="/register" >
            <FormattedMessage id="Immediate_registration" defaultMessage={'立即注册'} />
          </Link>
          <Link style={{ float: "right" }} to="/resetpass">
            <FormattedMessage id="Forget_the_password" defaultMessage={'忘记密码'} />
          </Link>
        </div>
      </div>
    );
  }
}


export default WrappedNormalLoginForm;