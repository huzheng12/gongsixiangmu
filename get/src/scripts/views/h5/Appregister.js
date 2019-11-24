import React, { Component } from 'react';
import './index.scss'
import { Select, Input, Checkbox, Button } from 'antd';
import { Xfn } from '../../../utils/axiosfn';
import { history } from '@/utils/history'
import { hex_md5, hex_hmac_md5 } from '@/utils/md5'
const { Option } = Select;
var times
class Appregister extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        logo_img: require('./img/xiazai_logo.png'),
        xiazai_img01: require('./img/xiazai_img01.png'),
        xiazai_img02: require('./img/xiazai_img02.png'),
        xiazai_img03: require('./img/yaoqing_zhuce_icon01.png'),
        but_ios01: require('./img/yaoqing_zhuce_icon02.png'),
        but_ios02: require('./img/yaoqing_zhuce_icon02(1).png'),
        checkbox_no: require('./img/checkbox_no.png'),
        checkbox_yes: require('./img/checkbox_yes.png'),
      },
      qiehuanclass: "action_pone",
      qiehuanclass1: "",
      area: [],
      phoneflg: true,
      area_code: "86",
      phone: "",
      verify_code: "",
      referrer_id: "Y12F32",
      password: "",
      confirm_pwd: "",
      checkbox: false,
      butflg: true,
      pwd_level: "",
      butName: "发送",
      timeFlg: true,

    }
  }
  componentDidMount() {

    function check() {
      var userAgentInfo = navigator.userAgent;
      var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
    if (check() == true) {
      // window.location.href
    }
    this.setState({
      referrer_id: this.props.match.params.name
    })
    document.getElementsByTagName("body")[0].id = "h5html"
    Xfn({
      _u: "area",
      _m: "post",
      _p: {

      }
    }, (res, code) => {
      if (code == 0) {
        console.log(res)
        this.setState({
          area: res.data.data.area
        })
      }
    })
  }
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].id = ""
  }
  code_area = (val) => {//区号
    this.setState({
      area_code: val
    })
  }
  phone = (val) => {
    console.log(val)
    this.setState({
      phone: val.target.value
    })
  }
  verify_code = (val) => {
    this.setState({
      verify_code: val.target.value
    })
  }
  password = (val) => {
    //必须包含数字，大写字母，小写字母，特殊字符四选三
    var reg = /^\d{1,}$/
    var strongRegex = new RegExp('^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$')//强
    var mediumRegex = new RegExp(reg) //中
    let a = null
    if (mediumRegex.test(val.target.value)) { a = "1" } else {
      a = "2"
    }
    if (strongRegex.test(val.target.value)) { a = "3" }
    this.setState({
      password: val.target.value,
      pwd_level: a
    })
  }
  confirm_pwd = (val) => {
    this.setState({
      confirm_pwd: val.target.value
    })
  }
  checkbox = (val) => {
    console.log(val.target.checked)
    this.setState({
      checkbox: val.target.checked
    })
  }
  code_verification = () => {
    if (!this.state.timeFlg) { return false }
    var objphone = {
      area_code: this.state.area_code,
      phone: this.state.phone
    }
    var objemail = {
      email: this.state.phone
    }
    if (this.state.phone) {
      Xfn({
        _u: this.state.phoneflg ? 'send_sms_verify_code' : 'send_email_verify_code',
        _m: 'post',
        _p: this.state.phoneflg ? objphone : objemail
      }, (res, code) => {
        if (code == 0) {
          let time = 60
          this.setState({
            timeFlg: false,
            butName: 60 + "s重新发送"
          })
          times = setInterval(() => {
            time = time - 1
            this.setState({
              butName: time + "s重新发送"
            })
            if (time === 0) {
              clearInterval(times)
              this.setState({
                timeFlg: true,
                butName: "发送"
              })
            }
          }, 1000)
        }
      })
    }
  }
  tijiao = () => {
    console.log(this.state.confirm_pwd)
    if (this.state.phoneflg) {
      Xfn({
        _u: 'register_by_phone',
        _m: "post",
        _p: {
          area_code: this.state.area_code,
          phone: this.state.phone,
          password: hex_md5(this.state.password),
          confirm_pwd: hex_md5(this.state.confirm_pwd),
          referrerId: this.state.referrer_id,
          verify_code: this.state.verify_code,
          pwd_level: this.state.pwd_level
        },
      }, (res, code) => {
        if (code == 0) {

        }
      })
    } else {
      Xfn({
        _u: "register",
        _m: 'post',
        _p: {
          email: this.state.phone,
          password: hex_md5(this.state.password),
          confirm_pwd: hex_md5(this.state.confirm_pwd),
          referrerId: this.state.referrer_id,
          verify_code: this.state.verify_code,
          pwd_level: this.state.pwd_level
        }
      }, (res, code) => {
        if (code == 0) {

        }
      })
    }
  }
  render() {
    const {
      imgArr, qiehuanclass, qiehuanclass1, area, referrer_id, phone,
      verify_code, password, confirm_pwd, checkbox, butName, phoneflg
    } = this.state
    if (document.getElementById("launcher")) {
      document.getElementById("launcher").style.display = 'none'
    }
    return (
      <div className="appregister_warp">
        <header>
          <img class="logo_img" src={imgArr.logo_img} alt="" />
          <div class="h1_title">
            全球领先的数字合约交易平台
          </div>
          <div class="sub_h3">
            安全 · 稳定 · 可信
          </div>
        </header>
        <main>
          <div className="zhuce">
            注册
          </div>
          <div className="title-qiehuan">
            <div className={qiehuanclass} onClick={() => {
              this.setState({
                qiehuanclass: 'action_pone',
                qiehuanclass1: "",
                phoneflg: true
              })
            }}>手机</div>
            <div className={qiehuanclass1} onClick={() => {
              this.setState({
                qiehuanclass: '',
                qiehuanclass1: "action_pone",
                phoneflg: false
              })
            }}>邮箱</div>
          </div>
          <div className="p_input_form">
            {
              this.state.phoneflg ? <Select defaultValue="86" style={{ width: '1rem ' }} onChange={this.code_area}>
                {
                  area.map((item, index) => {
                    return <Option value={item.area_code} key={item + index}>{"+ " + item.area_code}</Option>
                  })
                }
              </Select> : ""
            }
            <Input placeholder={phoneflg ? "请输入手机号" : "请输入邮箱"} style={{ width: "70%" }} onChange={this.phone} />
          </div>
          <div className="p_input_form">
            <Input placeholder={phoneflg ? "请输入手机验证码" : "请输入邮箱验证码"} style={{ width: "70%" }} onChange={this.verify_code} /> <span className="spana_fasong" onClick={this.code_verification}>{
              butName}</span>
          </div>
          <div className="p_input_form">
            <Input placeholder="请设置密码" type="password" onChange={this.password} style={{ width: "70%" }} />
          </div>
          <div className="p_input_form">
            <Input placeholder="请确认密码" type="password" onChange={this.confirm_pwd} style={{ width: "70%" }} />
          </div>
          <div className="p_input_form">
            <Input style={{ width: "70%" }} disabled value={referrer_id} />
          </div>
          <div className="p_inputruandu">
            <Checkbox onChange={this.checkbox}>我已阅读并同意</Checkbox>
            <span class="spanxieyi">《用户协议》</span>
          </div>
          <div className="p_inputruandu clear">
            <Button onClick={this.tijiao} type="primary" disabled={phone !== "" && verify_code !== "" && password !== "" && confirm_pwd !== "" && checkbox === true ? false : true}>
              <div>
                注册
              </div>
            </Button>

          </div>
        </main>
        <footer>
          <div class="imgbg">
          </div>
          <div class="imgbgsizi">
            <div class="title">
              GTE，下一代加密资产交易平台
      </div>
            <div class="xobox">
              高达100倍杠杆。交易永续合约。业界领先的安全
              性。欢迎来到最先进的比特币交易平台。
      </div>
            <img src={imgArr.xiazai_img03} class="anquankeyxing" alt="" />
            <div class="title-32x">
              安全可信赖
      </div>
            <div class="xobox">
              <li>
                5 年数字资产金融服务商经验
        </li>
              <li>
                专业分布式架构和防DDOS攻击系统
        </li>
            </div>
            <img src={imgArr.but_ios01} class="anquankeyxing" alt="" />
            <div class="title-32x">
              充足的流动性
      </div>
            <div class="xobox">
              <li>
                10倍充沛的流动性
        </li>
              <li>
                满足订单瞬时成交
        </li>
            </div>
            <img src={imgArr.but_ios02} class="anquankeyxing" alt="" />
            <div class="title-32x">
              用户至上
            </div>
            <div class="xobox">
              <li>
                建立先行赔付机制
              </li>
              <li>
                设立投资者保护基金
              </li>

            </div>
          </div>


        </footer>

      </div >
    );
  }
}

export default Appregister;