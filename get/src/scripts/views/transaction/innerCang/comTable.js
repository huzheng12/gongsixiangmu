import React, { Component } from 'react';
import './index.scss'
import { Tooltip, Input, Button, Modal, Slider, message, Radio, Checkbox } from 'antd';
import { help_info } from "@/utils/help_info"
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import store from '@/scripts/store.js'
import { Xfn } from '../../../../utils/axiosfn';
import number_format from '../../../../utils/renyinumber';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
import MoreLeverage from '../../../components/MoreLeverage';
var numsslkjd
const marks = {
  0: '2X',
  10: '3X',
  20: '5X',
  30: "10X",
  40: "25X",
  50: "50X",
  60: "100X"
};

@connect(
  state => {
    return {
      ...state.data,
      ...state.datum
    }
  }
)
class TablePosition extends Component {
  constructor() {
    super()
    this.state = {
      num17: 0,
      max_leverage: "",
      visible4: false,
      visible3: false,
      visible6: false,
      visible7: false,
      baozhengjinvalue: "",
      MarginOpening: false,
      contname: "a",
      pairP: "",
      num92: "",
      focusvalueflg: false,

    }
  }
  focus1 = () => {
    this.setState({
      focusvalueflg: true
    })
  }

  xiugaidangqianganggan = () => {
    var ew = this.props.pc_account.available * this.props.instrument.last_price * this.props.item.leverage
    var c = Math.floor(ew)
    this.setState({
      visible4: true,
      max_leverage: c
    })
    switch (this.props.item.leverage) {
      case "2":
        this.setState({
          num17: 0,
          visible4: true
        })
        break;
      case "3":
        this.setState({
          num17: 10,
          visible4: true
        })
        break;
      case "5":
        this.setState({
          num17: 20,
          visible4: true
        })
        break;
      case "10":
        this.setState({
          num17: 30,
          visible4: true
        })
        break;
      case "25":
        this.setState({
          num17: 40,
          visible4: true
        })
        break;
      case "50":
        this.setState({
          num17: 50,
          visible4: true
        })
        break;
      case "100":
        this.setState({
          num17: 60,
          visible4: true
        })
        break;
      default:
    }
  }
  handleCancel4 = () => {
    this.setState({
      visible4: false,
    });
  }
  handleOk3 = () => {
    const {
      item
    } = this.props
    if (!this.state.baozhengjinvalue) {
      openNotificationWithIcon("opne-warning", "警告", "请输入保证金")
    } else {
      Xfn({
        _m: "post",
        _u: "incr",
        _p: {
          asset: this.props.asset,
          symbol: item.symbol,
          bid_flag: item.bid_flag,
          increase_flag: this.state.contname == "a" ? "1" : "0",
          margin: this.state.baozhengjinvalue,
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        if (code === 0) {
          this.setState({
            visible3: false,
          });
        }
      })

    }
  };
  handleCancel3 = () => {
    this.setState({
      visible3: false,
    });
  }
  ganggangti = (value) => {
    var last = 0
    for (let i = 0; i < this.props.instrumentArr.length; i++) {
      if (this.props.instrumentArr[i].symbol === this.props.item.symbol) {
        last = this.props.instrumentArr[i].last_price

      }
    }
    var b = marks[value * 1].split("X")[0]
    var a = this.props.pc_account.available * last * b
    var c = Math.floor(a)
    this.setState({
      num17: value,
      max_leverage: c
    })
  }
  handleOk4 = () => {
    let num17 = this.state.num17
    var item = this.props.item
    let time = new Date().getTime().toString()
    let leverage = marks[num17].split("X")[0]
    Xfn({
      _u: "change",
      _m: "post",
      _p: {
        asset: this.props.asset,
        symbol: item.symbol,
        mode: item.margin_mode,
        bid_flag: item.bid_flag,
        leverage,
        time
      }
    }, (res, code) => {
      if (code === 0) {
        store.dispatch({ type: "lever", lever: 1 })
        this.setState({
          visible4: false,
        });
      }
    })

  }
  //保证金
  xiugaibaozhengjin = () => {
    const a = this.props.item
    console.log(a)
    Xfn({
      _u: "yue",
      _m: "get",
      _p: {
        asset: this.props.asset,
        symbol: a.symbol.split('_')[0],
        from_account: "2",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code === 0) {
        store.dispatch({ type: "lever", lever: 1 })
        this.setState({
          visible3: true,
          MarginOpening: a.auto_increase_flag === "1" ? true : false,
          MarginAdjustment: res.data.data.available
        })
      }
    })

  }
  baozhengjingddalk = (e) => {
    this.setState({
      contname: e.target.value
    })
  }
  baozhengjonChange = (val) => {
    if (this.state.MarginOpening) {
      this.setState({
        visible3: false,
        visible7: true
      })
    } else {
      this.setState({
        visible3: false,
        visible6: true
      })
    }
  }

  handleCancel6 = () => {
    this.setState({
      visible6: false,
      visible7: false,
      visible3: true,
    })
  }
  handleOk6 = () => {

    Xfn({
      _u: "increase",
      _m: "post",
      _p: {
        asset: this.props.asset,
        symbol: this.props.item.symbol,
        bid_flag: this.props.item.bid_flag,
        open_flag: this.state.MarginOpening ? "0" : "1",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code === 0) {
        this.setState({
          MarginOpening: !this.state.MarginOpening,
          visible6: false,
          visible7: false,
          visible3: true,
        })
      }
    })

  }
  baozhengjinvalue = (val) => {
    let value = val.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = String(value).replace(/^(.*\..{4}).*$/, "$1")
    this.setState({ baozhengjinvalue: value })
  }
  jadsjfljsaldkjf = (e) => {
    console.log(e.target.value)
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    switch (this.props.item.symbol) {
      case "BTC_USD": value = value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');//只能输入1个小数  ;
        break;
      case "ETH_USD": value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入2个小数  ;
        break;
      case "EOS_USD": value = value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');//只能输入3个小数  ;
        break;
    }
    if (value * 1 > 1000000) {
      this.setState({
        pairP: 1000000
      })
      return false
    }
    if (value[0] != "0" && value[0] != ".") {
      this.setState({
        pairP: value
      })
    }
  }
  conchagnee21 = (e) => {
    let value = e.target.value;
    if (value[0] != "0" && value[0] != ".") {
      if (value * 1 > 100000000) {
        this.setState({
          num92: "100000000"
        })
        return false
      }
      this.setState({
        num92: value.replace(/[^0-9]+/, '')
      })
    }
  }
  pingcangdashu = () => {
    var close_price = this.refs.valuea.input.value
    let close_qty = this.state.num92
    let time = new Date().getTime().toString()
    if (numsslkjd.length > 0 && close_qty.length > 0) {
      console.log(this.props.item)
      Xfn({
        _u: "close",
        _m: "post",
        _p: {
          asset: this.props.asset,
          close_price,
          close_qty,
          time,
          symbol: this.props.item.symbol,
          bid_flag: this.props.item.bid_flag
        }
      }, (res, code) => { }, "交易成功")
    } else {
      openNotificationWithIcon("opne-warning", "警告", "输入框不能为空")
    }

  }
  render() {
    const {
      item,
      imgArr,
      instrumentArr
    } = this.props
    const {
      num17,
      max_leverage,
      baozhengjinvalue,
      MarginOpening,
      pairP,
      focusvalueflg,
      num92,
    } = this.state
    if (window.location.hash.indexOf("fulltrade") == -1) {
      return < div className="innercang-box-li clear" style={{
        display: sessionStorage.userInfo ? "black" : "none", borderLeftColor: item.bid_flag === "1" ? "#26994E" : "red"
      }}>
        <div className="innercang-title">
          <div style={{ color: item.bid_flag === "0" ? "red" : "" }}>{item.symbol.split("_")[0]}
            < FormattedMessage id="sustainable" defaultMessage={'永续'} />
          </div>
          <div>
            <span
              style={{
                color: item.bid_flag === "0" ? "red" : "",
                borderColor: item.bid_flag === "0" ? "red" : ""
              }}>
              {
                item.bid_flag === "1" ? "多" : '空'
              }
            </span>
            <span>{item.leverage}X</span>
          </div>
          <div>
            <img src="" alt="" />
            <span style={{ color: '#2E6BE6', cursor: "pointer" }} onClick={this.xiugaidangqianganggan}>
              <img style={{ display: "inline-block" }} src={imgArr.io} alt="" />
              < FormattedMessage id="Modify_the_current_leverage" defaultMessage={'修改当前杠杆'} />
            </span>
          </div>
        </div>
        <table style={{ width: 600 }}>
          <tbody className="table-box">
            <tr>
              <Tooltip placement="topLeft" title={help_info.Total_Cont}>
                <td>< FormattedMessage id="Hold_positions" defaultMessage={'持仓'} />(< FormattedMessage id="Zhang" defaultMessage={'张'} />)</td>
              </Tooltip>
              <td>{item.qty}</td>
              <Tooltip placement="topLeft" title={help_info.PL_Ratio}>
                <td>< FormattedMessage id="Rate_of_return" defaultMessage={'收益率'} /></td>
              </Tooltip>
              <td>{String(item.pos_pnl_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")}%</td>
              <Tooltip placement="topLeft" title={help_info.Unrealized_P}>
                <td>< FormattedMessage id="Unrealized_Profit_and_Loss" defaultMessage={'未实现盈亏'} /></td>

              </Tooltip>
              <td>{item.pnl}</td>
            </tr>
            <tr>
              <td>< FormattedMessage id="Parity" defaultMess age={'可平量'} /></td>
              <td>{item.avail_qty}</td>
              <Tooltip placement="topLeft" title={help_info.Avg_Price}>
                <td>< FormattedMessage id="Opening_average_price" defaultMessage={'开仓均价'} /></td>
              </Tooltip>
              <td>${item.entry_price}</td>
              <Tooltip placement="topLeft" title={help_info.Maint_Margin}>
                <td>< FormattedMessage id="Maintenance_margin_rate" defaultMessage={'维持保证金率'} /></td>
              </Tooltip><td>{String(item.maint_margin_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")}%</td>
            </tr>
            <tr>
              <td>保证金 </td>
              <td className="innercang-td">{item.pos_margin}
                <img style={{ cursor: "pointer" }} onClick={this.xiugaibaozhengjin}
                  style={{ display: "inline-block" }} src={imgArr.io} alt="" /></td>
              <Tooltip placement="topLeft" title={help_info.Liquidation_Price}>
                <td>< FormattedMessage id="Estimated_strong_parity" defaultMessage={'预估强平价'} /></td>
              </Tooltip>
              <td>${item.liquidation_price}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>< FormattedMessage id="Margin_rate" defaultMessage={'保证金率'} /></td>
              <td>{String(item.pos_margin_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")}%</td>
              <Tooltip placement="topLeft" title={help_info.Settled_Earnings}>
                <td>< FormattedMessage id="Achieved_Profits_and_Losses" defaultMessage={'已实现盈亏'} /></td>
              </Tooltip>
              <td>{item.realised_pnl}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="table-right">
          <div>
            <span style={{ marginLeft: 2 }}>
              < FormattedMessage id="close_rate" defaultMessage={'平仓价格'} />
            </span>
            <span style={{ marginLeft: 41 }}>
              < FormattedMessage id="Closing_Quantity" defaultMessage={'平仓数量'} />
            </span>
          </div>
          {/* t */}
          {/* depth */}
          <div className="pingcangjiage">
            <Input placeholder=""
              onFocus={this.focus1}
              ref='valuea'
              value={(() => {
                if (focusvalueflg) {
                  return pairP
                } else {
                  if (instrumentArr.length == 0) return
                  var a = 0
                  for (var i = 0; i < instrumentArr.length; i++) {
                    if (item.symbol === instrumentArr[i].symbol) {
                      numsslkjd = instrumentArr[i].last_price && instrumentArr[i].last_price > 0 ? instrumentArr[i].last_price : ""
                      switch (item.symbol) {
                        case 'BTC_USD': a = 1; break;
                        case 'ETH_USD': a = 2; break;
                        case 'EOS_USD': a = 3; break;
                        default: break;
                      }
                    }
                  }
                  return number_format(numsslkjd, a, ".")
                }
              })()}
              onChange={this.jadsjfljsaldkjf}
              style={{ width: 80, height: 20 }} />
            <Input placeholder=""
              value={num92}
              onChange={this.conchagnee21}
              style={{ width: 80, height: 20, marginLeft: 10 }} />
          </div>
          {/* c */}
          <div>
            <Button type="danger" className={item.bid_flag == "1" ? "bgred" : "lvse"}
              onClick={this.pingcangdashu}
              style={{
                width: "100%", height: 24, marginTop: '9px', color: '#F2ECE6',
                borderColor: item.bid_flag === "1" ? "#E53F39" : "#26994E", backgroundColor: item.bid_flag === "1" ? "#E53F39" : "#26994E"
              }}> < FormattedMessage id="Close_a_position" defaultMessage={'平仓'} /></Button>
          </div>
          {/* b */}
        </div>
        <Modal
          className="but0004"
          centered
          title={< FormattedMessage id="Modify_Leverage_Multiplier" defaultMessage={'修改杠杆倍数'} />}
          visible={this.state.visible4}
          onOk={this.handleOk4}
          onCancel={this.handleCancel4}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <span>< FormattedMessage id="gearing" defaultMessage={'杠杆倍数'} />：</span>
            <span className="spanganggbeishu">{(() => {
              switch (num17) {
                case 0: return "2X"; break;
                case 10: return "3X"; break;
                case 20: return "5X"; break;
                case 30: return "10X"; break;
                case 40: return "25X"; break;
                case 50: return "50X"; break;
                case 60: return "100X"; break;
                default:
                  return "2X";
                  break;
              }
            })()}</span>
          </div>
          <Slider marks={marks} step={10} value={num17} max={60} tooltipVisible={1 == 2} onChange={this.ganggangti} />
          <div className="but0004-body-text">
            <p>< FormattedMessage id="Margin_required_for_current_position" defaultMessage={'当前仓位所需保证金'} />
              <span>
                {
                  item ? String((1 * item.qty / item.entry_price / (() => {
                    switch (num17) {
                      case 0: return "2"; break;
                      case 10: return "3"; break;
                      case 20: return "5"; break;
                      case 30: return "10"; break;
                      case 40: return "25"; break;
                      case 50: return "50"; break;
                      case 60: return "100"; break;
                      default:
                        return "2X";
                        break;
                    }
                  })())).replace(/^(.*\..{4}).*$/, "$1") : "0.0000"
                }

                <span>{item && item.symbol.split("_")[0]}</span>
              </span>
              <span className="but0004-span1" style={{ float: max_leverage * 1 > 100000000 ? "left" : "right" }}>
                <FormattedMessage id="Current_leverage_multiples_up_to" defaultMessage={'当前杠杆倍数最高可开'} />
                <span>   {
                  max_leverage ? max_leverage : "--"
                }< FormattedMessage id="Zhang" defaultMessage={'张'} /></span>
              </span>
            </p>
          </div>
        </Modal>
        <Modal
          className="but0003"
          centered
          title={<FormattedMessage id="Adjustment_of_margin" defaultMessage={'调整保证金'} />}
          visible={this.state.visible3}
          onOk={this.handleOk3}
          onCancel={this.handleCancel3}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ width: "100%" }} onChange={this.baozhengjingddalk}>
            <Radio.Button style={{ width: "50%", height: 36, textAlign: "center" }} value="a"><FormattedMessage id="Increase_margin" defaultMessage={'增加保证金'} /></Radio.Button>
            <Radio.Button style={{ width: "50%", height: 36, textAlign: "center" }} value="b"><FormattedMessage id="Reduction_of_margin" defaultMessage={'减少保证金'} /></Radio.Button>
          </Radio.Group>
          <div>
            <span>
              <FormattedMessage id="Sustainable_long-term_margin" defaultMessage={'永续多头方向添加保证金'} />
            </span>
          </div>
          <div>
            <Input ref="inpcont1" value={baozhengjinvalue} onChange={this.baozhengjinvalue} />
          </div>
          <div>
            <span>{this.state.contname == "a" ? <FormattedMessage id="Maximum_increase" defaultMessage={'最多增加'} /> : "最多减少"}</span>
            <span>
              <span>{(() => {
                let anumbkd = item.qty * this.props.face_value / item.entry_price * item.maint_margin_ratio
                let apsdlkjds
                if (item.pos_margin - anumbkd > item.pos_margin - anumbkd + item.pnl * 1) {
                  apsdlkjds = item.pos_margin - anumbkd + item.pnl * 1
                } else {
                  apsdlkjds = item.pos_margin - anumbkd
                }
                return this.state.contname == "a" ? String(this.state.MarginAdjustment).replace(/^(.*\..{4}).*$/, "$1") :
                  String(apsdlkjds > 0 ? apsdlkjds : "0.0000").replace(/^(.*\..{4}).*$/, "$1")
              })()}</span>
              {item.symbol.split("_")[0]}</span>
          </div>
          <div className="innercang-posistion" >
            <span><Checkbox onChange={this.baozhengjonChange} checked={MarginOpening}>< FormattedMessage id="Automatic_additional_margin" defaultMessage={'自动追加保证金'} /></Checkbox> </span>
          </div>
          <div style={{ display: "none" }}>
            <span><FormattedMessage id="The_additional_flat_price_is" defaultMessage={'追加后的强平价格为'} />：</span>
            <span>
              ￥<span></span>
            </span>
          </div>
        </Modal>
        <Modal
          className="but0006 but00066"
          centered
          title={<FormattedMessage id="Tips" defaultMessage={'提示'} />}
          visible={this.state.visible6}
          onOk={this.handleOk6}
          onCancel={this.handleCancel6}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <FormattedMessage id="Automatic_additional_margin_tips_1"
              values={{ symbol: (item.symbol.split("_")[0]) }}
              defaultMessage={'您正在开启自动追加保证金，当您持有的合約仓位强平时，会自动将您合约账户余额中的{ticker.pair && ticker.pair.split("_")[0]}转入至持仓账户余额充当保证金，如果追加规则规定额度后仍然强平，则不再追加。这将降低您被强平的概率，但在极端情况下可能会导致您和合约账户中的{ticker.pair && ticker.pair.split("_")[0]}全部损失。您确定要开启自动追加保证金功能吗？'} />
          </div>
        </Modal>
        <Modal
          className="but0006 but0007"
          centered
          title={<FormattedMessage id="Tips" defaultMessage={'提示'} />}
          visible={this.state.visible7}
          onOk={this.handleOk6}
          onCancel={this.handleCancel6}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <FormattedMessage id="Automatic_additional_margin_tips_2"
              defaultMessage={`您正在关闭自动追加保证金，将会在您账户达到强平线时进行强平，当前所持合约将锁定亏损，
                无法再盈利或减少亏损。您确定要关闭自动追加保证金吗？`} />           </div>
        </Modal>
      </div >
    } else {
      return <div className="fultrade-box-table">
        <div className="code-li-box">
          <div className="title">
            合约
            </div>
          <div className="content" style={{
            color: item.bid_flag === "0" ? "red" : "#339F58",
            borderColor: item.bid_flag === "0" ? "red" : "#339F58"
          }}>
            {
              item.symbol
            }
          </div>
        </div>
        <div className="code-li-box">
          <div className="title">
            方向
            </div>
          <div className="content contenduo" style={{
            color: item.bid_flag === "0" ? "red" : "#339F58",
            borderColor: item.bid_flag === "0" ? "red" : "#339F58"
          }}>
            {
              item.bid_flag == "1" ? "多" : "空"
            }
          </div>
        </div>
        <div className="code-li-box">
          <div className="title">
            杠杆
            </div>
          <div className="content">
            {
              item.leverage
            }X
              <span style={{ cursor: "pointer", color: '#2E6BE6', cursor: "pointer" }} onClick={this.xiugaidangqianganggan}>
              <img style={{
                display: "inline-block", marginTop: -4,
                marginLeft: 12
              }} src={imgArr.io} alt="" />
            </span>
          </div>
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={help_info.Total_Cont}>
            <div className="title">
              持仓(张)
            </div>
          </Tooltip>
          <div className="content">
            {
              item.qty
            }
          </div>
        </div>
        <div className="code-li-box">
          <div className="title">
            可平量
            </div>
          <div className="content">
            {
              item.avail_qty
            }
          </div>
        </div>
        <div className="code-li-box">
          <div className="title">
            保证金
            </div>
          <div className="content">
            {
              item.pos_margin
            }
            <img style={{
              cursor: "pointer", display: "inline-block", marginTop: -4,
              marginLeft: 12
            }} onClick={this.xiugaibaozhengjin}
              src={imgArr.io} alt="" />
          </div>
        </div>
        <div className="code-li-box">
          <div className="title">
            保证金率
            </div>
          <div className="content">
            {
              String(item.pos_margin_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")
            }%
          </div>
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={help_info.PL_Ratio}>
            <div className="title">
              收益率
            </div></Tooltip>
          <div className="content">
            {

              String(item.pos_pnl_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")
            }
          </div>
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={help_info.Avg_Price}>
            <div className="title">
              开仓均价
            </div></Tooltip>
          <div className="content">
            ${
              item.entry_price
            }
          </div>
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={help_info.Liquidation_Price}>
            <div className="title">
              预估强平价
            </div></Tooltip>
          <div className="content">
            $ {
              item.liquidation_price
            }
          </div>
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={help_info.Settled_Earnings}>
            <div className="title">
              已实现盈亏
            </div></Tooltip>
          <div className="content">
            {
              item.realised_pnl
            }
          </div>
        </div>
        <div className="code-li-box">

          <Tooltip placement="topLeft" title={help_info.Unrealized_P}>
            <div className="title">
              未实现盈亏

            </div></Tooltip>
          <div className="content">
            {
              item.pnl
            }
          </div>
        </div>
        <div className="code-li-box">
          <Tooltip placement="topLeft" title={help_info.Maint_Margin}>
            <div className="title">
              维持保证金率
            </div></Tooltip>
          <div className="content">
            {
              String(item.maint_margin_ratio * 100).replace(/^(.*\..{2}).*$/, "$1")

            }%
          </div>
        </div>
        <div className="fenkgx">

        </div>
        <div className="code-li-box">
          <div className="title">
            平仓价格
            </div>
          <div className="content">
            <Input placeholder=""
              onFocus={this.focus1}
              ref='valuea'
              value={(() => {
                if (focusvalueflg) {
                  return pairP
                } else {
                  if (instrumentArr.length == 0) return
                  var a = 0
                  for (var i = 0; i < instrumentArr.length; i++) {
                    if (item.symbol === instrumentArr[i].symbol) {
                      numsslkjd = instrumentArr[i].last_price && instrumentArr[i].last_price > 0 ? instrumentArr[i].last_price : ""
                      switch (item.symbol) {
                        case 'BTC_USD': a = 1; break;
                        case 'ETH_USD': a = 2; break;
                        case 'EOS_USD': a = 3; break;
                        default: break;
                      }
                    }
                  }
                  return number_format(numsslkjd, a, ".")
                }
              })()}
              onChange={this.jadsjfljsaldkjf}
              style={{ width: 80, height: 20 }} />
          </div>
        </div>
        <div className="code-li-box">
          <div className="title">
            平仓数量
            </div>
          <div className="content">
            <Input placeholder=""
              value={num92}
              onChange={this.conchagnee21}
              style={{ width: 80, height: 20 }} />
          </div>
        </div>
        <div className="code-li-box">
          <div className="title" style={{ height: 13 }}>

          </div>
          <div className="content">
            <Button type="danger" className={item.bid_flag == "1" ? "bgred" : "lvse"}
              onClick={this.pingcangdashu}
              style={{
                width: "100%", height: 24, marginTop: '9px', color: '#F2ECE6',
                borderColor: item.bid_flag === "1" ? "#E53F39" : "#26994E", backgroundColor: item.bid_flag === "1" ? "#E53F39" : "#26994E"
              }}> < FormattedMessage id="Close_a_position" defaultMessage={'平仓'} /></Button>
          </div>
        </div>
        <Modal
          className="but0004"
          centered
          title={< FormattedMessage id="Modify_Leverage_Multiplier" defaultMessage={'修改杠杆倍数'} />}
          visible={this.state.visible4}
          onOk={this.handleOk4}
          onCancel={this.handleCancel4}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <span>< FormattedMessage id="gearing" defaultMessage={'杠杆倍数'} />：</span>
            <span className="spanganggbeishu">{(() => {
              switch (num17) {
                case 0: return "2X"; break;
                case 10: return "3X"; break;
                case 20: return "5X"; break;
                case 30: return "10X"; break;
                case 40: return "25X"; break;
                case 50: return "50X"; break;
                case 60: return "100X"; break;
                default:
                  return "2X";
                  break;
              }
            })()}</span>
          </div>
          <Slider marks={marks} step={10} value={num17} max={60} tooltipVisible={1 == 2} onChange={this.ganggangti} />
          <div className="but0004-body-text">
            <p>< FormattedMessage id="Margin_required_for_current_position" defaultMessage={'当前仓位所需保证金'} />
              <span>
                {
                  item ? String((1 * item.qty / item.entry_price / (() => {
                    switch (num17) {
                      case 0: return "2"; break;
                      case 10: return "3"; break;
                      case 20: return "5"; break;
                      case 30: return "10"; break;
                      case 40: return "25"; break;
                      case 50: return "50"; break;
                      case 60: return "100"; break;
                      default:
                        return "2X";
                        break;
                    }
                  })())).replace(/^(.*\..{4}).*$/, "$1") : "0.0000"
                }
                <span>{item.symbol && item.symbol.split("_")[0]}</span>
              </span>
              <span className="but0004-span1" style={{ float: max_leverage * 1 > 100000000 ? "left" : "right" }}>
                <FormattedMessage id="Current_leverage_multiples_up_to" defaultMessage={'当前杠杆倍数最高可开'} />
                <span>   {
                  max_leverage
                }< FormattedMessage id="Zhang" defaultMessage={'张'} /></span>
              </span>
            </p>
          </div>
        </Modal>
        <Modal
          className="but0003"
          centered
          title={<FormattedMessage id="Adjustment_of_margin" defaultMessage={'调整保证金'} />}
          visible={this.state.visible3}
          onOk={this.handleOk3}
          onCancel={this.handleCancel3}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <Radio.Group defaultValue="a" buttonStyle="solid" style={{ width: "100%" }} onChange={this.baozhengjingddalk}>
            <Radio.Button style={{ width: "50%", height: 36, textAlign: "center" }} value="a"><FormattedMessage id="Increase_margin" defaultMessage={'增加保证金'} /></Radio.Button>
            <Radio.Button style={{ width: "50%", height: 36, textAlign: "center" }} value="b"><FormattedMessage id="Reduction_of_margin" defaultMessage={'减少保证金'} /></Radio.Button>
          </Radio.Group>
          <div>
            <span>
              <FormattedMessage id="Sustainable_long-term_margin" defaultMessage={'永续多头方向添加保证金'} />
            </span>
          </div>
          <div>
            <Input ref="inpcont1" value={baozhengjinvalue} onChange={this.baozhengjinvalue} />
          </div>
          <div>
            <span>{this.state.contname == "a" ? <FormattedMessage id="Maximum_increase" defaultMessage={'最多增加'} /> : "最多减少"}</span>
            <span>
              <span>{(() => {
                let anumbkd = item.qty * this.props.face_value / item.entry_price * item.maint_margin_ratio
                let apsdlkjds
                if (item.pos_margin - anumbkd > item.pos_margin - anumbkd + item.pnl) {
                  apsdlkjds = item.pos_margin - anumbkd + item.pnl
                } else {
                  apsdlkjds = item.pos_margin - anumbkd
                }
                return this.state.contname == "a" ? String(this.state.MarginAdjustment).replace(/^(.*\..{4}).*$/, "$1") :
                  String(apsdlkjds > 0 ? apsdlkjds : "0.0000").replace(/^(.*\..{4}).*$/, "$1")
              })()}</span>
              {item.symbol.split("_")[0]}</span>
          </div>
          <div className="innercang-posistion" >
            <span><Checkbox onChange={this.baozhengjonChange} checked={MarginOpening}>< FormattedMessage id="Automatic_additional_margin" defaultMessage={'自动追加保证金'} /></Checkbox> </span>
          </div>
          <div style={{ display: "none" }}>
            <span><FormattedMessage id="The_additional_flat_price_is" defaultMessage={'追加后的强平价格为'} />：</span>
            <span>
              ￥<span></span>
            </span>
          </div>
        </Modal>
        <Modal
          className="but0006 but00066"
          centered
          title={<FormattedMessage id="Tips" defaultMessage={'提示'} />}
          visible={this.state.visible6}
          onOk={this.handleOk6}
          onCancel={this.handleCancel6}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <FormattedMessage id="Automatic_additional_margin_tips_1"
              values={{ symbol: (item.symbol.split("_")[0]) }}
              defaultMessage={'您正在开启自动追加保证金，当您持有的合約仓位强平时，会自动将您合约账户余额中的{ticker.pair && ticker.pair.split("_")[0]}转入至持仓账户余额充当保证金，如果追加规则规定额度后仍然强平，则不再追加。这将降低您被强平的概率，但在极端情况下可能会导致您和合约账户中的{ticker.pair && ticker.pair.split("_")[0]}全部损失。您确定要开启自动追加保证金功能吗？'} />
          </div>
        </Modal>
        <Modal
          className="but0006 but0007"
          centered
          title={<FormattedMessage id="Tips" defaultMessage={'提示'} />}
          visible={this.state.visible7}
          onOk={this.handleOk6}
          onCancel={this.handleCancel6}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <FormattedMessage id="Automatic_additional_margin_tips_2"
              defaultMessage={`您正在关闭自动追加保证金，将会在您账户达到强平线时进行强平，当前所持合约将锁定亏损，
                无法再盈利或减少亏损。您确定要关闭自动追加保证金吗？`} />           </div>
        </Modal>
      </div>
    }
  }

}
export default TablePosition