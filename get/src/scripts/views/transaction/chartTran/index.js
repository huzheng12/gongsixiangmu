import React, { Component } from 'react';
import './index.scss'
import store from '@/scripts/store.js'
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import {
  Spin
} from 'antd';
import { thousands } from '@/utils/prit'
import Tvchart from '@/scripts/components/tvchart';
import Depthmap from '@/scripts/components/depthmap';
import EchartKline from '@/scripts/components/echart_kline';
import { NavLink, Link } from "react-router-dom";
import EventFN from '../../../../utils/eventfn';


@connect(
  state => {
    return {
      funding: state.data.funding,
      depth: state.data.depth,
      heyuename: state.data.heyuename,
      instrument: state.data.instrument,
    }
  }
)
class Chart extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        "kaif": require('../../../img/treaty_price.png'),
        "xian": require('../../../img/xian.png'),
        "biao": require('../../../img/biao.png'),
        "quanping": require('../../../img/quanping.png'),
      },
      ceshi: "",
      tickershuju: {},
      visible: true,
    }
  }
  changChartStyle = () => {
    this.setState(
      state => {
        return {
          visible: !state.visible
        }

      })
  }

  render() {
    const {
      imgArr,
    } = this.state
    const {
      heyuename,
      instrument
    } = this.props
    return (
      <div className="chart-warp">
        <div className="chart-top clear">
          <div style={{ color: instrument.change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
            {
              EventFN.CurrencyDigitLimit({
                heyuename: heyuename,
                content: instrument.last_price,
                type: 1
              })

            }
          </div>
          <div style={{ backgroundColor: instrument.change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
            {
              (() => {
                if (instrument.change_rate_24h) {
                  return instrument.change_rate_24h > 0 ? "+" + String(instrument.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%" : String(instrument.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%"
                } else {
                  return "--"
                }
              })()
            }
          </div>
          <div className="div-last-warp">
            <img src={imgArr.xian} alt="" />
            <span> {
              EventFN.CurrencyDigitLimit({
                heyuename: heyuename,
                content: instrument.index_price
              })
            }</span>
            <p></p>
          </div>
          <div>
            <img src={imgArr.biao} alt="" />
            <span className="biao"> {
              EventFN.CurrencyDigitLimit({
                heyuename: heyuename,
                content: instrument.mark_price
              })
            }</span>
          </div>
        </div>
        <div className="chart-heyue">
          <div>
            <span>
              <FormattedMessage id="Contract_position" defaultMessage={'合约持仓量'} />
            </span>
            <span>
              {instrument.volume_pos_hold ? thousands(instrument.volume_pos_hold) : "--"}
            </span>
          </div>
          <div>
            <span>
              <FormattedMessage id="About_24-hour_turnover" defaultMessage={'合约24小时成交量'} />
            </span>
            <span>
              {instrument.volume_24h ? thousands(instrument.volume_24h) : "--"}
            </span>
          </div>
        </div>
        <div className="tuxing" >
          <div className="chart-nav">
            <span className={this.state.visible ? 'active' : ''} onClick={this.changChartStyle}><FormattedMessage id="Quotation" defaultMessage={'行情'} /></span>
            <span className={!(this.state.visible) ? 'active' : ''} onClick={this.changChartStyle}>  <FormattedMessage id="depth" defaultMessage={'深度'} /></span>
            <NavLink className="full-trade-btn" to="/fulltrade" target="_blank"><img src={imgArr.quanping} alt="" /><FormattedMessage id="FullScreenTransaction" defaultMessage={'全屏交易'} /></NavLink>
          </div>

          {this.state.visible ? <EchartKline></EchartKline> : <Depthmap></Depthmap>}
          {/* {this.state.visible ? <Tvchart></Tvchart> : <Depthmap></Depthmap>} */}
        </div>
      </div>
    );
  }
}

export default Chart;