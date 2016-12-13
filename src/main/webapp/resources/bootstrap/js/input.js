// Improved the readability by K.(wlzla000@naver.com) on September 24, 2016.

console.log("input.js has been loaded.");
$(document).ready(function() {	
	var img = document.getElementById("idPicture");
	
		if(img.src == "http://entrydsm.hs.kr/DSM/input"){
			return
		}else{
			if(img.naturalWidth/150>img.naturalHeight/200){
		        $("#idPicture").css("width",img.naturalWidth/(img.naturalWidth/150));
		        $("#idPicture").css("height","auto");
		    }else{
		        $("#idPicture").css("width",img.naturalWidth/(img.naturalWidth/150));
		    }
		}
	
		if($("#type").val() == 2)
		{
			$("#typeDetail").attr("style", "visibility: visible;");
		}
		
		$("#graduationType, #area, #type, #typeDetail").on("change", function() {
				$("#scoreCalculationResultTable td").text("");
			});
		
		var updateInputs;
		$("#graduationType").on("change", updateInputs = function(init) {
				$("#typeDetail").attr("style", "visibility: hidden;");
				if(init !== "init") $("#type").val("0");
				if(this.value === "GED")
				{
					$(".schoolCodeInputs").attr("style", "visibility: hidden;");
					$("#type > option[value='2'], #type > option[value='3'], #type > option[value='4']")
						.attr("hidden", "hidden").attr("disabled", "disabled");

					$(".schoolCodeInputs input").val("");
					$("#area").removeAttr("disabled");
				}
				else
				{
					$(".schoolCodeInputs").attr("style", "visibility: visible;");
					$("#type > option[value='2'], #type > option[value='3'], #type > option[value='4']")
						.removeAttr("hidden").removeAttr("disabled");

					$("#area").attr("disabled", "disabled");
				}
			});
		updateInputs.call($("#graduationType").get(0), "init");
	
		$("#next").on("click", function() {
				(new Common).postIt("./personalInput", $("form").serialize()+"&idPicture="+$("#idPicture").attr("src")+"&area="+$("#area").val(), function success(response) {
						try
						{
							var responseObject = JSON.parse(response);
							if(responseObject.success) location.href = responseObject.redirect;
							else
							{
								console.error(responseObject.errorcode);
								alert("입력되지 않았거나 잘못되었습니다.("+responseObject.errorcode+")");
							}
						}
						catch(error)
						{
							console.error("An unexpected error occurred: ", error);
							alert("예상치 못한 에러가 발생하였습니다.");
						}
					}, function failure() {
						console.error("A network error occurred.");
						alert("오류가 발생하였습니다. 잠시 후에 다시 시도해 주세요.");
					});

				return false;
			});
	
		$("#type").on("change", function() {
				if($("#type").val() === "2") $("#typeDetail").attr("style", "visibility: visible;");
				else
					$("#typeDetail").attr("style", "visibility: hidden;");
			});
//		$("#select4").on("change", function() {
//				if($("#select4").val() === 2) $("#typeDetail").show();
//				else
//					$("#typeDetail").hide();
//			});

		function readURL(input)
		{
			if (input.files && input.files[0]) {
		          if(input.files[0].size<=1048576){
		            var reader = new FileReader();
		            var img = new Image();
		            reader.onload = function (e) {
		                $('#idPicture').attr('src', e.target.result);
		            }
		            img.addEventListener("load",function () {
		              console.log(img.naturalWidth/150);
		              console.log(img.naturalHeight/200);
		              if(img.naturalWidth/150>img.naturalHeight/200){
		                $("#idPicture").css("width",img.naturalWidth/(img.naturalWidth/150));
		                $("#idPicture").css("height","auto");
		              }else{
		                $("#idPicture").css("width",img.naturalWidth/(img.naturalWidth/150));
		                $("#idPicture").css("height",img.naturalHeight/(img.naturalHeight/200));
		              }
		            });
		            reader.addEventListener("load", function () {
		              img.src = reader.result;
		            });
		            reader.readAsDataURL(input.files[0]);
		          }else{
		            alert("1MB이하의 사진을 업로드해주세요");
		          }
		        }
		}
		$("#upload").change(function() {
				readURL(this);
			});


		$("#calculation").load(function() {
				console.info("The score input page has been loaded; it'll be initialized.");

				var graduationType_KoreanText = {"graduate": "졸업자", "graduate-to-be": "졸업 예정자"}[$("#graduationType").val()];

				var mainTypeInfo = [
							{mainType: "general", originalMainType: "general"}, // 일반 전형
							{mainType: "special", originalMainType: "special"}, // 특별 전형
							{mainType: "special", originalMainType: "social integration"}, // 사회 통합 전형
							{mainType: "general", originalMainType: "the national meritorious' children"}, // 국가 유공자 자녀
							{mainType: "general", originalMainType: "special admission"} // 특례 입학자
						][$("#type").val()];
				var mainTypeDetail;
				if(mainTypeInfo.originalMainType === "social integration")
				{
					mainTypeDetail = [
								"basic livelihood security recipient",
								"one-parent family subject to protection",
								"the secondary poor",
								"the tertiary poor",
								"north korean refugee",
								"multicultural family",
								"others"
							][$("#typeDetail").val()];
				}

				console.info("Setup the page with", mainTypeInfo.mainType, $("#graduationType"), mainTypeInfo.originalMainType, mainTypeDetail);
				this.contentWindow.setupPage(
						mainTypeInfo.mainType,		// mainType
						$("#graduationType").val(),	// subtype
						mainTypeInfo.originalMainType,	// originalMainType
						mainTypeDetail			// originalMainTypeDetail
					);
				this.contentWindow.setScores(SCORE_DATA);
			});
		(function(updateIframe) {
				updateIframe();
				$("#graduationType").on("change", updateIframe);
				$("#type").on("change", updateIframe);
				$("#typeDetail").on("change", updateIframe);
			})(function updateIframe() {
				console.log("graduationType has been changed!", $("#calculation").val());
				$("#calculation").attr("src", "./scoreInput?anticache=" + Math.random());
			});
		
        	var deadLine = new Date(2016, 9, 24, 11,59,59,0);
        	var now = new Date();
        	var nowDate = now.getDate();
        	var DdayDate = deadLine.getDate();

        	var Dday = "D-"+String(Math.abs(nowDate-DdayDate));
        	$("#dday").html(Dday);
        	
        	if($("#type").val() == 2){
        		$("#typeDetail").css("visibility", "visible");
        	}
		
		
		
	});

function scoreCalculationCallback(result)
{
	for(key in result)
		$('.' + key).text(result[key]);
	
	$(".modal").modal("hide");
	// location.reload(true);
}


function isNumberKey(event) // K.(2016. 9. 24.): .keyCode has been deprecated. Use .key instead.
{
	return !((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 186 && event.keyCode <= 222));
}
function onlyNumber() // K.(2016. 9. 24.): .keyCode has been deprecated. Use .key instead.
{
	if((event.keyCode<48)||(event.keyCode>57))
	event.returnValue = false;
} // What are these for?