require.config({
    paths: {
        factory: "./api/factory",
        common: "./common/com",
        ctrl: "./common/ctrl",
        map: "./map/map",
        image: "../lib/image",
        //$:"../lib/jquery.min"
    }
});

require(["factory", "common", "map", "ctrl"], function (factory, common, map, ctrl) {

    if (!common.isSupportCanvas()) {
        alert('请使用支持canvas功能的浏览器');
    }

    var factoryPoints = factory.getAllFactoriesinfo();

    var curMap = map.init("container");

    //console.log(curMap);

    curMap.mark(factoryPoints, function (marker) {
        marker.addEventListener('click', function () {
            alert(1);
        })
    });

    ctrl.renderFactoryList(factoryPoints, curMap);


    curMap.heat(factoryPoints);


});