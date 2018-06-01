define(function () {
    function ChartOption(option) {
}

ChartOption.bar = function () {
    return {
        title: {
            text: '',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        toolbox: {
            show: false,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: null,
                "axisLabel": {
                /*"margin": 8,*/
                 "interval":0
}
            }
            
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: []
    };
}

ChartOption.pie = function () {
    return  {
        title: {
            text: '',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: []
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
}

ChartOption.stack = function () {
    return {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: []
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            inverse: true,
            type: 'category',
            data: []
        },
        series: [
        ]
    };
}

//图表基类
function BaseChart(option) {
    if (!option) throw new Error('图表配置信息未给出');
    this._option = option;
    //console.log(option);
}

BaseChart.prototype.render = function (dom) {
    if (dom)
        echarts.init(document.getElementById(dom)).setOption(this._option, true);
    else
        throw new Error('图表外部容器未定义');
}

BaseChart.prototype.setTitle = function (title, subTitle) {
    if (!this._option.title) this._option.title = {};
    this._option.title.text = title || '图表';
    this._option.title.subtext = subTitle;
    return this;
}

//柱状图类
function ChartBar() {
    BaseChart.call(this, ChartOption.bar());
}

ChartBar.prototype.y = function (y) {
    if (!this._option.series) this._option.series = [];
    if (!this._option.legend.data) this._option.legend.data = [];
    var me = this;
    y.forEach(function (data) {
        me._option.legend.data.push(data.item);
        me._option.series.push({
            name: data.item,
            type: 'bar',
            data: data.value,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        });
    })
    return this;
}

ChartBar.prototype.x = function (x, type) {
    //TODO:
    this._option.xAxis[0].data = x;
    if (type)
        this._option.xAxis[0].type = type;
    return this;
}

ChartBar.prototype.discalculable = function () {
    this._option.calculable = false;
    return this;
}

ChartBar.prototype.calculable = function () {
    this._option.calculable = true;
    return this;
}

//饼图类
function ChartPie() {
    BaseChart.call(this, ChartOption.pie());
}

ChartPie.prototype.setData = function (datas) {
    var me = this;
    datas.forEach(function (data) {
        me._option.legend.data.push(data.item);
        me._option.series[0].data.push({
            name: data.item,
            value: data.value
        });
    })
    return this;
}

ChartPie.prototype.setPieName = function (name) {
    this._option.series[0].name = name;
    return this;
}

//堆积柱状图
function ChartStack() {
    BaseChart.call(this, ChartOption.stack());
}

ChartStack.prototype.y = function (y) {
    //TODO:
    this._option.yAxis.data = y;
    return this;
}

ChartStack.prototype.x = function (x) {
    if (!this._option.series) this._option.series = [];
    if (!this._option.legend.data) this._option.legend.data = [];
    var me = this;
    x.forEach(function (data) {
        me._option.legend.data.push(data.item);
        me._option.series.push({
            name: data.item,
            type: 'bar',
            data: data.value,
            stack: '总量',
            label: {
                normal: {
                    show: false,
                    position: 'insideRight'
                }
            }
        });
    })
    return this;
}

//继承基类
for (var func in BaseChart.prototype) {
    ChartPie.prototype[func] = BaseChart.prototype[func];
    ChartBar.prototype[func] = BaseChart.prototype[func];
    ChartStack.prototype[func] = BaseChart.prototype[func];
}

function ChartsCtrl() {
    throw new Error('静态类不能实例化');
}

ChartsCtrl.bar = function () {
    return new ChartBar();
}

ChartsCtrl.pie = function () {
    return new ChartPie();
}

ChartsCtrl.stack = function () {
    return new ChartStack();
}

return {
    ChartsCtrl:ChartsCtrl
}
});