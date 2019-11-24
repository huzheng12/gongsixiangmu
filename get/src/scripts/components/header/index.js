import React, { Component } from 'react'
import "./index.scss"
import store from '@/scripts/store'
import { connect } from "react-redux";
import { change_language, tokenfun, positionfunction, orderfuntion, zhutiyanzheng, pcaccount, heyuename } from "../../action";
import { FormattedMessage } from 'react-intl';
import { NavLink, Link } from "react-router-dom"
import { Select, Button } from 'antd';
import Qrcode from "qrcode.react";
import { history } from '@/utils/history'
import Subscribe from '../../../utils/ws_sub_unsub';
import { Xfn } from '../../../utils/axiosfn';
const { Option } = Select;
@connect(
  state => {
    return {
      language: state.data.language,
      token: state.data.token,
      heyuename: state.data.heyuename,
      pcassetquery: state.data.pcassetquery,
      headerZX: state.datum.headerZX,
      asset: state.data.asset,
    }
  }
)
class Header extends Component {
  constructor() {
    super()
    this.state = {
      downloadapp: "https://hupa.7766.org:3013/#/h5iosdownload",
      imgArr: {
        log1: require("../../img/logo.png"),
        log2: require("../../img/nav_head.png"),
        log3: require("../../img/nav_info.png"),
        log4: require("../../img/top_hot.png"),
        log5: require("../../img/top_download01.png"),
        a1: require('../../img/treaty_up.png'),
        a2: require('../../img/treaty_down.png'),
        AUD: require('../../img/Coin/money0101.png'),
        AUD1: require('../../img/Coin/money0102.png'),
        BRL: require('../../img/Coin/money0201.png'),
        BRL1: require('../../img/Coin/money0202.png'),
        CAD: require('../../img/Coin/money0301.png'),
        CAD1: require('../../img/Coin/money0302.png'),
        CNY: require('../../img/Coin/money0401.png'),
        CNY1: require('../../img/Coin/money0402.png'),
        EUR: require('../../img/Coin/money0501.png'),
        EUR1: require('../../img/Coin/money0502.png'),
        GBP: require('../../img/Coin/money0601.png'),
        GBP1: require('../../img/Coin/money0602.png'),
        IDR: require('../../img/Coin/money0701.png'),
        IDR1: require('../../img/Coin/money0702.png'),
        INR: require('../../img/Coin/money0801.png'),
        INR1: require('../../img/Coin/money0802.png'),
        JPY: require('../../img/Coin/money0901.png'),
        JPY1: require('../../img/Coin/money0902.png'),
        KRW: require('../../img/Coin/money1001.png'),
        KRW1: require('../../img/Coin/money1002.png'),
        RUB: require('../../img/Coin/money1101.png'),
        RUB1: require('../../img/Coin/money1102.png'),
        TRY: require('../../img/Coin/money1201.png'),
        TRY1: require('../../img/Coin/money1202.png'),
        AUD: require('../../img/Coin/money1301.png'),
        AUD1: require('../../img/Coin/money1302.png'),
      },
      selecta: [
        { imgUrl: require("../../img/login/flag_chain.png"), tiile: "zh", conten: "中文" },
        { imgUrl: require("../../img/login/flag_english.png"), tiile: "en", conten: "英文" },
        { imgUrl: require("../../img/login/flag_japan.png"), tiile: "ja", conten: "日文" },
        { imgUrl: require("../../img/login/flag_russia.png"), tiile: "fr", conten: "法文" },
      ],
      liArr: [
        { text: <FormattedMessage id="home_page" defaultMessage={'首页'} />, routerurl: "/sices" },
        { text: <FormattedMessage id="Trade" defaultMessage={'合约交易'} />, routerurl: "/transaction" },
        { text: <FormattedMessage id="Financial_Center" defaultMessage={'财务中心'} />, routerurl: "/finance" },
        { text: <FormattedMessage id="Help_Center" defaultMessage={'帮助中心'} />, routerurl: "https://gtehelp.zendesk.com/hc/zh-cn" },
        { text: <FormattedMessage id="Invite_Commission" defaultMessage={'邀请返佣'} />, routerurl: "/fanyonganner" }
      ],
      quanbu: true,
    }
  }
  componentDidMount() {
    document.getElementsByTagName("body")[0].className = "theme-light"
  }
  tuichudenglu = () => {
    store.dispatch({ type: "TransactionPage", TransactionPage: "1" })
    store.dispatch(positionfunction([]))
    document.getElementsByTagName("body")[0].className = "theme-dark"
    this.setState({
      zhuti: "dark"
    })
    localStorage.theme = "dark"
    store.dispatch(zhutiyanzheng('dark', 1))
    sessionStorage.userInfo = "";
    sessionStorage.userName = "";
    history.push('/transaction')
  }
  tiaozhuan = () => {
    history.push('/personal')
  }
  atz = () => {
    history.push('/personal/security')
  }

  dengluyanzheng = () => {
    if (sessionStorage.userInfo) {
      return (
        <div className="longin">
          <div className="loginHover" onClick={this.tiaozhuan}>
            <div className="halflsk">
              {
                (() => {
                  if (sessionStorage.userName) {
                    if (sessionStorage.userName == "null" || sessionStorage.userName == "") {
                      return false
                    }
                    if (sessionStorage.userName.indexOf("@") == -1) {
                      return <span>{sessionStorage.userName.substr(0, 3) + "****" + sessionStorage.userName.substr(-4)}</span>
                    } else {
                      let a = sessionStorage.userName
                      return <div>
                        <span>
                          {a.substr(0, 3) + "****"}
                        </span>
                        <span>
                          {a.split("@")[1]}
                        </span>
                      </div>
                    }
                  } else {
                    sessionStorage.userInfo = "";
                    sessionStorage.userName = "";
                    store.dispatch(tokenfun(''))
                    store.dispatch(positionfunction([]))
                    store.dispatch(orderfuntion([]))
                    history.push('/login')
                  }
                })()
              }
            </div>
            <div className="loginHoverhezi">
              <li onClick={this.atz}><FormattedMessage id="Account_security" defaultMessage={'账户安全'} /></li>
              <Link to="/personal/grsecurity"><FormattedMessage id="identity_authentication" defaultMessage={'身份认证'} /></Link>
              <Link to="/personal/fxs"><FormattedMessage id="Fee_Level" defaultMessage={'手续费等级'} /></Link>
              <Link to="/personal/apiguanli"><FormattedMessage id="APIManagement" defaultMessage={'API管理'} /></Link>
              <li onClick={this.tuichudenglu}><FormattedMessage id="Log_out" defaultMessage={'退出登录'} /></li>
            </div>
            <div className="gangg">
            </div>
          </div>
          <div className="imgtupian1 img5" style={{ marginTop: 15, cursor: 'pointer' }}>
            <span className="iconfont">&#xe603;</span>
            <article className="hexizbox" style={{
              top: '35px',
              left: '-224px'
            }}>
              <article style={{ width: 100, height: 100, margin: 10, backgroundColor: "#fff" }}>
                <Qrcode
                  style={{ margin: 6 }}
                  value={this.state.downloadapp}
                  size={88}
                ></Qrcode>

              </article>
              <article className="androidclass">
                <p><FormattedMessage id="ScanCodeToDownloadApp" defaultMessage={'扫码下载App'} /></p>
                <p style={{ color: '#666666', }}>Android & iOS</p>
                <Button onClick={() => {
                  history.push('/iosdownload')
                }} type="primary" style={{ width: 100, height: 30, marginTop: 5, marginLeft: 10 }}>
                  <article className="div-chakangengduo ">
                    <FormattedMessage id="ViewMore" defaultMessage={'查看更多'} />>>
                  </article>
                </Button>
              </article>
            </article>
          </div>
          <div className="imgtupian1 img6" style={{ marginTop: 15, cursor: 'pointer' }}>
            <span className="iconfont">&#xe607;</span>
          </div>
        </div>
      )
    } else {
      return (
        < div className="longin1" >
          <NavLink to="/login" className="cheze2 ziticolor" activeClassName="selected"><FormattedMessage id="Sign_in" defaultMessage={'登录'} /></NavLink>
          <NavLink to="/register" className="cheze" activeClassName="selected"><FormattedMessage id="register" defaultMessage={'注册'} />  </NavLink>
          <div className="gangg a"></div>
          <div className="imgtupian1 img5" style={{ marginTop: 15, cursor: 'pointer' }}>
            <span className="iconfont hoverxiazai">&#xe603;</span>
            <div className="hexizbox">
              <div style={{ width: 100, height: 100, margin: 10, backgroundColor: "#fff" }}>
                {
                  console.log()
                }
                <Qrcode
                  style={{ margin: 6 }}
                  value={this.state.downloadapp}
                  size={88}
                ></Qrcode>

              </div>
              <div className="androidclass">
                <p><FormattedMessage id="ScanCodeToDownloadApp" defaultMessage={'扫码下载App'} /></p>
                <p style={{ color: '#666666', }}>Android & iOS</p>

                <Button onClick={() => {
                  history.push('/iosdownload')
                }} type="primary" style={{ width: 100, height: 30, marginTop: 5, marginLeft: 10 }}>
                  <div className="div-chakangengduo " >
                    <FormattedMessage id="ViewMore" defaultMessage={'查看更多'} /> >>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          <div className="imgtupian1 img6" style={{ marginTop: 15, cursor: 'pointer' }}>
            <span className="iconfont">&#xe607;</span>
          </div>
        </div >
      )
    }
  }
  jiaoyiyemian = () => {
    store.dispatch({ type: "TransactionPage", TransactionPage: "1" })
  }
  changeLanguage = (val) => {
    store.dispatch(change_language(val));
    localStorage.setItem('language', val);
  }
  handleChangeguoji = (val) => {
    this.changeLanguage(val)
  }
  dianjiquanbu = () => {
    if (this.state.quanbu) {
      this.setState({ quanbu: false })
      if (this.state.quanbu) {
        var that = this
        var para = document.createElement("div");
        para.id = "bud"
        var element = document.getElementById("root");
        element.appendChild(para);
        var bud = document.getElementById("bud");
        bud.onclick = () => {
          that.setState({
            quanbu: true
          })
          element.removeChild(bud);
        }
      }
    } else {
      var element = document.getElementById("root");
      var bud = document.getElementById("bud");
      this.setState({ quanbu: true })
      element.removeChild(bud);
    }
  }
  qiehuanusd = (a) => {
    Xfn({
      _u: 'pairQuery',
      _m: 'get',
      _p: {
        asset: a
      }
    }, (res, code) => {
      Subscribe({
        _por: this.props,
        _this: this,
        _asset: a,
        _pair: res.data.data.rows[0].symbol,
        _typt: 9//切换资产
      })

    })

  }
  render() {
    const {
      imgArr,
      selecta,
      quanbu,
    } = this.state
    const {
      language,
      pcassetquery
    } = this.props
    return (
      <div className="header-warp">
        <div className="header-left clear">
          <img onClick={() => history.push('/sices')} src={imgArr.log1} alt="" />
          <ul>
            <NavLink to='/sices' className="navlinkuo" activeClassName="selectedaaa">
              <FormattedMessage id="home_page" defaultMessage={'首页'} />
            </NavLink>
            <NavLink onClick={this.jiaoyiyemian} to={sessionStorage.userInfo ? '/transaction' : "/fulltrade"} className={window.location.hash.indexOf("cont") != -1 ? "navlinkuo selectedaaa" : "navlinkuo"} activeClassName="selectedaaa">
              <FormattedMessage id="Trade" defaultMessage={'合约交易'} />
              <span className="iconfont biaotiaicm">&#xe609;</span>
            </NavLink>
            <NavLink to='/finance' className="navlinkuo" activeClassName="selectedaaa">
              <FormattedMessage id="Financial_Center" defaultMessage={'财务中心'} />
            </NavLink>
            <a href="https://gtehelp.zendesk.com/hc/zh-cn" target="view_window" className="navlinkuo" >
              <FormattedMessage id="Help_Center" defaultMessage={'帮助中心'} />
            </a>
            <NavLink to='/fanyonganner' className="navlinkuo" activeClassName="selectedaaa">
              <FormattedMessage id="Invite_Commission" defaultMessage={'邀请返佣'} />
            </NavLink>
          </ul>
        </div>
        <div className="header-right">
          {
            this.dengluyanzheng()
          }
          <div className="xuanxiang" onClick={this.dianjiquanbu}>
            <div className="ggang">

            </div>
            <div className="inputxiala">
              {
                this.props.asset
              }
            </div>
            <img className="sximg" src={quanbu ? imgArr.a1 : imgArr.a2} alt="" />
            <div className="ggang">

            </div>
            <div className="inpusll-wawrp" style={{ display: quanbu ? "none" : "block" }} >
              {
                pcassetquery.map((item, index) => {
                  return <li key={item + index} onClick={() => this.qiehuanusd(item)} className={item === this.props.asset ? "action-inputxiala" : ""}>
                    <img src={imgArr.AUD} alt="" />
                    <div>
                      {item}
                    </div>
                  </li>
                })
              }

            </div>
          </div>
          <div className="guojihua">
            <Select
              defaultValue={language}
              style={{ width: 120, border: 0, backgroundColor: "rgba(18,24,38,1)" }}
              onChange={this.handleChangeguoji}>
              {
                selecta.map((item, index) => {
                  return (
                    <Option className="clear" value={item.tiile} key={"adfd" + index}>
                      <img style={{ display: "inline-block", marginRight: 10 }} src={item.imgUrl} alt="" />
                      <span style={{ display: "inline-block", marginTop: 1 }}>{item.conten}</span>
                    </Option>
                  )
                })
              }
            </Select>
          </div>
        </div>
      </div >
    )
  }
}
export default Header
