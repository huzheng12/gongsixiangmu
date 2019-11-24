import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import LoginPhoneEmail from './login';
import { Tooltip, Button } from 'antd';
import { history } from '@/utils/history'
import store from '@/scripts/store.js'
import { pricenubkaicang } from '../action';
import { Xfn } from '../../utils/axiosfn';
import { openNotificationWithIcon } from '../../utils/NotificationCONF';
@connect(
  state => {
    return {
      ticker: state.data.ticker,
      funding: state.data.funding,
      heyuename: state.data.heyuename,
      pc_account: state.data.pc_account,
      priceNub: state.data.priceNub,
      pricenubkaicang: state.data.pricenubkaicang,
      position: state.data.position,
      asset: state.data.asset,
      orderBookL2_25obj: state.data.orderBookL2_25obj,
    }
  }
)
class OrderPage extends Component {
  constructor() {
    super()
    this.state = {
      flgduishoujia: false,
      cangwei: 1,
    }
  }
  fasongmaiduo = (nummai) => {
    let price
    if (!sessionStorage.userInfo) {
      history.push('/login')
      return false
    }
    if (this.state.flgduishoujia) {
      if (this.props.orderBookL2_25obj.arrAsks.length > 0) {
        if (nummai == "1") {
          price = this.props.orderBookL2_25obj.arrAsks[0].price
        } else {
          price = this.props.orderBookL2_25obj.arrBids[0].price
        }
      } else {
        openNotificationWithIcon("opne-warning", "警告", '请输入正确的价格')
        return false
      }
    } else {
      price = !this.state.flgduishoujia ? this.props.pricenubkaicang : this.props.orderBookL2_25obj.arrAsks[0].price
    }
    let qty = this.state.cangwei
    let ticker = this.props.ticker.pair
    if (!price) {
      openNotificationWithIcon("opne-warning", "警告", '请输入正确的价格')
      return false;
    }
    if (!qty) {
      openNotificationWithIcon("opne-warning", "警告", '请输入正确的数量')
      return false;
    }
    let time = new Date().getTime().toString()
    var obj = {
      "symbol": this.props.heyuename,
      "bid_flag": nummai,
      "price": price,
      "qty": this.state.cangwei,
      "close_flag": this.props._type == 1 ? "0" : "1",
      "order_type": "1",
      "time": time,
      "asset": this.props.asset
    }
    Xfn({
      _m: "post",
      _u: "order1",
      _p: obj
    }, (res, code) => { }, "交易成功")

  }
  duishoujia = () => {
    store.dispatch(pricenubkaicang(""))
    this.setState({
      flgduishoujia: !this.state.flgduishoujia
    })
  }
  valueChange = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    switch (this.props.heyuename) {
      case "BTC_USD": value = value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');//只能输入两个小数  ;
        break;
      case "ETH_USD": value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  ;
        break;
      case "EOS_USD": value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');//只能输入两个小数  ;
        break;
    }

    if (value * 1 > 1000000) {
      store.dispatch(pricenubkaicang(1000000))
      return openNotificationWithIcon("opne-warning", "警告", "价格不能超过1000000")
    }
    if (value[0] != "0" && value[0] != ".") {
      store.dispatch(pricenubkaicang(value))
    }
  }
  shuliang = (e) => {
    let value = e.target.value;
    if (value * 1 > 100000000) {
      this.setState({
        cangwei: "100000000"
      })
      return openNotificationWithIcon("opne-warning", "警告", "数量不能超过100000000")
    }
    if (value >= 0 && value[0] != "0") {
      this.setState({
        cangwei: value.replace(/[^0-9-]+/, '')
      })
    }
  }
  render() {
    const {
      cangwei,
      flgduishoujia,
    } = this.state
    const {
      pc_account,
      pricenubkaicang,
      position,
      _type
    } = this.props

    return (
      <div>
        <LoginPhoneEmail
          disabled={true}
          type={'2'}
          prefix={<span><FormattedMessage id="Delegation_type" defaultMessage={'委托类型'} /></span>}
          suffix={
            <Tooltip className="tooltip-001">
              <FormattedMessage id="limit_order" defaultMessage={'限价委托'} />
            </Tooltip>
          }
        />
        <div className="input-0008">
          <LoginPhoneEmail
            className="rival-price"
            phoneValue={!flgduishoujia ? pricenubkaicang : ""}
            phoneOnChange={this.valueChange}
            disabled={flgduishoujia ? true : false}
            type={'5'}
            butOnClick={this.duishoujia}
            contentRivalPrice={<FormattedMessage id="Counterpart_price" defaultMessage={'对手价'} />}
            prefix={<span><FormattedMessage id="Fixed_price" defaultMessage={'限价'} /></span>}
            suffix={
              <Tooltip className="tooltip-001">
                USD
            </Tooltip>}
          />
        </div>
        <div className="input-0009">
          <LoginPhoneEmail
            phoneValue={cangwei}
            phoneOnChange={this.shuliang}
            type={'3'}
            prefix={<span><FormattedMessage id="Warehouse_position" defaultMessage={'仓位'} /></span>}
            suffix={
              <Tooltip className="tooltip-001">
                <span><FormattedMessage id="Zhang" defaultMessage={'张'} /></span>
              </Tooltip>
            }
          />
        </div>
        {
          (() => {
            if (sessionStorage.userInfo) {
              return (
                <div>
                  <div className="cangweijiazhi">
                    <p>
                      <span>
                        <FormattedMessage id="Available_balance" defaultMessage={'可用余额'} />：
                      </span>
                      <span>
                        {pc_account && pc_account.available}
                      </span>
                      <span>
                        {pc_account && pc_account.symbol}
                      </span>
                    </p>
                  </div>
                  {
                    (() => {
                      if (window.location.hash.indexOf("fulltrade") != -1) {
                        return <div className="but-fultrade-box">
                          <div className="but-fulltrade-left">
                            <Button className="button-00010 butgg lvse" type="primary" onClick={() => this.fasongmaiduo("1")} >
                              <div>
                                <span>
                                  {
                                    _type == 1 ? <FormattedMessage id="Buy_more" defaultMessage={'买入开多'} /> : <FormattedMessage id="Buy_flat" defaultMessage={'买入平空'} />
                                  }
                                </span>
                                <span style={{ marginLeft: 7 }}><FormattedMessage id="Bullish" defaultMessage={'看涨'} /></span>
                              </div>
                            </Button>
                            <div className="but-bottom-wenzi">
                              <span>
                                {
                                  _type == 1 ? <FormattedMessage id="Kekeduo" defaultMessage={'可开多'} /> : <FormattedMessage id="Empty_warehouse_can_be_leveled" defaultMessage={'空仓可平'} />
                                }
                                ：
                              </span>
                              <span style={{ wordBreak: "break-all", wordWrap: "break-word" }}>
                                {
                                  (() => {
                                    console.log(564654)
                                    if (!sessionStorage.userInfo) {
                                      return "0"
                                    }
                                    if (_type == 1) {
                                      return pc_account.bid_max_qty
                                    }
                                    for (let i = 0; i < position.length; i++) {
                                      if (position[i].symbol === this.props.heyuename) {
                                        if (position[i].bid_flag == "0") {
                                          return (position[i].avail_qty)
                                        }
                                      }
                                    }
                                    return "0"
                                  })()
                                }
                              </span>
                              <span>
                                <FormattedMessage id="Zhang" defaultMessage={'张'} />
                              </span>
                            </div>
                          </div>
                          <div className="but-fulltrade-right">
                            <Button className="button-00010 butgt bgred" type="primary" onClick={() => this.fasongmaiduo("0")}>
                              <div>
                                <span>
                                  {
                                    _type == 1 ? <FormattedMessage id="Short_selling" defaultMessage={'卖出开空'} /> : <FormattedMessage id="Sell_Pinto" defaultMessage={'卖出平多'} />
                                  }
                                </span>
                                <span style={{ marginLeft: 7 }}><FormattedMessage id="Bearish" defaultMessage={'看跌'} /></span>
                              </div>
                            </Button>
                            <div className="but-bottom-wenzi">
                              <span>
                                {
                                  _type == 1 ? <FormattedMessage id="Openable" defaultMessage={'可开空'} /> : <FormattedMessage id="Empty_warehouse_can_be_leveled" defaultMessage={'空仓可平'} />
                                }
                                ：
                    </span>
                              <span style={{ wordBreak: "break-all", wordWrap: "break-word" }}>
                                {
                                  (() => {
                                    if (!sessionStorage.userInfo) {
                                      return "0"
                                    }
                                    if (_type == 1) {
                                      return pc_account.ask_max_qty
                                    }
                                    for (let i = 0; i < position.length; i++) {
                                      if (position[i].symbol === this.props.heyuename) {
                                        if (position[i].bid_flag == "1") {
                                          return (position[i].avail_qty)
                                        }
                                      }
                                    }
                                    return "0"
                                  })()
                                }
                              </span>
                              <span>
                                <FormattedMessage id="Zhang" defaultMessage={'张'} />
                              </span>
                            </div>
                          </div>
                        </div>
                      } else {
                        return <div className="kaicang-but clear">
                          <div style={{ float: "left" }} >
                            <Button className="button-00010 butgg lvse" type="primary" onClick={() => this.fasongmaiduo("1")} >
                              <div>
                                <span>
                                  {
                                    _type == 1 ? <FormattedMessage id="Buy_more" defaultMessage={'买入开多'} /> : <FormattedMessage id="Buy_flat" defaultMessage={'买入平空'} />
                                  }
                                </span>
                                <span style={{ marginLeft: 7 }}><FormattedMessage id="Bullish" defaultMessage={'看涨'} /></span>
                              </div>
                              <div className="border-kaicang">

                              </div>
                              <div>
                                {cangwei}@{this.state.flgduishoujia ? this.props.orderBookL2_25obj.arrAsks.length > 0 ? this.props.orderBookL2_25obj.arrAsks[0].price : "0" : pricenubkaicang ? pricenubkaicang : "0"}
                                <span style={{
                                  width: " 12px",
                                  height: 12,
                                  borderRadius: 6,
                                  backgroundColor: "rgb(255, 255, 255)",
                                  fontSize: 12,
                                  margin: 0,
                                  textAlign: "center",
                                  lineHeight: "12px",
                                  display: "inline - block",
                                  paddingLeft: "2.5px",
                                  color: '#26994e',
                                  marginLeft: 7,
                                  display: "inline-block"
                                }}>
                                  ？
                          </span>
                              </div>
                            </Button>

                            <div>
                              <span>

                              </span>
                            </div>
                            <div className="but-bottom-wenzi">
                              <span>
                                {
                                  _type == 1 ? <FormattedMessage id="Kekeduo" defaultMessage={'可开多'} /> : <FormattedMessage id="Empty_warehouse_can_be_leveled" defaultMessage={'空仓可平'} />
                                }
                                ：
                              </span>
                              <span style={{ wordBreak: "break-all", wordWrap: "break-word" }}>
                                {
                                  (() => {
                                    if (!sessionStorage.userInfo) {
                                      return "0"
                                    }
                                    if (_type == 1) {
                                      return pc_account.bid_max_qty
                                    }
                                    for (let i = 0; i < position.length; i++) {
                                      if (position[i].symbol === this.props.heyuename) {
                                        if (position[i].bid_flag == "0") {
                                          return (position[i].avail_qty)
                                        }
                                      }
                                    }
                                    return "0"
                                  })()
                                }
                              </span>
                              <span>
                                <FormattedMessage id="Zhang" defaultMessage={'张'} />
                              </span>
                            </div>
                          </div>
                          <div style={{ float: "right" }}>
                            <Button className="button-00010 butgt bgred" type="primary" onClick={() => this.fasongmaiduo("0")}>
                              <div>
                                <span>
                                  {
                                    _type == 1 ? <FormattedMessage id="Short_selling" defaultMessage={'卖出开空'} /> : <FormattedMessage id="Sell_Pinto" defaultMessage={'卖出平多'} />
                                  }
                                </span>
                                <span style={{ marginLeft: 7 }}><FormattedMessage id="Bearish" defaultMessage={'看跌'} /></span>
                              </div>
                              <div className="border-kaicang">

                              </div>
                              <div>
                                {cangwei}@{this.state.flgduishoujia ? this.props.orderBookL2_25obj.arrBids.length > 0 ? this.props.orderBookL2_25obj.arrBids[0].price : "0" : pricenubkaicang ? pricenubkaicang : "0"}
                                <span style={{
                                  width: " 12px",
                                  height: 12,
                                  borderRadius: 6,
                                  backgroundColor: "rgb(255, 255, 255)",
                                  fontSize: 12,
                                  margin: 0,
                                  textAlign: "center",
                                  lineHeight: "12px",
                                  display: "inline - block",
                                  paddingLeft: "2.5px",
                                  color: '#E53F39',
                                  marginLeft: 7,
                                  display: "inline-block"
                                }}>
                                  ？
                      </span>
                              </div>
                            </Button>
                            <div className="but-bottom-wenzi">
                              <span>
                                {
                                  _type == 1 ? <FormattedMessage id="Openable" defaultMessage={'可开空'} /> : <FormattedMessage id="Empty_warehouse_can_be_leveled" defaultMessage={'空仓可平'} />
                                }
                                ：
                              </span>
                              <span style={{ wordBreak: "break-all", wordWrap: "break-word" }}>
                                {
                                  (() => {
                                    if (!sessionStorage.userInfo) {
                                      return "0"
                                    }
                                    if (_type == 1) {
                                      return pc_account.ask_max_qty
                                    }
                                    for (let i = 0; i < position.length; i++) {
                                      if (position[i].symbol === this.props.heyuename) {
                                        if (position[i].bid_flag == "1") {
                                          return (position[i].avail_qty)
                                        }
                                      }
                                    }
                                    return "0"
                                  })()
                                }
                              </span>
                              <span>
                                <FormattedMessage id="Zhang" defaultMessage={'张'} />
                              </span>
                            </div>
                          </div>
                        </div>
                      }
                    })()
                  }
                </div>
              )
            } else {
              return (
                <div className="weidengluzhihqaian" style={{ width: "100%" }}>
                  <div className="titlelongdlk"><FormattedMessage id="Post_login_transactions" defaultMessage={'登录后交易'} /></div>
                  <Button className="butlksdkj1 lvse" onClick={() => { history.push('/login') }}><FormattedMessage id="Sign_in" defaultMessage={'登录'} /></Button>
                  <Button className="butlksdkj2 bgred" onClick={() => { history.push('/register') }}><FormattedMessage id="register" defaultMessage={'注册'} /></Button>
                </div>
              )
            }
          })()
        }
      </div>
    );
  }
}

export default OrderPage;