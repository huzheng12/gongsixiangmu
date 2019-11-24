import React, { Component } from 'react';
import './index.scss'
import { Input, Select, Table, Button, Modal } from 'antd';
import lang from '@/utils/language';
import { FormattedMessage } from 'react-intl';
import { timehuansuan } from '../../../../utils/time';
import { Link } from "react-router-dom"
import { dangqianchipang } from '@/utils/dangqianchipang'
import { hex_md5 } from '@/utils/md5'
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
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
class Tibi extends Component {
  constructor() {
    super();
    this.state = {
      pagination: {
        pageSize: 2
      },
      imgArr: {
        io: require('../../../img/finance/box_point01.png'),
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
          title: <FormattedMessage id="Currency_withdrawal_address" defaultMessage={'提币地址'} />,
          dataIndex: 'target_address',
          render: (text, a) => <span className="huazhuan-table-tr" > {text}
            {
              a.txHash ? <a href={a.chain_url + a.txHash} style={{ marginLeft: 10 }} target="_blank" >查看</a> : ""
            }
          </span >
        },
        {
          title: <FormattedMessage id="Number_of_withdrawals" defaultMessage={'提币数量'} />,
          align: "right",
          dataIndex: 'amount',
          render: text => <span className="huazhuan-table-tr" > {text}</span >
        },
        {
          title: <FormattedMessage id="Currency_withdrawal_status" defaultMessage={'提币状态'} />,
          align: "right",
          width: 260,
          dataIndex: 'status',
          render: text => <span className="huazhuan-table-tr" >
            {
              text == "1" ? <FormattedMessage id="Created" defaultMessage={'已创建'} /> :
                text == "2" ? <FormattedMessage id="In_audit" defaultMessage={'审核中'} /> :
                  text == "3" ? <FormattedMessage id="Successful_mention_of_currency" defaultMessage={'提币成功'} /> :
                    <FormattedMessage id="Failure_to_withdraw_money" defaultMessage={'提币失败'} />
            }
          </span >
        },
      ],
      data: [],
      symbol: [],
      symbols: "BTC",
      peizhi: {},
      tbqty: '',
      lishilength: "",
      tibivisible: false,
      tibiValue: "",
      current_page: "1",
      last_withdraw_address: ""
    }
  }
  componentDidMount() {
    Xfn({
      _u: "tbwithdraw",
      _m: "get",
      _p: {}
    }, (res, code) => {
      var _asset = this.props.tiaozhuanzijinhuanzhuan ? this.props.tiaozhuanzijinhuanzhuan : res.data.data.asset_list[0].asset
      if (code == 0) {
        this.tbmarkets(
          {
            asset: _asset
          }
        )
        this.tbquery_history(
          {
            asset: _asset
          }
        )
        this.setState({
          symbol: res.data.data.asset_list,
          symbols: _asset
        })
      }
    })
  }
  tbquery_history = (_data) => {//获取历史记录
    _processingFn.cbquery_historyFn({
      _this: this,
      _data: _data,
      _url: "tbquery_history",
      _type: 1,
    }, (_res) => {
      this.setState({
        data: _res.rows,
        lishilength: _res.total,
        last_withdraw_address: _res.last_withdraw_address,
      })
    })
  }
  tbmarkets = (_data) => {//提币配置获取
    Xfn({
      _u: "tbmarkets",
      _m: "get",
      _p: { asset: _data.asset }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          peizhi: res.data.data
        })
      }
    })
  }
  tibigaibian = (val) => {
    this.setState({
      symbols: val,
      tbqty: "",
      last_withdraw_address: "",
    })
    this.tbmarkets({
      asset: val
    })
    this.tbquery_history({
      asset: val
    })
  }
  tibiwithdraw = () => {
    if (this.state.tbqty > 0) {
      this.setState({
        tibivisible: true
      })

    }

  }
  withdraw_address = (val) => {
    this.setState({
      last_withdraw_address: val.target.value
    })
  }
  tbqty = (val) => {
    if (this.state.peizhi.available == "0") {
      openNotificationWithIcon("opne-warning", "警告", '可提现额度不足')
      return false
    }
    let value = val.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    var n = 0
    if (this.state.peizhi.min_qty.indexOf(".") !== -1) {
      n = this.state.peizhi.min_qty.split(".")[1].length
    }
    var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
    value = value.replace(numdd, "$1")
    if (value * 1 <= this.state.peizhi.available * 1) {
      this.setState({
        tbqty: value
      })
    } else {
      this.setState({
        tbqty: this.state.peizhi.available.replace(numdd, "$1")
      })
    }
  }
  fenyed = (val) => {
    this.tbquery_history({
      current_page: val
    })
    this.setState({
      current_page: val
    })
  }
  tibiCancel = () => {
    this.setState({
      tibivisible: false
    })
  }
  tibiOk = () => {
    Xfn({
      _u: 'ttbwithdraw',
      _m: 'post',
      _p: {
        asset: this.state.symbols,
        withdraw_address: this.state.last_withdraw_address,
        withdraw_volume: this.state.tbqty,
        fund_pwd: hex_md5(this.state.tibiValue),
      }
    }, (res, code) => {
      if (code == 0) {
        this.tbmarkets({
          asset: this.state.symbols
        })
        this.tbquery_history()
        this.setState({
          tibivisible: false
        })
      }
    }, "提币成功")
  }
  tibiOnChange = (value) => {
    this.setState({
      tibiValue: value.target.value
    })
  }
  render() {
    const {
      columns,
      data,
      symbol,
      peizhi,
      imgArr,
      symbols,
      tbqty,
      lishilength,
      tibivisible, tibiValue,
      last_withdraw_address
    } = this.state
    return (
      <div className="tibi-warp">
        <div className="asset-title">
          <h1><FormattedMessage id="Withdraw_money" defaultMessage={'提币'} /></h1>
        </div>
        <div className="account-current">
          <img src={imgArr.io} alt="" />
          <span>
            <FormattedMessage
              id="Withdraw_money_text_1"
              defaultMessage={'您的提币操作一旦完成，对应的资产所有权将由您变更为目标地址所对应的账户所有人享有，请您务必在提币操作前，仔细核对提币地址信息，确保提币属于自愿行为，并确认不涉及任何传销、非法集资、诈骗等违法情形，谨防上当受骗，避免造成不必要的财产损失。'}
            />
          </span>
        </div>
        <div className="chongbi-content">
          <div className="chongbi-p clear">
            <label>
              <FormattedMessage id="Selection_of_currency" defaultMessage={'选择币种'} />
            </label>
            <Select defaultValue={this.props.tiaozhuanzijinhuanzhuan ? this.props.tiaozhuanzijinhuanzhuan : symbols} style={{ width: 340, height: 42, marginLeft: 20 }} onChange={this.tibigaibian}>
              {
                symbol.map((item, index) => {
                  return (
                    <Option value={item.asset} key={item + "a" + index}>{item.asset}</Option>
                  )
                })
              }
            </Select>
          </div>
          <div className="chongbi-p clear">
            <label>
              <FormattedMessage id="Currency_withdrawal_address" defaultMessage={'提币地址'} />
            </label>
            <Input
              placeholder={lang().Please_enter_the_withdrawal_address}
              value={last_withdraw_address}
              style={{ width: 340, height: 42, marginLeft: 20 }}
              onChange={this.withdraw_address}
            />
            <Link to="/finance/withdrawmoney/address" style={{ marginLeft: 20, color: "#2E6BE6" }}><FormattedMessage id="Address_management_of_withdrawal_currency" defaultMessage={'提币地址管理'} /></Link>
          </div>
          <div className="chongbi-p clear">
            <label>
              <FormattedMessage id="Number_of_withdrawals" defaultMessage={'提币数量'} />
            </label>
            <Input
              placeholder={peizhi.min_qty ? lang().MINIMUM_REPRESENTATION_UNIT + peizhi.min_qty : ""}
              onChange={this.tbqty} value={tbqty}
              style={{ width: 340, height: 42, marginLeft: 20 }}
            />
          </div>
          <div style={{ marginLeft: 110 }}>
            <span style={{ color: "#999999", marginRight: 9 }}><FormattedMessage id="Cashable_margin" defaultMessage={'可提现额度'} /></span>
            <span style={{ color: "#333333", marginRight: 20 }}>{peizhi.available}</span>
            <span style={{ color: "#999999", marginRight: 9 }}><FormattedMessage id="No_cash_for_the_time_being" defaultMessage={'暂不可提现'} /></span>
            <span style={{ color: "#333333" }}>{peizhi.lock}</span>
          </div>
          <div className="chongbi-p clear">
            <label style={{ textAlign: "right", paddingLeft: 10 }}>
              <FormattedMessage id="Service_Charge" defaultMessage={'手续费'} />
            </label>
            <span style={{ color: "#333333", marginLeft: 20, lineHeight: "42px", fontSize: 16 }}>{peizhi.fee}{symbols}</span>

          </div>
          <div className="chongbi-p clear">
            <Button disabled={(() => {
              if (tbqty !== "" && last_withdraw_address !== "") {
                return false
              }
              return true
            })()} className="butchongbi-buty" style={{ height: 42 }} onClick={this.tibiwithdraw}><FormattedMessage id="confirm" defaultMessage={'确认'} /></Button>
          </div>
          <div className="content-p-span1">
            <FormattedMessage id="The_minimum_withdrawal_amount_is" defaultMessage={'最小提币数量为'} />：{peizhi.min_qty}{symbols}。
          </div>
          <p className="content-p-span2">
            <FormattedMessage
              id="Withdraw_money_text_2"
              defaultMessage={'为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。请务必确认电脑及浏览器安全，防止信息被篡改或泄露'}
            />

          </p>
          <div className="tble-box">
            <span className="tble-span-title">
              {symbols}提币记录
            </span>
            <Table pagination={{  // 分页
              simple: true,
              hideOnSinglePage: true,
              total: lishilength,
              pageSize: 20,
              onChange: this.fenyed
            }} columns={columns} dataSource={data} />
            {dangqianchipang(data.length)}
          </div>
        </div>
        <Modal
          className="tibiqueren"
          title={lang().Tips}
          visible={tibivisible}
          onOk={this.tibiOk}
          onCancel={this.tibiCancel}
          cancelText={lang().cancel}
          okText={lang().confirm}
        >
          <Input
            placeholder={lang().Please_enter_the_fund_password}
            onChange={this.tibiOnChange}
            type="password"
            value={tibiValue}>
          </Input>
        </Modal>

      </div >
    );
  }
}
export default Tibi;