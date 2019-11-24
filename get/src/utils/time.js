// 
export const timehuansuan = function timehuansuan(num) {
  if (num) {
    var timestamp = num;
    var d = new Date(timestamp * 1);    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "-" +
      ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + "-" +
      (d.getDate() < 10 ? "0" + d.getDate() : d.getDate())
    var datew = Number(d.getFullYear()) + "," +
      Number(d.getMonth()) + "," +
      Number(d.getDate())
    var dates = (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":" +
      (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":" +
      (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
    var objtime = {
      n: d.getFullYear(),
      y: d.getMonth(),
      r: d.getDate(),
      s: d.getHours() < 10 ? "0" + d.getHours() : d.getHours(),
      f: d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(),
      m: d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()
    }
    var objtimes = {
      n: d.getFullYear(),
      y: d.getMonth() + 1,
      r: d.getDate(),
      s: d.getHours() < 10 ? "0" + d.getHours() : d.getHours(),
      f: d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(),
      m: d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds()
    }
    var obj = { date, objtime, dates, datew, objtimes }
    return obj
  }
}
