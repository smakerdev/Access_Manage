$("#loginSub").on("click", function() {
	$.ajax({
		url : "./logincheck",
		dataType : "json",
		type : "POST",
		data : $("#checklogin").serialize(),
		success : function(data) {
			console.log(data);
			var _login_result = data.success;
			if (_login_result == true) {
				console.log("Login Success");
				$("#username").text(data.username);
				$("#loginForm").attr("action", "./").submit();
				$("#loginForm").modal('hide');
				location.reload(true);
			} else {
				var errorcode = data.errorcode;
				$("#pwd").val("");
				if (errorcode == 0)
					alert("이메일 또는 비밀번호가 틀렸습니다");
				else if (errorcode == 1)
					alert("이메일이 입력되지 않았거나 스크립트 문자가 포함되어 있습니다.");
				else if (errorcode == 2)
					alert("비밀번호가 입력되지 않았거나 스크립트 문자가 포함되어 있습니다.");
			}

			console.log("ajax is success");
		}
	});
});