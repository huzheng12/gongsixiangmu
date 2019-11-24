/**
 * 处理tv时间粒度为分钟形式
 * @param {string} resolution 
 */
const resolutionFormat = (resolution) => {
  if (resolution.includes("D")) {
    return Number(resolution.split("D")[0] || "1") * 24 *60
  }
  if (resolution.includes("W")) {
    return Number(resolution.split("W")[0] || "1") & 7 * 24 *60
  }
  return resolution;
};

// 获取币种精度
// function getRoundByPair(symbol) {
//     let price;
//     let amount;

//     $.ajaxSettings.async = false;
    
//     $.get('/Tview/getRoundByPair?pair=' + symbol,function(res) {
//         if(res.code == 0) {
//             price = res.data.price_round;
//             amount = res.data.num_round; 
//         }
//     },'json')

//     return {
//         "price" : price,
//         "amount": amount
//     }
// }



