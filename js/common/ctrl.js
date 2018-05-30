define(function () {

    //右侧面板名称列表
    var $fList = $('.f-list');

    var $fBtn = $('.f-btn');

    $fBtn.on('click', function () {
        var $this = $(this);
        $fList.fadeToggle('fast');
        $this.text() == '展开' ? $this.text('收起') : $this.text('展开');
    })

    function renderFactoryList(infos, map) {
        var html = "";
        infos.forEach(function (info) {
            html +=
                "<li class='f-item' data-lng='" +
                info.lng +
                "'  data-lat='" +
                info.lat + "'>" +
                info.name + "</li>";
        });
        $fList.html(html);
        $('.f-item').on('click', function () {
            var $this = $(this);
            //console.log(map);
            map.panTo($this.data('lng'), $this.data('lat'));
        })
    }

    return {
        renderFactoryList: renderFactoryList
    }

});