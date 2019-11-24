
export const INNSER = "innser"
export function innser(time) {
  return {
    type: INNSER,
    time
  }
}

export const PRESENTCANG = "presentcang"
export function presentcang(cont) {
  return {
    type: PRESENTCANG,
    cont
  }
}

export const CANGKUXUANZE = "cangkuxuanze"
export function cangkuxuanze(cont) {
  return {
    type: CANGKUXUANZE,
    cont
  }
}

export const LEIXINGXUANZE = "leixingxuanze"
export function leixingxuanze(cont) {
  return {
    type: LEIXINGXUANZE,
    cont
  }
}

export const FUNDING = "funding"
export function funding(cont) {
  return {
    type: FUNDING,
    cont
  }
}


export const TICKER_ALL = "TICKER_ALL"
export function ticker_allshijian(cont) {
  return {
    type: TICKER_ALL,
    cont
  }
}

export const PRICEFUNCTION = "PRICEFUNCTION"
export function pricefunction(cont) {
  return {
    type: PRICEFUNCTION,
    cont
  }
}

export const POSITIONFUNCITON = "POSITIONFUNCITON"
export function positionfunction(cont) {
  return {
    type: POSITIONFUNCITON,
    cont
  }
}
export const CANDLEFUNCTION = "CANDLEFUNCTION"
export function candlefunction(cont, types) {
  return {
    type: CANDLEFUNCTION,
    cont,
    types
  }
}
export const CANDLEFUNALLCTION = "CANDLEFUNALLCTION"
export function candlefunallction(cont,types) {
  return {
    type: CANDLEFUNALLCTION,
    cont,
    types
  }
}
export const CANDLDINFUN = "CANDLDINFUN"
export function fundingfuns(cont) {
  return {
    type: CANDLDINFUN,
    cont
  }
}
export const DEPTHFUNCTIO = "DEPTHFUNCTIO"
export function depthfuncton(cont, num) {
  return {
    type: DEPTHFUNCTIO,
    cont,
    num
  }
}
export const ORDERFUNTION = "ORDERFUNTION"
export function orderfuntion(cont) {
  return {
    type: ORDERFUNTION,
    cont
  }
}


export const HEYUENAME = "HEYUENAME"
export function heyuename(cont, num) {
  return {
    type: HEYUENAME,
    cont,
    num
  }
}
export const DISLLLL = "DISLLLL"
export function disllll(cont) {
  return {
    type: DISLLLL,
    cont
  }
}
export const PCACCOUNT = "PCACCOUNT"
export function pcaccount(cont) {
  return {
    type: PCACCOUNT,
    cont
  }
}
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE"
export function change_language(language) {
  return {
    type: CHANGE_LANGUAGE,
    language
  }
}
export const GOODLE = "GOODLE"
export function google(language) {
  return {
    type: GOODLE,
    language
  }
}
export const TOKEN = "TOKEN"
export function tokenfun(language, num) {
  return {
    type: TOKEN,
    language,
    num
  }
}

export const HUODONGLENGTH = "HUODONGLENGTH"
export function huodonglength(language) {
  return {
    type: HUODONGLENGTH,
    language
  }
}

export const LISHILENGTH = "LISHILENGTH"
export function lishilength(language) {
  return {
    type: LISHILENGTH,
    language
  }
}
export const ZHUTI = "ZHUTI"
export function zhutiyanzheng(language, num) {
  return {
    type: ZHUTI,
    language,
    num
  }
}
export const PRICENUB = "PRICENUB"
export function pricenub(language) {
  return {
    type: PRICENUB,
    language
  }
}

export const PRICENUBKAICANG = "PRICENUBKAICANG"
export function pricenubkaicang(language) {
  return {
    type: PRICENUBKAICANG,
    language
  }
}
export const PRICENUBPINGCANGDUO = "PRICENUBPINGCANGDUO"
export function pricenubpingcangduo(language) {
  return {
    type: PRICENUBPINGCANGDUO,
    language
  }
}
export const PRICENUBPINGCANGKONG = "PRICENUBPINGCANGKONG"
export function pricenubpingcangkong(language) {
  return {
    type: PRICENUBPINGCANGKONG,
    language
  }
}

export const HISTORYWEITUO = "HISTORYWEITUO"
export function historyweituo(language) {
  return {
    type: HISTORYWEITUO,
    language
  }
}
export const OBJJJ = "OBJJJ"
export function objjj(language) {
  return {
    type: OBJJJ,
    language
  }
}
export const PACACCOUNDT = "PACACCOUNDT"
export function pacaccoundt(language, num) {
  for (let i = 0; i < language.length; i++) {
    language[i].xin = '1'
  }
  return {
    type: PACACCOUNDT,
    language,
    num
  }
}

export const WSRECONNECT = "WSRECONNECT"
export function wsreconnect(num) {
  return {
    type: WSRECONNECT,
    num
  }
}

export const CHANGERESOLUTION = "CHANGERESOLUTION"
export function changeresolution(num) {
  return {
    type: CHANGERESOLUTION,
    num
  }
}
export const SETTINGZUIDA = "SETTINGZUIDA"
export function settingzuida(num) {
  return {
    type: SETTINGZUIDA,
    num
  }
}

export const MarKETSQUERY = "MarKETSQUERY"
export async function marketsquery(face_value) {
  return {
    type: MarKETSQUERY,
    face_value
  }

}
export const KLINEHOME = "K_line_home_page"
export async function klinehone(data) {
  return {
    type: KLINEHOME,
    data
  }

}
export const ORDERBOOKL225 = "orderBookL2_25"//ws 委托列表数据
export async function orderBookLfn(data, types) {
  return {
    type: ORDERBOOKL225,
    data,
    types
  }

}
export const INSTRUMENTFN = "instrument"//ws 所有币种的信息
export async function instrumentfn(data, num, pa) {
  return {
    type: INSTRUMENTFN,
    data,
    num,
    pa
  }

}
export const PCASSETQUERY = "pcAssetQuery"//http 获取资产信息
export async function pcassetqueryfn(dataArr) {
  return {
    type: PCASSETQUERY,
    dataArr
  }

}
export const PAIRQUERY = "pairQuery"//http 获取资产信息
export async function pairqueryfn(dataArr) {
  return {
    type: PAIRQUERY,
    dataArr
  }

}
export const ASSET = "assetfn"//http 获取资产信息
export async function assetfn(asset,num) {
  return {
    type: ASSET,
    asset,
    num
  }

}
