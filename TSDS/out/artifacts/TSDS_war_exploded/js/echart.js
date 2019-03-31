// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));



var timestamps = [];
var values = [];
var Abnormal = [];


/**
 * 调用的一个servlet，timestamps存储查询到的timestamp字段，values存储到查询到的value字段
 * 之所以分开存放，是因为要分别映射到x轴和y轴
 * Abnormal存储异常点的timestamps和value字段
 *
 *
 */
$.ajax({
    type:"GET",
    url:"/kpiTest",
    dataType:'json',
    async:false,
    success:function (result) {
        // 这里的result，是servelt返回的查询结果，json格式，包括timestamp和value两个字段的key-value
        for (var i=0;i<result.length;i++)
        {
            //normal.push({"value":result[i].value,"name":result[i].timestamp})
            timestamps.push(result[i].timestamp);
            values.push(result[i].value)
        }
    }
});


$.ajax({
    type:"GET",
    url:"/Abnormal",
    dataType:'json',
    async:false,
    success:function (result) {
        // console.log(result)

        for (var i=0;i<result.length;i++)
        {
            Abnormal.push({xAxis:result[i].timestamp,yAxis:result[i].value})
        }
        console.log(Abnormal)
    }
})


option = {
    title: {
        text: 'Kpi异常检测',
        subtext: '智云小组',
        x:'center'
    },
    tooltip: {
        trigger: 'axis'
    },
    // legend: {
    //     data:['最高气温','最低气温']
    // },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        data:['时序数据','异常值'],
        x: 'left'
    },
    xAxis:  {
        type: 'category',
        name:'timestamp',
        boundaryGap: false,
        data: timestamps
    },
    yAxis: {
        type: 'value',
        name:'value',
        // axisLabel: {
        //     formatter: '{value} °C'
        // }
    },
    // dataZoom: [
    //     {
    //         type: 'inside'
    //     }
    // ],
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 30,
            end: 70,
        },
        {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 70,
        }
    ],
    series: [
        {
            type:'line',
            symbol:'circle',
            itemStyle : {
                normal : {
                    color:'#5793f3',
                    lineStyle:{
                        color:'#5793f3'
                    }
                }
            },
            data:values,
            markPoint:{
                symbol:'circle',
                symbolSize:'10',
                itemStyle:{
                    normal:{
                        color:'#d14a61'
                    }
                },
                data: [{xAxis:'1476522000',yAxis:0.181086386},
                    {xAxis:'1476525120',yAxis:0.231209964},
                    {xAxis:'1476539760',yAxis:0.034973636},
                    {xAxis:'1476551040',yAxis:0.010365518},
                    {xAxis:'1476523800',yAxis:0.257858118}]
            },
        },

    ]
}

// 使用刚指定的配置项和数据显示图表。
// myChart.setOption(option);
myChart.setOption(option);
