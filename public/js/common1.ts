namespace Product {
    import SupplierInfo = DataInfo.SupplierInfo;
    import KindInfo = DataInfo.KindInfo;
    export class Stock {
        static xmlhttp: XMLHttpRequest;
        static setViewableInfo(): void {
            window.location.href = "/setViewableInfo";
        }

        static ajaxLoad(targetData: string): void {
            let jSetting : JQueryAjaxSettings= {
                type: "GET",
                cache : false,
                url: 'stock?load=' + targetData,
                dataType : 'json',
                success: (returned_data) =>{
                    this.loadFormFromJson(returned_data);
                },
                error : ()=>{
                    alert('网络错误');
                }
            }
            $.ajax(jSetting);
        }

        static purchase(): void {
            window.open("/purchase", "_blank",
                "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400");
        }

        private static loadFormFromJson(data : JSON) : void{

        }
        private static sendErrMsg(){

        }



    }
    

    //商品编辑页面
    export class Item {
        static jtrClone: JQuery;
        static productNumber: number = 1;

        static setNewProduct(): void {
            //开始注册商品
            if ($(event.target).parent().find('.glyphicon-plus').length == 1) {
                let jdiv: JQuery = this.getItemForm(this.productNumber);
                let data: any = JSON.parse($('<div>').html($('#data').text()).text());
                let jKinds: JQuery = jdiv.find('.selectKinds');
                let jSuppliers: JQuery = jdiv.find('.selectSuppliers');
                data.kinds.forEach((kind: KindInfo) => {
                    jKinds.append('<option value="' + kind.kindID + '">' + kind.name + '</option>');
                });
                //jKinds.append('<option onclick=addKinds()><span class="glyphicon glyphicon-plus"></span></option>')
                data.suppliers.forEach((supplier: SupplierInfo) => {
                    jSuppliers.append('<option value="' + supplier.supplierID + '">' + supplier.name + '</option>')
                })
                //jSuppliers.append('<option onclick=addSuppliers()><span class="glyphicon glyphicon-plus"></span></option>');
                this.jtrClone = jdiv.find('tbody').children('tr').clone();
                jdiv.appendTo('#itemPlusHead');
                $('#itemPlusHead').children('h3').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-ok').text("确认");
            } else {
                //商品注册结束
                let jtrs: JQuery = $("#itemsInfo").find('tr');
                let newJtrs: JQuery = $('#newItemsInfo').find('tr');//注册的新商品的tr
                let names: string[] = [], newNames: string[] = [];//存入所有既存商品的名字
                let flag: boolean = false;
                jtrs.each((i: number, tr: HTMLElement) => {
                    names.push(tr.children[2].textContent);
                });
                newJtrs.each((i: number, tr: HTMLElement) => {
                    newNames.push((<HTMLInputElement>tr.children[1].children[0]).value);
                });
                //检测重复
                newNames.every((newName: string) => {
                    if (names.indexOf(newName) != -1) {
                        alert("商品" + newName + "已存在");
                        flag = true;
                        return false;
                    }
                });
                if (!flag) {
                    $('fieldset').append('<input type="text" name="number">')
                        .children('input[name="number"]')
                        .attr('value', this.productNumber)
                        .parent().parent()
                        .submit();
                }
            }
        }

        static addProduct(): void {
            //检测填入的信息
            this.productNumber++;
            var jtr = this.jtrClone.clone();
            if (this.productNumber >= 11) {
                //已经添加了两位数的商品了
                jtr.find('td').each((i: number, td: HTMLTableCellElement) => {
                    setNameAttr(i, td, 1, 'item');
                });
            } else {
                //已经添加了0-9个商品
                jtr.find('td').each((i: number, td: HTMLTableCellElement) => {
                    setNameAttr(i, td, 0, 'item');
                });
            }
            $(event.target).parent().empty().parent().after(jtr);
        }

        //初始化输入面板
        private static getItemForm(productNumber: number): JQuery {
            let jdiv = $('<div><form method="post"><fieldset></fieldset></form></div>');
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
                //.append('<td><input type="text" name="kind' + this.productNumber + '"></td>')
                //.append('<td><input type="text" name="supplier' + this.productNumber+ '"></td>')
                .append('<td><select class="selectSuppliers name="supplier' + this.productNumber + '"></select></td>')
                .append('<td><input type="text" name="procurementPrice' + this.productNumber + '"></td>')
                .append('<td><input type="text" name="producingArea' + this.productNumber + '"></td>')
                .append('<td><span class="glyphicon glyphicon-plus" onclick="product.item.addProduct()"></span></td>')
                .find('input').css('width', 100)
                .find('select').css('width', 100);
            return jdiv;
        }
    }

    export class Kind {
        static kindJtrClone: JQuery;
        static kindsNumber: number = 1;

        static setNewKind(): void {
            //注册新商品
            if ($(event.target).parent().find('.glyphicon-plus').length == 1) {
                let jdiv: JQuery = this.getKindForm();
                this.kindJtrClone = jdiv.find("tbody").children("tr").clone();
                jdiv.appendTo("#kindPlusHead");
                $('#kindPlusHead').children('h3').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-ok').text("确认");
            } else {
                //商品注册结束
                let jtrs: JQuery = $("#kindsInfo").find('tr');
                let newJtrs: JQuery = $('#newKindsInfo').find('tr');//注册的新商品的tr
                let names = [], newNames = [];//存入所有既存商品的名字
                let flag: boolean = false;
                jtrs.each((i: number, tr: HTMLElement) => {
                    names.push((<HTMLTableElement>tr.children[2]).textContent);
                });
                newJtrs.each((i: number, tr: HTMLTableCellElement) => {
                    newNames.push((<HTMLInputElement>tr.children[1].children[0]).value);
                });
                //检测重复
                newNames.every((newName: string) => {
                    if (names.indexOf(newName) != -1) {
                        alert("种类:" + newName + "已存在");
                        flag = true;
                        return false;
                    }
                });
                if (!flag) {
                    $('fieldset').append('<input type="text" name="number">')
                        .children('input[name="number"]')
                        .attr('value', this.kindsNumber)
                        .parent().parent()
                        .submit();
                }
            }
        }

        static addKind(): void {
            this.kindsNumber++;

            let jtr: JQuery = this.kindJtrClone.clone();
            if (this.kindsNumber >= 11) {
                //已经添加了两位数的商品了
                jtr.find('td').each((i: number, td: HTMLTableCellElement) => {
                    setNameAttr(i, td, 1, 'kind');
                });
            } else {
                //已经添加了0-9个商品
                jtr.find('td').each((i: number, td: HTMLTableCellElement) => {
                    setNameAttr(i, td, 0, 'kind');
                });
            }
            $(event.target).parent().empty().parent().after(jtr);

        }

        private static getKindForm(): JQuery {
            let jdiv: JQuery = $('<div><form method="post"><fieldset></fieldset></form></div>');
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
        }
    }

    export class Purchase {
        static changeKind(): void {
            let kindID: string = $("#kindSelect").val();
            $("#itemSelect").find("option").get().forEach((option: HTMLOptionElement) => {
                if (option.dataset.kindID != kindID) {
                    option.style.display = "none";
                }
            })
            let itemSelect: JQuery = $("#itemSelect");
        }

        static addItem(): void {
            let jItemNum: JQuery = $(event.target).parent().prev()
            jItemNum.val(jItemNum.val() + 1);
        }
    }

    /** 
       * private
       * offset : 已经添加了两位数的商品的时候传入１，一位数商品的时候传入０
       * key   :注册新商品: item　注册新种类:kind
       */
    function setNameAttr(index: number, targetTd: HTMLTableCellElement, offset: number, key: string): void {
        let name = "";
        if ('item' == key) {
            name = (<HTMLInputElement>targetTd.children[0]).name.substring(0, name.length - offset) + this.productNumber;
        } else if ('kind' == key) {
            name = (<HTMLInputElement>targetTd.children[0]).name.substring(0, name.length - offset) + this.productNumber;
        }
        (<HTMLInputElement>targetTd.children[0]).name = name;
    }

}