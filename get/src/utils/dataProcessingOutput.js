


function timeStamp2String(time) {
  var datetime = new Date();
  datetime.setTime(time);
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
  var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
  var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return year + "-" + month + "-" + date + " " + hour + ":" + minute;
}

// K线数据处理
export function formatData(myDatas) {
  //["1563821700000","10291.89","10291.89","10271.39","10289.39","31.3742"],
  //k线 时间毫秒[0],   开[1],     高[2],     低[3],      收[4],     量[5]
  var times = []; // 时间
  var datas = [];
  var vols = []; //成交量
  var priceArr = []; //当前价
  var avgPrice = []; //均价
  for (var i = 0; i < myDatas.length; i++) {
    times.push(timeStamp2String(myDatas[i][0]));
    datas.push([
      parseFloat(myDatas[i][1]),// 开
      parseFloat(myDatas[i][4]),// 收
      parseFloat(myDatas[i][3]), // 低
      parseFloat(myDatas[i][2]), // 高
    ]);
    priceArr.push(myDatas[i][4]);
    avgPrice.push((parseFloat(myDatas[i][1]) + parseFloat(myDatas[i][2]) + parseFloat(myDatas[i][3]) + parseFloat(myDatas[i][4])) / 4)
    vols.push(myDatas[i][5]);
  }
  return {
    times: times,
    datas: datas,
    priceArr: priceArr,
    avgPrice: avgPrice,
    vols: vols,
  }
}


