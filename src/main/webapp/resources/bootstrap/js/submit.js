$(document).ready(function() {		
			$("#submit").on("click", function(){
			(new Common).postIt("./finalSubmit", "true", function success(response) {
					try
					{
						console.log("RES : ",response);
						console.log("JSON(RES) : ",JSON.parse(response));
						var responseObject = JSON.parse(response);
						console.log("Get in!");
						alert(responseObject.alert);
						if(responseObject.success) location.href = responseObject.redirect;
						else
						{
							console.error(responseObject.errorcode);
							alert("입력되지 않은 부분이 있습니다.("+responseObject.errorcode+")");
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

		
	});

