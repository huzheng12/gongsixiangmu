import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { pacaccoundt } from '../../../action';
import store from '../../../store';
import Subscribe from '@/utils/ws_sub_unsub';
import { help_info } from "@/utils/help_info"
import { connect } from "react-redux";

import {
  Tooltip
} from 'antd';
@connect(
  state => {
    return {
      heyuename: state.data.heyuename,
      pc_account: state.data.pc_account,
      instrument: state.data.instrument,
      instrumentArr: state.data.instrumentArr,
      asset: state.data.asset,
    }
  }
)
class ContractDropdown extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        a4: require('../../../img/treaty_up.png'),
        a5: require('../../../img/treaty_down.png'),
        a1: require("../../../img/rate_down.png"),
        a2: require('../../../img/rate_up.png'),
        modifyt1: require("../../../img/treaty_prompt.png"),
      },
    }
  }

  qiehuanameming = (vale, index) => {
    console.log(234654654)
    Subscribe({
      _por: this.props,
      _this: this,
      _pair: vale.symbol,
      _type: "2",
      _index: index,
      _asset: vale.settle_currency,
    })
  }
  render() {
    const {
      imgArr
    } = this.state
    const {
      ticker_all,
      uil,
      type
    } = this.props
    var flg
    if (type) {
      flg = false
    } else {
      if (sessionStorage.userInfo) {
        flg = true
      } else {
        flg = false
      }
    }
    return flg ? <div className="tibao">
      <Tooltip placement="topRight" title={help_info.Swap_Detail}>
        <img className="xiabioa" src={imgArr.modifyt1} alt="" />
      </Tooltip>
    </div> : <div className="xiabioa1" alt="" >
        <img className="xiabioaa" src={uil ? imgArr.a4 : imgArr.a5} alt="" />
        <div className="uil" style={{ display: uil ? "none" : "block" }}>
          <p className="zback-content-p clear" style={{ marginBottom: 0, marginTop: 0 }}>
            <span className="span1"> <FormattedMessage id="contract" defaultMessage={'合约'} /></span>
            <span className="span3" style={{ float: "right", marginTop: 11, marginLeft: 10 }}>
              <img style={{ marginBottom: 2, display: "block" }} src={imgArr.a1} alt="" />
              <img style={{ display: "block" }} src={imgArr.a2} alt="" />
            </span>
            <span className="span2">涨幅</span>
          </p>
          {

            ticker_all.map((item, index) => {
              return (
                <div className="aaaa-weidengu clear"
                  style={{ color: item.symbol === this.props.heyuename ? "#2E6BE6" : "" }}
                  onClick={() => this.qiehuanameming(item, index)}
                  key={item + index}>
                  <span>
                    {item.symbol.split("_")[0]}  <FormattedMessage id="sustainable" defaultMessage={'永续'} />
                  </span>
                  <span className="span2" style={{ color: item.change_rate_24h >= 0 ? "#82D9A0" : "#E63F39" }}>
                    {
                      item.change_rate_24h > 0 ? "+" + String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") : String(item.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1")
                    }%
            </span>
                </div>
              )
            })
          }
          <li className="li-xiabiao">
          </li>
        </div>
      </div>


  }
}

export default ContractDropdown;