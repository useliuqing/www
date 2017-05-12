var Product;
(function (Product) {
    var Stock = (function () {
        function Stock() {
        }
        Stock.setViewableInfo = function () {
            window.location.href = "/setViewableInfo";
        };
        Stock.ajaxLoad = function (targetData) {
            var _this = this;
            var jSetting = {
                type: "GET",
                cache: false,
                url: 'stock?load=' + targetData,
                dataType: 'json',
                success: function (returned_data) {
                    _this.loadFormFromJson(returned_data);
                },
                error: function () {
                    alert('网络错误');
                }
            };
            $.ajax(jSetting);
        };
        Stock.purchase = function () {
            window.open("/purchase", "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400");
        };
        Stock.loadFormFromJson = function (data) {
        };
        Stock.sendErrMsg = function () {
        };
        return Stock;
    }());
    Product.Stock = Stock;
    //商品编辑页面
    var Item = (function () {
        function Item() {
        }
        Item.setNewProduct = function () {
            //开始注册商品
            if ($(event.target).parent().find('.glyphicon-plus').length == 1) {
                var jdiv = this.getItemForm(this.productNumber);
                var data = JSON.parse($('<div>').html($('#data').text()).text());
                var jKinds_1 = jdiv.find('.selectKinds');
                var jSuppliers_1 = jdiv.find('.selectSuppliers');
                data.kinds.forEach(function (kind) {
                    jKinds_1.append('<option value="' + kind.kindID + '">' + kind.name + '</option>');
                });
                //jKinds.append('<option onclick=addKinds()><span class="glyphicon glyphicon-plus"></span></option>')
                data.suppliers.forEach(function (supplier) {
                    jSuppliers_1.append('<option value="' + supplier.supplierID + '">' + supplier.name + '</option>');
                });
                //jSuppliers.append('<option onclick=addSuppliers()><span class="glyphicon glyphicon-plus"></span></option>');
                this.jtrClone = jdiv.find('tbody').children('tr').clone();
                jdiv.appendTo('#itemPlusHead');
                $('#itemPlusHead').children('h3').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-ok').text("确认");
            }
            else {
                //商品注册结束
                var jtrs = $("#itemsInfo").find('tr');
                var newJtrs = $('#newItemsInfo').find('tr'); //注册的新商品的tr
                var names_1 = [], newNames_1 = []; //存入所有既存商品的名字
                var flag_1 = false;
                jtrs.each(function (i, tr) {
                    names_1.push(tr.children[2].textContent);
                });
                newJtrs.each(function (i, tr) {
                    newNames_1.push(tr.children[1].children[0].value);
                });
                //检测重复
                newNames_1.every(function (newName) {
                    if (names_1.indexOf(newName) != -1) {
                        alert("商品" + newName + "已存在");
                        flag_1 = true;
                        return false;
                    }
                });
                if (!flag_1) {
                    $('fieldset').append('<input type="text" name="number">')
                        .children('input[name="number"]')
                        .attr('value', this.productNumber)
                        .parent().parent()
                        .submit();
                }
            }
        };
        Item.addProduct = function () {
            //检测填入的信息
            this.productNumber++;
            var jtr = this.jtrClone.clone();
            if (this.productNumber >= 11) {
                //已经添加了两位数的商品了
                jtr.find('td').each(function (i, td) {
                    setNameAttr(i, td, 1, 'item');
                });
            }
            else {
                //已经添加了0-9个商品
                jtr.find('td').each(function (i, td) {
                    setNameAttr(i, td, 0, 'item');
                });
            }
            $(event.target).parent().empty().parent().after(jtr);
        };
        //初始化输入面板
        Item.getItemForm = function (productNumber) {
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
                .append('<td><input type="file" name="picture' + this.productNumber + '"></td>')
                .append('<td><input type="text" name="productName' + this.productNumber + '"></td>')
                .append('<td><input type="text" name="price' + this.productNumber + '"></td>')
                .append('<td><select class="selectKinds" name = "kind' + this.productNumber + '"></select></td>')
                .append('<td><select class="selectSuppliers name="supplier' + this.productNumber + '"></select></td>')
                .append('<td><input type="text" name="procurementPrice' + this.productNumber + '"></td>')
                .append('<td><input type="text" name="producingArea' + this.productNumber + '"></td>')
                .append('<td><span class="glyphicon glyphicon-plus" onclick="product.item.addProduct()"></span></td>')
                .find('input').css('width', 100)
                .find('select').css('width', 100);
            return jdiv;
        };
        return Item;
    }());
    Item.productNumber = 1;
    Product.Item = Item;
    var Kind = (function () {
        function Kind() {
        }
        Kind.setNewKind = function () {
            //注册新商品
            if ($(event.target).parent().find('.glyphicon-plus').length == 1) {
                var jdiv = this.getKindForm();
                this.kindJtrClone = jdiv.find("tbody").children("tr").clone();
                jdiv.appendTo("#kindPlusHead");
                $('#kindPlusHead').children('h3').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-ok').text("确认");
            }
            else {
                //商品注册结束
                var jtrs = $("#kindsInfo").find('tr');
                var newJtrs = $('#newKindsInfo').find('tr'); //注册的新商品的tr
                var names_2 = [], newNames_2 = []; //存入所有既存商品的名字
                var flag_2 = false;
                jtrs.each(function (i, tr) {
                    names_2.push(tr.children[2].textContent);
                });
                newJtrs.each(function (i, tr) {
                    newNames_2.push(tr.children[1].children[0].value);
                });
                //检测重复
                newNames_2.every(function (newName) {
                    if (names_2.indexOf(newName) != -1) {
                        alert("种类:" + newName + "已存在");
                        flag_2 = true;
                        return false;
                    }
                });
                if (!flag_2) {
                    $('fieldset').append('<input type="text" name="number">')
                        .children('input[name="number"]')
                        .attr('value', this.kindsNumber)
                        .parent().parent()
                        .submit();
                }
            }
        };
        Kind.addKind = function () {
            this.kindsNumber++;
            var jtr = this.kindJtrClone.clone();
            if (this.kindsNumber >= 11) {
                //已经添加了两位数的商品了
                jtr.find('td').each(function (i, td) {
                    setNameAttr(i, td, 1, 'kind');
                });
            }
            else {
                //已经添加了0-9个商品
                jtr.find('td').each(function (i, td) {
                    setNameAttr(i, td, 0, 'kind');
                });
            }
            $(event.target).parent().empty().parent().after(jtr);
        };
        Kind.getKindForm = function () {
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
                .append('<td><input type="text" name="name' + this.kindsNumber + '"></td>')
                .append('<td><input type="text" name="remark' + this.kindsNumber + '"></td>')
                .append('<td><span class="glyphicon glyphicon-plus" onclick="product.kind.addKind()"></span></td>')
                .find('input').css('width', 100);
            return jdiv;
        };
        return Kind;
    }());
    Kind.kindsNumber = 1;
    Product.Kind = Kind;
    var Purchase = (function () {
        function Purchase() {
        }
        Purchase.changeKind = function () {
            var kindID = $("#kindSelect").val();
            $("#itemSelect").find("option").get().forEach(function (option) {
                if (option.dataset.kindID != kindID) {
                    option.style.display = "none";
                }
            });
            var itemSelect = $("#itemSelect");
        };
        Purchase.addItem = function () {
            var jItemNum = $(event.target).parent().prev();
            jItemNum.val(jItemNum.val() + 1);
        };
        return Purchase;
    }());
    Product.Purchase = Purchase;
    /**
       * private
       * offset : 已经添加了两位数的商品的时候传入１，一位数商品的时候传入０
       * key   :注册新商品: item　注册新种类:kind
       */
    function setNameAttr(index, targetTd, offset, key) {
        var name = "";
        if ('item' == key) {
            name = targetTd.children[0].name.substring(0, name.length - offset) + this.productNumber;
        }
        else if ('kind' == key) {
            name = targetTd.children[0].name.substring(0, name.length - offset) + this.productNumber;
        }
        targetTd.children[0].name = name;
    }
})(Product || (Product = {}));
//# sourceMappingURL=common1.js.map