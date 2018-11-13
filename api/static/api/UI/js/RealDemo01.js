$(document).ready(function() {

    /* function getTableData() {
          $.ajax({
              type: "GET",
              url: "http://192.168.199.75:8000/sayhello/",
              dataType: "json",
              success: function(response) {
                  console.log(response);
                  var res = JSON.parse(response);
                  var html = "";
                  for (var i = 0;; i++) {
                      var $targetTbody = $("table.dataTable tbody");
                      var $oldlast = $targetTbody.children("tr:last"); //找到表格的最后一行，在此行后面增加数据
                      var strI = i + "";
                      var trID = res[strI].id;
                      //创建表格的一列，这列的内容是json数据一项的内容
                      html = html + '<tr class="trID">';
                      html = html + '<td>' + trID + '</td>';
                      html = html + '<td>' + res[strI].name + '</td>';
                      html = html + '<td>' + res[strI].method + '</td>';
                      html = html + '<td>' + res[strI].MacroPresison + '</td>';
                      html = html + '<td>' + res[strI].MacroRecall + '</td>';
                      html = html + '<td>' + res[strI].MacroF1 + '</td>';
                      html = html + '<td>' + res[strI].MacromAP + '</td>';
                      html = html + '<td>' + res[strI].MacroNDCG + '</td>';
                      html = html + '<td>' + res[strI].MicroPresion + '</td>';
                      html = html + '<td>' + res[strI].MicroRecall + '</td>';
                      html = html + '<td>' + res[strI].MicroF1 + '</td>';
                      html = html + '<td>' + res[strI].MicromAP + '</td>';
                      html = html + '<td>' + res[strI].MicroNDCG + '</td>';
                      html = html + '<td>' + res[strI].Author + '</td>';
                      html = html + '<td>' + res[strI].BeginTime + '</td>';
                      html = html + '<td>' + res[strI].State + '</td>';
                      html = html + '<td>' + res[strI].EndTime + '</td>';
                      html = html + '<button type="button" class="btn btn-primary btn-intable" data-clicked="false" imgSource="">查看详情</button>' + '</tr>';
                      $oldlast.after(html);
                      var source = res[strI].PR_curve;
                      $("button.btn-intable:last").attr("imgSource", "source");
                  }
              }
          })*/


    $("button.btn-intable").on('click', function() {
        if (!$(this).attr('data-clicked') || $(this).attr('data-clicked') === 'false') {
            $(this).attr('data-clicked', 'true');
        }
        var modal = document.getElementById('myModal');
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        modal.style.display = "block";
        modalImg.src = $(this).attr("imgSource");
        //modalImg.src = "Flat-UI-master/dist/images/exaple-image.jpg";

        var span = document.getElementsByClassName("close")[0];

        // 当点击 (x), 关闭弹窗
        span.onclick = function() {
            modal.style.display = "none";
        }
    })

    $("button.btn-inModal").on("click", function() {
        window.location.href = "detailPage.html";
    })






    //点击按钮跳转页面，并且修改data-clicked属性为true
    //window.location.href = "detailPage.html";




    //遍历按钮，找到被点击的按钮并且将该按钮对应的Id缓存
    $("button.btn-intable").each(function() {
        if ($(this).attr("data-clicked") == true) {
            var $curTr = $(this).parent("tr");
            var storageId = $curTr.attr("class");
            localStorage.setItem("id", "storageId");
        }
    })

    /*var $curButton = $newlast.children(".btn-intable:last");
                 $curButton.click(function(e) {
    
                     $(window).attr('href', '#')
                     e.preventDefault();
                 })*/


});