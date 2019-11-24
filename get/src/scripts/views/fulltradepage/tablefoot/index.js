import React, { Component } from 'react';
import './index.scss'
import { NavLink } from "react-router-dom"
import { connect } from "react-redux";
import TablePosition from '../../transaction/innerCang/comTable';
import Orderweituo from './orderweituo';
import { Xfn } from '../../../../utils/axiosfn';
import store from '@/scripts/store.js';
import { thousands } from '@/utils/prit'
import { Modal } from 'antd';
import { timehuansuan } from '@/utils/time'
import { FormattedMessage } from 'react-intl';
import EventFN from '../../../../utils/eventfn';
import { assetfn } from '../../../action';

@connect(
  state => {
    return {
      position: state.data.position,
      order: state.data.order,
      heyuename: state.data.heyuename,
      allposiont: state.datum.allposiont,
      asset: state.data.asset,
      asset_switch: state.data.asset_switch,
    }
  }
)
class TableFoot extends Component {
  constructor() {
    super()
    this.state = {
      classTpL1: "hovertp",
      classTpL2: "",
      classTpL3: "",
      tpnum: 1,
      imgArr: {
        io: require("../../../img/treaty_modify.png"),
        ioo: require("../../../img/nothing_data.png"),
        swk1: require("../../../img/treaty_bail_close(1).png"),
        swk2: require("../../../img/treaty_bail_close.png"),
        swk3: require("../../../img/treaty_bail_open(1).png"),
        swk4: require("../../../img/treaty_bail_open.png"),
      },
      chexiaoFlg: true,
      data3: [],
      totallishi: "",
      chakanshu: []
    }
  }
  classTpl = (item, num) => {
    console.log(item, num)
    this.setState({
      classTpL1: "",
      classTpL2: "",
      classTpL3: "",
      [item]: "hovertp",
      tpnum: num,
      visible8: false,
    })
  }
  componentDidUpdate(){
    if (this.props.asset_switch === 1) {
      this.historyJIlu()
      store.dispatch(assetfn(this.props.asset, 0))
    }
  }
  componentDidMount() {
    if (sessionStorage.userInfo) {
      this.historyJIlu()
    }
  }
  dangqianchipang = (a, b) => {
    if (sessionStorage.userInfo) {
      if (b != "1") {
        return <div style={{ position: "relative", zIndex: 999, width: "100%", textAlign: 'center', lineHeight: "200px" }}>加载中...</div>
      } else {
        if (a <= 0) {
          return <div className="tablemeishuju">
            <img src={this.state.imgArr.ioo} alt="" />
            <div>
              您暂时还没有相关数据
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
  handleCancel8 = () => {
    this.setState({
      visible8: false,
    })
  }
  historyJIlu = () => {
    console.log(this.props.asset, "this.props.assetthis.props.assetthis.props.assetthis.props.assetthis.props.assetthis.props.assetthis.props.assetthis.props.asset")
    EventFN.HistoricalRecordFN({
      _state: this,
      asset: this.props.asset
    })
  }
  chexiao = (b) => {
    var objtime = timehuansuan(b.ctime).objtimes
    console.log(b)
    Xfn({
      _u: "transactionRecord",
      _m: "get",
      _p: {
        asset: this.props.asset,
        order_id: b.id,
        symbol: b.symbol,
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        console.log(res)
        this.setState({
          visible8: true,
          chakanshu: res.data.data.rows,
          objtime
        })
      }
    })

  }
  chexiao1 = (a) => {
    console.log(a)
    if (this.state.chexiaoFlg) {
      this.setState({
        chexiaoFlg: false
      })
      Xfn({
        _m: "post",
        _u: "order3",
        _p: {
          asset: a.asset,
          id: a.id,
          symbol: a.symbol,
          time: new Date().getTime().toString()
        }
      }, (res, code) => {
        if (code == 0) {
          setTimeout(() => {
            this.setState({
              chexiaoFlg: true
            })
          }, 500)
        }
      }, "撤销成功")
    }
  }
  dianjigengduo = () => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    store.dispatch({ type: "dianjigengduo", dianjigengduo: 1 })
  }
  render() {
    const {
      classTpL1,
      classTpL2,
      classTpL3,
      tpnum,
      imgArr,
      data3,
      totallishi,
      chakanshu,
      objtime
    } = this.state
    const {
      order,
      heyuename,
      allposiont
    } = this.props
    return (
      <div className="tablefoot-warp">
        <div className="title-cd drag-handle">
          <div className={"tp " + classTpL1} onClick={() => this.classTpl("classTpL1", 1)}>当前持仓</div>
          <div className={"tp " + classTpL2} onClick={() => this.classTpl("classTpL2", 2)}>活动委托</div>
          <div className={"tp " + classTpL3} onClick={() => this.classTpl("classTpL3", 3)}>历史委托</div>
        </div>
        {
          tpnum === 1 ? <div className="tpnum1 g-x-scrollbar">
            {this.dangqianchipang(this.props.position.length, allposiont)}
            {
              this.props && this.props.position.map((item, index) => {
                return <TablePosition fenyemashu={this.fenyemashu} total={totallishi} item={item} imgArr={imgArr} key={item + index} ></TablePosition>
              })
            }
          </div> : tpnum === 2 ? <div className="tpnum2 g-x-scrollbar">
            {this.dangqianchipang(this.props.order.length, allposiont)}
            <Orderweituo heyuename={heyuename} order={order} type={1} chexiao1={this.chexiao1}></Orderweituo>
          </div> : <div className="tpnum2 g-x-scrollbar">
                {this.dangqianchipang(this.state.data3.length, window.historylength)}
                <Orderweituo heyuename={heyuename} dianjigengduo={this.dianjigengduo} order={data3} type={2} chexiao1={this.chexiao} ></Orderweituo>
              </div>
        }
        <Modal
          className="but0006 but0008 but118 butchengjiaomingzi"
          centered
          title={<FormattedMessage id="Detailed_transaction" defaultMessage={'成交明细'} />}
          visible={this.state.visible8}
          onCancel={this.handleCancel8}
        >
          <div>
            <table className="table-data-mingxi">
              <thead>
                <tr>
                  <th>< FormattedMessage id="Dealing_time" defaultMessage={'成交时间'} /></th>
                  <th>< FormattedMessage id="Price" defaultMessage={'价格'} /></th>
                  <th><FormattedMessage id="Number_of_transactions" defaultMessage={'成交数量'} /></th>
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
      </div>
    );
  }
}

export default TableFoot;