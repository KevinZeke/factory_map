define(["config"], function (config) {


    function init(id) {
        return (new Map(id)).create();
    }

    function Map(id) {
        this._map = null;
        this._heat = null;
        this.id = id;
    }

    Map.prototype.create = create;
    Map.prototype.mark = mark;
    Map.prototype.panTo = panTo;
    Map.prototype.heat = heat;
    Map.prototype.setGradient = setGradient;
    Map.prototype.openHeatmap = openHeatmap;
    Map.prototype.closeHeatmap = closeHeatmap;
    Map.prototype.addCtrl = function () {
        var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
        var top_left_navigation = new BMap.NavigationControl();
        var top_right_navigation = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_SMALL
        });
        this._map.addControl(top_left_control);
        this._map.addControl(top_left_navigation);
        this._map.addControl(top_right_navigation);

        var mapType1 = new BMap.MapTypeControl(
            {mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}
        );
        var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT});

        var overView = new BMap.OverviewMapControl();
        var overViewOpen = new BMap.OverviewMapControl(
            {isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_LEFT}
        );
        //添加地图类型和缩略图
        this._map.addControl(mapType1);          //2D图，卫星图
        this._map.addControl(mapType2);          //左上角，默认地图控件
        this._map.addControl(overView);          //添加默认缩略地图控件
        this._map.addControl(overViewOpen);      //右下角，打开
    }

    function create() {
        this._map = new BMap.Map(this.id);             // 创建地图实例
        var point = new BMap.Point(config.centerLng, config.centerLat);
        this._map.centerAndZoom(point, config.zoomLv); // 初始化地图，设置中心点坐标和地图级别
        this._map.setCurrentCity(config.currentCity);  //设置当前显示城市
        this._map.enableScrollWheelZoom();             // 允许滚轮缩放
        this.addCtrl();
        return this;
    }

    function panTo(lng, lat) {
        this._map.panTo(new BMap.Point(lng, lat));
    }

    function mark(infos, eachMarkerHandle) {
        var that = this;
        infos.forEach(function (info) {
            var marker = new BMap.Marker(new BMap.Point(info.lng, info.lat));
            that._map.addOverlay(marker);
            eachMarkerHandle && eachMarkerHandle(marker, info);
            var label = new BMap.Label(info.name, {offset: new BMap.Size(20, -10)});
            marker.setLabel(label);
        })
    }

    /**
     * 参数说明:(heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md)
     * visible 热力图是否显示,默认为true
     * opacity 热力的透明度,1-100
     * radius 势力图的每个点的半径大小
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *  {
            .2:'rgb(0, 255, 255)',
            .5:'rgb(0, 110, 255)',
            .8:'rgb(100, 0, 255)'
        }
     其中 key 表示插值的位置, 0~1.
     value 为颜色值.
     * @param Array infos
     */
    function heat(infos) {
        this._heat = new BMapLib.HeatmapOverlay({
            "radius": config.heatRadius, "visible": true
        });
        this._map.addOverlay(this._heat);
        this._heat.setDataSet({data: infos, max: 100});
    }

    function setGradient() {
        /*格式:
        {
            0:'rgb(102, 255, 0)',
            .5:'rgb(255, 170, 0)',
            1:'rgb(255, 0, 0)'
        }*/
        var gradient = {};
        var colors = document.querySelectorAll("input[type='color']");
        colors = [].slice.call(colors, 0);
        colors.forEach(function (ele) {
            gradient[ele.getAttribute("data-key")] = ele.value;
        });
        this._heat.setOptions({"gradient": gradient});
    }

    function openHeatmap() {
        this._heat.show();
    }

    function closeHeatmap() {
        this._heat.hide();
    }

    return {
        init: init
    }

})