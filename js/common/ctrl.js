define(['common'], function (common) {

    //右侧面板名称列表
    var $fList = $('.f-list');

    //右侧面板显示按钮
    var $fBtn = $('.f-btn');

    //右侧面板搜索框
    var $fsearch = $('.ctrl-search');

    //点击坐标弹出页
    var $fdetail = $('#detail');

    //详情关闭按钮
    var $detailclose = $('.ctrl-close');

    //详情日期控件
    var date = new Date();
    var mon = date.getMonth() + 1;
    var cur = date.getFullYear() + '-' + (mon < 10 ? ('0' + mon) : mon);
    var isMonth = true;
    var $dateInput = $('.ctrl-date');
    var $monthInput = $('.ctrl-month');
    var $dateBth = $('.btn-date');
    var $monthBth = $('.btn-month');

    //详情关闭按钮
    var $detailtitle = $fdetail.find('h4');

    //数据显示表格
    var $ftable = $('#detail-table');

    //数据显示图表
    var $fchart = $('#f-chart');


    //临时
    (function () {
        for (let i = 1; i < 5; i++) {
            require(['chart'], function (chart) {
                chart.ChartsCtrl.pie()
                    .setTitle('图表演示' + i)
                    .setData([
                        {item: 'a', value: parseInt(Math.random() * 100)},
                        {item: 'b', value: parseInt(Math.random() * 120)},
                    ])
                    .render('h-c-' + i);
            });
        }
        require(['chart'], function (chart) {
            chart.ChartsCtrl.stack()
                .y(['A', 'B', 'C', 'D'])
                .x([
                    {item: 'A', value: [parseInt(Math.random() * 120),parseInt(Math.random() * 120)]},
                    {item: 'B', value: [parseInt(Math.random() * 120),parseInt(Math.random() * 120)]},
                    {item: 'C', value: [parseInt(Math.random() * 120),parseInt(Math.random() * 120)]},
                    {item: 'D', value: [parseInt(Math.random() * 120),parseInt(Math.random() * 120),parseInt(Math.random() * 120),parseInt(Math.random() * 120)]},
                ])
                .render('r-c');
        });
    })();


    $fsearch.on('input', function () {
        $fList.find('li').each(function (idx, li) {
            var $this = $(li);
            if (!$fsearch.val()) $this.show();
            var reg = new RegExp($fsearch.val(), 'gi');
            if (!reg.test(li.innerText)) {
                $this.hide();
            } else {
                $this.show();
            }
        });
    })

    $fBtn.on('click', function () {
        var $this = $(this);
        $fList.fadeToggle('fast');
        $this.text() == '展开' ? $this.text('收起') : $this.text('展开');
    });

    $detailclose.on('click', function () {
        $(this).parent().hide();
    })

    $monthInput.find('input:eq(0)').val(cur);
    $dateInput.find('input:eq(0)').val(cur + '-01');
    $dateInput.find('input:eq(1)').val(
        cur + '-' + common.getLastDay(date.getFullYear(), mon)
    );

    $dateBth.on('click', function () {
        $dateBth.addClass('active');
        $monthBth.removeClass('active');
        $dateInput.show();
        $monthInput.hide();
        isMonth = false;
    });

    $monthBth.on('click', function () {
        $dateBth.removeClass('active');
        $monthBth.addClass('active');
        $dateInput.hide();
        $monthInput.show();
        isMonth = true;
    });


    function getCurTime() {

    }


    function renderFactoryList(infos, map) {
        var html = "";
        infos.forEach(function (info) {
            html +=
                "<li class='f-item' data-lng='" +
                info.lng +
                "'  data-lat='" +
                info.lat + "'>" +
                "<span>" +
                info.name +
                "</span>" +
                "<button class='pull-right btn btn-sm btn-default'>详情</button></li>";
        });
        $fList.html(html);
        $('.f-item').on('click', function () {
            var $this = $(this);
            //console.log(map);
            map.panTo($this.data('lng'), $this.data('lat'));
            $this.addClass('active').siblings().removeClass('active');
        });
        $('.f-item').find('button').on('click', function () {
            renderFactoryDetail($(this).siblings('span').text());
        })
    }

    function renderFactoryDetail(name, date) {
        $detailtitle.text(name);
        $fdetail.show();
        $fchart.hide();
        $('.detail-chart').on('click', function () {
            $('.detail-chart').removeClass('active');
            var $this = $(this);
            $this.addClass('active');
            var cheName = $this.parent().siblings('.che-name').text();
            //console.log(cheName);
            require(['chart'], function (chart) {
                $fchart.show();
                chart.ChartsCtrl.bar()
                    .setTitle(name + '十二个月' + cheName + '存储量柱状图')
                    .x(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'])
                    .y([
                        {
                            item: '存储量',
                            value: [parseInt(Math.random() * 300), 156, parseInt(Math.random() * 300), 356, parseInt(Math.random() * 100), parseInt(Math.random() * 100), parseInt(Math.random() * 100), 398, parseInt(Math.random() * 300), 333, parseInt(Math.random() * 100), 110]
                        }
                    ])
                    .render('f-chart');
            });
        });
    }

    return {
        renderFactoryList: renderFactoryList,
        renderFactoryDetail: renderFactoryDetail,
        getCurTime: getCurTime
    }

});