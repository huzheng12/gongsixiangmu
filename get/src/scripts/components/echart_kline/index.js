import React, { Component } from 'react';
import './index.scss'
import store from '@/scripts/store.js'
import { connect } from "react-redux";
import { zhutiyanzheng, heyuename, changeresolution, wsreconnect, candlefunction, assetfn } from '../../action';
import echarts from 'echarts';
import { initKOption, initMOption } from '@/utils/k-line';
import { Xfn } from '../../../utils/axiosfn';

var kline_datas = []; // k线数据存储容器

var kChart;
var symbol;


// 时间格式化处理
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
function formatData(myDatas) {
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
function getResolution(resolution, timeArr) {
    var showtab;
    for (var i = 0; i < timeArr.length; i++) {
        if (resolution == timeArr[i].value) showtab = timeArr[i].showtab;
    }
    return showtab;
}

@connect(
    state => {
        return {
            heyuename: state.data.heyuename,
            heyuenameischange: state.data.heyuenameischange,
            zhuti: state.data.zhuti,
            change_zhuti: state.data.change_zhuti,
            candle: state.data.candle,
            resolution: state.data.resolution,
            ws_connect: state.data.ws_connect,
            asset: state.data.asset,
            asset_switch: state.data.asset_switch,
        }
    }
)
class echart_kline extends Component {
    constructor(props) {
        super()
        this.state = {
            imgurl: require('../../img/chart-logo.png'),
            timeArr: [
                { name: '分时图', value: '1', type: '2', showtab: 1, scale: 80 },
                { name: '1min', value: '1', type: '1', showtab: 2, scale: 80 },
                { name: '5min', value: '5', type: '1', showtab: 3, scale: 80 },
                { name: '15min', value: '15', type: '1', showtab: 4, scale: 70 },
                { name: '30min', value: '30', type: '1', showtab: 5, scale: 65 },
                { name: '1h', value: '60', type: '1', showtab: 6, scale: 30 },
                { name: '6h', value: '360', type: '1', showtab: 7, scale: 30 },
                { name: '12h', value: '720', type: '1', showtab: 8, scale: 30 },
                { name: '1day', value: '1440', type: '1', showtab: 9, scale: 30 },
            ],
            showtab: 2, // 默认展示一分钟
            chart_type: 1, // 默认展示蜡烛图 1 蜡烛图 2 分时图,
            scale: 80, // k线图缩放比例
        }
    }
    sendMessage = () => {
        if (window.wss.OPEN == 1) {
            Xfn({
                _u: "candlequeryhistory",
                _m: "get",
                _p: {
                    asset: this.props.asset,
                    symbol: this.props.heyuename,
                    start_time: (new Date().getTime() - 400 * parseInt(this.props.resolution) * 60 * 1000).toString(), //开始时间毫秒,
                    end_time: (new Date().getTime()).toString(),
                    interval: this.props.resolution
                }
            }, (res, code) => {
                // console.log(res, 'kxian')
                if (code == 0) {
                    store.dispatch(candlefunction(res.data))
                }
            })
            window.wss.send(JSON.stringify({
                "op": "sub",
                "event": "pc#candle#" + this.props.asset + "#" + this.props.heyuename,
                "args": { "interval": this.props.resolution } //时间间隔
            }))
            localStorage.eventcandle = "pc#candle#" + this.props.asset + "#" + this.props.heyuename
        }
    }
    componentDidMount() {
        kChart = echarts.init(document.getElementById('k-content'))
        if (kChart) kChart.showLoading();
        this.sendMessage()
        symbol = this.props.heyuename;
    }
    componentWillUnmount() {
        if (window.wss.OPEN == 1) {
            window.wss.send(JSON.stringify({
                "op": "unsub",
                "event": "pc#candle#" + this.props.asset + "#" + this.props.heyuename,
                "args": { "interval": this.props.resolution } //时间间隔
            }))
        }
    }
    componentDidUpdate() {
        if (this.props.asset_switch === 1) {//切换资产的时候
            store.dispatch(assetfn(this.props.asset, 0))
            if (window.wss.OPEN == 1) {
                window.wss.send(JSON.stringify({
                    "op": "unsub",
                    "event": "pc#candle#" + sessionStorage.nameold,
                    "args": { "interval": this.props.resolution } //时间间隔
                }))
                Xfn({
                    _u: "candlequeryhistory",
                    _m: "get",
                    _p: {
                        asset: this.props.asset,
                        symbol: this.props.heyuename,
                        start_time: (new Date().getTime() - 400 * parseInt(this.props.resolution) * 60 * 1000).toString(), //开始时间毫秒,
                        end_time: (new Date().getTime()).toString(),
                        interval: this.props.resolution
                    }
                }, (res, code) => {
                    if (code == 0) {
                        store.dispatch(candlefunction(res.data))
                    }
                })
                window.wss.send(JSON.stringify({
                    "op": "sub",
                    "event": "pc#candle#" + this.props.asset + "#" + this.props.heyuename,
                    "args": { "interval": this.props.resolution } //时间间隔
                }))
                localStorage.eventcandle = "pc#candle#" + this.props.asset + "#" + this.props.heyuename
            }
        }
        if (this.props.ws_connect == 1) {  //ws重新连接的数据重启
            if (window.wss.OPEN == 1) {
                Xfn({
                    _u: "candlequeryhistory",
                    _m: "get",
                    _p: {
                        asset: this.props.asset,
                        symbol: this.props.heyuename,
                        start_time: (new Date().getTime() - 400 * parseInt(this.props.resolution) * 60 * 1000).toString(), //开始时间毫秒,
                        end_time: (new Date().getTime()).toString(),
                        interval: this.props.resolution
                    }
                }, (res, code) => {
                    // console.log(res, 'kxian')
                    if (code == 0) {
                        store.dispatch(candlefunction(res.data))
                    }
                })
                window.wss.send(JSON.stringify({
                    "op": "sub",
                    "event": "pc#candle#" + this.props.asset + "#" + this.props.heyuename,
                    "args": { "interval": this.props.resolution } //时间间隔
                }))
                localStorage.eventcandle = "pc#candle#" + this.props.asset + "#" + this.props.heyuename

            }
            store.dispatch(wsreconnect(0))
        }
        if (this.props.heyuenameischange === 1) {  //切换合约
            store.dispatch(heyuename(this.props.heyuename, 0))
            if (window.wss.OPEN == 1) {
                window.wss.send(JSON.stringify({
                    "op": "unsub",
                    "event": "pc#candle#" + sessionStorage.nameold,
                    "args": { "interval": this.props.resolution } //时间间隔
                }))
                Xfn({
                    _u: "candlequeryhistory",
                    _m: "get",
                    _p: {
                        asset: this.props.asset,
                        symbol: this.props.heyuename,
                        start_time: (new Date().getTime() - 400 * parseInt(this.props.resolution) * 60 * 1000).toString(), //开始时间毫秒,
                        end_time: (new Date().getTime()).toString(),
                        interval: this.props.resolution
                    }
                }, (res, code) => {
                    if (code == 0) {
                        store.dispatch(candlefunction(res.data))
                    }
                })
                window.wss.send(JSON.stringify({
                    "op": "sub",
                    "event": "pc#candle#" + this.props.asset + "#" + this.props.heyuename,
                    "args": { "interval": this.props.resolution } //时间间隔
                }))
                localStorage.eventcandle = "pc#candle#" + this.props.asset + "#" + this.props.heyuename
            }
        }

        // 处理数据
        if (this.props.candle.data) {
            const data = this.props.candle.data;
            if (data.current === '0') { // 历史数据
                kline_datas = data.rows;
                kChart.hideLoading();
            } else if (data.current == 1 && kline_datas.length > 0 && data.rows.length > 0) { // 实时数据
                if (data.rows.length > 1) {
                    kline_datas.pop();
                    for (var i = 0; i < data.rows.length; i++) {
                        if (data.rows[i][0] > kline_datas[kline_datas.length - 1][0]) kline_datas.push(data.rows[i])
                    }
                } else if (data.rows.length == 1) {
                    if (data.rows[0][0] == kline_datas[kline_datas.length - 1][0]) kline_datas.pop();
                    kline_datas.push(data.rows[0])
                }
            }
            var res = formatData(kline_datas);
            if (this.state.chart_type == 2) {
                kChart.setOption(initMOption(res, '', echarts), true);
            } else {
                kChart.setOption(initKOption(res, echarts, this.state.scale), true);
            }
        }
    }
    changeResolute = (e) => {
        let resolution = e.currentTarget.getAttribute('value')
        let type = e.currentTarget.getAttribute('type')
        let scale = e.currentTarget.getAttribute('scale')
        this.setState({
            chart_type: type,
            scale: scale
        });
        window.wss.send(JSON.stringify({
            "op": "unsub",
            "event": "pc#candle#" + this.props.asset + "#" + this.props.heyuename,
            "args": {
                "interval": this.props.resolution || 1,
            } //时间间隔
        }))
        Xfn({
            _u: "candlequeryhistory",
            _m: "get",
            _p: {
                asset: this.props.asset,
                symbol: this.props.heyuename,
                start_time: (new Date().getTime() - 400 * parseInt(resolution) * 60 * 1000).toString(), //开始时间毫秒,
                end_time: (new Date().getTime()).toString(),
                interval: resolution
            }
        }, (res, code) => {
            if (code == 0) {
                store.dispatch(candlefunction(res.data))
            }
        })
        window.wss.send(JSON.stringify({
            "op": "sub",
            "event": "pc#candle#" + this.props.asset + "#" + this.props.heyuename,
            "args": {
                "interval": resolution
            } //时间间隔 
        }))
        localStorage.eventcandle = "pc#candle#" + this.props.asset + "#" + this.props.heyuename

        store.dispatch(changeresolution(resolution))
        this.setState({
            showtab: e.currentTarget.getAttribute('showtab')
        })
    }
    render() {
        return (
            <div id="echart_kline_container">
                <div id="k-content" className="K-line"></div>
                <div className="time-tabs">
                    {
                        this.state.timeArr.map((item, index) => {
                            return (
                                <span
                                    key={index}
                                    className={
                                        item.type == this.state.chart_type && item.value == this.props.resolution ? 'active' : ''
                                    }
                                    value={item.value}
                                    type={item.type}
                                    showtab={item.showtab}
                                    scale={item.scale}
                                    onClick={this.changeResolute}>
                                    {item.name}
                                </span>
                            )
                        })
                    }

                </div>
                <img className="mylogo" src={this.state.imgurl} alt=""></img>
            </div>
        );
    }
}
export default echart_kline;