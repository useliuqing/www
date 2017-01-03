var product = (function ($) {

    var p = {};
    //主页面相关
    p.stock = {
        //设置主页的显示项目
        setViewableInfo: setViewableInfo

    };

    　　//商品详细相关　
    p.item = {
        //注册新商品
        setNewProduct: setNewProduct,

        addProduct: addProduct


    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function setViewableInfo() {
        window.location.href = "/setViewableInfo";
    }


    function setNewProduct() {
        //开始注册商品
        if ($(event.target).children().hasClass('glyphicon-plus')) {
            var jdiv = $('<div></div>');
            jdiv.append('<table class="table table-striped"></table>')
                .children('table')
                .append('<thead><tr></tr></thead>')
                .find('tr')
                .append('<th>商品名称</th>')
                .append('<th>商品图片</th>')
                .append('<th>价格</th>')
                .append('<th>种类</th>')
                .append('<th>供应商</th>')
                .append('<th>采购价</th>')
                .append('<th>产地</th>')
                .append('<th><th>')
                .parent()
                .after('<tbody><tr class="warning"></tr></tbody>')
                .next()
                .children('tr')
                .append('<td><input type="text"></td>')
                .append('<td><input type="text"></td>')
                .append('<td><input type="text"></td>')
                .append('<td><input type="text"></td>')
                .append('<td><input type="text"></td>')
                .append('<td><input type="text"></td>')
                .append('<td><input type="text"></td>')
                .append('<td><span class="glyphicon glyphicon-plus" onclick="product.item.addProduct()"></span></td>')
                .find('input').css('width', 80);
            jdiv.appendTo('#itemPlusHead');
            $('#itemPlusHead').children('h3').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-ok').text('确认');
        } else {
            //商品注册结束

        }
    }

    function addProduct() {
        //检测填入的信息

        var jtrCopy = $(event.target).parent().parent().clone();
        $(event.target).parent().empty().parent().after(jtrCopy);
    }

    return p;
} (jQuery));