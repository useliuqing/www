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

    var newProductsNumber = 0;
    function setNewProduct() {
        //开始注册商品
        if ($(event.target).parent().find('.glyphicon-plus').length ==1) {
            var jdiv = $('<div><form method="post"><fieldset></fieldset></form></div>');
            jdiv.find('fieldset')
                .append('<table class="table table-striped"></table>')
                .children()
                .append('<thead><tr></tr></thead>')
                .find('tr')
                .append('<th>商品图片</th>')
                .append('<th>商品名称</th>')
                .append('<th>价格</th>')
                .append('<th>种类</th>')
                .append('<th>供应商</th>')
                .append('<th>采购价</th>')
                .append('<th>产地</th>')
                .append('<th><th>')
                .parent()
                .after('<tbody id="newItemsInfo"><tr class="success"></tr></tbody>')
                .next()
                .children('tr')
                .append('<td><input type="file" name="picture' + newProductsNumber + '"></td>')
                .append('<td><input type="text" name="productName'+ newProductsNumber +'"></td>')
                .append('<td><input type="text" name="price' + newProductsNumber +'"></td>')
                .append('<td><input type="text" name="kind' + newProductsNumber + '"></td>')
                .append('<td><input type="text" name="supplier' + newProductsNumber+ '"></td>')
                .append('<td><input type="text" name="procurementPrice' + newProductsNumber+ '"></td>')
                .append('<td><input type="text" name="producingArea' + newProductsNumber + '"></td>')
                .append('<td><span class="glyphicon glyphicon-plus" onclick="product.item.addProduct()"></span></td>')
                .find('input').css('width', 100);
            jdiv.appendTo('#itemPlusHead');
            newProductsNumber++;
            $('#itemPlusHead').children('h3').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-ok').text("确认");
        } else {
            //商品注册结束
            var jtrs = $("#itemsInfo").find('tr');
            var newJtrs = $('#newItemsInfo').find('tr');//注册的新商品的tr
            var names = [], newNames = [];//存入所有既存商品的名字
            var flag = false;
            jtrs.each(function (i, tr) {
                names.push(tr.children().eq(2).text());
            });
            newJtrs.each(function (i, tr) {
                newNames.push(tr.children[1].children[0].value);
            });
            //检测重复
            newNames.every(function(newName){
                if(names.indexOf(newName) != -1){
                    alert("商品"+ newName +"已存在");
                    flag = true;
                    return false;
                }
            });
            if(!flag){
                $('fieldset').append('<input type="text" name="number">')
                             .children('input[name="number"]')
                             .attr('value',newProductsNumber)
                             .parent().parent()
                             .submit();
            }
        }
    }

    function addProduct() {
        //检测填入的信息
        var jtr = $('<tr class="success"></tr>');
        jtr.append('<td><input type="file" name="picture"></td>')
            .append('<td><input type="text" name="productName"></td>')
            .append('<td><input type="text" name="price"></td>')
            .append('<td><input type="text" name="kind"></td>')
            .append('<td><input type="text" name="supplier"></td>')
            .append('<td><input type="text" name="procurementPrice"></td>')
            .append('<td><input type="text" name="producingArea"></td>')
            .append('<td><span class="glyphicon glyphicon-plus" onclick="product.item.addProduct()"></span></td>')
            .find('input').css('width', 100);
        newProductsNumber++;
        $(event.target).parent().empty().parent().after(jtr);
    }
    return p;
} (jQuery));