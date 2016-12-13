$(document).ready(function() {
    var page = 0;
    var list = [
                "./agree",
                "./reportPreview",
                "./selfintroducePreview",
                "./studyplanPreview",
                "./nosmokePreview",
                "./wowPreview"
                ];
    var idList = [
                  "agree",
                  "report",
                  "selfintroduce",
                  "studyplan",
                  "nosmoke",
                  "wow"
                  ];
      $("#prev").on("click", function() {
          if(page > 0)
          {
            page--;
            $("iframe").attr("src", list[page]);
            
            $("iframe").attr("id", idList[page]);
            $("#printbt").attr("onclick", "printFrame('"+idList[page]+"')");
            console.info("Current page: ", list[page], page);
          }
          else
        	  alert("처음 페이지입니다.");
      });

      $("#next").on("click",function() {
        if(page < list.length - 1)
        {
        	++page;
            $("iframe").attr("src", list[page]);
            $("iframe").attr("id", idList[page]);
            $("#printbt").attr("onclick", "printFrame('"+idList[page]+"')");
            console.info("Current page: ", list[page], page);
        }
        else
        	alert("마지막 페이지입니다.");
      });
    });
