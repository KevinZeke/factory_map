define(function () {
    /**
     * 获得所有工厂信息
     */
    function getAllFactoriesinfo() {
        return [

            {"name": "AAAA厂", "lng": "119.822306", "lat": "32.441213", "count": "52"},
            {"name": "AAA8厂", "lng": "119.832306", "lat": "32.431213", "count": "52"},
            {"name": "BBBB厂", "lng": "120.077569", "lat": "32.524058", "count": "52"},
            {"name": "CCCCCC厂", "lng": "119.927516", "lat": "32.327053", "count": "52"},
            {"name": "CC厂", "lng": "119.834379", "lat": "32.333887", "count": "52"},
            {"name": "CCCCCC厂", "lng": "119.834379", "lat": "32.343887", "count": "52"},
            {"name": "KKKK厂", "lng": "119.824379", "lat": "32.343887", "count": "52"},
            {"name": "DDD厂", "lng": "120.032725", "lat": "32.35097", "count": "52"},
            {"name": "Dyyy厂", "lng": "120.042725", "lat": "32.34097", "count": "52"},
            {"name": "LLLL厂", "lng": "120.032725", "lat": "32.35097", "count": "52"},
            {"name": "LLLL4厂", "lng": "120.033725", "lat": "32.34097", "count": "52"},
            {"name": "LLLL5厂", "lng": "120.034725", "lat": "32.36097", "count": "52"},


        ];
    }

    /**
     * 获得单个工厂信息
     * @param string name
     */
    function getFactoryinfo(name) {

    }

    return {
        getAllFactoriesinfo: getAllFactoriesinfo,
        getFactoryinfo: getFactoryinfo,
    }
});