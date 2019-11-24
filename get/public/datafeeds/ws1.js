// window.ws = new WebSocket('wss://wss.xtop.io/');
// window.ws = new WebSocket('ws://47.111.145.238:8800');
window.ws = new WebSocket("ws://hupa.f3322.net:11000");

// const barsFormat = (data) => {
//     let real = false;
//     let bars = [];

//     const keys = Object.keys(data);
//     for (let i = 0; i < keys.length; i++) {
//         if (keys[i].includes("kline")) {
//             bars = data[keys[i]];
//             resolution = Number(keys[i].split("kline")[1]);
//         }
//         if (keys[i].includes("real")) {
//             real = !!data[keys[i]];
//         }
//     }

//     let newBars = [];
//     for (let i = 0; i < bars.length; i++) {
//         newBars.push({
//             time: bars[i][0] * 1000,
//             volume: bars[i][1],
//             open: bars[i][2],
//             high: bars[i][3],
//             low: bars[i][4],
//             close: bars[i][5],
//         });
//     }
//     return {bars: newBars, real};
// };

const barsFormat = (data)=> {
    let bars = [];
    let newBars = [];
    bars = data.rows;
    for (let i = 0; i < bars.length; i++) {
        newBars.push({
            time: parseFloat(bars[i][0]),
            volume: parseFloat(bars[i][1]),
            open: parseFloat(bars[i][2]),
            high: parseFloat(bars[i][3]),
            low: parseFloat(bars[i][4]),
            close: parseFloat(bars[i][5]),
        });
    }
    return newBars
}

window.Ws_Interval = setInterval(() => {
    if (window.ws && window.ws.readyState === 1) {
        try {
            window.ws.send(JSON.stringify({
                "op": "ping"
            }));
        } catch(e) {
            console.error(`WSInterval has error: ${e}`)
        }
    }
}, 1000 * 10);

window.ws.onmessage = (e) => {
    if(e.data.includes('candle')) {
        const d = JSON.parse(e.data);
        const bars = barsFormat(d.data);
        const real = d.data.current;
        if(bars.length === 0) {
            window.historyBarsUpdate(bars, { noData: true });
        } else {
            if(real == 0) {
                window.historyBarsUpdate(bars, { noData: bars.length === 0 });
            } else {
                //实时数据
                if (window.realtimeBarUpdate) {
                    for (let i = 0; i < bars.length; i++) {
                        
                        // console.log(new Date(bars[i].time));
                        
                        window.realtimeBarUpdate(bars[i]);
                    }
                }
            }
        }
        
    }
    

    // if (e.data.includes('kline')) {
        // const d = JSON.parse(e.data);
        // const keys = Object.keys(d);
        // for (let i = 0; i < keys.length;i++) {
        //     if (keys[i].includes("kline")) {
        //         const data = barsFormat(d);
        //         const bars = data.bars;
        //         const real = data.real;

        //         if (bars.length === 0) {
        //             window.historyBarsUpdate(bars, { noData: bars.length === 0 });
        //         } else {
        //             if (!real) {  // 历史数据
        //                 window.historyBarsUpdate(bars, { noData: bars.length === 0 });
        //             } else {
        //                 // 实时数据
        //                 if (window.realtimeBarUpdate) {
        //                     for (let i = 0; i < bars.length; i++) {
                             
        //                         // console.log(new Date(bars[i].time));
                              
        //                         window.realtimeBarUpdate(bars[i]);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    // }
};

window.ws.sendMsg = (symbolInfo, resolution) => {
    let to = parseInt(Date.now(), 10);
    if (window.barTo) to = window.barTo;
    const from = to - 1000 * parseInt(resolution) * 60 * 1000;
    window.barTo = from;

    // const param = "req:contract:tvkline:" + symbolInfo.name + ":" + resolution + ":" + from + "," + to;

    const param = JSON.stringify(
        {
            "op":"query",
             "event":"pc#candle#" + symbolInfo.name,
             "args":{
                      "interval": resolution, //时间间隔
                      "start_time": from.toString(), //开始时间毫秒
                      "end_time": to.toString()}   //结束时间毫秒
        }
    )

    window.ws.send(param);
};