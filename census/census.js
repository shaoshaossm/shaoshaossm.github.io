var metrics     = 'pv_count' // 统计访问次数 PV 填写 'pv_count'，统计访客数 UV 填写 'visitor_count'，二选一
var metricsName = (metrics === 'pv_count' ? '访问次数' : (metrics === 'visitor_count' ? '访客数' : ''))
function generatePieces(maxValue, colorBox) {
    var pieces = [];
    var quotient = 1;
    var temp = {'lt': 1, 'label': '0', 'color': colorBox[0]};
    pieces.push(temp);
 
    if (maxValue && maxValue >= 10) {
        quotient = Math.floor(maxValue / 10)+1;
        for (var i = 1; i <= 10; i++) {
            var temp = {};
            if (i == 1)   temp.gte = 1;
            else   temp.gte = quotient * (i - 1);
            temp.lte = quotient * i;
            temp.color = colorBox[i];
            pieces.push(temp);
        }
    }
    return JSON.stringify(pieces);
}

var append_div_visitcalendar = (parent, text) => {
    if (parent !== null) {
        if (typeof text === 'string') {
            var temp = document.createElement('div');
            temp.innerHTML = text;
            var frag = document.createDocumentFragment();
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild)
            }
            parent.appendChild(frag)
        } else {
            parent.appendChild(text)
        }
    }
};

function calChart () {
    let script = document.createElement("script")
    fetch('/census/data/ipcalendar.json?date'+new Date()).then(data => data.json()).then(data => {
        let date_arr = data.result.items[0];
        let value_arr = data.result.items[1];
        let calArr = [];
        let maxValue = 0, total = 0, weekdatacore = 0, thisweekdatacore = 0;
        let colorBox = ['#EBEDF0', '#90EE90', '#98FB98', '#32CD32', '#00FF00', '#7FFF00', '#3CB371', '#2E8B57', '#228B22', '#008000', '	#006400'];
        for (let i = 0; i < date_arr.length; i++) {
            calArr.push([date_arr[i][0], value_arr[i][0] === '--' ? 0 : value_arr[i][0]] );
            maxValue = value_arr[i][0] > maxValue ? value_arr[i][0] : maxValue ;
            total += value_arr[i][0] === '--' ? 0 : value_arr[i][0];
        }
        for (let i = date_arr.length-1; i >= date_arr.length-7; i--)   weekdatacore += value_arr[i][0] === '--' ? 0 : value_arr[i][0];
        for (let i = date_arr.length-1; i >= date_arr.length-30; i--)   thisweekdatacore += value_arr[i][0] === '--' ? 0 : value_arr[i][0];
        let calArrJson = JSON.stringify(calArr);
        script.innerHTML = `
        var calChart = echarts.init(document.getElementById("calendar_container"));
        var option = {
            title: { text: '访问日历' },
            tooltip: {
                padding: 10,
                backgroundColor: '#555',
                borderColor: '#777',
                borderWidth: 1,
                textStyle: { color: '#fff' },
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="font-size: 14px;">' + value[0] + '：' + value[1] + '</div>';
                }
            },
            visualMap: {
                show: false,
                showLabel: true,
                min: 0,
                max: ${maxValue},
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                bottom: 0,
                pieces: ${generatePieces(maxValue, colorBox)}
            },
            calendar: [{
                left: 'center',
                range: ['${date_arr[0]}', '${date_arr[date_arr.length-1]}'],
                cellSize: [14, 14],
                splitLine: {
                    show: false
                },
                itemStyle: {
                    color: '#ebedf0',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                yearLabel: {
                    show: false
                },
                monthLabel: {
                    nameMap: 'cn',
                    fontSize: 11
                },
                dayLabel: {
                    formatter: '{start}  1st',
                    nameMap: 'cn',
                    fontSize: 11
                }
            }],
            series: [{
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 0,
                data: ${calArrJson},
            }]    
        };
        calChart.setOption(option);`;
        let style = '<style>.number{font-family: sans-serif, Arial;margin-top: 10px;text-align:center;width:100%;padding:10px;margin:0 auto;}.contrib-column{text-align:center;border-left:1px solid #ddd;border-top:1px solid #ddd;}.contrib-column-first{border-left:0;}.table-column{padding:10px;display:table-cell;flex:1;vertical-align:top;}.contrib-number{font-weight:400;line-height:1.3em;font-size:24px;display:block;}.left.text-muted{float:left;margin-left:9px;color:#767676;}.left.text-muted a{color:#4078c0;text-decoration:none;}.left.text-muted a:hover{text-decoration:underline;}h2.f4.text-normal.mb-3{display:none;}.float-left.text-gray{float:left;}.position-relative{width:100%;}@media screen and (max-width:650px){.contrib-column{display:none}}</style>';
        style = '<div style="display:flex;width:100%" class="number"><div class="contrib-column contrib-column-first table-column"><span class="text-muted">过去一年访问</span><span class="contrib-number">' + total + '</span><span class="text-muted">' + date_arr[0][0] + '&nbsp;-&nbsp;' + date_arr[date_arr.length-1][0] + '</span></div><div class="contrib-column table-column"><span class="text-muted">最近30天访问</span><span class="contrib-number">' + thisweekdatacore + '</span><span class="text-muted">' + date_arr[date_arr.length-30][0] + '&nbsp;-&nbsp;' + date_arr[date_arr.length-1][0] + '</span></div><div class="contrib-column table-column"><span class="text-muted">最近7天访问</span><span class="contrib-number">' + weekdatacore + '</span><span class="text-muted">' + date_arr[date_arr.length-7][0] + '&nbsp;-&nbsp;' + date_arr[date_arr.length-1][0] + '</span></div></div>' + style;

        document.getElementById("calendar_container").after(script);
        append_div_visitcalendar(calendar_container, style);
    }).catch(function (error) {
        console.log(error);
    });
}
function get_year(s) {
    return parseInt(s.substr(0, 4))
}
function get_month(s) {
    return parseInt(s.substr(5, 2))
}
// 浏览量
function pvChart () { 
    let script = document.createElement("script")
    fetch('/census/data/pv.json?date'+new Date()).then(data => data.json()).then(data => {
        let date = new Date();
        let monthValueArr = {};
        let monthName = data.result.items[0];
        let monthValue = data.result.items[1];
        for (let i =2020; i <= date.getFullYear(); i++)   monthValueArr[String(i)] = [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ];
        monthValueArr
        for (let i = 0; i < monthName.length; i++) {
            let year = get_year(monthName[i][0]);
            let month = get_month(monthName[i][0]);
            monthValueArr[String(year)][String(month-1)] = monthValue[i][0];
        } 
        script.innerHTML = `
        var pvChart = echarts.init(document.getElementById('pv_container'), 'light');
        var pvOption = {
    color: ['#01C2F9', '#18D070', '#d223e7', '#3F77FE'],
    title: {
        text: '站点访问量统计',
        subtext: '数据来源: 百度统计（自 2020/04/08 开始统计）',
        textStyle: {
            color: '#504b4d',
        }
    },
    legend: {
        data: ['2020年访问量', '2021年访问量'],
        //修改年份
        bottom: 0,
        left: 'center',
        textStyle: {
            color: '#504b4d',
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            magicType: {
                show: true,
                type: ['line', 'bar', 'stack', 'tiled']
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#929298'
            }
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#929298'
            }
        },
        axisTick: {
            show: true
          },
        axisLine: {
            show: true,
            lineStyle: {
              color: '#4c4948'}
            }
    }],
    series: [{
        name: '2020年访问量',
        type: 'line',
        stack: '总量',
        data: [${monthValueArr["2020"]}],
        axisLabel: {
            formatter: '{value}',
            //第一个年份对应的数据顺序对应月份
            textStyle: {
                color: '#929298'
            }
        }
    },
    {
        name: '2021年访问量',
        type: 'line',
        stack: '总量',
        data: [${monthValueArr["2021"]}],
        //第二个年份对应的数据顺序对应月份
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#929298'
            }
        }
    }]
};
        pvChart.setOption(pvOption);
        window.addEventListener("resize", () => { 
            pvChart.resize();
        });`
        document.getElementById('pv_container').after(script);
    }).catch(function (error) {
        console.log(error);
    });
}
//访客数
function uvChart () { 
    let script = document.createElement("script")
    fetch('/census/data/uv.json?date'+new Date()).then(data => data.json()).then(data => {
        let date = new Date();
        let monthValueArr = {};
        let monthName = data.result.items[0];
        let monthValue = data.result.items[1];
        for (let i =2020; i <= date.getFullYear(); i++)   monthValueArr[String(i)] = [ ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ];
        monthValueArr
        for (let i = 0; i < monthName.length; i++) {
            let year = get_year(monthName[i][0]);
            let month = get_month(monthName[i][0]);
            monthValueArr[String(year)][String(month-1)] = monthValue[i][0];
        }
        script.innerHTML = `
        var uvChart = echarts.init(document.getElementById('uv_container'), 'light');
        var uvOption = {
    color: ['#d223e7', '#3F77FE', '#01C2F9', '#18D070'],
    title: {
        text: '站点访客数统计',
        subtext: '数据来源: 百度统计（自 2020/11/14 开始统计）',
        textStyle: {
            color: '#504b4d',
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['2020年访客数', '2021年访客数'],
        bottom: 0,
        left: 'center',
        textStyle: {
            color: '#504b4d',
        }
    },
    //修改年份
    toolbox: {
        show: true,
        feature: {
            mark: {
                show: true
            },
            magicType: {
                show: true,
                type: ['line', 'bar', 'stack', 'tiled']
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#929298'
            }
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#929298'
            }
        },
        axisTick: {
            show: true
          },
        axisLine: {
            show: true,
            lineStyle: {
              color: '#4c4948'}
            }
    }],
    series: [{
        name: '2020年访客数',
        type: 'line',
        smooth: true,
        itemStyle: {
            normal: {
                areaStyle: {
                    type: 'default'
                }
            }
        },
        data: [${monthValueArr["2020"]}],
        //第一个年份对应的数据顺序对应月份
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#929298'
            }
        },
    },
    {
        name: '2021年访客数',
        type: 'line',
        smooth: true,
        itemStyle: {
            normal: {
                areaStyle: {
                    type: 'default'
                }
            }
        },
        data: [${monthValueArr["2021"]}],
        //第二个年份对应的数据顺序对应月份
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#929298'
            }
        },
    }]
};
        uvChart.setOption(uvOption);
        window.addEventListener("resize", () => { 
            uvChart.resize();
        });`
        document.getElementById('uv_container').after(script);
    }).catch(function (error) {
        console.log(error);
    });
}
// 访问地图
function mapChart () {
    let script = document.createElement("script")
    fetch('/census/data/map.json?date'+new Date()).then(data => data.json()).then(data => {
        let mapName = data.result.items[0]
        let mapValue = data.result.items[1]
        let mapArr = []
        let max = mapValue[0][0]
        for (let i = 0; i < mapName.length; i++) {
            mapArr.push({ name: mapName[i][0].name, value: mapValue[i][0] })
        }
        let mapArrJson = JSON.stringify(mapArr)
        script.innerHTML = `
        var mapChart = echarts.init(document.getElementById('map_container'), 'light');
        var mapOption = {
            title: { text: '访问地点' },
            tooltip: { trigger: 'item' },
            visualMap: {
                min: 0,
                max: ${max},
                left: 'left',
                top: 'bottom',
                text: ['高','低'],
                color: ['#1E90FF', '#AAFAFA'],
                calculable: true
            },
            series: [{
                name: '${metricsName}',
                type: 'map',
                mapType: 'china',
                showLegendSymbol: false,
                label: {
                    emphasis: { show: false }
                },
                itemStyle: {
                    normal: {
                        areaColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: '#121212'
                    },
                    emphasis: { areaColor: 'gold' }
                },
                data: ${mapArrJson}
            }]
        };
        mapChart.setOption(mapOption);
        window.addEventListener("resize", () => { 
            mapChart.resize();
        });`
        document.getElementById('map_container').after(script);
    }).catch(function (error) {
        console.log(error);
    });
}
// 访问来源
function sourcesChart () {
    let script = document.createElement("script");
    var innerHTML = '';
    var link = 0, direct = 0, search = 0;
    fetch('/census/data/sources.json?date'+new Date()).then(data => data.json()).then(data => {
        let sourcesName = data.result.items[0];
        let sourcesValue = data.result.items[1];
        let sourcesArr = [];
        for (let i = 0; i < sourcesName.length; i++)
            sourcesArr.push({ name: sourcesName[i][0].name, value: sourcesValue[i][0] });
        link = sourcesArr[1]['value'] ;
        search = sourcesArr[2]['value'] ;
        direct = sourcesArr[0]['value'] ;
        innerHTML += `
        var sourcesChart = echarts.init(document.getElementById('sources_container'), 'light');
        var sourcesOption = {
            title:{text:'站点访客来源统计',itemGap:20,textStyle:{color:'#504b4d',}},
            tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
            legend: {
                data: ['直达', '外链', '搜索', '百度', '谷歌', '必应', 'Github', '开往/十年之约'],
                y: 'bottom'
            },
            series: [
                {
                    name: '来源明细', type: 'pie', radius: ['45%', '60%'],
                    labelLine: { length: 30 },
                    label: {
                        formatter: '{a|{a}}{abg|}\\n{hr|}\\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#F6F8FC', borderColor: '#8C8D8E',
                        borderWidth: 1, borderRadius: 4,
                        rich: {
                            a: { color: '#6E7079', lineHeight: 22, align: 'center' },
                            hr: { borderColor: '#8C8D8E', width: '100%', borderWidth: 1, height: 0 },
                            b: { color: '#4C5058', fontSize: 14, fontWeight: 'bold', lineHeight: 33 },
                            per: { color: '#fff', backgroundColor: '#4C5058', padding: [3, 4], borderRadius: 4 }
                        }
                    },
                    data: [`;
    }).catch(function (error) {
        console.log(error);
    });
    fetch('/census/data/engine.json?date'+new Date()).then(data => data.json()).then(data => {
        let enginesName = data.result.items[0];
        let enginesValue = data.result.items[1];
        let enginesArr = [];
        for (let i = 0; i < enginesName.length; i++)
            enginesArr.push({ name: enginesName[i][0].name, value: enginesValue[i][0] });
        innerHTML += `
                        {value: ${enginesArr[1]['value']}, name: '谷歌'},
                        {value: ${enginesArr[0]['value']}, name: '百度'},`;
    }).catch(function (error) {
        console.log(error);
    });
    fetch('/census/data/link.json?date'+new Date()).then(data => data.json()).then(data => {
        let linksName = data.result.items[0];
        let linksValue = data.result.items[1];
        let linksArr = {};
        for (let i = 0; i < linksName.length; i++)
            linksArr[linksName[i][0].name] = linksValue[i][0];
        let sum = data.result.sum[0][0];
        let bing = linksArr['http://cn.bing.com']+linksArr['http://www.bing.com'];
        let github = linksArr['http://github.com'];
        innerHTML += `
                        {value: ${bing}, name: '必应'},
                        {value: ${direct}, name: '直达'},
                        {value: ${github}, name: 'Github'},
                        {value: ${sum-bing-github}, name: '友链'}
                    ]
                },
                {
                    name: '访问来源', type: 'pie', selectedMode: 'single', radius: [0, '30%'],
                    label: { position: 'inner', fontSize: 14},
                    labelLine: { show: false },
                    data: [
                        {value: ${search+bing}, name: '搜索', itemStyle: { color : 'green' }},
                        {value: ${direct}, name: '直达', itemStyle: { color : '#FFDB5C' }},
                        {value: ${link-bing}, name: '外链', itemStyle: { color : '#32C5E9' }}
                    ]
                },
            ]
        };
        sourcesChart.setOption(sourcesOption);
        window.addEventListener("resize", () => { 
            sourcesChart.resize();
        });`;
        script.innerHTML = innerHTML;
    }).catch(function (error) {
        console.log(error);
    });
    document.getElementById('sources_container').after(script);
}
if (document.getElementById("calendar_container"))   calChart();
if (document.getElementById('map_container'))   mapChart();
if (document.getElementById('uv_container'))   uvChart();
if (document.getElementById('pv_container'))   pvChart();
if (document.getElementById('sources_container'))   sourcesChart();

