import axios from '@/utils/ajax'
import { api } from '@/utils/api.js'
import { openNotificationWithIcon } from './NotificationCONF';

export const Xfn = (obj, fn, b) => {
  var xh = 0
  if (!obj._p.time && !obj._t) {
    obj._p.time = new Date().getTime().toString()
  }
  if (obj._t) {
    delete obj._t
  }
  if (obj._xh) {
    delete obj._xh
    xh = 1
  }
  axios({
    method: obj._m,
    url: api[obj._u],
    params: obj._p
  }).then(res => {
    var n = 0
    if (res.data.code == 0) {
      if (xh == 1) {
        let arrdata = res.data.data.rows.length
        for (let o = 0; o < arrdata.length; o++) {
          arrdata[o].key = o + arrdata[o]
        }
      }
      if (b) {
        openNotificationWithIcon("opne-success", "成功", b)
      }
    } else {
      if (res.data.code == '-14004' ||
        res.data.code == '-11013' ||
        res.data.code == '-11003' ||
        res.data.code == '-11009') {
      } else {
        if (res.data.code == "-10045") {
          openNotificationWithIcon("opne-warning", "警告", res.data.msg)
        } else {
          openNotificationWithIcon("opne-error", "错误", res.data.msg)
        }

      }
      n = 1
    }
    if (fn) {
      fn(res, n)
    }
  })
}
