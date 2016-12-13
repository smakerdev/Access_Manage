//$(document).ready(function() {
//		var siCounter = document.querySelector("#self-introducing ~ .count");
//		var siTextbox = document.getElementById("self-introducing");
//		
//		var spCounter = document.querySelector("#studyingPlan ~ .count");
//		var spTextbox = document.getElementById("studyingPlan");
//		
//		var sameline = document.getElementById("sameline");
//		
//		siTextbox.addEventListener("input", function() {
//		    siCounter.textContent = "(" + this.value.length + "/" + 1600 + ")";
//		  });
//		spTextbox.addEventListener("input", function() {
//			sameline.textContent = this.value.length;
//		  });
//		
//			$("#save").on("click", function(){	alert(1);
//			(new Common).postIt("./setSelfIntroduce", $("form").serialize(), function success(response) {
//					try
//					{
//						var responseObject = JSON.parse(response);
//						console.log("Get in!");
//						if(responseObject.success) location.href = responseObject.redirect;
//						else
//						{
//							console.error(responseObject.errorcode);
//							alert(responseObject.errorcode);
//						}
//					}
//					catch(error)
//					{
//						console.error("An unexpected error occurred: ", error);
//					}
//				}, function failure() {
//					console.error("A network error occurred.");
//					alert("오류가 발생하였습니다. 잠시 후에 다시 시도해 주세요.");
//				});
//	
//			return false;
//		});
//
//		
//	});
$(document).ready(function() {
	var siCounter = document.querySelector("#self-introducing ~ .count");
	var siTextbox = document.getElementById("self-introducing");

	var spCounter = document.querySelector("#studyingPlan ~ .count");
	var spTextbox = document.getElementById("studyingPlan");
	
	var updateSiCounter = function() {
	    siCounter.textContent = "(" + siTextbox.value.length + "/" + 1600 + ")";
	}
	
	var updateSpCounter = function() {
	    spCounter.textContent = "(" + spTextbox.value.length + "/" + 1600 + ")";
	}
	updateSiCounter();
	updateSpCounter();
	siTextbox.addEventListener("input", updateSiCounter);
	spTextbox.addEventListener("input", updateSpCounter);
	
	$("#next").on("click", function() {
		(new Common).postIt("./setSelfIntroduce", $("form").serialize(), function success(response) {
			console.log("Next button has been clicked");
				try
				{
					var responseObject = JSON.parse(response);
					if(responseObject.success) location.href = responseObject.redirect;
					else
					{
						console.error("State : failed");
					}
				}
				catch(error)
				{
					console.error("An unexpected error occurred: ", error);
				}
			}, function failure() {
				console.error("A network error occurred.");
				alert("오류가 발생하였습니다. 잠시 후에 다시 시도해 주세요.");
			});

		return false;
	});
});

window.addEventListener("beforeunload", function(event) {
	var ERROR_MESSAGE = "입력하신 내용을 저장하는 데에 실패하였습니다.\n정말로 이 페이지를 벗어나시겠습니까?";

	(new Common).postIt("./setSelfIntroduce", $("form").serialize(),
		function success(response) {
			var responseObject = JSON.parse(response);
			if(!(responseObject.success))
			{
				return event.returnValue = ERROR_MESSAGE;
			}
		}, function failure() {
			console.error("A network error occurred.");
			return event.returnValue = ERROR_MESSAGE;
		});
});