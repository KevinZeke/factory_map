require.config({
    paths: {
        factory: "./api/factory",
        common: "./common/com",
        ctrl: "./common/ctrl",
        map: "./map/map",
        chart: "./chart/echartsTool",
        image: "../lib/image",
        config: "./config",
        //$:"../lib/jquery.min"
    }
});

require(["factory", "common", "map", "ctrl"], function (factory, common, map, ctrl) {

    if (!common.isSupportCanvas()) {
        alert('请使用支持canvas功能的浏览器');
    }

    factory.getAllFactoriesinfo(function (factoryPoints) {

        var curMap = map.init("container");

        curMap.mark(factoryPoints, function (marker, info) {
            marker.addEventListener('click', function () {
                ctrl.renderFactoryDetail(info.name);
            })
        });

        ctrl.renderFactoryList(factoryPoints, curMap);

        curMap.heat(factoryPoints);

    });


});