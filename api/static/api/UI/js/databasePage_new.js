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
    var dataBaseName = localStorage.getItem("dataBaseName"); //告知后端要传哪个数据库的数据
    var BGC = localStorage.getItem("BGC");
    switch (BGC) {
        case "blockDB01Top blockBC":
            {
                $("div.tableTitle01").css("background-color", "#63BCE5");
            }
            break;
        case "blockDB02Top blockBC":
            {
                $("div.tableTitle01").css("background-color", "#4B9FE1");
            }
            break;
        case "blockDB03Top blockBC":
            {
                $("div.tableTitle01").css("background-color", "#3778C2");
            }
            break;
        case "blockDB04Top blockBC":
            {
                $("div.tableTitle01").css("background-color", "#28559A");
            }
            break;
    }
    $("div.tableTitle01").append('<h4 class="tile-protitle"><img src="/static/api/UI/Flat-UI-master/docs/assets/images/icons/clipboard.svg" alt="Compas" class="tile-image-pro">Database {0}:数据表格</h4>'.format(dataBaseName));
    localStorage.clear();



    function tableWriting(arrayResponse, i) {
        var html = "";
        var $targetTbody = $("table.dataTable tbody");
        var trID = arrayResponse.id;
        var trBeforFormat = "<tr id='{0}'>"
        var trAfterFormat = trBeforFormat.format(trID);
        //创建表格的一列，这列的内容是json数据一项的内容
        html = html + trAfterFormat;
        html = html + '<td>' + i + '</td>';
        html = html + '<td>' + arrayResponse.name + '</td>';
        html = html + '<td>' + arrayResponse.method + '</td>';
        html = html + '<td>' + arrayResponse.MacroPresison + '</td>';
        html = html + '<td>' + arrayResponse.MacroRecall + '</td>';
        html = html + '<td>' + arrayResponse.MacroF1 + '</td>';
        html = html + '<td>' + arrayResponse.MacromAP + '</td>';
        html = html + '<td>' + arrayResponse.MacroNDCG + '</td>';
        html = html + '<td>' + arrayResponse.MicroPresion + '</td>';
        html = html + '<td>' + arrayResponse.MicroRecall + '</td>';
        html = html + '<td>' + arrayResponse.MicroF1 + '</td>';
        html = html + '<td>' + arrayResponse.MicromAP + '</td>';
        html = html + '<td>' + arrayResponse.MicroNDCG + '</td>';
        html = html + '<td>' + arrayResponse.Author + '</td>';
        html = html + '<td>' + arrayResponse.BeginTime + '</td>';
        html = html + '<td>' + arrayResponse.State + '</td>';
        html = html + '<td>' + arrayResponse.EndTime + '</td>';
        var btnIntable = '<button type="button" class="btn btn-primary btnPost" data-clicked="false" imgSource="" id={0} btnMethod="{1}" btnAuthor="{2}">';
        var btnIntableNew = btnIntable.format(trID, arrayResponse.method, arrayResponse.Author);
        html = html + '<td>' + btnIntableNew + "查看详情" + '</button>' + '</td>';
        var cheBOX = '<td> <label class = "checkbox" for = "checkbox{0}" ><input type = "checkbox" value = "" data-value="{1}" id = "checkbox{2}"  data-toggle = "checkbox" >选择此方法 </label> </td>';
        var cheBOXNew = cheBOX.format(trID, trID, trID);
        html = html + cheBOXNew;
        html = html + '</tr>';
        // console.log(html);
        if ($("tr").length == 0) {
            // $targetTbody.after(html);
            $targetTbody.after(html);
        } else {
            $("tr:last").after(html);
        }
    }

    function getTableData() {
        $.ajax({
            type: "POST",
            url: "http://" + IPaddress + ":8000/untitled/getdataset/",
            data: { "dataset": dataBaseName },
            // dataType: "json",
            success: function(res) {
                    console.log(res);
                    for (var strJ = 0; res[strJ] != undefined; strJ++) {
                        tableWriting(res[strJ], strJ + 1);
                        var source = res[strJ].PR_curve;
                        $("button.btn-intable:last").attr("imgSource", source);
                    } //for循环

                } //success
        }); //ajax

    } //getTableData()

    getTableData();


    function refreshTableData() {
        $("button.btnPost").unbind("click");
        $.ajax({
                type: "POST",
                url: "http://" + IPaddress + ":8000/untitled/getdataset/",
                data: { "dataset": dataBaseName },
                // headers: { Accept: "application/json; charset=utf-8" },
                // dataType: "json",
                success: function(res) {
                    console.log(res);
                    for (var strJ = 0; res[strJ] != undefined; strJ++) {
                        var pageTr = "tr#{0}";
                        var pageTrNew = pageTr.format(res[strJ].id)
                        if ($(pageTrNew).length == 0) { //若表格中不存在此Id对应的一行，则增加一行
                            tableWriting(res[strJ], strJ + 1);
                            var source = res[strJ].PR_curve;
                            $("button.btn-intable:last").attr("imgSource", source);
                        }
                    }
                }
            }) //ajax
            // $("button.btn-inModal").on("click", function() {
            //     window.location.href = "detailPage.html";
            // })
        $("button.btnPost").on("click", function() {
            var postData = "{" + "\"" + 0 + "\"" + ":{" + "\"id\":" + $(this).attr("id") + ", \"Method\":" + "\"{0}\"" + ", \"Author\":" + "\"{1}\"" + "}}";
            var postDataNew = postData.format($(this).attr("btnMethod"), $(this).attr("btnAuthor"));
            $.ajax({
                    type: "POST",
                    // url: "http://211.81.50.158:8000/untitled/comparedetail/",
                    url: "http://" + IPaddress + ":8000/untitled/comparedetail/",
                    data: postDataNew,
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function(res) {
                            console.log(res);
                            var modal = document.getElementById('myModal01');
                            var modalImg = document.getElementById("img01");
                            modal.style.display = "block";
                            modalImg.src = res;
                            var span = document.getElementsByClassName("close")[0];
                            // 当点击 (x), 关闭弹窗
                            span.onclick = function() {
                                modal.style.display = "none";
                                $.ajax({
                                    type: "POST",
                                    url: "http://" + IPaddress + ":8000/untitled/closeWindow/",
                                    // dataType: "json",
                                    success: function(response) {}
                                });
                            }
                        } //sunccess闭合
                }) //ajax
        })
    }

    $("button.btn-forSub").on("click", function() {
        var postData = "{";
        var count = 0;
        var num = $("input[type='checkbox']:checked").length;
        console.log(num);
        $("input[type='checkbox']:checked").each(function() {
            if (count == num - 1) {
                postData = postData + "\"" + count + "\"" + ":" + "{\"id\":" + "\"" + $(this).attr("data-value") + "\"" + "}";
            } else {
                postData = postData + "\"" + count + "\"" + ":" + "{\"id\":" + "\"" + $(this).attr("data-value") + "\"" + "}" + ",";
            }

            count++;
        })
        postData = postData + "}";
        console.log(postData);
        $.ajax({
            type: "POST",
            url: "http://" + IPaddress + ":8000/untitled/comparedetail/",
            data: postData,
            dataType: "json",
            success: function(res) {
                console.log(postData);
                var modal = document.getElementById('myModal02');

                var modalImg = document.getElementById("img02");
                modalImg.src = res;
                modal.style.display = "block";
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

    setTimeout(function() {
        refreshTableData();
    }, 500)

    setInterval(function() {
        refreshTableData();
    }, 20000)
});