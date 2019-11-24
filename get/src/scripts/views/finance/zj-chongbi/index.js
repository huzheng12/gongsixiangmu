import React, { Component } from 'react';
import './index.scss'
import Qrcode from "qrcode.react";
import { Input, Select, Table, message, Button } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { dangqianchipang } from '@/utils/dangqianchipang'
import { FormattedMessage } from 'react-intl';
import { timehuansuan } from '../../../../utils/time';
import { Xfn } from '../../../../utils/axiosfn';

import { connect } from "react-redux";
import _processingFn from '../historyFn';
const { Option } = Select;
@connect(
  state => {
    return {
      tiaozhuanzijinhuanzhuan: state.datum.tiaozhuanzijinhuanzhuan,
    }
  }
)
class Chongbi extends Component {
  constructor() {
    super()
    this.state = {
      imgArr: {
        ioo: require("../../../img/nothing_data.png"),
      },
      columns: [
        {
          title: <FormattedMessage id="Update_time" defaultMessage={'更新时间'} />,
          dataIndex: 'ctime',
          render: text => <span className="huazhuan-table-tr" >      {timehuansuan(text).date}
            &ensp;
            {timehuansuan(text).dates}</span >
        },
        {
          title: <FormattedMessage id="Coin_address" defaultMessage={'充币地址'} />,
          dataIndex: 'address',
          render: (text, a) => <span className="huazhuan-table-tr" > {text}
            {
              a.txHash ? <a href={a.chain_url + a.txHash} style={{ marginLeft: 10 }} target="_blank" >查看</a> : ""
            }
          </span >
        },
        {
          title: <FormattedMessage id="Quantity_of_money_charged" defaultMessage={'充币数量'} />,
          dataIndex: 'amount',
          align: "right",
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="Currency_filling_status" defaultMessage={'充币状态'} />,
          dataIndex: 'status',
          align: "right",
          width: 260,
          render: text => <span className="huazhuan-table-tr" >
            {
              text == "1" ? <FormattedMessage id="Created" defaultMessage={'已创建'} /> :
                text == "2" ?
                  <FormattedMessage id="To_be_confirmed" defaultMessage={'待确认'} /> :
                  <FormattedMessage id="Arrival_account" defaultMessage={'已到账'} />}
          </span >
        },
      ],
      data: [],
      symbol: [],
      symbols: "BTC",
      address: '',
      min_deposit_volume: "",
      lishilength: "",
      current_page: "1",
      addresds: "",
      Virtualcurrency: true
    }
  }
  componentDidMount() {
    Xfn({
      _u: "deposit",
      _m: "get",
      _p: {}
    }, (res, code) => {
      if (code == 0) {
        var asset = this.props.tiaozhuanzijinhuanzhuan ? this.props.tiaozhuanzijinhuanzhuan : res.data.data.asset_list[0].asset
        var flg = true
        for (let i = 0; i < res.data.data.asset_list.length; i++) {
          if (res.data.data.asset_list[i].asset === asset) {
            if (res.data.data.asset_list[i].dw_type === "2") {
              flg = false
            }
          }
        }
        if (!flg) {
          this.setState({
            Virtualcurrency: false
          })
        } else {
          this.addressFn({
            asset: asset
          })
          this.setState({
            Virtualcurrency: true
          })
        }
        this.setState({
          symbol: res.data.data.asset_list,
          symbols: asset
        })

        this.depositMarketsQuery()
        this.cbquery_historyFn({
          asset: asset
        })
      }
    })
  }
  addressFn = (_data) => {//充值地址获取
    Xfn({
      _u: 'address',
      _m: 'get',
      _p: {
        asset: _data.asset,
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          address: res.data.data.address
        })
      } else {
        this.setState({
          address: ""
        })
      }
    })
  }


  cbquery_historyFn = (_data) => {//充币记录获取
    _processingFn.cbquery_historyFn({
      _this: this,
      _data: _data,
      _url: "cbquery_history",
      _type: "1",
    }, (_res) => {
      this.setState({
        data: _res.rows,
        lishilength: _res.total
      })
    })
  }
  depositMarketsQuery = (_data) => {//最小充币单位获取
    var _asset = this.state.symbols
    if (_data && _data.asset) { _asset = _data.asset }
    Xfn({
      _u: "depositMarketsQuery",
      _m: "get",
      _p: {
        asset: _asset,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          min_deposit_volume: res.data.data.min_deposit_volume
        })
      }
    })
  }
  fenyed = (val) => {
    this.cbquery_historyFn({
      current_page: val
    })
  }
  addressoncchagn = (value) => {
    this.depositMarketsQuery({
      asset: value,
      addresds: ""
    })
    var flg = true
    for (let i = 0; i < this.state.symbol.length; i++) {
      if (this.state.symbol[i].asset === value) {
        if (this.state.symbol[i].dw_type === "2") {
          flg = false
        }
      }
    }
    if (!flg) {
      this.setState({
        Virtualcurrency: false
      })
    } else {
      this.setState({
        Virtualcurrency: true
      })
      this.addressFn({
        asset: value
      })
    }
    this.setState({
      symbols: value
    })

    this.cbquery_historyFn(
      {
        asset: value
      }
    )
  }
  PleaseEnterTheRechargeAmount = (val) => {
    let value = val.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数
    this.setState({
      addresds: value
    })
  }
  render() {
    const {
      columns,
      data,
      symbol,
      address,
      symbols,
      min_deposit_volume,
      lishilength,
      Virtualcurrency,
      addresds
    } = this.state
    return (
      <div className="chongbi-warp">
        <div className="asset-title">
          <h1><FormattedMessage id="Coin_charging" defaultMessage={'充币'} /></h1>
        </div>
        <div className="chongbi-content">
          <div className="div-chongbi-p">
            <label>
              <FormattedMessage id="Selection_of_currency" defaultMessage={'选择币种'} />
            </label>
            <Select defaultValue={this.props.tiaozhuanzijinhuanzhuan ? this.props.tiaozhuanzijinhuanzhuan : symbols} style={{ width: 340, height: 42, marginLeft: 10 }} onChange={this.addressoncchagn}>
              {
                symbol.map((item, index) => {
                  return (
                    <Option value={item.asset} key={item + index}>{item.asset}</Option>
                  )
                })
              }
            </Select>
          </div>
          {
            Virtualcurrency ? <div className="div-chongbi-p">
              <label>
                <FormattedMessage id="Rechargeable_address" defaultMessage={'充值地址'} />
              </label>
              <Input value={address} style={{ width: 340, height: 42, marginLeft: 10 }} />
              <CopyToClipboard text={address}
                onCopy={() => {
                  this.setState({ copied: true })
                  message.success(<FormattedMessage id="Replication_success" defaultMessage={'复制成功'} />);
                }}>
                <span style={{ marginLeft: 20, color: "#2E6BE6", cursor: "pointer" }}><FormattedMessage id="copy" defaultMessage={'复制'} /></span>
              </CopyToClipboard>
            </div> : <div className="div-chongbi-p">
                <label>
                  充值金额
                </label>
                <Input value={addresds} placeholder="请输入充值金额" onChange={this.PleaseEnterTheRechargeAmount} style={{ width: 340, height: 42, marginLeft: 10 }} />
              </div>
          }

          {
            Virtualcurrency ? <div className="img-erweimaaa">
              <Qrcode
                value={address}
                size={100}
              ></Qrcode>
            </div> : <div className="chongbi-content clear">
                <Button style={{
                  width: 340,
                  marginLeft: 80,
                  float: 'left',
                  marginTop: 28
                }} type="primary">立即充值</Button>
              </div>
          }
          {
            Virtualcurrency ? <div className="success">
              <p>* <FormattedMessage id="Coin_charging_notice_1" values={{ symbol: symbols }} defaultMessage={'禁止向BTC地址充值除BTC之外的资产，任何充入BTC地址的非BTC 资产将不可找回。'} /></p>
              <p>* <FormattedMessage id="Coin_charging_notice_2" values={{
                symbol: symbols
              }} defaultMessage={'使用BTC地址充值需要1个网络确认才能到账。'} /></p>
              <p>* <FormattedMessage id="Coin_charging_notice_3" values={{
                symbol: symbols, min: min_deposit_volume
              }} defaultMessage={'充值最小额度为0.00005BTC,小于0.00005BTC将无法到账。'} /></p>
              <p>* <FormattedMessage id="Coin_charging_notice_4" values={{ symbol: symbols }} defaultMessage={'默认充值至资金账户，若想进行币币交易，可在资金账户操作“资金划转”将资金转至币币账户。'} /></p>
            </div> : <div className="chongbi-content clear">
                <div style={{
                  marginLeft: 80
                }}>
                  * 最小充值单位{min_deposit_volume ? min_deposit_volume : "--"}{symbols}
                </div>
              </div>
          }

          <div className="chongbitishi">
            {symbols}<FormattedMessage id="Coin_record" defaultMessage={'充币记录'} />
          </div>
          <Table pagination={
            {
              simple: true,
              hideOnSinglePage: true,
              total: lishilength,
              pageSize: 20,
              onChange: this.fenyed
            }
          } columns={columns} dataSource={data} />
          {dangqianchipang(data.length)}
        </div>
      </div >
    );
  }
}
export default Chongbi;