import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import { formatData } from '../../../utils/dataProcessingOutput';

var dataRes

class Echartscont extends Component {
  constructor() {
    super()
    this.state = {
      myChart: null
    }
    this.kline_datas = []
  }
  componentDidMount() {
    this.setState({
      myChart: echarts.init(document.getElementById(this.props._id))
    })
  }
  componentDidUpdate() {
    if (this.props.candle && this.props.candle.rows && this.props.candle.rows.length > 0) {
      const data = this.props.candle;
      console.log(data, "shuju ")
      if (data.current == 0) { // 历史数据
        this.kline_datas = data.rows;
      } else if (this.props.candle && data.current == 1 && this.kline_datas.length > 0 && data.rows.length > 0) { // 实时数据
        if (data.rows.length > 1) {
          this.kline_datas.pop();
          for (var i = 0; i < data.rows.length; i++) {
            if (data.rows[i][0] > this.kline_datas[this.kline_datas.length - 1][0]) this.kline_datas.push(data.rows[i])
          }
        } else if (this.props.candle && data.rows.length == 1 && this.kline_datas.length == 0) {
          if (data.rows[0][0] == this.kline_datas[this.kline_datas.length - 1][0]) this.kline_datas.pop();
          this.kline_datas.push(data.rows[0])
        }
      }
      dataRes = formatData(this.kline_datas);
      this.state.myChart.setOption({
        grid: {
          left: 10,
          right: 10,
          heigth: '80%',
        },
        textStyle: {
          fontSize: 16
        },
        // tooltip: { //弹框指示器
        //   trigger: 'axis',
        //   // position: [20,20],
        //   axisPointer: {
        //     type: 'cross',
        //   },
        //   textStyle: {
        //     fontSize: 12,
        //     color: '#ccc',
        //   }
        // },
        dataZoom: [
          {
            type: 'inside',
            start: 100,
            end: 0,
          },
        ],
        xAxis: {
          type: 'category',
          data: dataRes && dataRes.times,
          show: false,
        },
        yAxis: {
          type: 'value',
          scale: true,
          show: false,
          splitNumber: 3,
          splitLine: {
            show: false,
          },
        },
        series: [{
          smooth: true,
          data: dataRes && dataRes.priceArr,
          type: 'line',
          symbol: 'none',
          lineStyle: {
            color: '#2F6FED' //改变折线颜色
          },
        }]
      });
      // this.state.myChart.setOption({
      //   tooltip: { //弹框指示器
      //     trigger: 'axis',
      //     // position: [20,20],
      //     axisPointer: {
      //       type: 'cross',
      //     },
      //     textStyle: {
      //       fontSize: 12,
      //       color: '#ccc',
      //     }

      //   },
      //   grid: [{
      //     id: 'gd1',
      //     left: 0,
      //     right: 0,
      //     height: '100%', //主K线的高度,
      //     top: 0
      //   },

      //   ],
      //   xAxis: [ //==== x轴
      //     { //主图 
      //       gridIndex: 0,
      //       show: false,
      //       data: dataRes.times,
      //     },
      //   ],
      //   yAxis: [ //y轴
      //     {
      //       show: false,
      //       gridIndex: 0,
      //       scale: true,
      //       splitNumber: 3,
      //     },
      //   ],
      //   dataZoom: [
      //     {
      //       type: 'inside',
      //       start: 100,
      //       end: 0,
      //     },
      //   ],
      //   //animation:false,//禁止动画效果
      //   blendMode: 'source-over',
      //   series: [{
      //     name: '当前价',
      //     type: 'line',
      //     data: dataRes.priceArr,
      //     // smooth: true,
      //     symbol: "none", //中时有小圆点 
      //     symbolSize: 1,
      //     lineStyle: {
      //       normal: {
      //         opacity: 0.8,
      //         color: '#39afe6',
      //         width: 1
      //       }
      //     },

      //   },

      //   ]

      // });
    }
  }

  render() {
    return (
      <div id={this.props._id} style={{ width: 390, height: 100 }}>
      </div>
    );
  }
}

export default Echartscont;