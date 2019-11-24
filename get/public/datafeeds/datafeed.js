const DataFeeds = {};

DataFeeds.Tv = function () {};

DataFeeds.Tv.prototype.onReady = function (callback) {
    const defaultConfiguration = {
        symbols_type: [],
        supported_resolutions: ['1', '5', '15', '30', '60', '360', '1D'],
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: false
    };

    callback(defaultConfiguration);
};

DataFeeds.Tv.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback, firstDataRequest) {
    //赋值回调
    if (firstDataRequest) {
        window.historyBarsUpdate = onDataCallback;
        window.barTo = null;
    }
    console.log('from',rangeStartDate)
    console.log('to',rangeEndDate)

    console.log(resolution)

    resolution = resolutionFormat(resolution); //tradingView.js
    console.log(resolution)
    if (window.ws) {
        if (window.ws.readyState === 1) {
            window.ws.sendMsg(symbolInfo, resolution);
        } else {
            window.ws.onopen = () => {
                window.ws.sendMsg(symbolInfo, resolution);
            };
        }
    }
};

// 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据。
DataFeeds.Tv.prototype.subscribeBars = function (symbolInfo, resolution, onRealTimeCallback, listenerGUID, onResetCacheNeededCallback) {
    window.realtimeBarUpdate = onRealTimeCallback;
    window.listenerGuid = symbolInfo.name + ":" + resolution;
    if (window.ws) {
        const time = Date.now();
        const p1 = "sub:contract:tvkline:" + window.listenerGuid + ":" + time + "," + time;
        // window.ws.send(p1);
    }
};


// 取消订阅K线数据。在调用subscribeBars方法时,图表库将跳过与subscriberUID相同的对象。
DataFeeds.Tv.prototype.unsubscribeBars = function (listenerGUID) {
    if (window.ws && window.ws.readyState === 1) {
        const time = Date.now();
        const param = "remove:sub:contract:tvkline:" + window.listenerGuid + ":" + time + "," + time;
        // window.ws.send(param);
    }
};

// 通过商品名称解析商品信息
DataFeeds.Tv.prototype.resolveSymbol = function (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    // const precision =  getRoundByPair(symbolName);

    const newSymbol = Object.assign({}, SymbolInfo, { //tvConfig.js
        symbol: symbolName,
        ticker: symbolName,
        name: symbolName,
        pricescale: Math.pow(10, 4) || 8, //todo
        volume_precision: 4 || 3
    });

    onSymbolResolvedCallback(newSymbol);
};
