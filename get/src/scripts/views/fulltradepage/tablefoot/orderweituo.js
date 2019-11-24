import React, { Component } from 'react';
import './index.scss'
import { timehuansuan } from '../../../../utils/time';
import { Link } from "react-router-dom"
import { FormattedMessage } from 'react-intl';
import number_format from '../../../../utils/renyinumber';
const Orderweituo = (props) => {
  const { order, chexiao1, type, fenyemashu, dianjigengduo, heyuename } = props
  return (
    <div style={{ minWidth: 1400 + 'px' }}>
      <div className="titlew">
        <div className="titpx" style={{ width: "10%" }}>委托时间</div>
        <div className="titpx" style={{ width: "9%" }}>合约</div>
        <div className="titpx" style={{ width: "9%" }}>杠杆</div>
        <div className="titpx" style={{ width: "9%" }}>交易类型</div>
        <div className="titpx" style={{ width: "9%" }}>成交比例</div>
        <div className="titpx" style={{ width: "12%" }}>成交量/委托总量</div>
        <div className="titpx" style={{ width: "12%" }}>成交均价/委托价格</div>
        <div className="titpx" style={{ width: "9%" }}>{type == 1 ? "保证金(" + heyuename.split("_")[0] + ")" : "收益(" + heyuename.split("_")[0] + ")"}</div>
        <div className="titpx" style={{ width: "9%" }}>手续费({heyuename.split("_")[0]})</div>
        <div className="titpx" style={{ width: "9%" }}>状态</div>
        <div className="titpx" style={{ width: "3%" }}>操作</div>
      </div>
      <div className="cont g-scrollbar" id='gettop'>
        {
          order.map((item, index) => {
            return <div className="wuflex-cont" key={item + index}>
              <div className="cont-tp" style={{ width: "10%" }}>
                {timehuansuan(item.ctime).date}
                &emsp;
                {timehuansuan(item.ctime).dates}
              </div>
              <div className="cont-tp" style={{ width: "9%" }}>
                {
                  item.symbol.split("_")[0] + "永续"
                }
              </div>
              <div className="cont-tp" style={{ width: "9%" }}>
                {
                  item.leverage + "X"
                }
              </div>
              <div className="cont-tp" style={{
                color: item.close_flag == "0" ? (item.bid_flag == "0" ? "#E53F39" : "#26994E") : (item.bid_flag == "0" ? "#E53F39" : "#26994E")
                , width: 80, wordWrap: "break-word", width: "9%"
              }}>
                {
                  item.close_flag == "0" ? (item.bid_flag == "0" ? < FormattedMessage id="Short_selling" defaultMessage={'卖出开空'} /> : < FormattedMessage id="Buy_more" defaultMessage={'买入开多'} />) : (item.bid_flag == "0" ? < FormattedMessage id="Sell_Pinto" defaultMessage={'卖出平多'} /> : < FormattedMessage id="Buy_flat" defaultMessage={'买入平空'} />)
                }
              </div>
              <div className="cont-tp" style={{ width: "9%" }}>
                {
                  String(item.trade_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")
                }%
              </div>
              <div className="cont-tp" style={{ width: "12%" }}>
                {
                  String(item.filled_qty).replace(/^(.*\..{4}).*$/, "$1")
                }
                /
                {
                  item.qty
                }
                (张)
              </div>
              <div className="cont-tp" style={{ width: "12%" }}>
                {
                  item.avg_price ? (() => {
                    var a = 0
                    switch (heyuename) {
                      case 'BTC_USD': a = 1; break;
                      case 'ETH_USD': a = 2; break;
                      case 'EOS_USD': a = 3; break;
                      default: break;
                    }
                    return number_format(item.avg_price, a, ".", ",")
                  })() : "0"
                }
                /
                {

                  (() => {
                    var a = 0
                    switch (heyuename) {
                      case 'BTC_USD': a = 1; break;
                      case 'ETH_USD': a = 2; break;
                      case 'EOS_USD': a = 3; break;
                      default: break;
                    }
                    return number_format(item.price, a, ".", ",")
                  })()
                }
                (USD)
              </div>
              <div className="cont-tp" style={{ width: "9%" }}>
                {
                  String(item.order_margin).replace(/^(.*\..{4}).*$/, "$1")
                }
              </div>
              <div className="cont-tp"
                className={item.fee * 1 == 0 ? "coloroo" : ""}
                style={{ width: "9%", wordWrap: "break-word", color: item.fee * 1 > 0 ? "#26994E" : item.fee * 1 < 0 ? "#E53F39" : "#333333" }}
              >
                {
                  String(item.fee > 0 ? "+" + item.fee : item.fee).replace(/^(.*\..{6}).*$/, "$1")
                }
              </div>
              <div className="cont-tp" style={{ width: "9%" }}>
                {
                  (() => {
                    switch (item.status) {
                      case "1": return < FormattedMessage id="Mismatches_have_been_created" defaultMessage={'已创建未匹配'} />; break;
                      case "2": return < FormattedMessage id="To_close_a_deal" defaultMessage={'待成交'} />; break;
                      case "4": return < FormattedMessage id="To_be_cancelled" defaultMessage={'待取消'} />; break;
                      case "8": return < FormattedMessage id="rescinded" defaultMessage={'已撤销'} />; break;
                      case "16": return < FormattedMessage id="Partial_Transaction" defaultMessage={'部分成交'} />; break;
                      case "32": return < FormattedMessage id="Complete_deal" defaultMessage={'全部成交'} />; break;
                      default: return item.status;
                    }
                  }
                  )()
                }
              </div>
              <div className="cont-tp" style={{ color: "#2F6EEC", cursor: "pointer", width: "3%" }} onClick={() => chexiao1(item)}>
                {type == 1 ? item.status == "4" ? "" : "撤销" : item.status == "8" ? "" : "查看"}
              </div>
            </div>
          })
        }
        {
          (() => {
            if (type == "2" || type == "1") {
              return <div className="kangengduo">
                <Link style={{ float: 'right' }} to="/transaction/inner" target="_blank" onClick={dianjigengduo}>查看更多>></Link>
              </div>
            }
          })()
        }
        <div className="fott"></div>
      </div>
    </div>
  );
}

export default Orderweituo;