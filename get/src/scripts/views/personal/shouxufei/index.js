import React, { Component } from 'react';
import './index.scss'
import Biaoti from '../componetn/biaoti';
import { Xfn } from '../../../../utils/axiosfn';
class Shouxufei extends Component {
  constructor() {
    super()
    this.state = {
      tou: "手续费等级",
      imgArr: {
        lv1: require('../../../img/lv1.png'),
        lv2: require('../../../img/lv2.png'),
        lv3: require('../../../img/lv3.png'),
        lv4: require('../../../img/lv4.png'),
        lv5: require('../../../img/lv5.png'),
        lv6: require('../../../img/lv6.png'),
        lv7: require('../../../img/lv7.png'),
        lv8: require('../../../img/lv8.png'),
      },
      lll: "<5000",
      getPcFeeListData: [],
      getUserFeeObj: {},
      zsxx: {}
    }
  }
  componentDidMount() {
    Xfn({
      _u: "aqguci",
      _p: { time: new Date().getTime().toString() },
      _m: "post"
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          zsxx: res.data.data,
        })
      }
    })
    Xfn({
      _u: "getPcFeeList",
      _m: 'get',
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          getPcFeeListData: res.data.data.rows
        })
      }
    })
    Xfn({
      _u: "getUserFee",
      _m: "get",
      _p: {
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          getUserFeeObj: res.data.data
        })
      }
    })
  
  }
  render() {
    const { tou, getPcFeeListData, getUserFeeObj, imgArr, zsxx } = this.state
    return (
      <div className="sxf-warp">
        <Biaoti flg={false} title={tou} ></Biaoti>
        <div className="content-box">
          <div className="content-box-li">
            <div className="li_span_h1">
              当前交易手续费率
            </div>
            <div className="clear" style={{ marginBottom: 15 }}>
              <div className="tr-guadan ">
                <p>Maker（挂单）</p>
                <p className="span-tr-guad">{getUserFeeObj.maker_fee}%</p>
              </div>
              <div className="tr-guadan ">
                <p>Taker（吃单）</p>
                <p className="span-tr-guad">{getUserFeeObj.taker_fee}%</p>
              </div>
            </div>
            <div className="p-gd "> *Maker是以指定价格下单，未立即与订单簿中其他订单成交，而是进入订单列表，等待交易对手单的行为；</div>
            <div className="p-gd ">*Taker是以指定价格(同时订单簿存在相同价格)下单，并立即与订单簿中其他订单成交的行为；</div>
            <div className="p-gd ">*基础费率变动请以相关公告为准。</div>
            <img src={(() => {
              switch (zsxx.user_level) {
                case "1": return imgArr.lv1
                case "2": return imgArr.lv2
                case "3": return imgArr.lv3
                case "4": return imgArr.lv4
                case "5": return imgArr.lv5
                case "6": return imgArr.lv6
                case "7": return imgArr.lv7
                case "8": return imgArr.lv8
                default: return imgArr.lv1;
              }
            })()} alt="" />
          </div>


          <div className="content-box-li" style={{ marginTop: 53 }}>
            <div className="li_span_h1">
              等级费率说明
            </div>
            <div className="yige clear">
              <div className="tr-sfx">
                <div className="t">
                  近30天交易量
                  </div>
                <div className="n">
                  永续合约 {getUserFeeObj.volume}BTC
                  </div>
              </div>
              <div className="tr-sfx">
                <div className="t">
                  已用提现额度
                  </div>
                <div className="n">
                  {getUserFeeObj.withdraw_limit}BTC
                  </div>
              </div>
            </div>
          </div>
          <div className="content-box-li" style={{ marginTop: 53 }}>
            <div className="li_span_h1" style={{ marginBottom: 30 }}>
              等级说明
            </div >
            <table >
              <tbody>
                <tr>
                  <td colSpan="5">普通用户</td>
                </tr>
                <tr className="tr1">
                  <td rowSpan="2">用户等级</td>

                  <td colSpan="3">永续合约</td>

                  <td rowSpan="2">
                    24小时提现额度
                  <p>(BTC)</p>
                  </td>
                </tr>
                <tr className="tr1">
                  <td>近30天交易量(BTC)</td>
                  <td>挂单成交手续费</td>
                  <td>吃单成交手续费</td>
                </tr>
                {
                  getPcFeeListData.map((item, index) => {
                    return (
                      <tr key={item + index}>
                        <td>Lv{item.tier}</td>
                        <td> {item.compare + item.trading_volume} </td>
                        <td>{item.maker_fee}%</td>
                        <td>{item.taker_fee}%</td>
                        <td>{item.withdraw_limit}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Shouxufei;