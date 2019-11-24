import React, { Component } from 'react';
import './index.scss'
import { Input, Select, Table, Button, message } from 'antd';
import lang from '@/utils/language';
import { FormattedMessage } from 'react-intl';
import { Link, NavLink } from "react-router-dom"
import Qrcode from "qrcode.react";
import { Xfn } from '../../../../utils/axiosfn';

const { Option } = Select;

class Zijindizhi extends Component {
  constructor() {
    super()
    this.state = {
      imger: require('../../../img/finance/add_erweima.png'),
      imgArr: {
        // io: require('../../../img/finance/box_point01.png'),
        ioo: require("../../../img/nothing_data.png"),
      },
      columns: [
        {
          title: <FormattedMessage id="currency" defaultMessage={'币种'} />,
          dataIndex: 'asset',
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="Currency_withdrawal_address" defaultMessage={'提币地址'} />,
          dataIndex: 'address',
          render: text => <div className="huazhuan-table-tr" >
            <img src={this.state.imger} alt="" style={{ marginRight: 10, display: "inline-block", marginTop: -5 }} />

            {text}
          </div>

        },
        {
          title: <FormattedMessage id="Number_of_withdrawals" defaultMessage={'备注'} />,
          dataIndex: 'remark',
          render: text => <span className="huazhuan-table-tr" >{text}</span>,
        },
        {
          title: <FormattedMessage id="operation" defaultMessage={'操作'} />,
          dataIndex: 'status',
          align: "right",

          render: (text, a) => <span style={{ color: "#2F6FED", cursor: 'pointer' }}
            className="huazhuan-table-tr" onClick={() => this.deleteall(a)}><FormattedMessage id="delete" defaultMessage={'删除'} /></span>,
        },
      ],
      data: [],
      withdraw_address: "",
      remark: "",
      symbol: "BTC",
      symbols: [],
      lishilength: ""
    }
  }
  deleteall = (a) => {
    Xfn({
      _u: "tbremove",
      _m: "post",
      _p: {
        id: a.id,
        asset: a.asset,
      }
    }, (res, code) => {
      if (code == 0) {
        this.lishijiel()
      }
    })
  }
  lishijiel = (a, b) => {
    Xfn({
      _u: "tbdzquery",
      _m: 'get',
      _p: {
        asset: b ? b : this.state.symbol,
        current_page: a ? a : '1',
        page_size: "20",
      }
    }, (res, code) => {
      if (code == 0) {
        const arr = res.data.data.rows
        for (var i in arr) {
          arr[i].key = i
        }
        this.setState({
          data: res.data.data.rows,
          lishilength: res.data.data.total
        })
      }
    })

  }
  historylength = (val) => {
    this.lishijiel(val)
  }
  componentDidMount() {
    Xfn({
      _u: 'tbwithdraw',
      _m: "get",
      _p: {

      }
    }, (res, code) => {
      if (code == 0) {
        console.log(res)
        this.setState({
          symbols: res.data.data.asset_list
        })
      }
    })
    this.lishijiel()
  }

  remarkfun = (val) => {
    this.setState({ remark: val.target.value })
  }
  withdrawddress = (val) => {
    this.setState({ withdraw_address: val.target.value })
  }
  dzsymbol = (val) => {
    console.log(4444)
    this.setState({ symbol: val })
    this.lishijiel("1", val)

  }
  dzadd = () => {
    if (this.state.withdraw_address !== "") {
      Xfn({
        _u: "tbdzaddress",
        _m: "post",
        _p: {
          asset: this.state.symbol,
          withdraw_address: this.state.withdraw_address,
          remark: this.state.remark,
        }
      }, (res, code) => {
        if (code == 0) {
          this.lishijiel()
        }
      })
    }
  }
  dangqianchipang = (a) => {
    if (sessionStorage.userInfo) {
      if (a <= 0) {
        return <div className="tablemeishuju">
          <img src={this.state.imgArr.ioo} alt="" />
          <div>
            <FormattedMessage id="You_dont_have_data" defaultMessage={'您暂时还没有相关数据'} />
          </div>
        </div>
      }
    } else {
      return <div className="tablemeishuju">
        <img src={this.state.imgArr.ioo} alt="" />
        <div>
          <FormattedMessage id="You_must" defaultMessage={'您必须'} />
          <NavLink style={{ margin: "0 5px" }} to="/login"><FormattedMessage id="Sign_in" defaultMessage={'登录'} /></NavLink>
          <FormattedMessage id="Only_then_see_information" defaultMessage={'才可以看到此信息'} />
        </div>
      </div>
    }
  }
  render() {
    const {
      columns,
      data,
      withdraw_address,
      remark,
      symbols,
      lishilength,
      symbol
    } = this.state
    return (
      <div className="dizhiguanli-warp">
        <div className="asset-title">
          <h1><FormattedMessage id="Address_management_of_withdrawal_currency" defaultMessage={'提币地址管理'} /></h1>
        </div>
        <div className="chongbi-content clear">
          <div className="chongbi-p clear" style={{ height: 42 }}>
            <p>
              <FormattedMessage id="currency" defaultMessage={'币种'} />
            </p>
            {/* asset: "BTC"
dw_type: "1" */}
            <Select defaultValue={symbol} style={{ width: 340, height: 42 }} onChange={this.dzsymbol}>
              {
                symbols.map((item, index) => {
                  return <Option value={item.asset} key={item + "ads54" + index}>
                    {item.asset}
                  </Option>
                })
              }
            </Select>
          </div>
          <div className="chongbi-p clear">
            <p style={{ float: "left", lineHeight: "42px" }}>
              <FormattedMessage id="Currency_withdrawal_address" defaultMessage={'提币地址'} />
            </p>
            <Input value={withdraw_address} onChange={this.withdrawddress} placeholder={lang().Please_enter_the_withdrawal_address} style={{ width: 340, height: 42 }} />

          </div>
          <div className="chongbi-p clear">
            <p>
              <FormattedMessage id="Remarks" defaultMessage={'备注'} />
            </p>
            <Input value={remark} onChange={this.remarkfun} placeholder={lang().Please_enter_notes} style={{ width: 340, height: 42 }} />
          </div>

          <div className="clear">
            <Button type="primary" onClick={this.dzadd} ><FormattedMessage id="Add_to" defaultMessage={'添加'} /></Button>
          </div>
          <div className="tble-box">
            <span className="tble-span-title">
              <FormattedMessage id="Address_list" defaultMessage={'地址列表'} />
            </span>
            <Table pagination={{  // 分页
              hideOnSinglePage: true,
              total: lishilength,
              pageSize: 20,
              onChange: this.historylength
            }} columns={columns} dataSource={data} />
            {this.dangqianchipang(data.length)}
          </div>
        </div>

      </div>
    );
  }
}

export default Zijindizhi;
