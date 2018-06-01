define(function () {


    /**
     * 获得所有工厂信息
     */
    function getAllFactoriesinfo(callback) {

        $.get('./php/factory/factory_info.php', {}, function (res) {
            callback && callback(JSON.parse(res));
        });

    }

    /**
     * 获得单个工厂信息
     * @param string name
     */
    function getFactoryinfo(name, callback) {

    }

    return {
        getAllFactoriesinfo: getAllFactoriesinfo,
        getFactoryinfo: getFactoryinfo,
    }
});