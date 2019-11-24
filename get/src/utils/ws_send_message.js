
// import sendMessage from '@/utils/ws_send_message';

export default function sendMessage(props, objdata) {
    // console.log(props)
    var asset
    var heyuename
    if (objdata && objdata.heyuename) {
        heyuename = objdata.heyuename
        asset = objdata.asset
    } else {
        heyuename = props.heyuename
        asset = props.asset
    }
    const obj = {
        instrument_all: {//instrument_all 产品更新，包括交易量以及报价
            "op": 'sub',
            "event": "pc#instrument_all_full#" + asset
        },
        orderbookz: {
            "op": 'sub',
            "event": "pc#order_book#" + asset + "#" + heyuename
        },
        position_all: {
            "op": 'sub',
            "event": "pc#position_all#" + asset,
            "args": { "token": sessionStorage.userInfo }
        },
        order_all: {
            "op": 'sub',
            "event": "pc#order_all#" + asset,
            "args": { "token": sessionStorage.userInfo }
        },
        pc_account: {
            "op": "sub",
            "event": "pc#pc_account#" + asset,
            "args": { "token": sessionStorage.userInfo, "symbol": heyuename }
        },
        trade: {
            "op": "sub",
            "event": "pc#trade#" + asset + "#" + heyuename
        }
    }
    const objunsub = {
        instrument_all: {//instrument_all 产品更新，包括交易量以及报价
            "op": "unsub",
            "event": "pc#instrument_all_full#" + props.asset
        },
        orderbookz: {
            "op": 'unsub',
            "event": "pc#order_book#" + props.asset + "#" + props.heyuename
        },
        position_all: {
            "op": 'unsub',
            "event": "pc#position_all#" + props.asset,
        },
        order_all: {
            "op": 'unsub',
            "event": "pc#order_all#" + props.asset,
        },
        pc_account: {
            "op": "unsub",
            "event": "pc#pc_account#" + props.asset,
            "args": { "symbol": props.heyuename }
        },
        trade: {
            "op": "unsub",
            "event": "pc#trade#" + props.asset + "#" + props.heyuename
        }
    }

    return {
        obj,
        objunsub
    }
}