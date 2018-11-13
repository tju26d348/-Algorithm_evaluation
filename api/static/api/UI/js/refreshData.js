$(document).ready(function() {

    //点击查看详情按钮出现大图


    function getBarData() {
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

        var res = {
            "0": {
                "id": 1,
                "name": "ETH",
                "method": "CNN",
                "MacroPresison": "0.953",
                "MacroRecall": "0.781",
                "MacroF1": "0.336",
                "MacromAP": "0.564",
                "MacroNDCG": "2.432",
                "MicroPresion": "0.542",
                "MicroRecall": "0.666",
                "MicroF1": "0.784",
                "MicromAP": "0.990",
                "MicroNDCG": "2.333",
                "Author": "yanyan",
                "BeginTime": "2018-10-24 14:02:08",
                "State": 1,
                "EndTime": "2018-10-24 00:00:00",
                "PR_curve": "img/1.png",
                "count": "100",
                "count_now": "100"
            },
            "1": {
                "id": 2,
                "name": "SHREC",
                "method": "MVCNN",
                "MacroPresison": "0.746",
                "MacroRecall": "0.893",
                "MacroF1": "0.342",
                "MacromAP": "0.563",
                "MacroNDCG": "3.452",
                "MicroPresion": "0.253",
                "MicroRecall": "0.687",
                "MicroF1": "0.7234",
                "MicromAP": "0.988",
                "MicroNDCG": "2.452",
                "Author": "dinghai",
                "BeginTime": "2018-10-24 14:02:08",
                "State": 0,
                "EndTime": "2018-10-24 00:00:00",
                "PR_curve": "img/2.png",
                "count": "70",
                "count_now": "70"
            },
            "2": {
                "id": 3,
                "name": "ETH",
                "method": "CNN",
                "MacroPresison": "0.953",
                "MacroRecall": "0.781",
                "MacroF1": "0.336",
                "MacromAP": "0.564",
                "MacroNDCG": "2.432",
                "MicroPresion": "0.542",
                "MicroRecall": "0.666",
                "MicroF1": "0.784",
                "MicromAP": "0.990",
                "MicroNDCG": "2.333",
                "Author": "yanyan",
                "BeginTime": "2018-10-24 14:02:08",
                "State": 1,
                "EndTime": "2018-10-24 00:00:00",
                "PR_curve": "img/3.png",
                "count": "100",
                "count_now": "80"
            },
            "3": {
                "id": 4,
                "name": "SHREC",
                "method": "MVCNN",
                "MacroPresison": "0.746",
                "MacroRecall": "0.893",
                "MacroF1": "0.342",
                "MacromAP": "0.563",
                "MacroNDCG": "3.452",
                "MicroPresion": "0.253",
                "MicroRecall": "0.687",
                "MicroF1": "0.7234",
                "MicromAP": "0.988",
                "MicroNDCG": "2.452",
                "Author": "dinghai02",
                "BeginTime": "2018-10-24 14:02:08",
                "State": 0,
                "EndTime": "2018-10-24 00:00:00",
                "PR_curve": "img/4.jpg",
                "count": "70",
                "count_now": "50"
            },
            "4": {
                "id": 5,
                "name": "ETH",
                "method": "CNN",
                "MacroPresison": "0.953",
                "MacroRecall": "0.781",
                "MacroF1": "0.336",
                "MacromAP": "0.564",
                "MacroNDCG": "2.432",
                "MicroPresion": "0.542",
                "MicroRecall": "0.666",
                "MicroF1": "0.784",
                "MicromAP": "0.990",
                "MicroNDCG": "2.333",
                "Author": "yanyan",
                "BeginTime": "2018-10-24 14:02:08",
                "State": 1,
                "EndTime": "2018-10-24 00:00:00",
                "PR_curve": "img/5.jpg",
                "count": "100",
                "count_now": "100"
            },
            "5": {
                "id": 6,
                "name": "SHREC",
                "method": "MVCNN",
                "MacroPresison": "0.746",
                "MacroRecall": "0.893",
                "MacroF1": "0.342",
                "MacromAP": "0.563",
                "MacroNDCG": "3.452",
                "MicroPresion": "0.253",
                "MicroRecall": "0.687",
                "MicroF1": "0.7234",
                "MicromAP": "0.988",
                "MicroNDCG": "2.452",
                "Author": "dinghai",
                "BeginTime": "2018-10-24 14:02:08",
                "State": 0,
                "EndTime": "2018-10-24 00:00:00",
                "PR_curve": "img/6.jpg",
                "count": "70",
                "count_now": "68"
            }
        };

        // for (var strJ = 0; res[strJ] != undefined; strJ++) {
        //     var pro = "";

        //     console.log(res[strJ].count_now);
        //     var proGressj = res[strJ].count_now / res[strJ].count; //获取检测进度
        //     var proPercentj = Number(proGressj * 100).toFixed(); //将检测进度化为百分数

        //     proPercentj += "%";

        //     if ($("div.progress").length == 0) {
        //         var $noProgressBar = $("div.ProBar");
        //         var title = "{0}检测中";
        //         var proTitle = title.format(res[0].name);
        //         console.log(proTitle);
        //         pro = pro + '<h6>' + proTitle + '</h6>' + '<div class="progress"> ' + '<div class="progress-bar progress-bar-warning" role="progressbar "aria-valuemin="0" aria-valuemax="100">' + '</div>' + '</div>';
        //         $noProgressBar.after(pro);
        //         var proGress0 = res[0].count_now / res[0].count;
        //         var proPercent0 = Number(proGress0 * 100).toFixed(); //将检测进度化为百分数
        //         proPercent0 += "%";
        //         var $noProgress = $("div.progress-bar:first");
        //         $noProgress.attr("aria-valuenow", proGress0);
        //         $noProgress.attr("style", "width:" + proPercent0);
        //         $noProgress.text(proPercent0);
        //         console.log($noProgress.attr("style"));;
        //         continue;
        //     }

        //     if (proGressj != 1) {
        //         var title = "{0}检测中...";
        //         var proTitle = title.format(res[strJ].name);
        //         console.log(proTitle);
        //         var proGressTitle = '<h6>' + proTitle + '</h6>' + '<div class="progress"> ' + '<div class="progress-bar" role="progressbar "aria-valuemin="0" aria-valuemax="100">' + '</div>' + '</div>';
        //         pro = pro + proGressTitle;
        //         $("div.progress:last").after(pro);

        //         var beforeFormat = "div.progress-bar:eq({0})";
        //         var afterFormat = beforeFormat.format(strJ);
        //         var $proBarJ = $(afterFormat);
        //         $proBarJ.attr("aria-valuenow", proGressj);

        //         $proBarJ.attr("style", "width:" + proPercentj);
        //         console.log($proBarJ.attr("style"));
        //         $proBarJ.text(proPercentj);

        //         var $lastTwo = $("div.progress-bar:eq(-2)"); //倒数第二个进度条元素
        //         var $lastPro = $("div.progress-bar:last"); //最后一个进度条元素

        //         //进度条属性按照warning, success, info的顺序交替
        //         if ($lastTwo.attr("class") == "progress-bar progress-bar-warning") {
        //             $lastPro.attr("class", "progress-bar progress-bar-success");
        //         }
        //         if ($lastTwo.attr("class") == "progress-bar progress-bar-success") {
        //             $lastPro.attr("class", "progress-bar progress-bar-info");
        //         }
        //         if ($lastTwo.attr("class") == "progress-bar progress-bar-info") {
        //             $lastPro.attr("class", "progress-bar progress-bar-warning");
        //         }
        //         if ($lastTwo.length == 0) {
        //             $lastPro.attr("class", "progress-bar progress-bar-warning");
        //         }

        //     } else {
        //         var mulSelect = "";
        //         var mutilTextOld = '<option>' + '"id":{0}, "Method":"{1}", "Author":"{2}"' + '</option>';
        //         var mutilTextNew = mutilTextOld.format(res[strJ].id, res[strJ].method, res[strJ].Author);

        //         mulSelect += mutilTextNew;
        //         $("select").append(mulSelect);
        //     }


        //     // if(res[strJ].State==1)


        // }
        var countMark = 0;
        for (var strJ = 0; res[strJ] != undefined; strJ++) {
            var pro = "";

            console.log(res[strJ].count_now);
            var proGressj = res[strJ].count_now / res[strJ].count; //获取检测进度
            var proPercentj = Number(proGressj * 100).toFixed(); //将检测进度化为百分数
            // var proGress0 = res[0].count_now / res[0].count;
            // var proPercent0 = Number(proGress0 * 100).toFixed(); //将检测进度化为百分数
            // proPercent0 += "%";

            proPercentj += "%";

            // if ($("div.progress").length == 0) {
            //     // if (proGress0 != 1) {
            //     var title = "{0}检测中";
            //     var proTitle = title.format(res[0].name);
            //     console.log(proTitle);
            //     pro = pro + '<h6>' + proTitle + '</h6>' + '<div class="progress"> ' + '<div class="progress-bar progress-bar-warning" role="progressbar "aria-valuemin="0" aria-valuemax="100">' + '</div>' + '</div>';
            //     var $noProgressBar = $("div.ProBar");
            //     $noProgressBar.after(pro);

            //     console.log($noProgress.attr("style"));;
            // } else {
            //     var mulSelect = "";
            //     var mutilTextOld = '<option>' + '"id":{0}, "Method":"{1}", "Author":"{2}"' + '</option>';
            //     var mutilTextNew = mutilTextOld.format(res[0].id, res[0].method, res[0].Author);

            //     mulSelect += mutilTextNew;
            //     $("select").append(mulSelect);
            // }
            // continue;
            // }

            if (proGressj != 1) {
                var title = "{0}检测中...";
                var proTitle = title.format(res[strJ].name);
                console.log(proTitle);

                if ($("div.progress").length == 0) {
                    var proGressTitle = '<h6>' + proTitle + '</h6>' + '<div class="progress"> ' + '<div class="progress-bar progress-bar-warning" role="progressbar "aria-valuemin="0" aria-valuemax="100">' + '</div>' + '</div>';
                    pro = pro + proGressTitle;
                    $("div.ProBar").after(pro);
                    var $noProgress = $("div.progress-bar:first");
                    $noProgress.attr("aria-valuenow", proGressj);
                    $noProgress.attr("style", "width:" + proPercentj);
                    $noProgress.text(proPercentj);
                    continue;
                } else {
                    var proGressTitle = '<h6>' + proTitle + '</h6>' + '<div class="progress"> ' + '<div class="progress-bar" role="progressbar "aria-valuemin="0" aria-valuemax="100">' + '</div>' + '</div>';
                    pro = pro + proGressTitle;
                    $("div.progress:last").after(pro);
                }

                var beforeFormat = "div.progress-bar:eq({0})";
                var afterFormat = beforeFormat.format(strJ - countMark);
                var $proBarJ = $(afterFormat);
                $proBarJ.attr("aria-valuenow", proGressj);

                $proBarJ.attr("style", "width:" + proPercentj);
                console.log($proBarJ.attr("style"));
                $proBarJ.text(proPercentj);

                var $lastTwo = $("div.progress-bar:eq(-2)"); //倒数第二个进度条元素
                var $lastPro = $("div.progress-bar:last"); //最后一个进度条元素

                //进度条属性按照warning, success, info的顺序交替
                if ($lastTwo.attr("class") == "progress-bar progress-bar-warning") {
                    $lastPro.attr("class", "progress-bar progress-bar-success");
                }
                if ($lastTwo.attr("class") == "progress-bar progress-bar-success") {
                    $lastPro.attr("class", "progress-bar progress-bar-info");
                }
                if ($lastTwo.attr("class") == "progress-bar progress-bar-info") {
                    $lastPro.attr("class", "progress-bar progress-bar-warning");
                }
                if ($lastTwo.length == 0) {
                    $lastPro.attr("class", "progress-bar progress-bar-warning");
                }

            } else {
                var mulSelect = "";
                var mutilTextOld = '<option>' + '"id":{0}, "Method":"{1}", "Author":"{2}"' + '</option>';
                var mutilTextNew = mutilTextOld.format(res[strJ].id, res[strJ].method, res[strJ].Author);

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
            console.log(trID);
            //创建表格的一列，这列的内容是json数据一项的内容
            html = html + '<tr class="trID">';
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
            console.log(html);

            if ($("tr").length == 0) {
                $targetTbody.after(html);
            } else {
                $("tr:last").after(html);
            }

            var source = res[strJ].PR_curve;
            $("button.btn-intable:last").attr("imgSource", source);

        }


        // if (proGressj == 1) {
        // $proBarJ.remove();

        // }


        $("button.btn-intable").on('click', function() {
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
            var modal = document.getElementById('myModal01');
            var modalImg = document.getElementById("img01");
            var captionText = document.getElementById("caption");
            modal.style.display = "block";
            modalImg.src = $(this).attr("imgSource");
            // modalImg.src = "Flat-UI-master/dist/images/exaple-image.jpg";

            var span = document.getElementsByClassName("close")[0];

            // 当点击 (x), 关闭弹窗
            span.onclick = function() {
                modal.style.display = "none";
            }
        })

        $("button.btn-inModal").on("click", function() {
            window.location.href = "detailPage.html";
        })







    }





    // $.ajax({
    //     type: "GET",
    //     url: "http://127.0.0.1:8080/Project_new/js/test.json",
    //     //url: "test.json",

    //     dataType: "json",
    //     success: function(response) {
    //         //后端传给前端的json数据，每一项中有name,即项目名称，和dataProgress，即上传进度，共有i项
    //         console.log(response);
    //         var html = "";
    //         var res = JSON.parse(response);

    //         var num = $("div.ProBar .progress").length; //进度条条数

    //         for (var j = 0; j < num; j++) {
    //             var strJ = j + ""; //将数字j转换为字符串"j"
    //             var proGressj = res[strJ].count_now / res[strJ].count; //获取检测进度
    //             var proPercentj = Number(proGressj * 100).toFixed(); //将检测进度化为百分数
    //             proPercentj += "%";

    //             var $proBarJ = $("div.ProBar .progress:eq(j) .progress-bar");


    //             $proBarJ.attr("aria-valuenow", "proGressj");
    //             $proBarJ.attr("style", "width:proPercentj");
    //             $proBarJ.text() = proPercentj;

    //             if (proGressj == 1) {
    //                 $proBarJ.remove();
    //                 var $targetTbody = $("table.dataTable tbody");
    //                 var $oldlast = $targetTbody.children("tr:last"); //找到表格的最后一行，在此行后面增加数据
    //                 var trID = res[strJ].id;
    //                 //创建表格的一列，这列的内容是json数据一项的内容
    //                 html = html + '<tr class="trID">';
    //                 html = html + '<td>' + trID + '</td>';
    //                 html = html + '<td>' + res[strJ].name + '</td>';
    //                 html = html + '<td>' + res[strJ].method + '</td>';
    //                 html = html + '<td>' + res[strJ].MacroPresison + '</td>';
    //                 html = html + '<td>' + res[strJ].MacroRecall + '</td>';
    //                 html = html + '<td>' + res[strJ].MacroF1 + '</td>';
    //                 html = html + '<td>' + res[strJ].MacromAP + '</td>';
    //                 html = html + '<td>' + res[strJ].MacroNDCG + '</td>';
    //                 html = html + '<td>' + res[strJ].MicroPresion + '</td>';
    //                 html = html + '<td>' + res[strJ].MicroRecall + '</td>';
    //                 html = html + '<td>' + res[strJ].MicroF1 + '</td>';
    //                 html = html + '<td>' + res[strJ].MicromAP + '</td>';
    //                 html = html + '<td>' + res[strJ].MicroNDCG + '</td>';
    //                 html = html + '<td>' + res[strJ].Author + '</td>';
    //                 html = html + '<td>' + res[strJ].BeginTime + '</td>';
    //                 html = html + '<td>' + res[strJ].State + '</td>';
    //                 html = html + '<td>' + res[strJ].EndTime + '</td>';
    //                 html = html + '<button type="button" class="btn btn-primary btn-intable" data-clicked="false" imgSource="">查看详情</button>' + '</tr>';
    //                 $oldlast.after(html);
    //                 var source = res[strJ].PR_curve;
    //                 $("button.btn-intable:last").attr("imgSource", "source");


    //             }





    //             //增加新的进度条
    //             var strNum = num + "";

    //             if (response[strNum].name != null) {
    //                 $("div.ProBar").append('<div class="progress"><div class="progress-bar" role="progressbar"  aria-valuemin="0" aria-valuemax="100"> </div></div>');

    //                 var $lastTwo = $("div.ProBar .progress:eq(-2) div"); //倒数第二个进度条元素
    //                 var $lastPro = $("div.ProBar .progress:last div"); //最后一个进度条元素

    //                 //进度条属性按照warning, success, info的顺序交替
    //                 if ($lastTwo.attr("class") == "progress-bar progress-bar-warning") {
    //                     $lastPro.attr("class", "progress-bar progress-bar-success");
    //                 }
    //                 if ($lastTwo.attr("class") == "progress-bar progress-bar-success") {
    //                     $lastPro.attr("class", "progress-bar progress-bar-info");
    //                 }
    //                 if ($lastTwo.attr("class") == "progress-bar progress-bar-info") {
    //                     $lastPro.attr("class", "progress-bar progress-bar-warning");
    //                 }
    //                 if ($lastTwo.length == 0) {
    //                     $lastPro.attr("class", "progress-bar progress-bar-warning");
    //                 }

    //                 var proGressNum = res[strNum].count_now / res[strNumJ].count;
    //                 var proPercentNum = Number(proGressNum * 100).toFixed(); //将上传进度化为百分数
    //                 proPercentNum += "%";

    //                 $lastPro.attr("aria-valuenow", "proGressNum");
    //                 $lastPro.attr("style", "width:proPercentNum");
    //                 $lastPro.text() = proPercentNum;
    //             }

    //         }


    //     }
    // });



    //点击按钮跳转页面，并且修改data-clicked属性为true
    //window.location.href = "detailPage.html";

    //遍历按钮，找到被点击的按钮并且将该按钮对应的Id缓存以及PR曲线缓存
    // $("button.btn-intable").each(function() {
    //     if ($(this).attr("data-clicked") == true) {
    //         var $curTr = $(this).parent("tr");
    //         var storageId = $curTr.attr("class");
    //         var PR_curvescr = $(this).attr(imgSource);
    //         localStorage.setItem("id", storageId);
    //         localStorage.setItem("PR_curve_scr", PR_curvescr);
    //     }
    // })


    window.setInterval(getBarData(), 2000); //定时刷新

    var rest = {
        0: "img/indigo.png",
        1: "img/indigo.png"
    }


    $("button.reactBack").on('click', function() {
        var transData = "";
        // console.log($("li.select2-search-choice:eq(0) div").text())
        var num = $("li.select2-search-choice").length;
        for (var ma = 0; ma < num; ma++) {
            var checkedMa = "li.select2-search-choice:eq({0}) div".format(ma);
            var keyBack = "{0}:".format(ma);
            if (ma != num - 1) {
                transData = transData + "\"" + "{0}".format(ma) + "\"" + ":{" + $(checkedMa).text() + "},";
            } else { transData = transData + "\"" + "{0}".format(ma) + "\"" + ":{" + $(checkedMa).text() + "}"; }


        }
        console.log(transData);



        for (var i = 0; rest[i] != undefined; i++) {
            console.log(rest[i]);
            var modal = document.getElementById('myModal02');
            var ModalPic = "img{0}";
            var ModalPicNew = ModalPic.format(i + 1);
            var modalImg = document.getElementById(ModalPicNew);

            var captionText = document.getElementById("caption01");
            modal.style.display = "block";


            modalImg.src = rest[i];
            var span = document.getElementsByClassName("close")[0];

            // 当点击 (x), 关闭弹窗
            span.onclick = function() {
                modal.style.display = "none";
            }
        }



    })


});