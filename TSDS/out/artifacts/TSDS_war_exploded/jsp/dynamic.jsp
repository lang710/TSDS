<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 2018/12/1
  Time: 下午5:29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>AIOps异常检测</title>
    <link rel="stylesheet" href="../css/commonstyle.css"/>
    <script type="text/javascript" src="../js/dynamicJS.js"></script>
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <script type="text/javascript" src="../js/highcharts.js"></script>
</head>
<body>

<div id="headline">
    <span id="headTag1">AIOps</span>
    <span id="headTag2"><a href="/jsp/dynamic.jsp">异常视图</a></span>
    <span id="headTag3"><a href="/dstable">样本库</a></span>
</div>

<!--
<div id="sidebar">
  <div id="sideTag1">异常视图</div>
  <span id="sideTag2">异常查询</span>
</div>
-->

<div class="flex-container">
    <div class="flex-sidebar">
        <div id="sideTag1">异常视图</div>
        <div id="sideTag2">异常查询</div>
    </div>
    <div class="flex-content">
        <div class="flex-container-column">
            <div class="flex-h2line">异常查询</div>
            <div class="flex-h2content">
                <input type="datetime-local" name="starttime">-
                <input type="datetime-local" name="endtime">
                指标集：<input type="text" />
                指标：<input type="text" />
                <button type="button" onclick="alert('Hello World!')">搜索</button>
                <%
                %>
                <br><br>

                <div id="container" style="width: 1000px; height: 600px; margin: 0 auto"></div>
                <script language="JavaScript">
                    $(document).ready(function() {
                        //alert("ready");
                        var chart = {
                            type: 'spline',
                            animation: Highcharts.svg, // don't animate in IE < IE 10.
                            marginRight: 10,
                            events: {
                                load: function () {
                                    // set up the updating of the chart each second
                                    var series1 = this.series[0];
                                    var series2 = this.series[1];
                                    var series3 = this.series[2];
                                    setInterval(function () {

                                        var x1 = (new Date()).getTime(), // current time
                                            y1 = Math.random();

                                        var newPoint1;
                                        if(y1>=0.7) {
                                            newPoint1 = {
                                                x: x1,
                                                y: y1,
                                                marker: {
                                                    fillColor: '#FF0000'
                                                }
                                            };
                                        }else{
                                            newPoint1={
                                                x: x1,
                                                y: y1,
                                                marker: {
                                                    fillColor: '#0000FF'
                                                }
                                            }
                                        }
                                        series1.addPoint(newPoint1,true,true);

                                        var x2 = (new Date()).getTime(), // current time
                                            y2 = Math.random();

                                        var newPoint2;
                                        if(y2>=0.8) {
                                            newPoint2 = {
                                                x: x2,
                                                y: y2,
                                                marker: {
                                                    fillColor: '#FF0000'
                                                }
                                            };
                                        }else{
                                            newPoint2 = {
                                                x:x2,
                                                y:y2,
                                                marker: {
                                                    fillColor: '#00FF00'
                                                }
                                            }
                                        }

                                        series2.addPoint(newPoint2,true, true);

                                        var x3 = (new Date()).getTime(), // current time
                                            y3 = Math.random();

                                        var newPoint3;
                                        if(y3>=0.9) {
                                            newPoint3 = {
                                                x: x3,
                                                y: y3,
                                                marker: {
                                                    fillColor: '#FF0000'
                                                }
                                            };
                                        }else{
                                            newPoint3={
                                                x: x3,
                                                y: y3,
                                                marker: {
                                                    fillColor : '#00FFFF'
                                                }
                                            }
                                        }

                                        series3.addPoint(newPoint3,true, true);

                                    }, 1000);
                                }
                            }
                        };
                        var title = {
                            text: 'Live random data'
                        };
                        var xAxis = {
                            type: 'datetime',
                            tickPixelInterval: 150
                        };
                        var yAxis = {
                            title: {
                                text: 'usage'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        };
                        var tooltip = {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                                    Highcharts.numberFormat(this.y, 2);
                            }
                        };
                        var plotOptions = {
                            area: {
                                pointStart: 1940,
                                marker: {
                                    enabled: false,
                                    symbol: 'circle',
                                    radius: 2,
                                    states: {
                                        hover: {
                                            enabled: true
                                        }
                                    }
                                }
                            }
                        };
                        var legend = {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'top',
                            borderWidth: 0
                        };
                        var exporting = {
                            enabled: false
                        };
                        var series= [
                            {
                                name: 'CPU Usage',
                                data: (function () {
                                    // generate an array of random data
                                    var data = [],time = (new Date()).getTime(),i;
                                    for (i = -14; i <= 0; i += 1) {
                                        data.push({
                                            x: time + i * 1000,
                                            y: Math.random()
                                        });
                                    }
                                    return data;
                                }()),
                                visible:true
                            },
                            {
                                name: 'Memory Usage',
                                data: (function () {
                                    // generate an array of random data
                                    var data = [],time = (new Date()).getTime(),i;
                                    for (i = -14; i <= 0; i += 1) {
                                        data.push({
                                            x: time + i * 1000,
                                            y: Math.random()
                                        });
                                    }
                                    return data;
                                }()),
                                visible:false
                            },
                            {
                                name: 'Disk Usage',
                                data: (function () {
                                    // generate an array of random data
                                    var data = [],time = (new Date()).getTime(),i;
                                    for (i = -14; i <= 0; i += 1) {
                                        data.push({
                                            x: time + i * 1000,
                                            y: Math.random()
                                        });
                                    }
                                    return data;
                                }()),
                                visible:false
                            }
                        ];

                        var json = {};
                        json.chart = chart;
                        json.title = title;
                        json.tooltip = tooltip;
                        json.xAxis = xAxis;
                        json.yAxis = yAxis;
                        json.legend = legend;
                        json.exporting = exporting;
                        json.series = series;
                        json.plotOptions = plotOptions;


                        Highcharts.setOptions({
                            global: {
                                useUTC: false
                            }
                        });
                        $('#container').highcharts(json);

                    });
                </script>
            </div>
        </div>
    </div>
</div>


</body>

</html>

</html>
