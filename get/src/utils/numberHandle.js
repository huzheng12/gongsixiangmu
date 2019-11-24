
//  
export const numberHandle = (num, type, n) => {
  if (type == 1) {//价格分割
    if (!num) {
      return "--"
    }
    num = num * 1
    return num.toLocaleString();
  }
  if (type == 2) { //四舍五入保留2位小数，没有两位补齐
    if (!n) {
      n = 2
    }
    num = num.toFixed(n);
    return num
  }
  if (type == 3) { //不四舍五入
    var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
    num = num.replace(numdd, "$1")
    return num
  }

  // var n = 2
  // var numdd = new RegExp(`^(.*\\..{${n}}).*$`)
  // num = num.replace(numdd, "$1")
  // 保留n位小数  正则替换
}

// console.log(numberHandle(1111111.564545, 3, 3))


