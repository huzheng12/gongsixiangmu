import React, { Component } from 'react';
import "./index.scss"
import { thousands } from '@/utils/prit'
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router-dom"
import { Xfn } from '../../../../utils/axiosfn';
import { connect } from "react-redux";
@connect(
  state => {
    return {
      withdrawmoney: state.datum.withdrawmoney,
    }
  }
)
class Asset extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        coincharging: require("../../../img/finance/coincharging.png"),
        withdraw: require("../../../img/finance/withdraw.png"),
        transferoffunds: require("../../../img/finance/transferoffunds.png"),
      },
      zczx: [],
      total_asset: "",
      symbol: "",
    }
  }
  componentDidMount() {
    Xfn({
      _u: "cczxquery",
      _m: "get",
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          zczx: res.data.data.accounts,
          total_asset: res.data.data.total,
          symbol: res.data.data.asset,
        })
      }
    })
  }
  render() {
    const {
      imgArr,
      zczx,
      total_asset,
      symbol
    } = this.state
    const {
      withdrawmoney
    } = this.props
    return (
      <div className="asset-warp">
        <div className="asset-title">
          <h1>< FormattedMessage id="My_assets" defaultMessage={'我的资产'} /></h1>
        </div>
        <div className="asset-sidebar" style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#000 "
        }}>
          <p>
            <span className="asset-span-color">
              GTE< FormattedMessage id="Net_Asset_Valuation" defaultMessage={'资产净估值'} />
            </span>
            <span>
              <span style={{ display: "inline-block", padding: "0  0 0 5px" }}>
                ≈
              </span>
              <span style={{ display: "inline-block", padding: "0 5px" }} >{total_asset}</span>
            </span>
            <span className="asset-span-color">
              {symbol}
            </span>
          </p>
        </div>
        <div className="asset-content-box clear">
          {
            zczx.map((item, index) => {
              if (item.account_mode == "1") {
                return (
                  <div className="content-left" key={item + index}>
                    <div className="content-title">
                      {item.account_mode == "1" ? < FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /> : < FormattedMessage id="Transaction_account" defaultMessage={'交易账户'} />}
                    </div>
                    <div className="content-main">
                      <p>{thousands(item.account_total)}<span className="content-main-p-span">{symbol}</span></p>
                      <div className="clear">
                        <div>
                          <img src={imgArr.coincharging} alt="" />
                          <Link to="/finance/chongbi">< FormattedMessage id="Coin_charging" defaultMessage={'充币'} /></Link>
                        </div>
                        <div>
                          <img src={imgArr.withdraw} alt="" />
                          <Link to={withdrawmoney === "1" ? "/finance/withdrawmoney/sd" : "/finance/withdrawmoney/sdyan"}>< FormattedMessage id="Withdraw_money" defaultMessage={'提币'} /></Link>
                        </div>
                        <div>
                          <img src={imgArr.transferoffunds} alt="" />
                          <Link to="/finance/huazhuan">< FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="content-right" key={item + index}>
                    <div className="content-title">
                      {item.account_mode == "1" ? < FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /> : < FormattedMessage id="Transaction_account" defaultMessage={'交易账户'} />}
                    </div>
                    <div className="content-main">
                      <p>{thousands(item.account_total)}<span className="content-main-p-span">{symbol}</span></p>
                      <div className="clear">
                        <div>
                          {item.account_type == "1" ? < FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /> : item.account_type == "2" ? < FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /> : < FormattedMessage id="Spot_account" defaultMessage={'现货账户'} />}
                        </div>
                        <div>
                          <span>
                            {thousands(item.account_total)}
                          </span>
                          <span>BTC
                          </span>
                        </div>
                        <div style={{ cursor: 'pointer' }}>
                          <Link to="/finance/yongxu">< FormattedMessage id="details" defaultMessage={'详情'} /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })



          }

        </div>



      </div >


    );
  }
}
export default Asset;