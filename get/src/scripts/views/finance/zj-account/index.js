import React, { Component } from 'react';
import './index.scss'
import { Table } from 'antd';
import { Link } from "react-router-dom"
import { dangqianchipang } from '@/utils/dangqianchipang'
import lang from '@/utils/language';
import { FormattedMessage } from 'react-intl';
import { Xfn } from '../../../../utils/axiosfn';
import { connect } from "react-redux";
import store from '@/scripts/store.js'
@connect(
  state => {
    return {
      withdrawmoney: state.datum.withdrawmoney,
    }
  }
)
class Account extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        io: require('../../../img/finance/box_point01.png'),
        ioo: require("../../../img/nothing_data.png"),
      },

      columns: [
        {
          title: <FormattedMessage id="currency" defaultMessage={'币种'} />,
          dataIndex: 'asset',
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="available" defaultMessage={'可用'} />,
          align: "right",
          dataIndex: 'available',
          render: text => <span className="huazhuan-table-tr" > {text}</span >

        },
        {
          title: <FormattedMessage id="Frozen" defaultMessage={'冻结'} />,
          align: "right",
          dataIndex: 'lock',
          render: text => <span className="huazhuan-table-tr" > {text}</span >

        },
        {
          title: <FormattedMessage id="Valuation" values={{ symbol: '(BTC)' }} defaultMessage={'估值(BTC)'} />,
          align: "right",
          dataIndex: 'valuation_value',
          render: text => <span className="huazhuan-table-tr" > {text}</span >

        },
        {
          title: <FormattedMessage id="operation" defaultMessage={'操作'} />,
          align: "right",
          dataIndex: 'address11',
          render: (text, index) => <div>
            <Link to="/finance/chongbi" href="javascript:;" onClick={() => {
              store.dispatch({ type: "tiaozhuanzijinhuanzhuan", tiaozhuanzijinhuanzhuan: index.asset })
            }} className="linkstyle" style={{ marginRight: 20 }}><FormattedMessage id="Coin_charging" defaultMessage={'充币'} /></Link>
            <Link to={this.props.withdrawmoney === "1" ? "/finance/withdrawmoney/sd" : "/finance/withdrawmoney/sdyan"} href="javascript:;" onClick={() => {
              store.dispatch({ type: "tiaozhuanzijinhuanzhuan", tiaozhuanzijinhuanzhuan: index.asset })
            }} className="linkstyle" style={{ marginRight: 20 }}><FormattedMessage id="Withdraw_money" defaultMessage={'提币'} /></Link>
            <Link to="/finance/huazhuan" href="javascript:;" onClick={() => {
              store.dispatch({ type: "tiaozhuanzijinhuanzhuan", tiaozhuanzijinhuanzhuan: index.asset })
            }} className="linkstyle" ><FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} /></Link>
          </div>,
        },
      ],
      data: [

      ],
      total_fund_account: "",
      valuation_symbol: "",
    }
  }
  componentDidMount() {
    Xfn({
      _u: "zjzhanghu",
      _m: "get",
      _p: {}
    }, (res, code) => {
      if (code == 0) {

        this.setState({
          data: res.data.data.fund_accounts,
          total_fund_account: res.data.data.total_fund_account,
          valuation_symbol: res.data.data.valuation_asset,
        })
      }
    })
  }
  render() {
    const {
      columns,
      data,
      valuation_symbol,
      total_fund_account,
      imgArr
    } = this.state
    return (
      <div className="account-warp">
        <div className="asset-title">
          <h1><FormattedMessage id="Account_funds" defaultMessage={'账户资金'} /></h1>
        </div>
        <div className="account-current">
          <img src={imgArr.io} alt="" />
          <span>
            <FormattedMessage id="Account_funds_notice_text" defaultMessage={'充币成功后，若想进行”合约交易“，需操作“资金划转”，将“资金账户”的币转移到该账户上。'} />
          </span>
        </div>
        <div className="content">
          <div className="zhehe" style={{ color: "#999999" }}>
            <FormattedMessage id="Asset_Conversion" defaultMessage={'资产折合'} /> ≈
            <span style={{ color: "#1A1A1A", padding: "0 5px" }}>
              {total_fund_account}
            </span>
            <span>
              {valuation_symbol}
            </span>
          </div>
          <Table pagination={1 == 2} columns={columns} dataSource={data} />
          {dangqianchipang(data.length)}
        </div>
      </div>
    );
  }
}
export default Account;