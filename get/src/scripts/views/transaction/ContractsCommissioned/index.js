import React, { Component } from 'react';
import './index.scss'
import store from '@/scripts/store.js'
import { FormattedMessage } from 'react-intl';
import { help_info } from "@/utils/help_info"
import {
  Input,
  Button,
  Modal,
  Select,
  Radio,
  message,
  Tabs,
  Tooltip
} from 'antd';
import Kaicang from '@/scripts/components/kaicang';
import { connect } from "react-redux";
import Chart from '../chartTran';
import Innercang from '../innerCang';
import { zhutiyanzheng, } from '../../../action';
import { Xfn } from '../../../../utils/axiosfn';
import { openNotificationWithIcon } from '../../../../utils/NotificationCONF';
import MoreLeverage from '../../../components/MoreLeverage';
import ContractDropdown from './ContractDropdown';
import ListOnTheRight from './ListOnTheRight';
const { Option } = Select;
var titletoubu = document.getElementById('titletoubu')
const { TabPane } = Tabs;

const bodys = document.getElementsByTagName("body")[0]
message.config({
  top: 10,
  duration: 2,
  maxCount: 3,
});
@connect(
  state => {
    return {
      ticker: state.data.ticker,
      funding: state.data.funding,
      price: state.data.price,
      funding_rate: state.data.funding_rate,
      depth: state.data.depth,
      ticker_all: state.data.ticker_all,
      heyuename: state.data.heyuename,
      position: state.data.position,
      weituofal: state.data.weituofal,
      pc_account: state.data.pc_account,
      objss: state.data.obj,
      pcaccoundt: state.data.pcaccoundt,
      pcaccounddt: state.data.pcaccounddt,
      settingzuida: state.data.settingzuida,
      heyuenameischange: state.data.heyuenameischange,
      lever: state.datum.lever,
      depthArr: state.data.depthArr,
      orderBookL2_25obj: state.data.orderBookL2_25obj,
      orderBookL2_25: state.data.orderBookL2_25,
      instrument: state.data.instrument,
      instrumentArr: state.data.instrumentArr,
      pcassetquery: state.data.pcassetquery,
      pairquery: state.data.pairquery,
      asset: state.data.asset,
      asset_switch: state.data.asset_switch,

    }
  }
)
class ContractsCommissioned extends Component {
  constructor() {
    super()
    this.state = {
      weituofal: true,
      zuokonggangganX1: "2X",
      zuokonggangganX2: "2X",
      valuequanbushuliang: "",
      huanzhuancont: "BTC",
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "2",
      lis: "0",
      kong: 0,
      visible5: false,
      max_leverage: "0",
      numshuliang: "0",
      num17: 0,
      pairname: "",
      heueey: {},
      imgArr: {
        jiaoyit1: require("../../../img/taadeinfo.png"),
        shichangt1: require("../../../img/marketinfo.png"),
        modifyt1: require("../../../img/treaty_prompt.png"),
        modifyt2: require("../../../img/treaty_down.png"),
        bai: require("../../../img/moshi_bai.png"),
        lvjian: require("../../../img/treaty_price_up.png"),
        treaty: require("../../../img/treaty_price.png"),
        box_point: require("../../../img/box_point.png"),
        moshi_hei: require("../../../img/moshi_hei.png"),
        jt1: require('../../../img/treaty_price_down01.png'),
        jt2: require('../../../img/treaty_price_down02.png'),
        jt3: require('../../../img/treaty_price_up01.png'),
        jt4: require('../../../img/treaty_price_up02.png'),
        biao: require('../../../img/biao.png'),
        xian: require('../../../img/xian.png'),
        a1: require("../../../img/rate_down.png"),
        a2: require('../../../img/rate_up.png'),
        a3: require('../../../img/taadeinfo.png'),
        ioo: require('../../../img/nothing_data.png'),
        a4: require('../../../img/treaty_up.png'),
        a5: require('../../../img/treaty_down.png'),
        ax: require('../../../img/xia.png'),
        as: require('../../../img/shang.png'),
        ax1: require('../../../img/xia_02.png'),
        as1: require('../../../img/shang_02.png'),
      },
      asks: [],
      bids: [],
      ModalText: '账户模式：',
      visible10: false,
      confirmLoading: false,
      disabled: false,
      userticker: {},
      ticker_all: [],
      ceshi: "",
      visible1: false,
      flgzuocang: true,
      visible8: false,
      zhuti: "",
      zongyuddd: {},
      deptharr: [],
      handleChange: "BTC",
      jiageaahenhao: "",
      uil: true,
      kaiguan: true,
      panduanxiugai: true,
      LeverageFoundationInformation: {},//***杠杆基础信息***
      LeverageBuying: "",//***杠杆买***
      LeveragedSell: "",//***杠杆卖***
      LeverAir: "",//***杠杆空***
      moshi: "2",
      urlFlg: true,
      numshuliangold: ""

    }
    var that = this;
  }
  componentWillUnmount() {
    titletoubu.innerHTML = "GTE比特币合约交易所"
  }
  componentDidUpdate() {
    if (this.props.heyuenameischange === 1 || this.props.asset_switch === 1) {
      console.log(this.props.heyuename)
      this.settingzuida(this.props.heyuename)
    }
    if (this.props.ticker) {
      if (this.state.jiageaahenhao !== this.props.ticker.last) {
        this.setState({
          jiageaahenhao: this.props.ticker.last
        })
      }
    }
  }
  settingzuida = (a) => {
    setTimeout(() => {
      const {
        asset
      } = this.props
      if (sessionStorage.userInfo) {
        Xfn({
          _u: 'settingzuida',
          _m: 'get',
          _p: {
            symbol: a ? a : this.props.heyuename,
            asset: asset
          }
        }, (res, c) => {
          if (c == 0) {
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
    }, 1000)

  }
  componentDidMount() {
    titletoubu.innerHTML = (this.props.ticker.last ? this.props.ticker.last : "") + "(" + this.props.heyuename + ")" + "交易 - GTE"
    this.settingzuida()
    if (localStorage.theme) {
      this.setState({
        zhuti: localStorage.theme
      })
      bodys.className = "theme-" + localStorage.theme
    } else {
      this.setState({
        zhuti: "dark"
      })
      bodys.className = "theme-dark"
      localStorage.theme = "dark"
    }
  }

  handleDisabledChange = disabled => {
    this.setState({ disabled });
  };

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
  qiehuanmosi = () => {
    if (this.state.zhuti == "dark") {
      bodys.className = "theme-light"
      this.setState({
        zhuti: "light"
      })
      localStorage.theme = "light"
      store.dispatch(zhutiyanzheng('light', 1))

    } else {
      bodys.className = "theme-dark"
      this.setState({
        zhuti: "dark"
      })
      localStorage.theme = "dark"
      store.dispatch(zhutiyanzheng('dark', 1))
    }
  }
  positionmoshi = () => {
    const {
      pcassetquery
    } = this.props
    Xfn({
      _u: "position",
      _m: 'post',
      _p: {
        symbol: this.props.heyuename,
        asset: pcassetquery[0],
        pos_mode: this.state.moshi,
      }
    }, (res, c) => {
      if (c == 0) {
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

  handleCancel3 = () => {
    this.setState({
      visible10: false,
    });
  };
  zijinzhuan = () => {
    this.setState({
      zjzhfangxiang: "1",
      zjzhfangxiangchu: "2"
    })
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
  };

  hideModalok2 = () => {
    if (!this.state.urlFlg) {
      return
    }
    this.setState({
      urlFlg: false
    })
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
            urlFlg: true
          })
        }, '划转成功')
      } catch (err) {

      }
    } else {
      openNotificationWithIcon("opne-warning", "警告", '数量不能为空')
    }
  }
  hideModal12 = () => {
    this.setState({
      visible1: false,
      valuequanbushuliang: ""
    });
  }

  xuanzhongquanzang = (val) => {
    this.setState({
      moshi: val.target.value
    })
  }

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
  handleCancel8 = () => {
    this.setState({
      visible8: false,
    })
  }
  handleOk8 = () => {
    this.setState({
      visible8: false,
    })
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
  callback = (key) => {
    console.log(key);
  }

  sdflkjasldkfj = () => {
    if (this.state.uil) {
      this.setState({ uil: false })
      if (this.state.uil) {
        var that = this
        var para = document.createElement("div");
        para.id = "bud"
        var element = document.getElementById("root");
        element.appendChild(para);
        var bud = document.getElementById("bud");
        bud.onclick = () => {
          console.log(0)
          that.setState({
            uil: true
          })
          element.removeChild(bud);
        }
      }
    } else {
      var element = document.getElementById("root");
      var bud = document.getElementById("bud");
      this.setState({ uil: true })
      element.removeChild(bud);
    }
  }

  render() {
    const {
      imgArr,
      ModalText,
      visible10,
      confirmLoading,
      valuequanbushuliang,
      numshuliang,
      uil,
      LeverageBuying,//***杠杆买***
      LeveragedSell,//***杠杆卖***
      LeverAir,//***杠杆空***
      moshi,
    } = this.state
    const {
      ticker,
      price,
      pc_account,
      weituofal,
      pcaccounddt,
      heyuename,
      orderBookL2_25obj,
      instrument,
      instrumentArr
    } = this.props
    return (
      <div className="transaction-warp-ss clear" id="d1">
        <div className="content-right-ss" style={{ width: sessionStorage.userInfo ? 1000 : 1200 }}>
          {/* 内容的中部 */}
          <div className="saction-content-top clear">
            <span className="spantitle" onClick={this.sdflkjasldkfj} style={{
              display: "inline-block", width: 130,
              minHeight: 1, cursor: 'pointer'
            }}>

              {
                instrument.symbol ? instrument.symbol.split(instrument.split_char)[0] : "--"
              }
              <FormattedMessage id="sustainable" defaultMessage={'永续'} />
              <ContractDropdown ticker_all={instrumentArr} uil={uil}></ContractDropdown>
            </span>
            <Tooltip placement="topRight" title={help_info.Current_Rate}>
              <div>
                <p> <FormattedMessage id="Current_fund_rate" defaultMessage={'当期资金费率'} /></p>
                <span> {
                  instrument.funding_rate ? String(instrument.funding_rate * 100).replace(/^(.*\..{3}).*$/, "$1") + "%" : "--"
                }</span>
              </div>
            </Tooltip>
            <Tooltip placement="topRight" title={help_info.Predicted_Rate}>
              <div>
                <p><FormattedMessage id="Budget_fund_rate" defaultMessage={'预测资金费率'} /></p>
                <span>
                  {
                    instrument.indicative_funding_rate ? String(instrument.indicative_funding_rate * 100).replace(/^(.*\..{3}).*$/, "$1") + "%" : "--"
                  }                </span>
              </div>
            </Tooltip>
            {
              (() => {
                if (sessionStorage.userInfo) {
                  return (
                    <div>
                      <p className="p2"><FormattedMessage id="Total_assets" defaultMessage={'资产总额'} /></p>
                      <span>{sessionStorage.userInfo ? pc_account && pc_account.total ? pc_account.total : "--" : "--"}</span>
                      <span>
                        {sessionStorage.userInfo ? pc_account && pc_account.symbol : ""}
                      </span>
                    </div>
                  )
                }
              })()
            }
            {
              (() => {
                if (sessionStorage.userInfo) {
                  return (
                    <div>
                      <p className="p2"><FormattedMessage id="Available_balance" defaultMessage={'可用余额'} /></p>
                      <span>{sessionStorage.userInfo ? pc_account && pc_account.available ? pc_account.available : "--" : "--"}</span>
                      <span>
                        {sessionStorage.userInfo ? pc_account && pc_account.symbol : ""}
                      </span>
                    </div>
                  )
                }
              })()
            }
            {
              (() => {
                if (sessionStorage.userInfo) {
                  return (
                    <div className="content-zijin ziticolor" onClick={this.zijinzhuan} style={{ marginRight: 0 }}>
                      <FormattedMessage id="Transfer_of_funds" defaultMessage={'资金划转'} />
                    </div>
                  )
                }
              })()
            }
            <div>
            </div>
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
                    prefix={<span> {this.props.asset}</span>}
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
                  <span className="chongbi-span-huazhuan" style={{ float: "left", lineHeight: "42px" }}>
                    <FormattedMessage id="Transfer" defaultMessage={'划转'} />


                  </span>
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
                  <FormattedMessage id="Transfer_Quantity" defaultMessage={'划转数量'} />:
                </div>
                <div className="abc-a">
                  <Input placeholder="" style={{ height: 42 }} value={valuequanbushuliang} onChange={this.valuequanbushuliang} />
                </div>

              </div>
              <div className="but0002-one but0002-on1">
                <div style={{ height: 1 }}>
                </div>
                <div className="abc-a" style={{ textAlign: "left" }}>
                  <span>  <FormattedMessage id="Convertible_Quantity" defaultMessage={' 可转数量'} />   ：<span style={{ display: "inline-block" }}>{numshuliang}</span></span>
                  <span className="abc-a-c" onClick={this.quanbudiuguoqu}><FormattedMessage id="All_Rolls" defaultMessage={'全部划转'} /></span>
                </div>

              </div>
            </Modal>
            <div onClick={this.qiehuanmosi} style={{ float: "right", marginLeft: 0 }}>
              <Button style={{ fontSize: 9, display: this.state.zhuti == "light" ? "block" : "none" }}
                type="primary" className="button-0000111 button-moshi "><FormattedMessage id="Pattern" defaultMessage={'模式'} />
                <div>
                  <img src={imgArr.bai} alt="" />
                </div>
              </Button>
              <Button style={{
                display: this.state.zhuti == "light" ? "none" : "block",
                backgroundColor: "background:rgba(47,111,237,.3)"
              }} type="primary" className="button-1">
                <img style={{ marginLeft: 0 }} src={imgArr.moshi_hei} alt="" />
              </Button>
            </div>
            {
              (() => {
                if (sessionStorage.userInfo) {
                  return (
                    <div style={{ float: "right", marginLeft: 0 }}>
                      <Button className="button00155 bglanse" type="primary" onClick={this.showModal} style={{ float: "left", fontSize: "12px" }}>

                        <FormattedMessage id="AccountMode" defaultMessage={'账号模式'} />
                        <div>
                          {moshi !== "1" ? <FormattedMessage id="Warehouse_by_warehouse" defaultMessage={'逐仓'} /> : <FormattedMessage id="FullWarehouse" defaultMessage={'全仓'} />}
                        </div>
                      </Button>
                      {
                        moshi !== "1" ?
                          <div className="a-but clear" style={{ float: "left" }}>
                            <MoreLeverage
                              LeverageBuying={LeverageBuying}
                              Ctype="1"
                              mode="2"
                              className="lvse"
                              pc_account={this.props.pc_account}
                              ticker={this.props.instrument}
                              position={this.props.position}
                              heyuename={this.props.heyuename}
                            />
                            <MoreLeverage
                              LeverageBuying={LeveragedSell}
                              Ctype="0"
                              mode="2"
                              pc_account={this.props.pc_account}
                              ticker={this.props.instrument}
                              position={this.props.position}
                              className="bgred"
                              heyuename={this.props.heyuename}
                            />
                          </div> :
                          <div className="clear" style={{ float: "left" }}>
                            <MoreLeverage
                              LeverageBuying={LeverAir}
                              Ctype="0"
                              mode="1"
                              pc_account={this.props.pc_account}
                              ticker={this.props.instrument}
                              position={this.props.position}
                              className="butbeishu"
                              heyuename={this.props.heyuename}
                            />
                          </div>
                      }
                    </div>
                  )
                }
              })()
            }
            <div className="but1105">
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
            </div>
          </div>
          <div className="saction-content-box clear" >
            {/* 右边列表 */}
            {
              sessionStorage.userInfo ? (
                <div className="saction-right-section tiziyanses" >
                  <div className="section-titlt tiziyanse ">
                    <span style={{ width: "50%" }}><FormattedMessage id="Price" defaultMessage={'价格'} />(USD)&emsp;</span>
                    <span style={{ width: "50%", paddingRight: 15 }}><FormattedMessage id="Number"
                      defaultMessage={'数量'} />(<FormattedMessage id="Zhang" defaultMessage={'张'} />)</span>
                  </div>

                  <ListOnTheRight
                    imgArr={imgArr}
                    price={price}
                    orderBookL2_25obj={orderBookL2_25obj}
                    instrument={instrument}
                    ticker={ticker}
                    heyuename={heyuename}
                  ></ListOnTheRight>
                </div>
              ) : (<div className="saction-right-section saction-right-uiser" style={{ width: 420 }}>
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                  <TabPane tab={<FormattedMessage id="DelegationList" defaultMessage={'委托列表'} />} key="1" className="weidengluzhiqian">
                    <div className="section-titlt tiziyanse " style={{ height: 20, fontSize: 12 }}>
                      <span><FormattedMessage id="Price" defaultMessage={'价格'} />(USD)&emsp;</span><span><FormattedMessage id="Number" defaultMessage={'数量'} />(<FormattedMessage id="Zhang" defaultMessage={'张'} />)</span>
                      <span style={{ width: "40%" }}><FormattedMessage id="Cumulants" defaultMessage={'累积量'} />&emsp;</span>
                    </div>

                    <ListOnTheRight
                      imgArr={imgArr}
                      price={price}
                      orderBookL2_25obj={orderBookL2_25obj}
                      ticker={ticker}
                      instrument={instrument}
                      heyuename={heyuename}
                    ></ListOnTheRight>
                  </TabPane>
                  <TabPane tab={<FormattedMessage id="TransactionList" defaultMessage={'成交列表'} />} key="2">
                    <div className="td-spandiv clear">
                      <div className="td"><FormattedMessage id="Price" defaultMessage={'价格'} /></div>
                      <div className="td"><FormattedMessage id="Number" defaultMessage={'数量'} /></div>
                      <div className="td"><FormattedMessage id="direction" defaultMessage={'方向'} /></div>
                      <div className="td"><FormattedMessage id="time" defaultMessage={'时间'} /></div>
                    </div>
                    <div className="table-fixa">
                      <div dangerouslySetInnerHTML={{ __html: pcaccounddt }}>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>)

            }
            <Chart style={{ float: "left" }}></Chart>
            <Kaicang style={{ float: "left" }}></Kaicang>
          </div>
          <Innercang weituofal={weituofal}></Innercang>
        </div>

        <div className="but0003-moudou">
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
        </div>

      </div >
    );
  }
}

export default ContractsCommissioned
