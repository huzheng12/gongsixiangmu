import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Spin, Icon } from 'antd';
import { thousands } from '@/utils/prit'
import { pricenubkaicang, pricenubpingcangduo, pricenubpingcangkong } from '../../../action';
import store from '@/scripts/store.js'
import EventFN from '../../../../utils/eventfn';
var scrollBar_switch = true;
@connect(
  state => {
    return {
      orderBookL2_25obj: state.data.orderBookL2_25obj,
      orderBookL2_25: state.data.orderBookL2_25,
      heyuename: state.data.heyuename,
      instrument: state.data.instrument,
      asset: state.data.asset,
    }
  })

class Weituoliebiao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgArr: {
        jt1: require('../../../img/treaty_price_down01.png'),
        jt2: require('../../../img/treaty_price_down02.png'),
        jt3: require('../../../img/treaty_price_up01.png'),
        jt4: require('../../../img/treaty_price_up02.png'),
        biao: require('../../../img/biao.png'),
        xian: require('../../../img/xian.png'),
      },
    }
  }
  imgdongtaijia = () => {
    const { imgArr } = this.state
    const { instrument } = this.props
    if (instrument && instrument.flgz == "1") {
      return imgArr.jt4
    }
    if (instrument && instrument.flgz == "0") {
      return imgArr.jt2
    }
    if (instrument && instrument.flgz == "10") {
      return imgArr.jt3
    }
    if (instrument && instrument.flgz == "20") {
      return imgArr.jt1
    }
  }
  parice = (b) => {
    store.dispatch(pricenubkaicang(b))
    store.dispatch(pricenubpingcangduo(b))
    store.dispatch(pricenubpingcangkong(b))
  }
  componentDidUpdate() {
    var scrollBar = document.getElementById('scrollBar');
    if (scrollBar_switch && scrollBar.scrollTop === 0) {
      scrollBar.scrollTop = (scrollBar.scrollHeight - scrollBar.clientHeight) / 2;
    } else {
      scrollBar_switch = false
    }
  }
  componentDidMount() {
    var scrollBar = document.getElementById('scrollBar');
    if (scrollBar_switch && scrollBar.scrollTop === 0) {
      scrollBar.scrollTop = (scrollBar.scrollHeight - scrollBar.clientHeight) / 2;
    } else {
      scrollBar_switch = false
    }
  }
  render() {
    const {
      heyuename,
      orderBookL2_25obj,
      instrument
    } = this.props
    const {
      imgArr
    } = this.state
    return (
      <div className="weituo-bable-warp">
        <div className="title-cd drag-handle">
          <FormattedMessage id="DelegationList" defaultMessage={'委托列表'} />

        </div>
        <div className="title-boxtou">
          <div className="tite-biaoti"><FormattedMessage id="Price" defaultMessage={'价格'} />(USD)&emsp;</div>
          <div className="tite-biaoti"><FormattedMessage id="Number" defaultMessage={'数量'} />(<FormattedMessage id="Zhang" defaultMessage={'张'} />)</div>
          <div className="tite-biaoti"><FormattedMessage id="Cumulants" defaultMessage={'累积量'} /></div>
        </div>
        <div className="module-body g-scrollbar" id="scrollBar">
          <ul className="ul-a1">
            {
              orderBookL2_25obj.arrAsks.map((item, i) => {
                return (
                  <div key={"1321321" + i} className={item.size ? "div-liweituo" : "liweituo-div"}>
                    <div onClick={item.size ? () => this.parice(item.price) : null}
                      className="section-tou"
                      style={{ fontSize: 12, cursor: "pointer" }}>{
                        EventFN.CurrencyDigitLimit({
                          heyuename: heyuename,
                          content: item.price
                        })
                      }&emsp;</div>
                    <div style={{ fontSize: 12 }}
                      className={
                        item.color_size == 1 ? "section-red1 bg-change-red" :
                          item.color_size == 2 ? "section-red1 bg-change-green" :
                            item.color_size == 11 ? "section-red1 bg-change-reds" :
                              item.color_size == 22 ? "section-red1 bg-change-greens" :
                                "section-red1"
                      }>
                      {thousands(item.size)}
                    </div>
                    {
                      item.price ? <div className="section-foot">
                        <div className="b" style={{
                          width: item.bgcolor * 100 + '%', backgroundColor:
                            i % 2 == 0 ? "rgba(140,42,42,.3)" : "rgba(140,42,42,.15)"
                        }}></div>
                        <div className="w">
                          {thousands(item.ljl)}
                        </div>
                      </div> : ""
                    }
                  </div>
                )
              })
            }
          </ul>
          {
            orderBookL2_25obj.arrBids ? <div className="section-titlt ul-a2" style={{ height: 55 }}>
              <div className="section-img-box" style={{
                color: (() => {
                  if (instrument.change_rate_24h >= 0) {
                    return "rgba(38, 153, 78, 1)"
                  } else {
                    return "#EE6560"
                  }
                })(), whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: 900
              }}>
                {
                  EventFN.CurrencyDigitLimit({
                    heyuename: heyuename,
                    content: instrument.last_price
                  })
                }
                <img src={this.imgdongtaijia()} alt="" />
              </div>
              <div className="section-titless">
                <div className="diqiu-img-l" style={{ height: 24 }}>
                  <div style={{
                    fontSize: 12, color: "rgba(153,149,145,1)", whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis', overflow: 'hidden'
                  }}>{
                      EventFN.CurrencyDigitLimit({
                        type: 2,
                        content: instrument.index_price
                      })

                    }</div>
                  <img src={imgArr.xian} alt="" />
                </div>
                <span className="gangg"></span>
                <div className="diqiu-img-r" style={{ height: 24 }}>
                  <img src={imgArr.biao} alt="" />
                  <div style={{
                    fontSize: 12, color: "#4D4D4D",
                    whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'
                  }}>{
                      EventFN.CurrencyDigitLimit({
                        type: 2,
                        content: instrument.mark_price
                      })
                    }</div>
                </div>
              </div>
            </div> : <Spin />
          }
          <ul className="ul-a2">
            {
              orderBookL2_25obj.arrBids ? orderBookL2_25obj.arrBids.map((item, i) => {
                return (
                  <div key={"1321321" + i} className={item.size ? "div-liweituo uli-a10" : "liweituo-div"} >
                    <div onClick={item.size ? () => this.parice(item.price) : null}
                      className="section-tou"
                      style={{ color: "#26994E", fontSize: 12, cursor: "pointer" }}>{
                        EventFN.CurrencyDigitLimit({
                          heyuename: heyuename,
                          content: item.price
                        })
                      }&emsp;</div>
                    <div style={{ fontSize: 12 }} className={
                      item.color_size == 1 ? "section-red1 bg-change-red" :
                        item.color_size == 2 ? "section-red1 bg-change-green" :
                          item.color_size == 11 ? "section-red1 bg-change-reds" :
                            item.color_size == 22 ? "section-red1 bg-change-greens" :
                              "section-red1"
                    }>
                      {thousands(item.size)}
                    </div>
                    {
                      item.price ? <div className="section-foot">
                        <div className="b" style={{ width: item.bgcolor * 100 + '%', backgroundColor: i % 2 == 0 ? "rgba(38,153,78,.3)" : "rgba(38,153,78,.15) " }}></div>
                        <div className="w">
                          {thousands(item.ljl)}
                        </div>
                      </div> : ""
                    }

                  </div>
                )
              }) : ""
            }
          </ul>
        </div>
      </div >
    );
  }
}

export default Weituoliebiao;

