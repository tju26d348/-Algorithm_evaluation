$(document).ready(function() {
    var IPaddress = "192.168.199.119";
    String.prototype.format = function(args) {
        var result = this;
        if (arguments.length < 1) {
            return result;
        }

        var data = arguments; //如果模板参数是数组
        if (arguments.length == 1 && typeof(args) == "object") {
            //如果模板参数是对象
            data = args;
        }
        for (var key in data) {
            var value = data[key];
            if (undefined != value) {
                result = result.replace("{" + key + "}", value);
            }
        }
        return result;
    }

    Array.prototype.deletSameArray = function() {
        var n = []; //一个新的临时数组
        for (var i = 0; i < this.length; i++) //遍历当前数组
        {
            //如果当前数组的第i在临时数组已有，跳过，否则把当前项push到临时数组里
            if (n.indexOf(this[i]) == -1) { n.push(this[i]); }
        }
        return n;
    }

    var tableHtml01 = '<div class="col-md-3" data-baseName="{3}">' +
        '<div class="blockDB01Top blockBC">' +
        '<h6 class="headInBlock">Database:{0}<button type="button" class="btn btn-inverse btn-sm btnInblock ">查看详情</button></h6>' +
        '</div>' +
        '<div class="blockDB01Bottom">' +
        '<div class="progBar proBarDB {1}" id="{2}">' +
        '</div></div></div>';

    var tableHtml02 = '<div class="col-md-3" data-baseName="{3}">' +
        '<div class="blockDB02Top blockBC">' +
        '<h6 class="headInBlock">Database:{0}<button type="button" class="btn btn-inverse btn-sm btnInblock ">查看详情</button></h6>' +
        '</div>' +
        '<div class="blockDB02Bottom">' +
        '<div class="progBar proBarDB {1}" id="{2}">' +
        '</div></div></div>';
    var tableHtml03 = '<div class="col-md-3" data-baseName="{3}">' +
        '<div class="blockDB03Top blockBC">' +
        '<h6 class="headInBlock">Database:{0}<button type="button" class="btn btn-inverse btn-sm btnInblock ">查看详情</button></h6>' +
        '</div>' +
        '<div class="blockDB03Bottom">' +
        '<div class="progBar proBarDB {1}" id="{2}">' +
        '</div></div></div>';
    var tableHtml04 = '<div class="col-md-3" data-baseName="{3}">' +
        '<div class="blockDB04Top blockBC">' +
        '<h6 class="headInBlock">Database:{0}<button type="button" class="btn btn-inverse btn-sm btnInblock ">查看详情</button></h6>' +
        '</div>' +
        '<div class="blockDB04Bottom">' +
        '<div class="progBar proBarDB {1}" id="{2}">' +
        '</div></div></div>';
    var databaseNav = '<li><a class="AInNav" href="/untitled/databasePage" navName="{0}" ABGC="blockDB0{2}Top blockBC">Database {1}详情页面</a></li>'


    function getDatabase() {
        var databaseArray = new Array();
        $.ajax({
            type: "GET",
            url: "http://" + IPaddress + ":8000/untitled/sayhello/",
            dataType: "json",
            success: function(response) {
                for (var j = 0; response[j] != undefined; j++) {
                    databaseArray.push(response[j].data_set);
                }
                console.log(databaseArray);
                databaseArray = databaseArray.deletSameArray();
                for (var n = 0; n < databaseArray.length; n++) {
                    $("ul.nav").append(databaseNav.format(databaseArray[n], databaseArray[n], (n + 1) % 4 == 0 ? 4 : (n + 1) % 4));
                }
                var dblength = databaseArray.length;
                var dbInt = Math.floor(dblength / 4);
                var dbRemain = dblength % 4;
                var line1 = '<div class="row clearfix rownum1">'; //第一排四个列表的row包含类"rownum1";
                var rowNum = 2;
                for (var i = 0; i <= dbInt; i++) {
                    if (i != 0) {
                        line1 = line1 +
                            tableHtml01.format(databaseArray[4 * (dbInt - 1)], databaseArray[4 * (dbInt - 1)], databaseArray[4 * (dbInt - 1)], databaseArray[4 * (dbInt - 1)]) +
                            tableHtml02.format(databaseArray[4 * (dbInt - 1) + 1], databaseArray[4 * (dbInt - 1) + 1], databaseArray[4 * (dbInt - 1) + 1], databaseArray[4 * (dbInt - 1) + 1]) +
                            tableHtml03.format(databaseArray[4 * (dbInt - 1) + 2], databaseArray[4 * (dbInt - 1) + 2], databaseArray[4 * (dbInt - 1) + 2], databaseArray[4 * (dbInt - 1) + 2]) +
                            tableHtml04.format(databaseArray[4 * (dbInt - 1) + 3], databaseArray[4 * (dbInt - 1) + 3], databaseArray[4 * (dbInt - 1) + 3], databaseArray[4 * (dbInt - 1) + 3]) +
                            '</div><div class="row clearfix rownum{0}">'.format(rowNum);
                        rowNum++;
                    }
                    if (i == dbInt) {
                        switch (dbRemain) {
                            case 1:
                                {
                                    line1 = line1 + tableHtml01.format(databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)]) + '</div>';
                                }
                                break;
                            case 2:
                                {
                                    line1 = line1 + tableHtml01.format(databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)]) +
                                    tableHtml02.format(databaseArray[4 * (dbInt) + 1], databaseArray[4 * (dbInt) + 1], databaseArray[4 * (dbInt) + 1], databaseArray[4 * (dbInt) + 1]) + '</div>';
                                }
                                break;
                            case 3:
                                {
                                    line1 = line1 + tableHtml01.format(databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)], databaseArray[4 * (dbInt)]) +
                                    tableHtml02.format(databaseArray[4 * (dbInt) + 1], databaseArray[4 * (dbInt) + 1], databaseArray[4 * (dbInt) + 1], databaseArray[4 * (dbInt) + 1]) +
                                    tableHtml03.format(databaseArray[4 * (dbInt) + 2], databaseArray[4 * (dbInt) + 2], databaseArray[4 * (dbInt) + 2], databaseArray[4 * (dbInt) + 1]) + '</div>'
                                }
                                break;
                        } //switch
                    }
                } //for循环
                $("div.databaseTableFull").append(line1);

            }
        });
    } //function getDatabase() 

    function refreshDatabase() {
        $.ajax({
            type: "GET",
            url: "http://" + IPaddress + ":8000/untitled/sayhello/",
            dataType: "json",
            success: function(response) {
                    console.log(response);
                    for (var j = 0; response[j] != undefined; j++) {
                        var dbname = response[j].data_set;
                        // $("div.col-md-3").each(function() {
                        var dbBool = false;
                        for (var i = 0; i < $("div.col-md-3").length; i++) {
                            if (dbname == $("div.col-md-3").eq(i).attr("data-baseName")) { dbBool = true; } //若已经有此项所属的数据库时，返回true
                        }
                        console.log(dbBool);
                        if (dbBool == false) {
                            var colLength = $("div.col-md-3").length;
                            // var colLengthInt = Math.floor(colLength / 4);
                            var colLengthRemain = colLength % 4;
                            if (colLength == $("div.blockDB04Top").length) { //如果所有的row都是满的
                                var tableHtmlNewRow = '<div class="row clearfix rownum{0}">'.format($("div.row").length) + //因为除了表格这一部分有row之外，还有一处地方有row,因此不用+1
                                    tableHtml01.format(dbname, dbname, dbname, dbname) +
                                    "</div>";
                                $("div.rownum{0}".format($("div.row").length - 1)).after(tableHtmlNewRow); //增加一个row
                            } else { //如果有没满的row,则在没满的那一个row上增加一个tableHtml
                                var appendCol = colLengthRemain + 1;
                                var tableHtmlNewRow = '<div class="col-md-3" data-baseName="{3}">' +
                                    '<div class="blockDB0{4}Top blockBC">' +
                                    '<h6 class="headInBlock">Database:{0}<a href="databasehtml/databaseETHPage.html" class="btn btn-inverse btn-sm btnInblock ">查看详情</a></h6>' +
                                    '</div>' +
                                    '<div class="blockDB0{5}Bottom">' +
                                    '<div class="progBar proBarDB {1}" id="{2}">' +
                                    '</div></div></div>';
                                var tableHtmlNewRowNew = tableHtmlNewRow.format(dbname, dbname, dbname, dbname, appendCol, appendCol);
                                $("div.rownum{0}".format($("div.row").length - 1)).append(tableHtmlNewRowNew);
                            }

                        }
                        // })
                    }
                } //success
        }); //ajax
    }

    function switchDatabase(paraDataset, paraTitle, paraID) {
        var proGressFull = '<div class="progressA {1}"><hr><h6 class="newh6 ">' + paraTitle + '</h6>' + '<div class="progress ">' + '<div class="progress-bar progress-bar-success " role="progressbar " aria-valuenow="100 " aria-valuemin="0 " aria-valuemax="100 " style="width:100% " fullProID="{0}">100%</div> ' + '</div></div>';
        var proGressFullNew = proGressFull.format(paraID, paraID);
        if ($("div.{0}".format(paraID)).length == 0) {
            $("div.{0}".format(paraDataset)).append(proGressFullNew); //将progress添加到对应数据库的proBar之后
        }

    } //function switchDatabase()

    function stroeDatabase() {
        $("button.btnInblock").bind("click", function() {
            localStorage.setItem("dataBaseName", $(this).parents("div.col-md-3").attr("data-baseName"));
            localStorage.setItem("BGC", $(this).parents("div.blockBC").attr("class"));
            window.location.href = "/untitled/databasePage";
        });
        $("a.AInNav").bind("click", function() {
            localStorage.setItem("dataBaseName", $(this).attr("navName"));
            localStorage.setItem("BGC", $(this).attr("ABGC"));
        })
    }

    function getProgressData() {
        getDatabase();
        $.ajax({
            type: "GET",
            url: "http://" + IPaddress + ":8000/untitled/sayhello/",
            dataType: "json",
            success: function(response) {
                    var countMark = 0;
                    for (var strJ = 0; response[strJ] != undefined; strJ++) { //对于response中的每一项

                        var pro = "";
                        var proGressj = response[strJ].count_now / response[strJ].count; //获取检测进度
                        var proPercentj = Number(proGressj * 100).toFixed(); //将检测进度化为百分数
                        proPercentj += "%";
                        var title = "DataBase:{0}, Method:{1}, Author:{2}";
                        var titleNew = title.format(response[strJ].data_set, response[strJ].method, response[strJ].Author);

                        if (proGressj != 1) { //如果检测进度没有达到100%
                            var proGressTitle = '<h6 h6Id="{0}">' + titleNew + '</h6>' + '<div class="progress proggressNotFull" > ' + '<div class="progress-bar progress-bar-warning" role="progressbar "aria-valuemin="0" aria-valuemax="100" proId="{1}" dataBase="{2}">' + '</div>' + '</div>';
                            var proGressTitleNew = proGressTitle.format(response[strJ].id, response[strJ].id, response[strJ].data_set);
                            pro = pro + proGressTitleNew;
                            if ($("div.proggressNotFull").length == 0) { //如果不存在未完成的进度条
                                $("div.probarNotFull").append(pro);
                                var $noProgress = $("div.progress-bar-warning:first");
                                $noProgress.attr("aria-valuenow", proGressj);
                                $noProgress.attr("style", "width:" + proPercentj);
                                $noProgress.text(proPercentj);
                                continue;
                            } else { //如果已经有未完成的进度条，则在最后一个进度条之后机上pro
                                $("div.proggressNotFull:last").after(pro);

                            }
                            var afterFormat = "div.progress-bar-warning:eq({0})".format(strJ - countMark);
                            var $proBarJ = $(afterFormat);
                            $proBarJ.attr("aria-valuenow", proGressj);
                            $proBarJ.attr("style", "width:" + proPercentj);
                            $proBarJ.text(proPercentj);
                        } else { //如果检测进度达到100%
                            countMark++;
                            switchDatabase(response[strJ].data_set, titleNew, response[strJ].id);
                        }

                    } //for循环
                    stroeDatabase()
                } //success
        }); //ajax
    } //function getProgressData()

    getProgressData();

    function resfreshPage() {
        console.log(1111);
        refreshDatabase();
        $.ajax({
            type: "GET",
            url: "http://" + IPaddress + ":8000/untitled/sayhello/",
            dataType: "json",
            success: function(response) {
                    var countMark = 0;
                    for (var strJ = 0; response[strJ] != undefined; strJ++) {
                        var titleRefresh = "DtaBase:{0}, Method:{1}, Author:{2}";
                        var titleNewRefresh = titleRefresh.format(response[strJ].data_set, response[strJ].method, response[strJ].Author);

                        var pro = "";
                        var proGressj = response[strJ].count_now / response[strJ].count; //获取检测进度
                        var proPercentj = Number(proGressj * 100).toFixed(); //将检测进度化为百分数
                        proPercentj += "%";

                        //查看每个进度条是否真的已经检测完毕，若为检测完，则从已检测完的进度条中移除
                        $("div.progress-bar-success").each(function() {
                                var idid = $(this).attr("fullProID");
                                for (var m = 0; response[m] != undefined; m++) {
                                    if (idid == response[m].id) {
                                        if ((response[m].count_now / response[m].count) != 1) {
                                            $(this).parents(".progressA").remove();
                                        }
                                    }
                                }

                            })
                            //选择对应Id的进度条及其标题
                        var pageProNew = "[proId='{0}']".format(response[strJ].id);
                        var h6ProNew = "[h6Id='{0}']".format(response[strJ].id);

                        if ($(pageProNew).length != 0) { //如果此id对应的进度条已经存在于页面中
                            if (proGressj != 1) { //如果进度不到100%,则更新进度条数值
                                $(pageProNew).attr("aria-valuenow", proGressj);
                                $(pageProNew).attr("style", "width:" + proPercentj);
                                $(pageProNew).text(proPercentj);
                            } else { //如果进度条到达100%，则归类到对应Database
                                //将已完成的进度条从检测完成进度中移除
                                $(pageProNew).parent().remove();
                                $(h6ProNew).remove();
                                countMark++;
                                switchDatabase(response[strJ].data_set, titleNewRefresh, response[strJ].id);

                            }
                        } else { ////如果此id对应的进度条是在更新的时候新加入的,则跟function getProgressData()一样吧进度条加入页面中
                            if (proGressj != 1) {
                                var proGressTitle = '<h6 h6Id="{0}">' + titleNewRefresh + '</h6>' + '<div class="progress proggressNotFull" > ' + '<div class="progress-bar progress-bar-warning" role="progressbar "aria-valuemin="0" aria-valuemax="100" proId="{1}" dataBase="{2}">' + '</div>' + '</div>';
                                var proGressTitleNew = proGressTitle.format(response[strJ].id, response[strJ].id, response[strJ].data_set);
                                pro = pro + proGressTitleNew;

                                if ($("div.proggressNotFull").length == 0) {
                                    $("div.probarNotFull").append(pro);
                                    var $noProgress = $("div.progress-bar-warning:first");
                                    $noProgress.attr("aria-valuenow", proGressj);
                                    $noProgress.attr("style", "width:" + proPercentj);
                                    $noProgress.text(proPercentj);
                                    continue;
                                } else {
                                    $("div.proggressNotFull:last").after(pro);

                                }
                                var afterFormat = "div.progress-bar-warning:eq({0})".format(strJ - countMark);
                                var $proBarJ = $(afterFormat);
                                $proBarJ.attr("aria-valuenow", proGressj);
                                $proBarJ.attr("style", "width:" + proPercentj);
                                $proBarJ.text(proPercentj);

                            } else {
                                countMark++;
                                //根据进度条对应的数据库名字选择结束后去哪个模块
                                switchDatabase(response[strJ].data_set, titleNewRefresh, response[strJ].id);
                            }
                        } //最外层else
                    } //for
                    stroeDatabase()
                } //success
        }); //ajax
    } //function resfreshPage() 

    //将点击的按钮所对应的database存储到localStorage

    setInterval(function() {
        resfreshPage();
    }, 4000);

});