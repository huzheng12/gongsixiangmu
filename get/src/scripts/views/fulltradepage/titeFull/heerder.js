import React, { Component } from 'react';
import Subscribe from '@/utils/ws_sub_unsub';
import { connect } from "react-redux";
import { Spin } from 'antd';
import EventFN from '../../../../utils/eventfn';
var _that
@connect(
  state => {
    return {
      heyuename: state.data.heyuename,
      instrumentArr: state.data.instrumentArr,
      asset: state.data.asset,
    }
  }
)
class Heeader extends Component {
  constructor() {
    super()
    _that = this
  }
  SwitchingCurrencies = (a, b) => {
    if (a.symbol === this.props.heyuename) { return false }
    Subscribe({
      _por: this.props,
      _this: _that,
      _pair: a.symbol,
      _index: b,
      _type: "2",
      _asset: a.settle_currency,
    })
  }
  render() {
    const {
      instrumentArr
    } = this.props
    console.log(this.props.heyuename)
    return (
      < div className="heeader-warp" >
        <div className="bitebi-box">
          {
            instrumentArr.length > 0 ? instrumentArr.map((item, index) => {
              return <div onClick={() => this.SwitchingCurrencies(item, index)}
                className={item.symbol == this.props.heyuename ? "box boxs" : "box"} key={item + index}>
                <div>{
                  EventFN.CurrencyName({
                    heyuename: item.symbol
                  })

                }</div>
                <div className="gteio-box">
                  <div className="div" style={{ color: "#FFFFFF" }}>{
                    item.symbol.split(item.split_char)[0]
                  }</div>
                  <div className="div" style={{ color: item.change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
                    {
                      (() => {
                        if (item.change_rate_24h) {
                          return item.change_rate_24h > 0 ? "+" + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%" : String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%"
                        } else {
                          return "--"
                        }
                      })()
                    }
                    {
                      item.change_rate_24h ? item.change_rate_24h >= 0 ? <i className="iconfont imgastd" style={{ color: "#26994E" }}>&#xe60e;</i> : <i className="iconfont imgastd" style={{ color: "#E53F39" }}>&#xe610;</i> : ""
                    }
                  </div>
                </div>
              </div>
            }) : <Spin />
          }
        </div>

      </div >
    );
  }
}

export default Heeader;