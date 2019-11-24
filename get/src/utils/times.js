import store from '../scripts/store'
import { innser } from '../scripts/action';
export const time = setInterval(() => {
  const time = new Date()
  var year = time.getFullYear();
  var month = (time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1);
  var riqi = (time.getDate()) < 10 ? "0" + time.getDate() : time.getDate();
  var xingqi = (time.getDay()) == 7 ? "日" : (time.getDay())
  var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  var min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  var second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  let objDate = {
    year, month, riqi, xingqi, hour, min, second
  }
  store.dispatch(innser(objDate))
}, 1000)