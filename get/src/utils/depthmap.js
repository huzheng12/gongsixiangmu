const depthInit = function(id,dataSell,dataBuy){
    var depthChart = window.Highcharts.chart(id, {
        chart: {
            type: 'area',
            backgroundColor: 'transparent',
        },
        title: {
            text: ''
        },
        credits: {
            enabled: false,
        },
        xAxis: {
            minPadding: 0,
            maxPadding: 0,
            title: {
                text: ''
            },
            lineColor: '#777',
            labels: {
                style: {
                    color: '#ccc',
                }
            }
        },
        yAxis: [{
            lineWidth: 1,
            gridLineWidth: 0,
            title: null,
            tickWidth: 1,
            tickLength: 5,
            tickPosition: 'inside',
            lineColor: '#777',
            labels: {
                style: {
                    color: '#ccc',
                },
                align: 'left',
                x: 8
            }
        }, {
            opposite: true,
            linkedTo: 0,
            lineWidth: 1,
            gridLineWidth: 0,
            title: null,
            tickWidth: 1,
            tickLength: 5,
            tickPosition: 'inside',
            lineColor: '#777',
            labels: {
                style: {
                    color: '#ccc',
                },
                align: 'right',
                x: -8
            }
        }],
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillOpacity: 0.75,
                lineWidth: 1,
                marker: {
                    enabled: false,
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size=10px;">委托价: {point.key}</span><br/>',
            valueDecimals: 2
        },
        series: [
            {
                name: '买入累计',
                data: dataBuy,
                color: '#26994E'
            },
            {
            name: '卖出累计',
            data: dataSell,
            color: '#EE6560'
            }
        ]
    });
    return depthChart;
}

export default depthInit