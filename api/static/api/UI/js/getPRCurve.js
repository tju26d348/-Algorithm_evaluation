$(document).ready(function() {
    var imgSrc = localStorage.getItem("PR_curve_scr");
    console.log(imgSrc);
    //var num = localStorage.getItem("id");
    if ($("img.mainImg").attr("src") == "") {
        $("img.mainImg").attr("src", imgSrc);
    }
    localStorage.clear();

    // $.ajax({
    //     type: "GET",
    //     url: "http://192.168.199.75:8000/sayhello/",
    //     dataType: "json",
    //     success: function(response) {
    //         var strNum = num + "";
    //         var res = JSON.parse(response);
    //         var picUrl = res[strNum].PR_curve;

    //         $("img.mainImg").attr("src", "picUrl");

    //     }
    // });
});