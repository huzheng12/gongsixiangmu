import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { timehuansuan } from '@/utils/time'
import { Xfn } from './axiosfn';
import store from '@/scripts/store.js'
import { lishilength, orderBookLfn, instrumentfn, pacaccoundt, candlefunction } from '../scripts/action';
import { Divider } from 'antd';
import number_format from './renyinumber';
const EventFN = {
  //资金化转
  CapitalizedTransferFN: (a, fn) => {
    fn(a - 55)
  },
  //委托、历史列表的表头单独提取
  FormHeaderUniversal: (data, fn) => {

    let tableTitle = [
      {
        title: < FormattedMessage id="Delegation_time" defaultMessage={'委托时间'} />,
        dataIndex: 'ctime',
        render: (text, record) => <div className="zititr" style={{ width: 90, wordWrap: "break-word" }}>
          <p>
            {timehuansuan(text).date}
          </p>
          <p>
            {timehuansuan(text).dates}          </p>
        </div>,
      },
      {
        title: < FormattedMessage id="contract" defaultMessage={'合约'} />,
        dataIndex: 'symbol',
        render: (text, record) => <div style={{ width: 90, wordWrap: "break-word" }}>
          {text}
        </div>,
      },
      {
        title: < FormattedMessage id="lever" defaultMessage={'杠杆'} />,
        dataIndex: 'leverage',
        render: (text, record) => <div style={{ width: 70, wordWrap: "break-word" }}>{text}X
      </div>,
      },
      {
        title: < FormattedMessage id="Type_of_transaction" defaultMessage={'交易类型'} />,
        dataIndex: 'bid_flag',
        render: (text, record) => <div
          style={{
            color: record.close_flag == "0" ? (record.bid_flag == "0" ? "#E53F39" : "#26994E") : (record.bid_flag == "0" ? "#E53F39" : "#26994E")
            , width: 80, wordWrap: "break-word"
          }}>
          {
            record.close_flag == "0" ? (record.bid_flag == "0" ? < FormattedMessage id="Short_selling" defaultMessage={'卖出开空'} /> : < FormattedMessage id="Buy_more" defaultMessage={'买入开多'} />) : (record.bid_flag == "0" ? < FormattedMessage id="Sell_Pinto" defaultMessage={'卖出平多'} /> : < FormattedMessage id="Buy_flat" defaultMessage={'买入平空'} />)
          }
        </div >,
      },
      {
        title: < FormattedMessage id="Transaction_Ratio" defaultMessage={'成交比例'} />,
        dataIndex: 'trade_ratio',
        render: (text, record) => <div style={{ width: 100, wordWrap: "break-word" }}>
          {
            String(text * 100).replace(/^(.*\..{2}).*$/, "$1")
          }%
</div >,
      },
      {
        title: <div>< FormattedMessage id="Transaction_Volume" defaultMessage={'已成交量'} />|< FormattedMessage id="Total_Entrusted_Quantity" defaultMessage={'委托总量'} /></div>,
        dataIndex: 'filled_qty',
        align: "left",
        children: [
          {
            title: <div>(< FormattedMessage id="Zhang" defaultMessage={'张'} />)</div>,
            className: "table-span-color",
            dataIndex: 'filled_qty',
            render: (text, record) => <div style={{ width: 140, }}>
              {
                String(record.filled_qty).replace(/^(.*\..{4}).*$/, "$1")
              }
              <Divider type="vertical" style={{ color: "red", height: "1em" }} />
              {
                record.qty
              }
            </div>,
          },
        ],
      },
      {
        title: <div>< FormattedMessage id="Average_Transaction_Price" defaultMessage={'成交均价'} />|< FormattedMessage id="Entrusted_Price" defaultMessage={'委托价格'} /></div>,
        dataIndex: 'avg_price',
        align: "left",
        children: [
          {
            title: "(USD)",
            className: "table-span-color",
            dataIndex: 'avg_price',
            render: (text, record) => <div style={{ width: 140, wordWrap: "break-word" }}>
              {
                record.avg_price ? record.avg_price : "0"
              }
              <span style={{ borderLeft: "1px solid #595959", margin: "0 3px " }}></span>
              {
                record.price
              }
            </div>,
          },
        ],
      },
      {
        title: data._type == 1 ? "保证金" : "收益",
        dataIndex: 'order_margin',
        align: "left",
        render: (text, record) => <div style={{ width: 80, wordWrap: "break-word" }}>
          {
            text ? String(text).replace(/^(.*\..{4}).*$/, "$1") : ""
          }
          {
            record.symol && record.symol.split("_")[0]
          }
        </div>,
      },
      {
        title: '手续费',
        dataIndex: 'fee',
        align: "left",
        render: (text, record) => <div style={{ width: 90, wordWrap: "break-word", color: text * 1 > 0 ? "#26994E" : text * 1 < 0 ? "#E53F39" : "" }}>
          {
            String(text > 0 ? "+" + text : text).replace(/^(.*\..{6}).*$/, "$1")
          }
          {
            record.symol && record.symol.split("_")[0]
          }
        </div>,

      },
      {
        title: < FormattedMessage id="state" defaultMessage={'状态'} />,
        dataIndex: 'status',
        render: (text, record) => <span style={{
          display: "block",
          width: 80, wordWrap: "break-word"
        }}>{
            (() => {
              switch (text) {
                case "1": return < FormattedMessage id="Mismatches_have_been_created" defaultMessage={'已创建未比配'} />; break;
                case "2": return < FormattedMessage id="To_close_a_deal" defaultMessage={'待成交'} />; break;
                case "4": return < FormattedMessage id="To_be_cancelled" defaultMessage={'待撤销'} />; break;
                case "8": return < FormattedMessage id="rescinded" defaultMessage={'已撤销'} />; break;
                case "16": return < FormattedMessage id="Partial_Transaction" defaultMessage={'部分成交'} />; break;
                case "32": return < FormattedMessage id="Complete_deal" defaultMessage={'全部成交'} />; break;
                default: return text;
              }
            }
            )()
          }</span>,
      },
      {
        title: < FormattedMessage id="operation" defaultMessage={'操作'} />,
        dataIndex: 'caozuo',
        render: (text, record) => <div style={{ color: "#2F6EEC", cursor: "pointer", width: 80, wordWrap: "break-word" }}
          onClick={data._type == 1 ? () => data._this.chexiao1(text, record) : () => data._this.chexiao(text, record)}>

          {
            data._type == 1 ? record.status == "4" ? "" : < FormattedMessage id="Revoke" defaultMessage={'撤销'} /> : record.status == "8" ? "" : < FormattedMessage id="See" defaultMessage={'查看'} />
          }

        </div>,
      },
    ]
    fn(tableTitle)
  },
  HistoricalRecordFN: (obj, fn) => {
    console.log(obj._pcassetquery, "obj._pcassetquery")
    Xfn({
      _u: "history",
      _m: "get",
      _p: {
        asset: obj.asset,
        next_page: "0",
        current_page: "1",
        page_size: "20",
        time: new Date().getTime().toString()
      }
    }, (res, code) => {
      if (code == 0) {
        window.historylength = '1'
        if (res.data.data && res.data.data.total) {
          store.dispatch(lishilength(res.data.data.total))
        } else {
          store.dispatch(lishilength("0"))
        }
        if (res.data.data && res.data.data.rows) {
          var arr = res.data.data.rows
          for (var i in arr) {
            arr[i].key = "aasd" + i
          }
          obj._state.setState({
            data3: arr,
            totallishi: res.data.data.total
          })
        }
      }
    })
  },
  CurrencyDigitLimit: (obj) => {
    if (!obj.content) {//传过来的值还没有拿到数据的时候  显示--
      return '--'
    }
    if (obj.type) {
      return number_format(obj.content, obj.type, ".", ",")
    }
    if (obj.heyuename) {
      var a = 0
      switch (obj.heyuename) {
        case 'BTC_USD': a = 1; break;
        case 'ETH_USD': a = 2; break;
        case 'EOS_USD': a = 3; break;
        default: break;
      }
    }
    if (obj.danwei) {
      return number_format(obj.content, a ? a : 2, ".", ",") + " " + obj.danwei
    }
    return number_format(obj.content, a ? a : 2, ".", ",")
  },
  CurrencyName: (data) => {
    let _name = null
    switch (data.heyuename) {
      case 'BTC_USD': _name = "比特币"; break;
      case 'ETH_USD': _name = "以太坊"; break;
      case 'EOS_USD': _name = "柚子币"; break;
      default: break;
    }
    return _name
  },
  orderBookL2_25: (data) => {
    if (data.action === "partial") {
      if (data.table !== "orderBookL2") {
        store.dispatch(orderBookLfn(data.data, 0))
      }
    } else if (data.action === "update") {
      store.dispatch(orderBookLfn(data.data, 1))
    } else if (data.action === "insert") {
      store.dispatch(orderBookLfn(data.data, 2))
    } else if (data.action === "delete") {
      store.dispatch(orderBookLfn(data.data, 3))
    }
  },

  tradeFn: (data) => {
    console.log(data)
    store.dispatch(pacaccoundt(data))
    if (data.action === "partial") {
    } else if (data.action === "update") {
      store.dispatch(pacaccoundt(data.data))
    } else if (data.action === "insert") {
      store.dispatch(pacaccoundt(data.data))
    } else if (data.action === "delete") {
      store.dispatch(pacaccoundt(data.data))
    }
  },

}

export default EventFN

