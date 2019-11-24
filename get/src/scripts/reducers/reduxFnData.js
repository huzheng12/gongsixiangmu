import { timehuansuan } from '@/utils/time'
import number_format from '../../utils/renyinumber';
const reduxFnData = {
  //ORDERBOOKL225  数据处理函数
  peixu: (data) => {
    data.arrAsks.sort(compare('price'))
    data.arrBids.sort(function (a, b) {
      return b.price - a.price;
    })
  },
  _insert: (_newData, _oldData) => {//新增
    for (let i = 0; i < _newData.length; i++) {
      if (_newData[i].side === "sell") {
        // _newData[i].color_size = 1
        _oldData.arrAsks.push(_newData[i])
      } else {
        _oldData.arrBids.push(_newData[i])
        // _newData[i].color_size = 2
      }
    }
  },
  _delete: (_newData, _oldData) => {//删除
    for (let i = 0; i < _newData.length; i++) {
      let _pripe = _newData[i].price
      if (_newData[i].side === "sell") {
        _oldData.arrAsks = _oldData.arrAsks.filter(item => item.price !== _pripe)
      } else {
        _oldData.arrBids = _oldData.arrBids.filter(item => item.price !== _pripe)
      }
    }
  },
  color_size: (data, _oldData) => {//数量跳色的计算1
    for (let i = 0; i < data.length; i++) {
      let newData = data[i]
      if (newData.side === "sell") {
        _newoddr(_oldData.arrAsks, newData)
      } else {
        _newoddr(_oldData.arrBids, newData)
      }
    }
  },
  color_ljl: (data) => {//累积量的计算
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        data[0].ljl = data[i].size * 1
      } else {
        data[i].ljl = data[i].size * 1 + data[i - 1].ljl * 1
      }
    }
    ljl_bgcolr(data)
  },
  //INSTRUMENTFN  数据处理函数

  ObjectKvalue: (_newData, _oldData) => {
    if (_newData.lastChangePcnt) {
      if (_newData.lastChangePcnt * 1 >= 0) {
        _oldData.flgz = "1"
      } else {
        _oldData.flgz = "0"
      }
    } else {
      if (_oldData.lastChangePcnt * 1 >= 0) {
        _oldData.flgz = "10"
      } else {
        _oldData.flgz = "20"
      }
    }
    for (var i in _newData) {
      _oldData[i] = _newData[i]
    }
  },
  //成交列表处理
  d: (arr, action, state, fn) => {
    var htmls = ''
    for (let i = 0; i < arr.length; i++) {
      let j = i + 1
      arr[i].JT = "0"
      if (i == arr.length - 1) {
        arr[i].JT = "1"
      }

      if (i < arr.length - 1) {
        if (arr[i].price - arr[j].price > 0) {
          arr[i].JT = "1"
        }
        if (arr[i].price - arr[j].price < 0) {
          arr[i].JT = "2"
        }
      }

      var bg_anmetion = ""
      if (i >= action.language.length) {
        arr[i].xin = "2"
      }
      if (arr[i].xin == '1') {
        bg_anmetion = "bg_anmetion"
      }

      var time = ""
      if (!!arr[i].trade_time) {
        var tiem = timehuansuan(arr[i].trade_time)
        time = tiem.dates
      }

      var bid_flage = "S"
      var bidCo = "table-spandiv-2"
      var as = ""
      if (arr[i].JT == "1") {
        if (arr[i].side == "sell") {
          bid_flage = "B"
          bidCo = "table-spandiv-1"
          as = "as"
        } else {
          as = "as1"
        }
      }
      if (arr[i].JT == "2") {
        if (arr[i].side == "sell") {
          bid_flage = "B"
          bidCo = "table-spandiv-1"
          as = "ax1"
        } else {
          as = "ax"
        }
      } else {
        if (arr[i].side == "sell") {
          bid_flage = "B"
          bidCo = "table-spandiv-1"
        } else {

        }
      }


      var ls = (() => {
        var a = 0
        switch (state.heyuename) {
          case 'BTC_USD': a = 1; break;
          case 'ETH_USD': a = 2; break;
          case 'EOS_USD': a = 3; break;
          default: break;
        }
        if (!arr[i].price) { return false }
        return number_format(arr[i].price, 1, ".", ",")
      })()
      htmls += '<div class="table-spandiv clear ' + bidCo + ' ' + bg_anmetion + '"> <div class="td">' + '<div class="abcdes">' + ls + '</div><div class="img ' + as + '" ></div>' + '</div><div class="td">' + arr[i].qty + '</div><div class="td">' + bid_flage + '</div><div class="td">' + time + '</div></div>'
    }
    fn(htmls)
  }
}
export default reduxFnData






















//>>>>>>>

function ljl_bgcolr(data) {//累计量比例的计算
  for (let i = 0; i < data.length; i++) {
    let len = data.length - 1
    data[i].bgcolor = data[i].ljl / data[len].ljl
  }
}

function _newoddr(Olde, newD) {//数量跳色的计算2
  for (let i = 0; i < Olde.length; i++) {
    if (Olde[i].price === newD.price) {
      if (Olde[i].size * 1 > newD.size * 1) {
        if (Olde[i].color_size === 1) {
          Olde[i].color_size = 11
        } else {
          Olde[i].color_size = 1
        }
      } else if (Olde[i].size * 1 < newD.size * 1) {
        if (Olde[i].color_size === 2) {
          Olde[i].color_size = 22
        } else {
          Olde[i].color_size = 2
        }
      }
      Olde[i].size = newD.size
    }
  }
}



function compare(property) {  //排序
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}











//跳色  重置
// var old_data_buy
// var old_data_sell
// function comparelength(){
//   if (old_data_sell.length > 0 && contss.data.asks.length > 0) {
//     var len = old_data_sell.length >= contss.data.asks.length ? contss.data.asks.length : old_data_sell.length
//     for (let i = 0; i < len; i++) {
//       if (i == 0) {
//         contss.data.asks[i].ljl = contss.data.asks[i].qty * 1
//       } else {
//         contss.data.asks[i].ljl = contss.data.asks[i].qty * 1 + contss.data.asks[i - 1].ljl * 1
//       }
//       if (old_data_sell[i]['qty'] > contss.data.asks[i]['qty']) {
//         if (old_data_sell[i]['change'] == 1) {
//           contss.data.asks[i]['change'] = 11
//         } else {
//           contss.data.asks[i]['change'] = 1
//         }
//       } else if (old_data_sell[i]['qty'] < contss.data.asks[i]['qty']) {
//         if (old_data_sell[i]['change'] == 2) {
//           contss.data.asks[i]['change'] = 22
//         } else {
//           contss.data.asks[i]['change'] = 2
//         }
//       }
//     }
//   }
//   if (old_data_buy.length > 0 && contss.data.bids.length > 0) {
//     var len = old_data_buy.length >= contss.data.bids.length ? contss.data.bids.length : old_data_buy.length
//     for (let i = 0; i < len; i++) {
//       if (i == 0) {
//         contss.data.bids[i].ljl = contss.data.bids[i].qty * 1
//       } else {
//         contss.data.bids[i].ljl = contss.data.bids[i].qty * 1 + contss.data.bids[i - 1].ljl * 1
//       }
//       if (old_data_buy[i]['qty'] > contss.data.bids[i]['qty']) {
//         if (old_data_buy[i]['change'] == 1) {
//           contss.data.bids[i]['change'] = 11
//         } else {
//           contss.data.bids[i]['change'] = 1
//         }
//       } else if (old_data_buy[i]['qty'] < contss.data.bids[i]['qty']) {
//         if (old_data_buy[i]['change'] == 2) {
//           contss.data.bids[i]['change'] = 22
//         } else {
//           contss.data.bids[i]['change'] = 2
//         }
//       }
//     }
//   }
//   old_data_buy = contss.data.bids;
//   old_data_sell = contss.data.asks;
// }
//>>>>>>>