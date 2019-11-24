import React, { Component } from 'react';
import "./index.scss"
import { Table, message } from 'antd';
import lang from '@/utils/language';
import { Link } from "react-router-dom"
import { dangqianchipang } from '@/utils/dangqianchipang'
import { FormattedMessage } from 'react-intl';
import store from '@/scripts/store.js'
import { Xfn } from '../../../../utils/axiosfn';

class Yongxu extends Component {
  constructor() {
    super()
    this.state = {
      columns: [
        {
          title: <FormattedMessage id="currency" defaultMessage={'币种'} />,
          dataIndex: 'asset',
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="Available_balance" defaultMessage={'可用余额'} />,
          dataIndex: 'available',
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="Warehouse_margin" defaultMessage={'仓位保证金'} />,
          dataIndex: 'pos_margin',
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="Entrusted_margin" defaultMessage={'委托保证金'} />,
          dataIndex: 'order_margin',
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="Total" defaultMessage={'总额'} />,
          dataIndex: 'total',
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="operation" defaultMessage={'操作'} />,
          align: "right",
          dataIndex: 'addrescaozuo',
          render: (text, record) => <Link to="/finance/huazhuan" onClick={() => this.tiaozhuan(record)} style={{ textAlign: "left" }}><FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} /></Link>,
        },

      ],
      data: [
      ],
      pc_account: [],
      valuation_symbol: ""
    }
  }
  componentDidMount() {
    Xfn({
      _u: "hyzhquery",
      _m: 'get',
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          pc_account: res.data.data.total_pc_account,
          data: res.data.data.pc_account,
          valuation_symbol: res.data.data.valuation_asset,
        })
      }
    })
  }
  tiaozhuan = (a) => {
    store.dispatch({ type: "tiaozhuanzijinhuanzhuan", tiaozhuanzijinhuanzhuan: a.asset })
  }
  render() {
    const {
      columns,
      data,
      pc_account,
      valuation_symbol
    } = this.state
    return (
      <div className="Yongxu-warp">
        <div className="asset-title">
          <h1><FormattedMessage id="My_assets" defaultMessage={'我的资产'} /></h1>
        </div>

        <div className="yongxu-content-box">
          <div className="box-a">
            <div className="title">
              <FormattedMessage id="Asset_Valuation_of_Sustainable_Contracts" defaultMessage={'永续合约资产估值'} />
            </div>
            <div className="content">
              <span>{pc_account}</span>
              <span>{valuation_symbol}</span>
            </div>
          </div>

          <Table pagination={1 == 2} columns={columns} dataSource={data} />
          {dangqianchipang(data.length)}
        </div>
      </div>
    );
  }
}
export default Yongxu;