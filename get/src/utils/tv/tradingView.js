/**
 * 处理tv时间粒度为分钟形式
 * @param {string} resolution 
 */
export const resolutionFormat = (resolution) => {
    if (resolution.includes("D")) {
      return Number(resolution.split("D")[0] || "1") * 24 *60
    }
    if (resolution.includes("W")) {
      return Number(resolution.split("W")[0] || "1") & 7 * 24 *60
    }
    return resolution;
};

// 获取币种精度
export const  getRoundByPair = (symbol)=> {
    let price;
    let amount;

    // $.ajaxSettings.async = false;
    
    // $.get('/Tview/getRoundByPair?pair=' + symbol,function(res) {
    //     if(res.code == 0) {
    //         price = res.data.price_round;
    //         amount = res.data.num_round; 
    //     }
    // },'json')

    // return {
    //     "price" : price,
    //     "amount": amount
    // }
}

export const sendMsg = (symbolInfo, resolution) => {
  let to = parseInt(Date.now()/1000, 10);
  if (window.barTo) to = window.barTo;
  const from = to - 400 * parseInt(resolution) * 60;
  window.barTo = from;

  // const param = "req:contract:tvkline:" + symbolInfo.name + ":" + resolution + ":" + from + "," + to;

  const param = JSON.stringify(
      {
          "op":"query",
           "event":"pc#candle#BTC_USDT",
           "args":{
                    "interval": resolution + "", //时间间隔
                    "start_time": from, //开始时间毫秒
                    "end_time": to}   //结束时间毫秒
      }
  )

  window.ws.send(param);
};



const barsFormat = (data) => {
  let bars = [];
  let newBars = [];
  bars = data.data;
  for (let i = 0; i < bars.length; i++) {
      newBars.push({
          time: parseFloat(new Date(bars[i].timestamp).getTime().toString()),
          open: parseFloat(bars[i].open),
          high: parseFloat(bars[i].high),
          low: parseFloat(bars[i].low),
          close: parseFloat(bars[i].close),
          volume: parseFloat(bars[i].volume),
      });
  }
  return newBars
}
