$(document).ready(function() {


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

    var resArray = [];

    function getPageData() {


        $.ajax({
            type: "GET",
            url: "http://localhost:8000/untitled/sayhello/",
            // headers: { Accept: "application/json; charset=utf-8" },
            dataType: "json",
            success: function(res) {
                resArray[0] = res;
                var countMark = 0;

                for (var strJ = 0; res[strJ] != undefined; strJ++) {
                    var pro = "";
                    var proGressj = res[strJ].count_now / res[strJ].count; //获取检测进度
                    var proPercentj = Number(proGressj * 100).toFixed(); //将检测进度化为百分数
                    proPercentj += "%";



                    if (proGressj != 1) {
                        var title = "{0}检测中...";
                        var proTitle = title.format(res[strJ].name);
                        // console.log(proTitle);
                        var proGressTitle = '<h6 h6Id="{0}">' + proTitle + '</h6>' + '<div class="progress" > ' + '<div class="progress-bar progress-bar-warning" role="progressbar "aria-valuemin="0" aria-valuemax="100" proId="{1}">' + '</div>' + '</div>';
                        var proGressTitleNew = proGressTitle.format(res[strJ].id, res[strJ].id);
                        pro = pro + proGressTitleNew;
                        if ($("div.progress").length == 0) {
                            $("div.ProBar").after(pro);
                            var $noProgress = $("div.progress-bar:first");
                            $noProgress.attr("aria-valuenow", proGressj);
                            $noProgress.attr("style", "width:" + proPercentj);
                            $noProgress.text(proPercentj);
                            continue;
                        } else {
                            $("div.progress:last").after(pro);
                        }

                        var beforeFormat = "div.progress-bar:eq({0})";
                        var afterFormat = beforeFormat.format(strJ - countMark);
                        var $proBarJ = $(afterFormat);

                        $proBarJ.attr("aria-valuenow", proGressj);
                        $proBarJ.attr("style", "width:" + proPercentj);
                        $proBarJ.text(proPercentj);

                        // var $lastTwo = $("div.progress-bar:eq(-2)"); //倒数第二个进度条元素
                        // var $lastPro = $("div.progress-bar:last"); //最后一个进度条元素

                        // //进度条属性按照warning, success, info的顺序交替
                        // if ($lastTwo.attr("class") == "progress-bar progress-bar-warning") {
                        //     $lastPro.attr("class", "progress-bar progress-bar-success");
                        // }
                        // if ($lastTwo.attr("class") == "progress-bar progress-bar-success") {
                        //     $lastPro.attr("class", "progress-bar progress-bar-info");
                        // }
                        // if ($lastTwo.attr("class") == "progress-bar progress-bar-info") {
                        //     $lastPro.attr("class", "progress-bar progress-bar-warning");
                        // }
                        // if ($lastTwo.length == 0) {
                        //     $lastPro.attr("class", "progress-bar progress-bar-warning");
                        // }

                    } else {
                        var mulSelect = "";
                        var mutilTextOld = '<option optId={0}>' + '"id":{1}, "Method":"{2}", "Author":"{3}"' + '</option>';
                        var mutilTextNew = mutilTextOld.format(res[strJ].id, res[strJ].id, res[strJ].method, res[strJ].Author);

                        mulSelect += mutilTextNew;
                        $("select").append(mulSelect);
                        countMark++;
                    }


                }



                //表格部分
                for (var strJ = 0; res[strJ] != undefined; strJ++) {
                    var html = "";
                    var $targetTbody = $("table.dataTable tbody");


                    var trID = res[strJ].id;
                    var trBeforFormat = "<tr id='{0}'>"
                    var trAfterFormat = trBeforFormat.format(trID);
                    //创建表格的一列，这列的内容是json数据一项的内容
                    html = html + trAfterFormat;
                    html = html + '<td>' + trID + '</td>';
                    html = html + '<td>' + res[strJ].name + '</td>';
                    html = html + '<td>' + res[strJ].method + '</td>';
                    html = html + '<td>' + res[strJ].MacroPresison + '</td>';
                    html = html + '<td>' + res[strJ].MacroRecall + '</td>';
                    html = html + '<td>' + res[strJ].MacroF1 + '</td>';
                    html = html + '<td>' + res[strJ].MacromAP + '</td>';
                    html = html + '<td>' + res[strJ].MacroNDCG + '</td>';
                    html = html + '<td>' + res[strJ].MicroPresion + '</td>';
                    html = html + '<td>' + res[strJ].MicroRecall + '</td>';
                    html = html + '<td>' + res[strJ].MicroF1 + '</td>';
                    html = html + '<td>' + res[strJ].MicromAP + '</td>';
                    html = html + '<td>' + res[strJ].MicroNDCG + '</td>';
                    html = html + '<td>' + res[strJ].Author + '</td>';
                    html = html + '<td>' + res[strJ].BeginTime + '</td>';
                    html = html + '<td>' + res[strJ].State + '</td>';
                    html = html + '<td>' + res[strJ].EndTime + '</td>';
                    html = html + '<td>' + '<button type="button" class="btn btn-primary btn-intable" data-clicked="false" imgSource="">' + "查看详情" + '</button>' + '</td>';
                    html = html + '</tr>';
                    // console.log(html);

                    if ($("tr").length == 0) {
                        $targetTbody.after(html);
                    } else {
                        $("tr:last").after(html);
                    }

                    var source = res[strJ].PR_curve;

                    $("button.btn-intable:last").attr("imgSource", source);
                    // console.log($("button.btn-intable:last").attr("imgSource"));

                    $("button.btn-intable").on('click', function() {
                        var modal = document.getElementById('myModal01');
                        var modalImg = document.getElementById("img01");

                        modal.style.display = "block";
                        modalImg.src = $(this).attr("imgSource");
                        var span = document.getElementsByClassName("close")[0];
                        // 当点击 (x), 关闭弹窗
                        span.onclick = function() {
                            modal.style.display = "none";
                        }

                        if (!$(this).attr('data-clicked') || $(this).attr('data-clicked') === 'false') {
                            $(this).attr('data-clicked', 'true');
                        }
                        setTimeout(() => {
                            if ($(this).attr('data-clicked', 'true')) {
                                var PR_curvescr = $(this).attr("imgSource");

                                localStorage.setItem("PR_curve_scr", PR_curvescr);

                                $(this).attr('data-clicked', 'false');
                            }

                        }, 1000);

                    })


                }


            }
        })
    }

    function refreshBarData() {
        $.ajax({
            type: "GET",
            url: "http://192.168.199.161:8000/untitled/sayhello/",
            // headers: { Accept: "application/json; charset=utf-8" },
            dataType: "json",
            success: function(res) {

                var countMark = 0;

                resArray[1] = res;

                for (var strJ = 0; res[strJ] != undefined; strJ++) {
                    var pro = "";
                    var proGressj = res[strJ].count_now / res[strJ].count; //获取检测进度
                    var proPercentj = Number(proGressj * 100).toFixed(); //将检测进度化为百分数
                    proPercentj += "%";

                    $("option").each(function() {
                        var idid = $(this).attr("optId");
                        // console.log(res[idid-1].count_now / res[idid-1].count);
                        if ((res[idid-1].count_now / res[idid-1].count) != 1) {
                            $(this).remove();
                        }
                    })

                    var pagePro = "[proId='{0}']";
                    var pageProNew = pagePro.format(res[strJ].id);
                    var h6Pro = "[h6Id='{0}']";
                    var h6ProNew = h6Pro.format(res[strJ].id);
                    console.log(pageProNew);
                    if ($(pageProNew).length != 0) {
                        if (proGressj != 1) {
                            $(pageProNew).attr("aria-valuenow", proGressj);
                            $(pageProNew).attr("style", "width:" + proPercentj);
                            $(pageProNew).text(proPercentj);
                        } else {
                            $(pageProNew).parent().remove();
                            $(h6ProNew).remove();
                            var pageOpt = "[optId='{0}']";
                            var pageOptNew = pageOpt.format(res[strJ].id);

                            if ($(pageOptNew).length == 0) {
                                var mulSelect = "";
                                var mutilTextOld = '<option optId={0}>' + '"id":{1}, "Method":"{2}", "Author":"{3}"' + '</option>';
                                var mutilTextNew = mutilTextOld.format(res[strJ].id, res[strJ].id, res[strJ].method, res[strJ].Author);
                                mulSelect += mutilTextNew;
                                $("select").append(mulSelect);
                                countMark++;
                            }
                        }
                    } //if($(pageProNew).length!=0)
                    else {
                        if (proGressj != 1) {
                            var title = "{0}检测中...";
                            var proTitle = title.format(res[strJ].name);
                            // console.log(proTitle);
                            var proGressTitle = '<h6 h6Id="{0}">' + proTitle + '</h6>' + '<div class="progress" > ' + '<div class="progress-bar progress-bar-warning" role="progressbar "aria-valuemin="0" aria-valuemax="100" proId="{1}">' + '</div>' + '</div>';
                            var proGressTitleNew = proGressTitle.format(res[strJ].id, res[strJ].id);
                            pro = pro + proGressTitleNew;
                            if ($("div.progress").length == 0) {
                                $("div.ProBar").after(pro);
                                var $noProgress = $("div.progress-bar:first");
                                $noProgress.attr("aria-valuenow", proGressj);
                                $noProgress.attr("style", "width:" + proPercentj);
                                $noProgress.text(proPercentj);
                                continue;
                            } else {
                                $("div.progress:last").after(pro);
                            }

                            var beforeFormat = "div.progress-bar:eq({0})";
                            var afterFormat = beforeFormat.format(strJ - countMark);
                            var $proBarJ = $(afterFormat);

                            $proBarJ.attr("aria-valuenow", proGressj);
                            $proBarJ.attr("style", "width:" + proPercentj);
                            $proBarJ.text(proPercentj);
                        } else {
                            var pageOpt = "[optId='{0}']";
                            var pageOptNew = pageOpt.format(res[strJ].id);

                            if ($(pageOptNew).length == 0) {
                                var mulSelect = "";
                                var mutilTextOld = '<option optId={0}>' + '"id":{1}, "Method":"{2}", "Author":"{3}"' + '</option>';
                                var mutilTextNew = mutilTextOld.format(res[strJ].id, res[strJ].id, res[strJ].method, res[strJ].Author);
                                mulSelect += mutilTextNew;
                                $("select").append(mulSelect);
                                countMark++;
                            }
                        }

                    } //else
                }
            }
        })
    }

    function refreshTable() {
        $.ajax({
            type: "GET",
            url: "http://192.168.199.161:8000/untitled/sayhello/",
            // headers: { Accept: "application/json; charset=utf-8" },
            dataType: "json",
            success: function(res) {
                for (var strJ = 0; res[strJ] != undefined; strJ++) {
                    var html = "";

                    var pageTr = "tr#{0}";
                    var pageTrNew = pageTr.format(res[strJ].id)
                    if ($(pageTrNew).length == 0) {
                        var $targetTbody = $("table.dataTable tbody");
                        var trID = res[strJ].id;
                        var trBeforFormat = "<tr id='{0}'>"
                        var trAfterFormat = trBeforFormat.format(trID);
                        //创建表格的一列，这列的内容是json数据一项的内容
                        html = html + trAfterFormat;
                        html = html + '<td>' + trID + '</td>';
                        html = html + '<td>' + res[strJ].name + '</td>';
                        html = html + '<td>' + res[strJ].method + '</td>';
                        html = html + '<td>' + res[strJ].MacroPresison + '</td>';
                        html = html + '<td>' + res[strJ].MacroRecall + '</td>';
                        html = html + '<td>' + res[strJ].MacroF1 + '</td>';
                        html = html + '<td>' + res[strJ].MacromAP + '</td>';
                        html = html + '<td>' + res[strJ].MacroNDCG + '</td>';
                        html = html + '<td>' + res[strJ].MicroPresion + '</td>';
                        html = html + '<td>' + res[strJ].MicroRecall + '</td>';
                        html = html + '<td>' + res[strJ].MicroF1 + '</td>';
                        html = html + '<td>' + res[strJ].MicromAP + '</td>';
                        html = html + '<td>' + res[strJ].MicroNDCG + '</td>';
                        html = html + '<td>' + res[strJ].Author + '</td>';
                        html = html + '<td>' + res[strJ].BeginTime + '</td>';
                        html = html + '<td>' + res[strJ].State + '</td>';
                        html = html + '<td>' + res[strJ].EndTime + '</td>';
                        html = html + '<td>' + '<button type="button" class="btn btn-primary btn-intable" data-clicked="false" imgSource="">' + "查看详情" + '</button>' + '</td>';
                        html = html + '</tr>';
                        // console.log(html);

                        if ($("tr").length == 0) {
                            $targetTbody.after(html);
                        } else {
                            $("tr:last").after(html);
                        }

                        var source = res[strJ].PR_curve;

                        $("button.btn-intable:last").attr("imgSource", source);
                        // console.log($("button.btn-intable:last").attr("imgSource"));

                        $("button.btn-intable").on('click', function() {
                            var modal = document.getElementById('myModal01');
                            var modalImg = document.getElementById("img01");

                            modal.style.display = "block";
                            modalImg.src = $(this).attr("imgSource");
                            var span = document.getElementsByClassName("close")[0];
                            // 当点击 (x), 关闭弹窗
                            span.onclick = function() {
                                modal.style.display = "none";
                            }

                            if (!$(this).attr('data-clicked') || $(this).attr('data-clicked') === 'false') {
                                $(this).attr('data-clicked', 'true');
                            }
                            setTimeout(() => {
                                if ($(this).attr('data-clicked', 'true')) {
                                    var PR_curvescr = $(this).attr("imgSource");

                                    localStorage.setItem("PR_curve_scr", PR_curvescr);

                                    $(this).attr('data-clicked', 'false');
                                }

                            }, 1000);

                        })
                    }
                }
            }
        })
    }
    getPageData();



    $("button.btn-inModal").on("click", function() {
        window.location.href = "detailPage.html";
    })



    $("button.reactBack").on('click', function() {
        $("div.tempo").remove();
        var transData = "";
        // console.log($("li.select2-search-choice:eq(0) div").text())
        var num = $("li.select2-search-choice").length;
        for (var ma = 0; ma < num; ma++) {
            var checkedMa = "li.select2-search-choice:eq({0}) div".format(ma);
            var keyBack = "{0}:".format(ma);
            if (num == 1) {
                transData = transData + "{" + "\"" + "{0}".format(ma) + "\"" + ":{" + $(checkedMa).text() + "}}";
            } else {
                if (ma == 0) {
                    transData = transData + "{" + "\"" + "{0}".format(ma) + "\"" + ":{" + $(checkedMa).text() + "},";
                } else
                if (ma != num - 1) {
                    transData = transData + "\"" + "{0}".format(ma) + "\"" + ":{" + $(checkedMa).text() + "},";
                } else { transData = transData + "\"" + "{0}".format(ma) + "\"" + ":{" + $(checkedMa).text() + "}}"; }
            }

        }
        console.log(transData);

        $.ajax({
            type: "POST",
            url: "http://192.168.199.161:8000/untitled/comparedetail/",
            data: transData,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(res) {

                console.log(res);
                // var num = 0;
                // for (var i = 0; i < 20; i++) {
                //     if (res[i] == undefined) { continue; }
                //     console.log(res[i]);
                //     num++;
                //     if (num % 2 != 0) {
                //         var leftAddRow = '<div class="row tempo" ><img class="modal-content01" id="img{0}" src=""></img></div>';
                //         var leftAddROwNew = leftAddRow.format(i + 1);
                //         $("#rowLeft").append(leftAddROwNew);
                //         var ModalPic = "img{0}";
                //         var ModalPicNew = ModalPic.format(i + 1);
                //         var modalImg = document.getElementById(ModalPicNew);
                //         modalImg.src = res[i];
                //     } else {
                //         var rightAddRow = '<div class="row tempo" ><img class="modal-content01" id="img{0}" src=""></img></div>';
                //         var rightAddROwNew = rightAddRow.format(i + 1);
                //         $("#rowRight").append(rightAddROwNew);
                //         var ModalPic = "img{0}";
                //         var ModalPicNew = ModalPic.format(i + 1);
                //         var modalImg = document.getElementById(ModalPicNew);
                //         modalImg.src = res[i];
                //     }


                    var modal = document.getElementById('myModal02');

                    var modalImg = document.getElementById("img02");
                    modalImg.src=res[0];
                    modal.style.display = "block";
                    var captionText = document.getElementById("caption01");
                    modal.style.display = "block";



                    // var span = document.getElementsByClassName("close")[0];




                // }
                // 当点击 (x), 关闭弹窗
                $(".close:eq(0)").on('click', function() {
                    modal.style.display = "none";

                })


            }
        });
    })

    setInterval(function() {
        // $("tr:gt(1)").remove();
        // $("h6").remove();
        // $("div.progress").remove();
        // $("option").remove();
        refreshBarData();
        refreshTable();


    }, 2000)

});