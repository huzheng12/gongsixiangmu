import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import EventFN from '../../../../utils/eventfn';
import { numberHandle } from '../../../../utils/numberHandle';
import lang from '@/utils/language';
@connect(
  state => {
    return {
      instrument: state.data.instrument,
      orderBookL2_25: state.data.orderBookL2_25,
      heyuename: state.data.heyuename,
    }
  },
)
class ContractDetails extends Component {
  render() {
    const {
      instrument
    } = this.props
    return (
      < div className="contractdetails-warp" >
        <div className="title-cd drag-handle">
          <FormattedMessage id="ContractDetails" defaultMessage={'合约明细'} />
        </div>
        <div className="content-cd module-body g-scrollbar">
          <div className="cond-tr">
            <div className="le">
              <FormattedMessage id="ContractDetails" defaultMessage={'合约明细'} />
            </div>
            <div className="ri">
              {instrument.symbol ? instrument.symbol : "--"}
            </div>
          </div>
          <div className="cond-tr">
            <div className="le" style={{ borderBottom: "1px dashed #898E98" }}>
              <FormattedMessage id="LatestMarketPrice" defaultMessage={'最新市场价格'} />

            </div>
            <div className="ri">
              {
                EventFN.CurrencyDigitLimit({
                  content: instrument.last_price,
                  danwei: instrument.quote_currency,
                  heyuename: this.props.heyuename
                })
              }
            </div>
          </div>
          <div className="cond-tr">
            <div className="le" style={{ borderBottom: "1px dashed #898E98" }}>
              <FormattedMessage id="MarkedPrice" defaultMessage={'标记价格'} />

            </div>
            <div className="ri">
              {
                EventFN.CurrencyDigitLimit({
                  content: instrument.mark_price,
                  danwei: instrument.quote_currency
                })
              }
            </div>
          </div>
          <div className="cond-tr">
            <div className="le" style={{ borderBottom: "1px dashed #898E98" }}>
              <FormattedMessage id="IndexPrice" defaultMessage={'指数价格'} />
            </div>
            <div className="ri">
              {
                EventFN.CurrencyDigitLimit({
                  content: instrument.index_price,
                  danwei: instrument.quote_currency
                })
              }
            </div>
          </div>
          <div className="cond-tr">
            <div className="le">
              <FormattedMessage id="24HVolume" defaultMessage={'24H成交量'} />
            </div>
            <div className="ri">
              {
                instrument.volume_24h ? numberHandle(instrument.volume_24h, 1) + " " + instrument.quote_currency : "--"
              }
            </div>
          </div>
          <div className="cond-tr">
            <div className="le">
              <FormattedMessage id="openInterest" defaultMessage={'未平仓合约数量'} />
            </div>
            <div className="ri">
              {
                instrument.volume_pos_hold ? numberHandle(instrument.volume_pos_hold, 1) + " " + instrument.quote_currency : "--"
              }
            </div>
          </div>
          <div className="cond-tr">
            <div className="le">
              <FormattedMessage id="ContractValue" defaultMessage={'合约价值'} />
            </div>
            <div className="ri">
              {
                instrument.lot_size ? instrument.lot_size + " " + instrument.quote_currency : "--"
              }
            </div>
          </div>
          <div className="cond-tr">
            <div className="le">
              <FormattedMessage id="Capital_rate" defaultMessage={'资金费率'} />
            </div>
            <div className="ri">
              {
                instrument.funding_rate ? String(instrument.funding_rate * 100).replace(/^(.*\..{3}).*$/, "$1") + "% " + "| " + instrument.funding_rate_time + lang().WithinHours : "--"
              }
            </div>
          </div>
          <div className="cond-tr">
            <div className="le">    <FormattedMessage id="ForecastRate" defaultMessage={'预测费率'} /></div>
            <div className="ri">
              {
                instrument.indicative_funding_rate ? String(instrument.indicative_funding_rate * 100).replace(/^(.*\..{3}).*$/, "$1") + "% " + "| " + instrument.indicative_funding_rate_time + lang().WithinHours : "--"
              }
            </div>
          </div>
          <div className="cond-tr" >
            <a href="https://gtehelp.zendesk.com/hc/zh-cn/articles/360036706514" target="_blank" >
              <FormattedMessage id="More" defaultMessage={'更多'} />...

            </a>

          </div>
        </div>
      </div >
    );
  }
}

export default ContractDetails;