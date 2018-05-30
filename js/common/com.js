define(function () {
    /**
     * 判断浏览区是否支持canvas
     * @returns {boolean}
     */
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }


    return {
        isSupportCanvas: isSupportCanvas
    }
});