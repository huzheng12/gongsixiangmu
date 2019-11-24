import React, { Component } from 'react';
import './index.scss'
import axios from '@/utils/ajax'
import { api } from '@/utils/api.js'
import { timehuansuan } from '@/utils/time'
import { thousands } from '@/utils/prit'
import { FormattedMessage } from 'react-intl';
import store from '@/scripts/store.js'
import lang from '@/utils/language';
import { NavLink } from "react-router-dom"

import { connect } from "react-redux";
import { Table, Modal, notification, Spin, Select } from 'antd';
import { Xfn } from '../../../../utils/axiosfn';
import EventFN from '../../../../utils/eventfn';
import { assetfn } from '../../../action';
const bodys = document.getElementsByTagName("body")[0]
const { Option } = Select;
@connect(
  state => {
    return {
      ...state.data,
      ...state.datum
    }
  }
)
class Innercangs extends Component {
  butannius = () => {
    if (this.state.baozhengj) {
      this.refs.yuan1.className = "leftswitch1"
      this.setState({
        baozhengj: false
      })
    } else {
      this.refs.yuan1.className = "switch-box-yuan"
      this.setState({
        baozhengj: true
      })
    }
  }
  state = {
    kaiguan: true,
    duo: "",
    shao: "",
    baozhengjingshuju: {},
    objtime: {},
    chakanshu: [],
    flgchecdke: false,
    visible6: false,
    visible7: false,
    visible8: false,
    num17: 0,
    num1: 0,
    num2: 0,
    num3: 0,
    positions: [],
    imgArr: {
      io: require("../../../img/treaty_modify.png"),
      ioo: require("../../../img/nothing_data.png"),
    },
    stateorder: [],
    visible3: false,
    contname: "a",
    baozhengj: true,
    visible4: false,
    contgangg: {},
    data3: [],
    columns3: [],
    pairArr: [],
    gangnum: 0,
    pair: "BTC_USD",
    bid_flag: "",
    close_flag: "",
    current_page: "1",
    page_size: "20",
    status: "",
    lishilength: ""
  }
  openNotificationWithIcon = (type, a, b) => {
    notification[type]({
      duration: 3,
      placement: "bottomRight",
      message: a,
      description: b
    });
  };
  chexiao = (a, b) => {
    console.log(b)
    var objtime = timehuansuan(b.ctime).objtimes
    Xfn({
      _u: "transactionRecord",
      _m: "get",
      _p: {
        asset: this.props.asset,
        order_id: b.id,
        symbol: b.symbol,
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          visible8: true,
          chakanshu: res.data.data.rows,
          objtime
        })
      }
    })
  }
  symbolqiehuan = () => {
    Xfn({
      _u: "pairQuery",
      _m: "get",
      _p: {
        asset: this.props.asset
      }
    }, (res, code) => {
      if (code == 0) {
        this.setState({
          pairArr: res.data.data.rows,
          pair: res.data.data.rows[0].symbol
        })
        this.axlaskdj("1", {
          pair: res.data.data.rows[0].symbol
        })
      }
    })
  }
  componentDidMount() {
    this.symbolqiehuan()
    EventFN.FormHeaderUniversal({
      _this: this,
      _type: 2,
      _pair: "wuyunaocan"
    }, (data) => {
      this.setState({
        columns3: data
      })
    })
    if (localStorage.theme) {
      this.setState({
        zhuti: localStorage.theme
      })
      bodys.className = "theme-" + localStorage.theme
    } else {
      this.setState({
        zhuti: "light"
      })
      bodys.className = "theme-light"
    }

  }
  axlaskdj = (a, obj) => {
    var symbol = this.props.heyuename
    if (obj && obj.pair) {
      symbol = obj.pair
    }
    Xfn({
      _u: "query_alltiaojian",
      _m: "get",
      _p: {
        asset: this.props.asset,
        symbol: symbol,
        bid_flag: this.state.bid_flag,
        close_flag: this.state.close_flag,
        current_page: a ? a : "1",
        page_size: this.state.page_size,
        status: this.state.status,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        if (res.data.data && res.data.data.rows) {
          var arr = res.data.data.rows
          for (var i in arr) {
            arr[i].key = "aasd" + i
          }
          window.allposiont = "1"
          this.setState({
            data3: arr,
            lishilength: res.data.data.total
          })
        }
      }
    })
  }
  handleCancel8 = () => {
    this.setState({
      visible8: false,
    })
  }
  historylength = (a) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.setState({
      current_page: a
    })
    this.axlaskdj(a)
  }
  dangqianchipang = (a) => {
    if (sessionStorage.userInfo) {
      if (window.allposiont !== "1") {
        return <Spin style={{ width: '100%', textAlign: "center", lineHeight: "500px" }} />
      } else {
        if (a <= 0) {
          return <div className="tablemeishuju">
            <img src={this.state.imgArr.ioo} alt="" />
            <div>
              < FormattedMessage id="You_dont_have_data" defaultMessage={'您暂时还没有相关数据'} />
            </div>
          </div>
        }
      }
    } else {
      return <div className="tablemeishuju">
        <img src={this.state.imgArr.ioo} alt="" />
        <div>
          您必须
         <NavLink style={{ margin: "0 5px" }} to="/login">登录</NavLink>
          才可以看到此信息
        </div>
      </div>
    }
  }
  ARHandleChange = (val) => {
    this.setState({
      pair: val
    })
    this.axlaskdj("1", {
      pair: val
    })
    setTimeout(() => {
    }, 100)
  }
  ARHandleChange1 = (val) => {
    if (val == "0") {
      this.setState({
        bid_flag: "",
        close_flag: ""
      })
      setTimeout(() => {
        this.axlaskdj()
      }, 100)
    } else {
      let a = val.split("-")[0]
      let b = val.split("-")[1]
      this.setState({
        bid_flag: a,
        close_flag: b
      })
      setTimeout(() => {
        this.axlaskdj()
      }, 100)
    }
  }
  ARHandleChange2 = (val) => {
    console.log(val)
    if (val == "0") {
      this.setState({
        status: "",
      })
      setTimeout(() => {
        this.axlaskdj()
      }, 100)
    } else {
      this.setState({
        status: val,
      })
      setTimeout(() => {
        this.axlaskdj()
      }, 100)
    }
  }
  componentWillUpdate() {
    if (this.props.asset_switch === 1) {
      store.dispatch(assetfn(this.props.asset, 0))
      this.symbolqiehuan()
    }
  }
  render() {
    const {
      columns3,
      data3,
      objtime,
      chakanshu,
      lishilength,
      pairArr
    } = this.state
    const {
      heyuenameSlipt
    } = this.props
    return (
      < div className="Innercang-warp tabe-war" >
        <div className="ar-title">
          <h3>< FormattedMessage id="Contract_Entrustment" defaultMessage={'合约委托'} /></h3>
        </div>
        <div className="tabe-tiele-content clear">
          <div className="p1">
            <Select value={this.state.pair.split("_")[0] + " 永续"} style={{ width: "100%", height: "100%" }} onChange={this.ARHandleChange}>
              {
                pairArr.map((item, index) => {
                  return <Option key={item + index} value={item.symbol}>{item.symbol.split(item.split_char)[0]} < FormattedMessage id="sustainable" defaultMessage={'永续'} /></Option>
                })
              }
            </Select>
          </div>
          <div className="p1">
            <Select defaultValue="0" style={{ width: "100%", height: "100%" }} onChange={this.ARHandleChange1}>
              <Option value="0">< FormattedMessage id="LoadiAll_typesng" defaultMessage={'全部类型'} /> </Option>
              <Option value="1-0">< FormattedMessage id="Buy_more" defaultMessage={'买入开多'} /> </Option>
              <Option value="0-0">< FormattedMessage id="Short_selling" defaultMessage={'卖出开空'} /></Option>
              <Option value="1-1"> < FormattedMessage id="Buy_flat" defaultMessage={'买入平空'} /></Option>
              <Option value="0-1">< FormattedMessage id="Sell_Pinto" defaultMessage={'卖出平多'} /></Option>
            </Select>
          </div>
          <div className="p1">
            <Select defaultValue="0" style={{ width: "100%", height: "100%" }} onChange={this.ARHandleChange2}>
              <Option value="0">全部状态</Option>
              <Option value="1">< FormattedMessage id="Mismatches_have_been_created" defaultMessage={'已创建未比配'} /> </Option>
              <Option value="2">< FormattedMessage id="To_close_a_deal" defaultMessage={'待成交'} /></Option>
              <Option value="4">< FormattedMessage id="To_be_cancelled" defaultMessage={'待撤销'} /></Option>
              <Option value="8">< FormattedMessage id="rescinded" defaultMessage={'已撤销'} /></Option>
              <Option value="16">< FormattedMessage id="Partial_Transaction" defaultMessage={'部分成交'} /></Option>
              <Option value="32">< FormattedMessage id="Complete_deal" defaultMessage={'全部成交'} /></Option>
            </Select>
          </div>
        </div>
        {
          this.dangqianchipang(data3.length)
        }
        <Table pagination={{  // 分页
          hideOnSinglePage: true,
          total: lishilength,
          pageSize: 20,
          onChange: this.historylength
        }}
          showHeader={data3.length > 0 ? true : false}
          columns={columns3}
          dataSource={data3} />
        <Modal
          className="but0006 but0008 but118"
          centered
          title={< FormattedMessage id="Detailed_transaction" defaultMessage={'成交明细'} />}
          visible={this.state.visible8}
          onCancel={this.handleCancel8}
        >
          <div>
            <table className="table-data-mingxi">
              <thead>
                <tr>
                  <th>< FormattedMessage id="Dealing_time" defaultMessage={'成交时间'} /></th>
                  <th>< FormattedMessage id="Price" defaultMessage={'价格'} /></th>
                  <th>< FormattedMessage id="Number_of_transactions" defaultMessage={'成交数量'} /></th>
                  <th>< FormattedMessage id="Turnover" defaultMessage={'成交额'} /></th>
                  <th>< FormattedMessage id="Service_Charge" defaultMessage={'手续费'} /></th>
                </tr>
              </thead>
              <tbody>
                {
                  chakanshu.map((item, index) => {
                    return (
                      <tr key={item + index}>
                        <td>
                          <p>
                            {
                              objtime.n + "-" + objtime.y + "-" + objtime.r
                            }
                          </p>
                          <p>
                            {
                              objtime.s + ":" + objtime.f + ":" + objtime.m
                            }
                          </p>
                        </td>
                        <td>${thousands(item.price)}</td>
                        <td>{item.qty}</td>
                        <td>${thousands(item.price * item.qty)}</td>
                        <td>{String(item.fee).replace(/^(.*\..{6}).*$/, "$1")}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </Modal>
      </div >
    );
  }
}
export default Innercangs