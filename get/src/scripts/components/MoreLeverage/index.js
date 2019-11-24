import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { history } from '@/utils/history'
import {
  Button,
  Modal,
  Slider,
} from 'antd';
import { Xfn } from '../../../utils/axiosfn';
const marks = {
  0: '2X',
  10: '3X',
  20: '5X',
  30: "10X",
  40: "25X",
  50: "50X",
  60: "100X"
};
const marksNub = {
  0: '2',
  10: '3',
  20: '5',
  30: "10",
  40: "25",
  50: "50",
  60: "100"
};
const markString = {
  '2': 0,
  '3': 10,
  '5': 20,
  "10": 30,
  "25": 40,
  "50": 50,
  "100": 60
};
class MoreLeverage extends Component {
  constructor() {
    super()
    this.state = {
      num17: "",
      max_leverage: "",
      visible: false,
      LeverageBuyingstate: '',
      RecordData: ""
    }
  }
  componentDidUpdate() {
    if (this.state.RecordData !== this.props.LeverageBuying) {
      this.setState({
        RecordData: this.props.LeverageBuying,
        LeverageBuyingstate: this.props.LeverageBuying
      })
    }
  }
  //点击but打开弹窗
  ganggduo = () => {
    const { LeverageBuying, pc_account, ticker } = this.props
    const {
      LeverageBuyingstate
    } = this.state
    if (!sessionStorage.userInfo) { return history.push('/login') }
    let a = markString[LeverageBuyingstate ? LeverageBuyingstate : LeverageBuying]
    var e = pc_account.available * ticker.last_price * (LeverageBuying)
    var c = Math.floor(e)
    this.setState({
      visible: true,
      num17: a,
      max_leverage: c
    })
  }
  //关闭弹窗
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  //确定修改
  handleOk = () => {
    let num17 = this.state.num17
    let mode = this.props.mode
    var symbol = this.props.heyuename
    var asset = this.props.ticker.settle_currency
    let bid_flag = this.props.Ctype
    let leverage = marksNub[num17]
    Xfn({
      _u: "change",
      _m: "post",
      _p: {
        symbol,
        asset,
        mode,
        bid_flag,
        leverage,
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          visible: false,
          LeverageBuyingstate: res.data.data.leverage,
        })
        window.wss.send(JSON.stringify({
          "op": "unsub",
          "event": "pc#position_all#" + asset
        }));
        window.wss.send(JSON.stringify({
          "op": "sub",
          "event": "pc#position_all#" + asset,
          "args": { "token": sessionStorage.userInfo }
        }));
      }
    })
  }
  //调节slider（杠杆倍数）
  modify_lever = (val) => {
    var b = marks[val * 1].split("X")[0]
    var a = this.props.pc_account.available * this.props.ticker.last_price * b
    var c = Math.floor(a)
    this.setState({
      num17: val,
      max_leverage: c
    })
  }
  calculate_margin = () => {
    // 1多0空
    for (var i = 0; i < this.props.position.length; i++) {
      let las = this.props.position[i]
      if (las.bid_flag == this.props.Ctype) {
        var data = 1 * las.qty / las.entry_price / marksNub[this.state.num17]
      }
    }
    return data ? String(data).replace(/^(.*\..{4}).*$/, "$1") : "0.0000"
  }
  render() {
    const { num17, max_leverage, LeverageBuyingstate } = this.state
    const { LeverageBuying, className, Ctype, mode } = this.props
    return (
      <div className="more_leverage_box clear">
        <Button className={className} type="primary"
          onClick={this.ganggduo}>
          {
            (() => {
              if (mode == "1") {
                return <FormattedMessage id="gearing-leverage" defaultMessage={'杠杆倍数'} />
              }
              if (Ctype == "0") {
                return <FormattedMessage id="Short_lever" defaultMessage={'做空杠杆'} />
              } else if (Ctype == "1") {
                return <FormattedMessage id="Do_multi-leverage" defaultMessage={'做多杠杆'} />
              }
            })()
          }
          <div>
            {
              LeverageBuying == "" ? "--" : LeverageBuyingstate ? LeverageBuyingstate + "X" : LeverageBuying + "X"
            }
          </div>
        </Button>
        <Modal
          className="but0004"
          centered
          title={<FormattedMessage id="Modify_Leverage_Multiplier" defaultMessage={'修改杠杆倍数'} />}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <span> <FormattedMessage id="gearing-leverage" defaultMessage={'杠杆倍数'} />：</span>
            <span>{marks[num17] ? marks[num17] : "--"}</span>
          </div>
          <Slider marks={marks} step={10} value={num17} max={60} tooltipVisible={1 == 2} onChange={this.modify_lever} />
          <div className="but0004-body-text">
            <p className="clear">
              <FormattedMessage id="Margin_required_for_current_position" defaultMessage={'当前仓位所需保证金'} />
              <span>
                {
                  this.calculate_margin()
                }
                <span>BTC</span>
              </span>
              <span className="but0004-span1" style={{ float: 'none' }}>
                <FormattedMessage id="Current_leverage_multiples_up_to" defaultMessage={'当前杠杆倍数最高可开'} />
                <span>
                  {
                    max_leverage ? max_leverage : max_leverage == "0" ? "0" : "--"
                  }
                  <FormattedMessage id="Zhang" defaultMessage={'张'} /></span>
              </span>
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

MoreLeverage.propTypes = {
  Ctype: PropTypes.string
};

export default MoreLeverage;



