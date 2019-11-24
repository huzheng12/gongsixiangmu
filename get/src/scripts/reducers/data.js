
import {
    HCDATA,
    MarKETSQUERY,
    CHANGE_LANGUAGE,
    PACACCOUNDT,
    PRICENUBKAICANG,
    PRICENUBPINGCANGDUO,
    PRICENUBPINGCANGKONG,
    SETTINGZUIDA,
    ZHUTI,
    LISHILENGTH,
    HUODONGLENGTH,
    TOKEN,
    GOODLE,
    PCACCOUNT,
    POSITIONFUNCITON,
    INNSER,
    PRESENTCANG,
    CANGKUXUANZE,
    LEIXINGXUANZE,
    HEYUENAME,
    FUNDING,
    TICKER_ALL,
    PRICEFUNCTION,
    CANDLEFUNCTION,
    CANDLDINFUN,
    DEPTHFUNCTIO,
    ORDERFUNTION,
    DISLLLL,
    PRICENUB,
    HISTORYWEITUO,
    WSRECONNECT,
    CHANGERESOLUTION,
    ORDERBOOKL225,
    KLINEHOME,
    INSTRUMENTFN,
    PCASSETQUERY,//获取资产(又叫交易区),根据接口返回资产
    PAIRQUERY,
    ASSET,
    CANDLEFUNALLCTION
} from "../action";

import reduxFnData from './reduxFnData';
const defaultState = {
    depthArr: {},//所有币种的深度数据
    bids: "",//委托价格
    weituofal: true,
    times: {},
    presentcang: [],
    zhuocangflg: true,
    ticker: {},
    funding: {},
    ticker_all: [],
    price: {},
    position: [],
    candle: [],
    candles: {},
    funding_rate: {},
    depth: {},
    order: [],
    heyuename: "BTC_USD",//当前使用的交易对
    heyuenameSlipt: [],//交易对的切割符
    heyuenameischange: 0, // 判断交易对是否切换
    pc_account: {},
    language: 'zh',
    google: true,
    token: "",
    isLogin: 0,
    huodonglength: "0",
    lishilength: "0",
    zhuti: '',
    change_zhuti: 0,
    priceNub: '',
    pricenubkaicang: "",
    pricenubpingcangduo: "",
    pricenubpingcangkong: "",
    historyweituo: {},
    obj: {},
    pcaccoundt: [],
    pcaccounddt: '',
    pcaccoundtnumflg: 0,
    ws_connect: 0,  // 0 没有连接 1 连接上
    asset_switch: 0,  // 0 没有连接 1 连接上
    resolution: "1", // k线时间类型
    face_value: "",//合约面值  接口数据
    k_line_home_page: {},
    orderBookL2_25: 1,
    orderBookL2_25obj: {
        arrAsks: [],
        arrBids: []
    },
    orderBookL2: [],
    instrument: {},
    instrumentArr: [],
    instrumentArrss: 1,
    pcassetquery: ['BTC'],//获取资产(又叫交易区),根据接口返回资产
    pairquery: [],//查询永续合约交易对信息
    asset: "BTC",//
    kxian: 1,//
}
var iasdjflkajsd = 1
export const count = (state = defaultState, action) => {
    switch (action.type) {
        case INNSER:
            return { ...state, times: action.time }
        case ASSET:
            sessionStorage.assetOLd = state.asset
            sessionStorage.asset = action.asset
            return { ...state, asset: action.asset, asset_switch: action.num }
        case PCASSETQUERY://获取资产(又叫交易区),根据接口返回资产
            sessionStorage.assetOLd = state.asset
            sessionStorage.asset = action.dataArr.data.data.asset[0]

            return { ...state, pcassetquery: action.dataArr.data.data.asset, asset: action.dataArr.data.data.asset[0] }
        case PAIRQUERY://查询永续合约交易对信息
            state.heyuename = action.dataArr.data.data.rows[0].symbol
            state.heyuenameSlipt = action.dataArr.data.data.rows
            console.log(354654654654, state.heyuenameSlipt)
            return { ...state, pairquery: action.dataArr.data.data.rows, heyuename: state.heyuename, heyuenameSlipt: state.heyuenameSlipt }
        case PRESENTCANG:
            return { ...state, presentcang: action.cont }
        case CANGKUXUANZE:
            return { ...state, zhuocangflg: action.cont }
        case LEIXINGXUANZE:
            return { ...state, ticker: action.cont }
        case FUNDING:
            return { ...state, funding: action.cont }
        case TICKER_ALL:
            return { ...state, ticker_all: action.cont }
        case PRICEFUNCTION:
            return { ...state, price: action.cont }
        case POSITIONFUNCITON:
            state.position = action.cont
            return { ...state, position: state.position }
        case CANDLEFUNCTION:
            state.candle = action.cont
            state.kxian = state.kxian - iasdjflkajsd
            return { ...state, candle: state.candle, kxian: state.kxian }
        case CANDLEFUNALLCTION:
            state.candles[action.types] = action.cont
            state.kxian = state.kxian - iasdjflkajsd
            return { ...state, candles: state.candles, kxian: state.kxian }
        case CANDLDINFUN:
            return { ...state, funding_rate: action.cont }
        case DEPTHFUNCTIO:
            if (action.num === 1) { }
            var i = action.cont.data[0].asks.length
            for (let q = 0; q < i; q++) {
                action.cont.data[0].asks[q][5] = (action.cont.data[0].asks[q][2] / action.cont.data[0].asks[i - 1][2]).toFixed(4)
                action.cont.data[0].bids[q][5] = (action.cont.data[0].bids[q][2] / action.cont.data[0].bids[i - 1][2]).toFixed(4)
                if (i > 7) {
                    action.cont.data[0].asks[q][4] = (action.cont.data[0].asks[q][2] / action.cont.data[0].asks[7 - 1][2]).toFixed(4)
                    action.cont.data[0].bids[q][4] = (action.cont.data[0].bids[q][2] / action.cont.data[0].bids[7 - 1][2]).toFixed(4)
                } else {
                    action.cont.data[0].asks[q][4] = (action.cont.data[0].asks[q][2] / action.cont.data[0].asks[i - 1][2]).toFixed(4)
                    action.cont.data[0].bids[q][4] = (action.cont.data[0].bids[q][2] / action.cont.data[0].bids[i - 1][2]).toFixed(4)
                }
            }
            delete action.cont.data[0].symbol
            delete action.cont.data[0].timestamp
            return { ...state, depthArr: action.cont.data[0] }
        // }
        case ORDERFUNTION:
            state.order = action.cont

            return { ...state, order: state.order }
        case HEYUENAME:
            console.log(action.cont, 'action.cont')
            return { ...state, heyuename: action.cont, heyuenameischange: action.num }
        case DISLLLL:
            return { ...state, weituofal: action.cont }
        case PCACCOUNT:
            return { ...state, pc_account: action.cont.data }
        case CHANGE_LANGUAGE:
            return { ...state, language: action.language }
        case GOODLE:
            return { ...state, google: action.language }
        case TOKEN:
            return { ...state, token: action.language, isLogin: action.num }
        case HUODONGLENGTH:
            return { ...state, huodonglength: action.language }
        case LISHILENGTH:
            return { ...state, lishilength: action.language }
        case ZHUTI:
            return { ...state, zhuti: action.language, change_zhuti: action.num }
        case PRICENUB:
            return { ...state, priceNub: action.language }
        case PRICENUBKAICANG:
            return { ...state, pricenubkaicang: action.language }
        case PRICENUBPINGCANGDUO:
            return { ...state, pricenubpingcangduo: action.language }
        case PRICENUBPINGCANGKONG:
            return { ...state, pricenubpingcangkong: action.language }
        case HISTORYWEITUO:
            return { ...state, historyweituo: action.language }
        case PACACCOUNDT:
            if (action.num) { return { ...state, pcaccoundt: action.language, pcaccounddt: "", pcaccoundtnumflg: 1 } }
            if (action.language && action.language.length == 0) { return { ...state, pcaccoundt: action.language } }
            let arr = action.language.concat(state.pcaccoundt)
            arr = arr.slice(0, 33);
            arr.sort(function (a, b) {
                return b.trade_time - a.trade_time;
            })
            reduxFnData.d(arr, action, state, (htmls) => {
                state.pcaccounddt = htmls
            })
            if (action.language == []) {
                arr = []
            }
            return { ...state, pcaccoundt: arr, pcaccounddt: state.pcaccounddt, pcaccoundtnumflg: 1 }
        case WSRECONNECT:
            return { ...state, ws_connect: action.num }
        case CHANGERESOLUTION:
            return { ...state, resolution: action.num }
        case SETTINGZUIDA:
            return { ...state, settingzuida: action.num }
        case MarKETSQUERY:
            return { ...state, face_value: action.face_value }
        case KLINEHOME:
            return { ...state, k_line_home_page: action.data }
        case INSTRUMENTFN:
            if (action.num !== undefined) {//切换交易对的时候
                state.heyuename = action.num
                for (let i = 0; i < state.instrumentArr.length; i++) {
                    if (state.instrumentArr[i].symbol === state.heyuename) {
                        state.instrument = state.instrumentArr[i]
                    }
                }
                console.log(action.num, 'heyuename: action.num')
                return { ...state, instrument: state.instrument, instrumentArr: state.instrumentArr, heyuename: action.num, heyuenameischange: 1 }
            } else {//ws推送数据的时候
                state.instrumentArr = action.data
                for (let i = 0; i < action.data.length; i++) {
                    if (action.data[i].symbol === state.heyuename) {
                        state.instrument = action.data[i]
                    }
                }
                return { ...state, instrument: state.instrument, instrumentArr: state.instrumentArr }
            }
        case ORDERBOOKL225:
            if (action.types === 1) {
                return {
                    ...state, orderBookL2_25obj: {
                        arrAsks: [],
                        arrBids: []
                    }, orderBookL2_25: iasdjflkajsd
                }
            }
            if (iasdjflkajsd > 100000000) {
                iasdjflkajsd = iasdjflkajsd - 1
            } else {
                iasdjflkajsd = iasdjflkajsd + 1
            }
            if (action.data.action === "partial") {
                state.orderBookL2_25obj.arrAsks = []
                state.orderBookL2_25obj.arrBids = []
                for (let i = 0; i < action.data.data.length; i++) {
                    if (action.data.data[i].side === 'sell') {
                        state.orderBookL2_25obj.arrAsks.push(action.data.data[i])
                    } else {
                        state.orderBookL2_25obj.arrBids.push(action.data.data[i])
                    }
                }
            } else if (action.data.action === "update") {
                reduxFnData.color_size(action.data.data, state.orderBookL2_25obj)
            } else if (action.data.action === "insert") {
                reduxFnData._insert(action.data.data, state.orderBookL2_25obj)
            } else if (action.data.action === 'delete') {
                reduxFnData._delete(action.data.data, state.orderBookL2_25obj)
            }
            reduxFnData.peixu(state.orderBookL2_25obj)
            reduxFnData.color_ljl(state.orderBookL2_25obj.arrAsks)
            reduxFnData.color_ljl(state.orderBookL2_25obj.arrBids)
            // reduxFnData.comparelength(state.orderBookL2_25obj)
            return { ...state, orderBookL2_25obj: state.orderBookL2_25obj, orderBookL2_25: iasdjflkajsd }
        default:
            return state;
    }
}



