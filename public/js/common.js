var product = (function ($) {

    var xmlhttp;
    var p = {};
    //主页面相关
    p.stock = {
        //设置主页的显示项目
        setViewableInfo: setViewableInfo,
        ajaxLoad: ajaxLoad,
        purchase : _purchase

    };

    //商品详细相关　
    p.item = {
        //注册新商品
        setNewProduct: setNewProduct,

        addProduct: addProduct,

    };

    //商品种类相关
    p.kind = {
        //注册新种类
        setNewKind: setNewKind,

        addKind: addKind



    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function setViewableInfo() {
        window.location.href = "/setViewableInfo";
    }

    var jtrClone = {};
    var newProductsNumber = 1;
    function setNewProduct() {
        //开始注册商品
        if ($(event.target).parent().find('.glyphicon-plus').length == 1) {
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
                .append('<td><input type="text" name="productName' + newProductsNumber + '"></td>')
                .append('<td><input type="text" name="price' + newProductsNumber + '"></td>')
                .append('<td><select class="selectKinds" name = "kind' + newProductsNumber + '"></select></td>')
                //.append('<td><input type="text" name="kind' + newProductsNumber + '"></td>')
                //.append('<td><input type="text" name="supplier' + newProductsNumber+ '"></td>')
                .append('<td><select class="selectSuppliers name="supplier' + newProductsNumber + '"></select></td>')
                .append('<td><input type="text" name="procurementPrice' + newProductsNumber + '"></td>')
                .append('<td><input type="text" name="producingArea' + newProductsNumber + '"></td>')
                .append('<td><span class="glyphicon glyphicon-plus" onclick="product.item.addProduct()"></span></td>')
                .find('input').css('width', 100)
                .find('select').css('width', 100);
            var data = JSON.parse($('<div>').html($('#data').text()).text());
            var jKinds = jdiv.find('.selectKinds');
            var jSuppliers = jdiv.find('.selectSuppliers');
            data.kinds.forEach(function (kind) {
                jKinds.append('<option value="' + kind.kindID + '">' + kind.name + '</option>');
            });
            //jKinds.append('<option onclick=addKinds()><span class="glyphicon glyphicon-plus"></span></option>')
            data.suppliers.forEach(function (supplier) {
                jSuppliers.append('<option value="' + supplier.supplierID + '">' + supplier.name + '</option>')
            })
            //jSuppliers.append('<option onclick=addSuppliers()><span class="glyphicon glyphicon-plus"></span></option>');
            jtrClone = jdiv.find('tbody').children('tr').clone();
            jdiv.appendTo('#itemPlusHead');
            $('#itemPlusHead').children('h3').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-ok').text("确认");
        } else {
            //商品注册结束
            var jtrs = $("#itemsInfo").find('tr');
            var newJtrs = $('#newItemsInfo').find('tr');//注册的新商品的tr
            var names = [], newNames = [];//存入所有既存商品的名字
            var flag = false;
            jtrs.each(function (i, tr) {
                names.push(tr.children[2].text);
            });
            newJtrs.each(function (i, tr) {
                newNames.push(tr.children[1].children[0].value);
            });
            //检测重复
            newNames.every(function (newName) {
                if (names.indexOf(newName) != -1) {
                    alert("商品" + newName + "已存在");
                    flag = true;
                    return false;
                }
            });
            if (!flag) {
                $('fieldset').append('<input type="text" name="number">')
                    .children('input[name="number"]')
                    .attr('value', newProductsNumber)
                    .parent().parent()
                    .submit();
            }
        }
    }

    function addProduct() {
        //检测填入的信息
        newProductsNumber++;
        var jtr = jtrClone.clone();
        if (newProductsNumber >= 11) {
            //已经添加了两位数的商品了
            jtr.find('td').each(function (i, td) {
                _setNameAttr(i, td, 1, 'item');
            });
        } else {
            //已经添加了0-9个商品
            jtr.find('td').each(function (i, td) {
                _setNameAttr(i, td, 0, 'item');
            });
        }
        $(event.target).parent().empty().parent().after(jtr);
    }


    var kindJtrClone = {};
    var newKindsNumber = 1;
    function setNewKind() {
        //开始注册种类
        if ($(event.target).parent().find('.glyphicon-plus').length == 1) {
            var jdiv = $('<div><form method="post"><fieldset></fieldset></form></div>');
            jdiv.find('fieldset')
                .append('<table class="table table-striped"></table>')
                .children()
                .append('<thead><tr></tr></thead>')
                .find('tr')
                .append('<th>种类名称</th>')
                .append('<th>备注</th>')
                .append('<th><th>')
                .parent()
                .after('<tbody id="newKindsInfo"><tr class="success"></tr></tbody>')
                .next()
                .children('tr')
                .append('<td><input type="text" name="name' + newKindsNumber + '"></td>')
                .append('<td><input type="text" name="remark' + newKindsNumber + '"></td>')
                .append('<td><span class="glyphicon glyphicon-plus" onclick="product.kind.addKind()"></span></td>')
                .find('input').css('width', 100);
            kindJtrClone = jdiv.find('tbody').children('tr').clone();
            jdiv.appendTo('#kindPlusHead');
            $('#kindPlusHead').children('h3').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-ok').text("确认");
        } else {
            //商品注册结束
            var jtrs = $("#kindsInfo").find('tr');
            var newJtrs = $('#newKindsInfo').find('tr');//注册的新商品的tr
            var names = [], newNames = [];//存入所有既存商品的名字
            var flag = false;
            jtrs.each(function (i, tr) {
                names.push(tr.children[2].text);
            });
            newJtrs.each(function (i, tr) {
                newNames.push(tr.children[1].children[0].value);
            });
            //检测重复
            newNames.every(function (newName) {
                if (names.indexOf(newName) != -1) {
                    alert("种类:" + newName + "已存在");
                    flag = true;
                    return false;
                }
            });
            if (!flag) {
                $('fieldset').append('<input type="text" name="number">')
                    .children('input[name="number"]')
                    .attr('value', newKindsNumber)
                    .parent().parent()
                    .submit();
            }
        }
    }

    function addKind() {
        //检测填入的信息


        newKindsNumber++;
        var jtr = kindJtrClone.clone();
        if (newKindsNumber >= 11) {
            //已经添加了两位数的商品了
            jtr.find('td').each(function (i, bd) {
                _setNameAttr(i, bd, 1, 'kind');
            });
        } else {
            //已经添加了0-9个商品
            jtr.find('td').each(function (i, bd) {
                _setNameAttr(i, bd, 0, 'kind');
            });
        }
        $(event.target).parent().empty().parent().after(jtr);
    }

    /** 
     * private
     * number : 已经添加了两位数的商品的时候传入１，一位数商品的时候传入０
     * flag   :注册新商品: item　注册新种类:kind
     */
    function _setNameAttr(index, td, number, flag) {
        var name = "";
        if ('item' == flag) {
            name = td.children[0].name.substring(0, name.length - number) + newProductsNumber;
        } else if ('kind' == flag) {
            name = td.children[0].name.substring(0, name.length - number) + newKindsNumber;
        }
        td.children[0].name = name;
    }
    /**
     * targetData :  1 'stock' : 取库存  2 'soldOut' : 取已售出 3'delivered' : 取已出货 
     */
    function ajaxLoad(targetData) {
        if (!xmlhttp) {
            _setXmlHttp();
        }
         
        xmlhttp.open("GET",　'stock?load=' + targetData + "&t=" + Math.random(),true);
        xmlhttp.send();
    }

    function _setXmlHttp() {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        if(xmlhttp != null){
            xmlhttp.onreadystatechange = _onResponse;
        }
    }

    function _onResponse(){
        if(xmlhttp.readyState!= 4)return;
        if(xmlhttp.status != 200){
            //读取数据出错

        }



    }


    return p;
} (jQuery));