$(document).ready(function() {
	$(".middleSchoolListTableBody").on("click", function(event) {
			try
			{
				if(Array.prototype.indexOf.call(this.querySelectorAll("tr"), event.target.parentElement) !== -1)
				{
					var schoolCode = parseInt(event.target.parentElement.querySelector("td:first-child").textContent);
					$("#schoolCode").val(schoolCode);
					$("#schoolName").val(event.target.parentElement.querySelector("td:last-child").textContent);
					$("#middleSchoolSearchingModal").modal("hide");
					
					if(7440007 <= schoolCode && schoolCode <= 7451304)
					{
						$("#area").val("daejeon");
					}
					else
						$("#area").val("other");
				}
			}
			catch(error)
			{
				console.error(error);
				alert("오류가 발생했습니다.");
			}
		});
	
	var middleSchoolSearchingButton = $("#serachForMiddleSchools");
	middleSchoolSearchingButton.on("click", (function() {
		console.log("search btn clicked");
			var searching = false;
			return function closure() {
					if(searching)
					{
						alert("이미 검색하고 있습니다. 잠시 기다려 주세요.");
						return;
					}
	
					searching = true;
					$("#middleSchoolListTableBody").html("");
					middleSchoolSearchingButton.attr("disabled", "disabled");
					console.log("Request");
					(new Common).postIt("./middleSchoolSearching", "searchFor=" + document.getElementById("searchFor").value,
						function success(resultJSON) {
						console.log("Result", JSON.parse(resultJSON));
							try
							{
								$(".middleSchoolListTableBody").html(JSON.parse(resultJSON).map(function(school) {
									console.log("Code",school.code);
										return ("<tr><td>" + school.code + "</td><td>" + school.fullname + "</td><td>" + school.name + "</td></tr>");
									}).join('\n'));
							}
							catch(error)
							{
								console.error("E1", error);
								alert("오류가 발생하였습니다.");
							}
							middleSchoolSearchingButton.removeAttr("disabled");
							searching = false;
						}, function failure() {
							console.error("E2");
							alert("오류가 발생하였습니다.");
							middleSchoolSearchingButton.removeAttr("disabled");
							searching = false;
						});
				};
		})());
});