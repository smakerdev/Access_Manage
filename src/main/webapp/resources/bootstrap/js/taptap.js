$(document).ready(function() {
      $("#rp").on("click",function () {
        $("iframe").attr("src","../html/report-print.html");
      });
      $("#sp").on("click",function () {
        $("iframe").attr("src","../html/preview_studyplan.html");
      });
      $("#si").on("click",function () {
        $("iframe").attr("src","../html/preview_selfintro.html");
      });
      $("#wo").on("click",function () {
        $("iframe").attr("src","../html/No_Smoke.htm ");
      });
    });
