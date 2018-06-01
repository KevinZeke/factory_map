define(function () {
    /**
     * 判断浏览区是否支持canvas
     * @returns {boolean}
     */
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }

    /**
     * 获取某月最后一天的日期
     * @param number year
     * @param number month
     * @return {number}
     */
    function getLastDay(year, month) {
        var new_year = year; //取当前的年份
        var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）
        if(month > 12) //如果当前大于12月，则年份转到下一年
        {
            new_month -= 12; //月份减
            new_year++; //年份增
        }
        var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
        return(new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();
    }


    return {
        isSupportCanvas: isSupportCanvas,
        getLastDay:getLastDay
    }
});