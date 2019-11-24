import React, { Component } from 'react';
import './index.scss'
import store from '@/scripts/store.js'
import { connect } from "react-redux";
import DataFeeds from '@/utils/tv/datafeed'
import { WidgetInfo } from '@/utils/tv/tvConfig'
import { zhutiyanzheng, heyuename, assetfn } from '../../action';

var history_last_data;

const barsFormat = (data) => {
    let bars = [];
    let newBars = [];
    console.log(data)
    bars = data.rows;
    for (let i = 0; i < bars.length; i++) {
        newBars.push({
            time: parseFloat(bars[i][0]),
            open: parseFloat(bars[i][1]),
            high: parseFloat(bars[i][2]),
            low: parseFloat(bars[i][3]),
            close: parseFloat(bars[i][4]),
            volume: parseFloat(bars[i][5]),
        });
    }
    return newBars
}
@connect(
    state => {
        return {
            heyuename: state.data.heyuename,
            heyuenameischange: state.data.heyuenameischange,
            zhuti: state.data.zhuti,
            chongxinkaiqi: state.datum.chongxinkaiqi,
            change_zhuti: state.data.change_zhuti,
            candle: state.data.candle,
            asset: state.data.asset,
            kxian: state.data.kxian,
            asset_switch: state.data.asset_switch,
        }
    }
)
class tvChart extends Component {
    initOnReady = (symbol) => {
        window.tvWidget = new window.TradingView.widget(Object.assign({}, WidgetInfo, { //tvConfig.js
            debug: true, // uncomment this line to see Library errors and warnings in the console
            symbol: symbol,
            interval: '1',
            container_id: "tv_chart_container",
            datafeed: new DataFeeds.Tv(),
            locale: 'zh',
            theme: 'dark',
            autosize: true,
            fullscreen: false,
            // favorites: {
            //     intervals: ['1', '5', '15', '30', '60', "360", '1D']
            // },
            timezone: 'Asia/Shanghai',
            toolbar_bg: '#181E30',
            loading_screen: { backgroundColor: "#181E30" },
            disabled_features: [
                'header_symbol_search',
                'symbol_search_hot_key',
                'header_compare',
                'header_undo_redo',
                'header_screenshot',
                'volume_force_overlay',
                'header_resolutions',
                // 'timeframes_toolbar',
                // "header_widget",
                // "left_toolbar",
                // "volume_force_overlay",
                // "create_volume_indicator_by_default",
                // "display_market_status",
                // "legend_context_menu",
                "border_around_the_chart"

            ],
            enabled_features: [
                'hide_last_na_study_output',
                'keep_left_toolbar_visible_on_small_screens',
                'adaptive_logo'
            ],
            overrides: {
                // "paneProperties.background": "#fff",
                // "scalesProperties.backgroundColor": "#171a32",
            },
            custom_css_url: "./css/custom_css.css",
            indicators_file_name: "test.js",
        }));

        window.tvWidget.onChartReady(() => {
            //创建均线
            const colorArr = ["#e0d283", "#92c580", "#8dc1d9"];
            [5, 10, 30].forEach((time, index) => {
                window.tvWidget.chart().createStudy("Moving Average", false, false, [time], null, { "plot.color.0": colorArr[index], precision: 2 });
            });
            window.tvWidget.chart().setChartType(2);
            // window.tvWidget.changeTheme('light')
        });
        window.tvWidget.headerReady().then(function () {
            const buttonGroup = [
                { type: 2, name: '分时图', resolution: '1' },
                { type: 1, name: '1m', resolution: '1' },
                { type: 1, name: '5m', resolution: '5' },
                { type: 1, name: '15m', resolution: '15' },
                { type: 1, name: '30m', resolution: '30' },
                { type: 1, name: '1h', resolution: '60' },
                { type: 1, name: '6h', resolution: '360' },
                { type: 1, name: '1day', resolution: '1D' },
            ]
            var buttonEl = [];
            buttonGroup.forEach(value => {
                var button = window.tvWidget.createButton();
                buttonEl.push({ el: button, target: value.name });
                button.textContent = value.name;
                button.setAttribute('class', 'customButton--jqJTfH5- tv-resolution-btn')
                if (value.name === '分时图') button.style.color = 'rgb(183, 213, 234)'
                button.addEventListener('click', function (e) {
                    if (e.target.innerHTML === value.name) {
                        window.tvWidget.chart().setChartType(value.type);
                        window.tvWidget.chart().setResolution(value.resolution);
                        buttonEl.forEach(btn => btn.el.style.color = '#758696')
                        e.target.style.color = 'rgb(183, 213, 234)';
                    }
                })
            })
        })
    }
    componentDidMount() {
        this.initOnReady(this.props.heyuename)
    }
    componentDidUpdate() {
        if (this.props.asset_switch === 1) {
            console.log(454654654)
            this.initOnReady(this.props.heyuename);
            store.dispatch(assetfn(this.props.asset, 0))
        }
        if (this.props.chongxinkaiqi === 1) {
            this.initOnReady(this.props.heyuename);
            store.dispatch({ type: "chongxinkaiqi", chongxinkaiqi: 0 })
        }
        if (this.props.heyuenameischange == 1) {
            this.initOnReady(this.props.heyuename);
            store.dispatch(heyuename(this.props.heyuename, 0));
        }
        if (this.props.change_zhuti == 1) {
            this.initOnReady(this.props.heyuename);
            store.dispatch(zhutiyanzheng(this.props.zhuti, 0))
        }
        if (this.props.candle.data) {
            const d = this.props.candle.data
            const bars = barsFormat(d);
            const real = d.current;
            if (real == 0) {
                history_last_data = bars[bars.length - 1];
            }
            if (bars.length === 0) {
                window.historyBarsUpdate(bars, { noData: true });
            } else {
                if (real == 0) {
                    window.historyBarsUpdate(bars, { noData: bars.length === 0 });
                } else {
                    //实时数据
                    if (window.realtimeBarUpdate) {
                        for (let i = 0; i < bars.length; i++) {
                            if (bars[i].time >= history_last_data.time) {
                                window.realtimeBarUpdate(bars[i]);
                            }

                        }
                    }
                }
            }
        }

    }
    render() {
        const {
            kxian
        } = this.props
        return (
            < div className="chart-box" >
                <h4 className="box-title drag-handle">{'图表类型' + '( ' + this.props.heyuename + ' )'}</h4>
                <div id="tv_chart_container"></div>
            </div >

        );
    }
}

export default tvChart;