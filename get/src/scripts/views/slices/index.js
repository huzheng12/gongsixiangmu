import React, { Component } from 'react';
import Header from '@/scripts/components/header';
import Footer from '@/scripts/components/footer';
import { Button, Tabs } from 'antd';
import { history } from '@/utils/history'
import './index.scss'
import WrappedNormalLoginForm from '../../components/longinfrom';
import lang from '@/utils/language';
import { FormattedMessage } from 'react-intl';
import Vidage from 'vidage'
import { connect } from "react-redux";
import store from '../../store';
import { wsreconnect, heyuename, candlefunallction } from '../../action';
import Echartscont from './echartscont';
import { Xfn } from '../../../utils/axiosfn';
const { TabPane } = Tabs;


@connect(
  state => {
    return {
      ...state.data,
      ...state.datum
    }
  }
)
class Sices extends Component {
  constructor() {
    super()
    this.state = {
      imgarr: {
        banner01: require('../../img/slices/banner01.png'),
        banner02: require('../../img/shouji.png'),
        banner03: require('../../img/android.png'),
        banner04: require('../../img/ios.png'),
        banner05: require('../../img/bulletin.png'),
      },
      mp4: require('../../img/slices/bg.mp4'),
      heyuenameischange: 1,
      kline_datas: [],
      dataRes: null,
      flg: true,
    }
  }
  componentDidMount() {
    store.dispatch({ type: "differentiatedtransactions", num: 1 })
    new Vidage('#vidage')
    if (this.props.instrumentArr.length == 0) {
      window.wss.send(JSON.stringify({
        "op": "sub",
        "event": "pc#instrument_all_full#" + this.props.asset
      }))
    }
    this.sendMessage()
  }
  componentDidUpdate() {
    if (this.props.ws_connect == 1 || this.props.isLogin == 1) {
      this.sendMessage()
      if (window.wss.OPEN == 1) {
        if (this.props.instrumentArr.length == 0) {
          window.wss.send(JSON.stringify({
            "op": "sub",
            "event": "pc#instrument_all_full#" + this.props.asset
          }))
        } else {
          for (let i = 0; i < this.props.instrumentArr.length; i++) {
            window.wss.send(JSON.stringify({
              "op": "sub",
              "event": "pc#candle#" + this.props.instrumentArr[i].settle_currency + "#" + this.props.instrumentArr[i].symbol,
              "args": { "interval": "1" } //时间间隔
            }))
          }
          store.dispatch(wsreconnect(0))
        }
      }
    }
  }
  sendMessage = () => {
    for (let i = 0; i < this.props.instrumentArr.length; i++) {
      Xfn({
        _u: "candlequeryhistory",
        _m: "get",
        _p: {
          asset: this.props.instrumentArr[i].settle_currency,
          symbol: this.props.instrumentArr[i].symbol,
          start_time: (new Date().getTime() - 400 * 60 * 1000).toString(), //开始时间毫秒,
          end_time: (new Date().getTime()).toString(),
          interval: "1"
        }
      }, (res, code) => {
        if (code == 0) {
          store.dispatch(candlefunallction(res.data, this.props.instrumentArr[i].symbol))
        }
      })
    }
  }
  componentWillUnmount() {
    store.dispatch({ type: "differentiatedtransactions", num: 0 })
    if (window.wss.OPEN == 1) {
      for (let i = 0; i < this.props.instrumentArr.length; i++) {
        window.wss.send(JSON.stringify({
          "op": "unsub",
          "event": "pc#candle#" + this.props.asset + "#" + this.props.instrumentArr[i],
          "args": { "interval": this.props.resolution } //时间间隔
        }))
      }
      window.wss.send(JSON.stringify({
        "op": "unsub",
        "event": "pc#instrument_all_full#" + this.props.asset
      }))
    }
  }
  render() {
    const {
      imgarr,
      mp4,
    } = this.state
    const {
      k_line_home_page,
      instrumentArr
    } = this.props
    return (
      <div className="sices-warp">
        <Header></Header>
        <div className="sices-warp-box " style={{ height: 800, minHeight: 743 }}>
          <div className="vidage">
            <video id="vidage" className="vidage-video" preload="metadata" loop autoPlay muted>
              <source src={mp4} type="video/mp4" />
            </video>
          </div>
          <div className="img-box" >
            <div className="tongzhilan">
              <img src={imgarr.banner05} alt="" /><span><FormattedMessage id="Notice" defaultMessage={'公告：GTE交易所正式上线'} /></span>
            </div>
            <div className="hezi clear">
              <div className="hezi-left" style={{ marginLeft: sessionStorage.userInfo ? 335 : "" }}>
                <div className="x">
                  <FormattedMessage id="Next_Generation_Encrypted_Asset_Trading_Platform" defaultMessage={'下一代加密资产交易平台'} />
                </div>
                <div className="g">
                  <FormattedMessage id="Welcome_to_the_most" defaultMessage={'高达100倍杠杆。交易永续合约。业界领先的安全性。欢迎来到最先进的比特币交易平台。'} />
                </div>
                <div className="b">
                  <Button className="bglanse" onClick={() => { history.push('/transaction/cont') }}>
                    <FormattedMessage id="View_Real_time_Market" defaultMessage={'查看实时行情'} />
                  </Button>
                </div>
              </div>
              <div className="hezi-right" style={{ display: sessionStorage.userInfo ? "none" : "blocl" }}>
                <div className="tit">
                  <FormattedMessage id="Sign_in" defaultMessage={'登录'} />
                </div>
                <div className="sices-tabs-box">
                  <WrappedNormalLoginForm></WrappedNormalLoginForm>
                </div>
              </div>
            </div>
          </div>
          <div className="echart-box">
            <div className="sange-box">
              {
                instrumentArr.length > 0 && instrumentArr.map((item, index) => {
                  return <div className="liwu" key={item + index}>
                    <div className="top-box">
                      <div className="left-box">
                        <p>
                          {item.symbol}
                        </p>
                        <p>
                          {item.last_price}
                        </p>
                      </div>
                      <div className="right-box" style={{ color: item.change_rate_24h * 1 >= 0 ? "#82D9A0" : "#E63F39" }}>
                        {
                          String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")
                        }%
                  </div>
                    </div>
                    <div className="bottom-boxs">
                      <Echartscont _id={"chartmain" + index} dataRes={k_line_home_page[item.symbol]} candle={this.props.candles[item.symbol] && this.props.candles[item.symbol].data}></Echartscont>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
        <div className="bottom-box">
          <div className="flacol clear" >
            <div className="cow" style={{ marginTop: 81 }}>
              <div className="span-tit">
                $4.05B
                </div>
              <div className="span-cos-1">
                24<FormattedMessage id="hour" defaultMessage={'小时'} />
              </div>
            </div>
            <div className="cow" style={{ marginTop: 81 }}>
              <div className="span-tit">
                $110.60B
                </div>
              <div className="span-cos-1">
                30<FormattedMessage id="day" defaultMessage={'天'} />
              </div>
            </div>
            <div className="cow" style={{ marginTop: 81 }}>
              <div className="span-tit">
                $1.06T
                </div>
              <div className="span-cos-1">
                365<FormattedMessage id="day" defaultMessage={'天'} />
              </div>
            </div>

          </div>
          <div className="flacol clear">
            <div className="cow">
              <div className="span-tit">
                $1500%
                </div>
              <div className="span-cos-1">
                <FormattedMessage id="Our_Bitcoin_Dollar_products" defaultMessage={'我们的 比特币/美元 产品比其他任何平台拥有更多的流动性。GTE 的比特币美元市场是全球流动性最好。'} />
              </div>
            </div>
            <div className="cow">
              <div className="span-tit">
                100
                </div>
              <div className="span-cos-1">
                <FormattedMessage id="Number_of_audits_per_second" defaultMessage={'每秒审计次数。GTE 的引擎不间断地审核所有账户的余额和历史纪录。'} />
              </div>
            </div>
            <div className="cow">
              <div className="span-tit">
                0
                </div>
              <div className="span-cos-1">
                <FormattedMessage id="BitcoinLostByInvasionOrBlackout" defaultMessage={'通过入侵或被黑而丢失的比特币。GTE 在冷钱包中安全地保持所有资金。'} />
              </div>
            </div>

          </div>
          <div className="flacol clear">
            <div className="cow">
              <div className="span-tit">
                <FormattedMessage id="UniqueProducts" defaultMessage={'独特的产品'} />


              </div>
              <div className="span-cos-1">
                <FormattedMessage id="GTEProvidesUpTo100TimesLeverag" defaultMessage={'GTE 对于比特币合约提供高达 100 倍的杠杆，同时也对于山寨币合约提供高杠杆。'} />


              </div>
            </div>
            <div className="cow">
              <div className="span-tit">
                <FormattedMessage id="Advanced" defaultMessage={'进阶'} /> API
                </div>
              <div className="span-cos-1">
                <FormattedMessage id="OurTradingEngineUsesThe" defaultMessage={'我们的交易引擎使用的技术与投资银行和对冲基金所使用的技术相同。'} />

              </div>
            </div>
            <div className="cow">
              <div className="span-tit">
                <FormattedMessage id="LeadingSecurity" defaultMessage={'领先的安全性'} />

              </div>
              <div className="span-cos-1">
                <FormattedMessage id="GTEAdoptsTheLatestMulti" defaultMessage={' GTE 自内而外采用最新的多重因素安全机制。安全是我们首要的任务。'} />
              </div>
            </div>

          </div>
        </div>
        <div className="footdkdkdk">
          <div className="toofot">
            <div className="left">
              <div className="capsn-1">
                <FormattedMessage id="AllPlatformTerminalAccess" defaultMessage={'全平台终端接入'} />

              </div>
              <div className="capsn-2">
                iOS、Android、Web   <FormattedMessage id="MultiplePlatformsSupportFullBusinessFunctions" defaultMessage={'多个平台支持全业务功能'} />
              </div>

            </div>
            <div className="right">
              <div className="imgclear clear">
                <div>
                  <img src={imgarr.banner02} alt="" />
                </div>
                <div>
                  <div className="imga clear">
                    <img src={imgarr.banner03} alt="" /><a href="">
                      <FormattedMessage id="DownloadForAndroid" defaultMessage={'Android版下载'} />
                    </a>
                  </div>
                  <div className="imga clear">
                    <img src={imgarr.banner04} alt="" /><a href="">   <FormattedMessage id="DownloadiOSVersion" defaultMessage={'iOS版下载'} /></a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Footer></Footer>
      </div >
    );
  }
}
export default Sices;