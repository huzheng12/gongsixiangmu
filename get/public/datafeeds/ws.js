window.ws = new WebSocket("wss://message.bloex.com/ws");

ws.onmessage = (e) => {
    const data = JSON.parse(e.data);

    if (data.e === "Kmap") {
        data.d.reverse();

        let bars = [];
        for (let i = 0; i < data.d.length;i++) {
            let bar = data.d[i];
            bars.push({ time: Number(bar["t"]), volume: bar["v"], high: bar["h"], low: bar["l"], close: bar["c"], open: bar["o"] });
        }

        window.historyBarsUpdate(bars, {noData: false});
    }

    if (data.e === "ticker") {
        let bar = data.d;
        window.realtimeBarUpdate({ time: Number(bar["t"]), volume: bar["v"], high: bar["h"], low: bar["l"], close: bar["c"], open: bar["o"] });
    }
};

window.ws.sendMsg = (symbolInfo, resolution) => {
    const p = JSON.stringify({c: "s", p: [
            {t: "public", l: "coin"},
            {t: "trade", l: symbolInfo.name},
            {t: "Kmap", l: symbolInfo.name+"_"+ resolution+"m_0"},
            {t: "ticker", l: symbolInfo.name+"_"+resolution+"m"}
        ]});
    window.ws.send(p);
};