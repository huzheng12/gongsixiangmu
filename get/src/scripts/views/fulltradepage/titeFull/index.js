import React, { Component } from 'react';
import {
  Button,
  Modal,
  Radio,
  Input,
  Select,
} from 'antd';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { history } from '@/utils/history'
import Subscribe from '../../../../utils/ws_sub_unsub';
import store from '@/scripts/store.js'
import { Xfn } from '../../../../utils/axiosfn';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
import { pacaccoundt } from '../../../action';
import number_format from '../../../../utils/renyinumber';
import MoreLeverage from '../../../components/MoreLeverage';
import { numberHandle } from '../../../../utils/numberHandle';
import lang from '@/utils/language';

const { Option } = Select;

@connect(
  state => {
    return {
      heyuename: state.data.heyuename,
      ticker_all: state.data.ticker_all,
      position: state.data.position,
      ticker: state.data.ticker,
      price: state.data.price,
      funding_rate: state.data.funding_rate,
      pc_account: state.data.pc_account,
      lever: state.datum.lever,
      instrument: state.data.instrument,
      asset: state.data.asset,
      heyuenameischange: state.data.heyuenameischange,
      asset_switch: state.data.asset_switch,
    }
  }
)

class TitleFullk extends Component {
  constructor() {
    super()
    this.state = {
      uil: true,
      valuequanbushuliang: "",
      numshuliang: "0",
      imgArr: {
        modifyt1: require("../../../img/treaty_prompt.png"),
        a1: require("../../../img/rate_down.png"),
        a2: require('../../../img/rate_up.png'),
        a3: require('../../../img/taadeinfo.png'),
        a4: require('../../../img/treaty_up.png'),
        ioo: require('../../../img/nothing_data.png'),
        a5: require('../../../img/treaty_down.png'),
        ax: require('../../../img/xia.png'),
        as: require('../../../img/shang.png'),
        ax1: require('../../../img/xia_02.png'),
        as1: require('../../../img/shang_02.png'),
        down: require('../../../img/home_market_down.png'),
        up: require('../../../img/home_market_up.png'),
        box_point: require('../../../img/box_point.png'),
      },
      LeverageBuying: "",
      num17: 0,
      moshi: "2",
      max_leverage: "0",
      kong: 0,
      visible5: false,
      visible10: false,
      visible8: false,
      LeverageFoundationInformation: {},//***杠杆基础信息***
      LeverageBuying: "",//***杠杆买***
      LeveragedSell: "",//***杠杆卖***
      LeverAir: "",//***杠杆空***
      confirmLoading: false,
      ModalText: '账户模式：',
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "2",
      numshuliangold: "",
    }
  }
  handleCancel3 = () => {
    this.setState({
      visible10: false,
    });
  };
  componentDidMount() {
    this.settingzuidaz()
  }
  settingzuidaz = () => {
    if (sessionStorage.userInfo) {
      Xfn({
        _u: "settingzuida",
        _m: "get",
        _p: {
          asset: this.props.asset,
          symbol: this.props.heyuename,
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        if (code == 0) {
          this.setState({
            LeverageFoundationInformation: res.data.data,
            moshi: res.data.data.margin_mode,
            LeverageBuying: res.data.data.bid_leverage,//***杠杆买***
            LeveragedSell: res.data.data.ask_leverage,//***杠杆卖***
            LeverAir: res.data.data.ask_leverage,//***杠杆空***
          })
          store.dispatch({ type: "LeverageFoundationInformation", LeverageFoundationInformation: res.data.data.margin_mode })
        }
      })
    }
  }
  settingzuida = () => {
    this.settingzuidaz()
  }
  componentDidUpdate() {
    if (this.props.heyuenameischange === 1 || this.props.asset_switch === 1) {
      this.settingzuidaz()
    }
    if (this.props.ticker) {
      if (this.state.jiageaahenhao !== this.props.ticker.last) {
        this.setState({
          jiageaahenhao: this.props.ticker.last
        })
      }
    }
  }
  showModal = (val) => {
    if (this.props.position.length > 0) {
      this.setState({
        visible8: true,
      });
    } else {
      this.setState({
        visible10: true,
      });
    }
  };

  handleOk8 = () => {
    this.setState({
      visible8: false,
    })
  }
  positionmoshi = () => {
    Xfn({
      _u: "position",
      _m: "post",
      _p: {
        asset: this.props.asset,
        symbol: this.props.heyuename,
        pos_mode: this.state.moshi,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          moshi: res.data.data.mode
        })
      } else {
        this.setState({
          moshi: this.state.moshi == "1" ? "2" : "1"
        })
      }
    })

  }
  handleOk = () => {
    this.positionmoshi()
    this.setState({
      visible10: false
    })

  };
  valuequanbushuliang = (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    if (value[0] != ".") {
      if (value[0] == 0 && value[1] == 0) {

      } else {
        this.setState({
          valuequanbushuliang: value
        })
      }
    }
    this.setState({
      valuequanbushuliang: value,
    })

    if (!value) {
      this.setState({
        numshuliang: this.state.numshuliangold,
      })
    }
  }
  hideModalok2 = () => {
    // this.props.pc_account.symbol
    let asset = this.props.asset
    let from_account = this.state.zjzhfangxiang
    let to_account = this.state.zjzhfangxiangchu
    let qty = this.state.valuequanbushuliang
    let time = new Date().getTime().toString()
    let obj = { asset, from_account, to_account, qty, time }
    if (qty != 0) {
      try {
        Xfn({
          _m: "post",
          _u: "transferpc",
          _p: obj
        }, (res, code) => {
          this.setState({
            valuequanbushuliang: "",
            visible1: false,
            huanzhuancont: "BTC",
          })
        }, lang().SuccessfulTransfer)
      }
      catch (err) {

      }
    } else {
      openNotificationWithIcon("opne-warning", lang().warning, lang().QuantityCannotBeEmpty)
    }
  }
  sdflkjasldkfj = () => {
    if (this.state.uil) {
      this.setState({ uil: false })
      var that = this
      var para = document.createElement("div");
      para.id = "bud"
      var element = document.getElementById("root");
      element.appendChild(para);
      var bud = document.getElementById("bud");
      bud.style.zIndex = "666"
      bud.onclick = () => {
        that.setState({
          uil: true
        })
        element.removeChild(bud);
      }

    } else {
      var element = document.getElementById("root");
      var bud = document.getElementById("bud");
      this.setState({ uil: true })
      element.removeChild(bud);
    }

  }

  handleCancel8 = () => {
    this.setState({
      visible8: false,
    })
  }
  xuanzhongquanzang = (val) => {
    this.setState({
      moshi: val.target.value
    })
  }

  zijinzhuan = () => {
    this.setState({
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "2"
    })
    if (sessionStorage.userInfo) {
      const obj = {
        asset: this.props.asset,
        from_account: "1",
        time: new Date().getTime().toString()
      }
      Xfn({
        _m: "get",
        _u: "yue",
        _p: obj
      }, (res, code) => {
        if (code == 0) {
          this.setState({
            zongyuddd: res.data.data,
            lis: res.data.data.available,
            numshuliang: res.data.data.available
          })
        }
      })
      this.setState({
        visible1: true
      });
    } else {
      history.push('/login')
    }
  };


  quanbudiuguoqu = () => {
    this.setState({
      numshuliangold: this.state.numshuliang
    })
    if (this.state.zjzhfangxiang == "1") {
      if (this.state.lis > 0) {
        this.setState({
          numshuliang: "0",
          valuequanbushuliang: this.state.lis
        })

      }
    } else {
      if (this.state.numshuliang > 0) {
        this.setState({
          numshuliang: "0",
          valuequanbushuliang: this.state.numshuliang
        })

      }
    }
  }
  zjzhfangxiang = (val) => {
    this.setState({ zjzhfangxiang: val })
    if (val == "1") {
      this.setState({ zjzhfangxiangchu: "2", numshuliang: this.state.lis, valuequanbushuliang: "" })
    }
    if (val == "2") {
      this.setState({ zjzhfangxiangchu: "1", numshuliang: this.props.pc_account.available, valuequanbushuliang: "" })
    }
  }
  zjzhfangxiangchu = (val) => {
    this.setState({ zjzhfangxiangchu: val })
    if (val == "1") {
      this.setState({ zjzhfangxiang: "2", numshuliang: this.props.pc_account.available, valuequanbushuliang: "" })
    }
    if (val == "2") {
      this.setState({ zjzhfangxiang: "1", numshuliang: this.state.lis, valuequanbushuliang: "" })
    }
  }
  hideModal12 = () => {
    this.setState({
      visible1: false,

      valuequanbushuliang: '',
    });
  }
  qiehuanameming = (vale, index) => {
    store.dispatch(pacaccoundt([], 1))
    Subscribe({
      _por: this.props,
      _pair: vale.pair,
      _type: "2",
      _index: index
    })
  }
  render() {
    const {
      resetLayouts,
      heyuename,
      instrument,
      asset
    } = this.props
    const {
      imgArr,
      LeverageBuying,
      LeveragedSell,
      moshi,
      visible10,
      confirmLoading,
      ModalText,
      LeverAir,
      valuequanbushuliang,
      numshuliang,
    } = this.state
    return (
      <div className="titlefullk-warp clear">
        <div className="content-box">
          <div className="yongxu" onClick={this.sdflkjasldkfj}>
            {
              instrument.symbol ? instrument.symbol.split("_")[0] : "--"
            }
            <FormattedMessage id="sustainable" defaultMessage={'永续'} />
            {/* <ContractDropdown type={true} ticker_all={ticker_all} uil={uil}></ContractDropdown> */}
          </div>
          <div className="astimg">
            {
              instrument.change_rate_24h ? instrument.change_rate_24h >= 0 ? <div className="iconfont imgastd" style={{ color: "#26994E" }}>&#xe60e;</div> : <div className="iconfont imgastd" style={{ color: "#E53F39" }}>&#xe610;</div> : ""
            }
          </div>
          <div className="astimg">
            <div className="tetle" style={{ color: instrument.change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
              {(() => {
                return instrument.last_price ? (() => {
                  var a = 0
                  switch (heyuename) {
                    case 'BTC_USD': a = 1; break;
                    case 'ETH_USD': a = 2; break;
                    case 'EOS_USD': a = 3; break;
                    default: break;
                  }
                  return number_format(instrument.last_price, a, ".", ",")
                })() : "--"
              })()}
            </div>
          </div>
          <div className="astimg">
            <div className="shenglv" style={{ backgroundColor: instrument.change_rate_24h >= 0 ? "#26994E" : "#E53F39" }}>
              {
                (() => {
                  if (instrument.change_rate_24h) {
                    return instrument.change_rate_24h > 0 ? "+" + String(instrument.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%" : String(instrument.change_rate_24h * 100).replace(/^(.*\..{2}).*$/, "$1") + "%"
                  } else {
                    return "--"
                  }
                })()
              }
            </div>
          </div>
          <div className="zijinfeilvbox">
            <div className="box-a">
              <FormattedMessage id="24HVolume" defaultMessage={'24H成交量'} />


            </div>
            <div className="box-b">
              {
                numberHandle(instrument.volume_24h, 1)
              }
            </div>
          </div>
          <div className="zijinfeilvbox">
            <div className="box-a">
              <FormattedMessage id="IndexPrice" defaultMessage={'指数价格'} />
            </div>
            <div className="box-b">
              {
                instrument.index_price ? "$" + number_format(instrument.index_price, 2, ".", ",") : "--"
              }
            </div>
          </div>
          <div className="zijinfeilvbox">
            <div className="box-a">
              <FormattedMessage id="MarkedPrice" defaultMessage={'标记价格'} />

            </div>
            <div className="box-b">
              {
                instrument.mark_price ? "$" + number_format(instrument.mark_price, 2, ".", ",") : "--"
              }
            </div>
          </div>
          <div className="zijinfeilvbox">
            <div className="box-a">
              <FormattedMessage id="Current_fund_rate" defaultMessage={'当期资金费率'} />
            </div>
            <div className="box-b">
              {
                instrument.funding_rate ? String(instrument.funding_rate * 100).replace(/^(.*\..{3}).*$/, "$1") + "% " + "| " + instrument.funding_rate_time + lang().WithinHours : "--"
              }
            </div>
          </div>
          <div className="zijinfeilvbox">
            <div className="box-a">
              <FormattedMessage id="Budget_fund_rate" defaultMessage={'预测资金费率'} />
            </div>
            <div className="box-b">
              {
                instrument.indicative_funding_rate ? String(instrument.indicative_funding_rate * 100).replace(/^(.*\..{3}).*$/, "$1") + "% " + "| " + instrument.indicative_funding_rate_time + lang().WithinHours : "--"
              }
            </div>
          </div>
        </div>
        {
          (() => {
            if (sessionStorage.userInfo) {
              return <div className="right-box">
                <Button className="button00155" type="primary" onClick={this.zijinzhuan} style={{ float: "left", fontSize: "14px", width: 80 }}>
                  <FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />
                </Button>
                <Button className="button00155 reset-btn1" type="primary" onClick={this.showModal} style={{ float: "left" }}>
                  <FormattedMessage id="AccountMode" defaultMessage={'账号模式'} />
                  <div>
                    {moshi !== "1" ? <FormattedMessage id="Warehouse_by_warehouse" defaultMessage={'逐仓'} /> : <FormattedMessage id="FullWarehouse" defaultMessage={'全仓'} />}
                  </div>
                </Button>
                {
                  (() => {
                    if (moshi == "2") {
                      return <MoreLeverage
                        LeverageBuying={LeverageBuying}
                        Ctype="1"
                        mode="2"
                        className="lvse"
                        pc_account={this.props.pc_account}
                        ticker={this.props.instrument}
                        position={this.props.position}
                        heyuename={this.props.heyuename}
                      />
                    }
                  })()
                }
                {
                  (() => {
                    if (moshi == "2") {
                      return <MoreLeverage
                        LeverageBuying={LeveragedSell}
                        Ctype="0"
                        mode="2"
                        pc_account={this.props.pc_account}
                        ticker={this.props.instrument}
                        position={this.props.position}
                        className="bgred"
                        heyuename={this.props.heyuename}
                      />
                    }
                  })()
                }
                {
                  (() => {
                    if (moshi == "1") {
                      return <MoreLeverage
                        LeverageBuying={LeverAir}
                        Ctype="0"
                        mode="1"
                        pc_account={this.props.pc_account}
                        ticker={this.props.instrument}
                        position={this.props.position}
                        className="butbeishu"
                        heyuename={this.props.heyuename}
                      />
                    }
                  })()
                }
                <button className="reset-btn" onClick={resetLayouts}>  <FormattedMessage id="ResetLayout" defaultMessage={'重置布局'} /></button>
              </div>
            } else {
              return <div className="right-box">
                <button className="reset-btn" onClick={resetLayouts}> <FormattedMessage id="ResetLayout" defaultMessage={'重置布局'} /></button>
              </div>
            }
          })()
        }

        <Modal
          className="but0001"
          id="modalbutquancang"
          title={<FormattedMessage id="change_setting" defaultMessage={'更改设置'} />}
          visible={visible10}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel3}
          centered
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          okType=""
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <p className="sweitchp">{ModalText}</p>
          <Radio.Group defaultValue="2" value={moshi} onChange={this.xuanzhongquanzang} buttonStyle="solid" style={{ marginTop: 28 }}>
            <Radio.Button style={{ width: 80, height: 36, textAlign: "center" }} value="2"><FormattedMessage id="Warehouse_by_warehouse" defaultMessage={'逐仓'} /></Radio.Button>
            <Radio.Button style={{ width: 80, height: 36, textAlign: "center" }} value="1"><FormattedMessage id="FullWarehouse" defaultMessage={'全仓'} /></Radio.Button>
          </Radio.Group>
        </Modal>
        <Modal
          className="but0008 but00088"
          centered
          title=""
          visible={this.state.visible8}
          onOk={this.handleOk8}
          onCancel={this.handleCancel8}
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div>
            <img src={imgArr.box_point} alt="" />
          </div>
          <div className="text"><FormattedMessage id="Users_have_a_warehouse_or_bill_of_lading" defaultMessage={'用户存在持仓或挂单'} /></div>
        </Modal>
        <Modal
          className="but0002"
          title={<FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />}
          visible={this.state.visible1}
          onOk={this.hideModalok2}
          onCancel={this.hideModal12}
          centered
          okText={<FormattedMessage id="confirm" defaultMessage={'确认'} />}
          cancelText={<FormattedMessage id="cancel" defaultMessage={'取消'} />}
        >
          <div className="but0002-one">
            <div>
              <FormattedMessage id="asset" defaultMessage={'资产'} />
            </div>
            <div className="abc-a">
              <Input disabled placeholder=""
                prefix={<span> {asset}</span>}
                style={{ height: 42 }}
              />
            </div>
          </div>
          <div className="but0002-one">
            <div>
              <FormattedMessage id="Turn_the_direction" defaultMessage={'划转方向'} />
            </div>
            <div className="abc-a">
              <Select defaultValue="1" className="select2222"
                value={this.state.zjzhfangxiang}
                style={{ width: 160, height: 42, float: "left" }}
                onChange={this.zjzhfangxiang}>
                <Option value="1">  <FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
                <Option value="2"> <FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
                {/* // 1 资金账户 2 永续合约账户 3 现货账户 */}
              </Select>
              <span className="chongbi-span-huazhuan" style={{ float: "left", lineHeight: "42px" }}> <FormattedMessage id="Transfer" defaultMessage={'划转'} /></span>
              <Select defaultValue="2" className="select2222"
                style={{ width: 160, height: 42, float: "left" }}
                value={this.state.zjzhfangxiangchu}
                onChange={this.zjzhfangxiangchu}>
                <Option value="1"><FormattedMessage id="Funds_account" defaultMessage={'资金账户'} /></Option>
                <Option value="2"><FormattedMessage id="Sustainable_Contract_Account" defaultMessage={'永续合约账户'} /></Option>
              </Select>
            </div>

          </div>
          <div className="but0002-one but0002-on1">
            <div>
              <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />
            </div>
            <div className="abc-a">
              <Input placeholder="" style={{ height: 42 }} value={valuequanbushuliang} onChange={this.valuequanbushuliang} />
            </div>

          </div>
          <div className="but0002-one but0002-on1">
            <div style={{ height: 1 }}>
            </div>
            <div className="abc-a" style={{ textAlign: "left" }}>
              <span>        <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />：<span style={{ display: "inline-block" }}>{numshuliang}</span></span>
              <span className="abc-a-c" onClick={this.quanbudiuguoqu}><FormattedMessage id="All_Rolls" defaultMessage={'全部划转'} /></span>
            </div>

          </div>
        </Modal>
      </div>
    );
  }
}

export default TitleFullk;