import sendMessage from '@/utils/ws_send_message';
import store from '@/scripts/store'
import { leixingxuanze, disllll } from "@/scripts/action";
import { assetfn, instrumentfn, pacaccoundt, orderBookLfn, heyuename } from '../scripts/action';

export default function Subscribe(obj) {
  sessionStorage.nameold = obj._this.props.asset + '#' + obj._this.props.heyuename


  let options = sendMessage(obj._por, {
    asset: obj._asset,
    heyuename: obj._pair
  });
  store.dispatch(heyuename(obj._pair))
  var objunsub = options.objunsub
  var nameOld = options.obj.orderbookz.event
  var name = obj._this.props.heyuename;
  if (nameOld.indexOf(name) == -1) {
    store.dispatch(instrumentfn({}, obj._pair))
    for (let i in objunsub) {
      if (i === 'instrument_all' || i === 'order_all' || i === 'position_all') {
      } else {
        window.wss.send(JSON.stringify(objunsub[i]))
      }
    }
    for (let i in options.obj) {
      if (i == 'instrument_all' || i == 'order_all' || i == 'position_all') {
      } else {
        window.wss.send(JSON.stringify(options.obj[i]))
      }
    }

    store.dispatch(disllll(true))
    store.dispatch({ type: "historyflg", historyflg: "1" })
    store.dispatch({ type: "lever", lever: 1 })
    store.dispatch(leixingxuanze(obj._por.instrumentArr[obj._index]))
  }
  if (obj._type === "1") {
    var c = obj._por.instrumentArr.length
    for (var i = 0; i < c; i++) {
      var cs = "a" + i
      obj._this.refs[cs] && (obj._this.refs[cs].className = "zback-content-li")
    }
    for (var j = 0; j < c; j++) {
      if (obj._por.instrumentArr[j].symbol === obj._pair) {
        var cd = "a" + j
        obj._this.refs[cd] && (obj._this.refs[cd].className = "zback-content-li bclick")
      }
    }
  } else {
    if (obj._asset !== obj._this.props.asset || nameOld.indexOf(name) == -1) {
      store.dispatch(pacaccoundt([], 1))
      store.dispatch(orderBookLfn([], 1))

    }
  }
  if (obj._typt === 9 && obj._asset !== obj._this.props.asset) {
    for (let i in objunsub) {
      window.wss.send(JSON.stringify(objunsub[i]))
    }
    for (let i in options.obj) {
      window.wss.send(JSON.stringify(options.obj[i]))
    }
    store.dispatch(assetfn(obj._asset, 1))
  }

}