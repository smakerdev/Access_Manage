$(document).ready(function () {
	$("#loginButton").on("click", function() {
		  if(document.cookie.indexOf("submit_number=") !== -1) // logged in
		  {
			  document.cookie = "submit_number=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			  alert("로그아웃 되었습니다.");
			  location.reload(true);
		  }
		  else
		  {
			  $(".modal#loginForm").modal("show");
		  }
		});
	
  $("#loginSub").on("click",function () {
    $.ajax({
      url : "./logincheck",
      dataType : "json",
      type : "POST",
      data : $("#checklogin").serialize(),
      success: function (data) {
    	console.log(data);
    	var _login_result = data.success;
    	if(_login_result == true) {
    		console.log("Login Success");
    		$("#loginButton").text("로그아웃");
    		$("#username").text(data.username);
    		$("#loginForm").attr("action", "./").submit();
    	    $("#loginForm").modal('hide');
    	    location.reload(true);
    	} else {
        	var errorcode = data.errorcode;
        	$("#pwd").val("");
    		if(errorcode==0)
    			alert("이메일 또는 비밀번호가 틀렸습니다");
    		else if(errorcode==1)
    			alert("이메일이 입력되지 않았거나 스크립트 문자가 포함되어 있습니다.");
    		else if(errorcode==2)
    			alert("비밀번호가 입력되지 않았거나 스크립트 문자가 포함되어 있습니다.");
    	}
    	
        console.log("ajax is success");
      }
    });
  });

  $("#signUpConf").on("click",function () {
    if ($("#pwd")==""){
      alert("비밀번호를 입력해주세요.");
    } else if ($("#pwdConf")=="") {
      alert("비밀번호 확인을 입력해주세요.");
    } else {
      if ($("#pwd").text()!=$("#pwdConf").text()){
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      } else{
        $.ajax({
          url : "./register",
          dataType : "json",
          type : "POST",
          data : $("#signUpForm").serialize(),
          success : function (data) {
        	console.log("Data : " + data);
          	var _register_result = data.success;
          	if(_register_result) {
                console.log("sign Up Success"); 
                alert('회원가입이 완료되었습니다.');
  			  location.reload(true);
          	}
          	else {
                console.log("sign Up Fail"); 
                var errorcode = data.errorcode;
                if(errorcode == 1){
                	alert("이름이 입력되지 않았거나 스크립트 문자가 포함되어 있습니다.")
                }else if(errorcode == 2){
                	alert("이메일이 입력되지 않았거나 스크립트 문자가 포함되어 있습니다.");
                }else if(errorcode == 3){
                	alert("비밀번호가 입력되지 않았거나 스크립트 문자가 포함되어 있습니다.");
                }else if(errorcode == 4){
                	alert("비밀번호 확인이 입력되지 않았거나 스크립트 문자가 포함되어 있습니다.");
                }else if(errorcode == 5){
                	alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                }else if(errorcode == 6){
                	alert('이미 사용하고 있는 이메일입니다.');
                }else{
                	alert("알 수 없는 에러가 발생하였습니다. 관리자 또는 학교 질문 게시판에 문의하여 주세요");
                }
          	}
          }
        
        });
      }
    }
    });
  
  $("#password").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#loginSub").click();
	    }
	});
  
  //여기서부터
  var confirmButton = document.getElementById("confirm");
  $("#agree").click(function() {
    confirmButton.style.pointerEvents = "auto";
  });
  $("#disagree").click(function() {
    confirmButton.style.pointerEvents = "none";
  });
  $("#confirm").click(function() {
    if($("#accept input:radio:checked").val() === null){
      alert("동의 여부를 선택해 주세요.");
    }else if($("#accept input:radio:checked").val() === 1){
      alert("동의를 선택하지 않았습니다.");
    }else{
      $.ajax({
        url : "/acceptsignup",
        dataType : "json",
        type : "GET",
        data : $("#agreestatus").serialize(),
        success : function(){
          var result = data.success;
          if(result === true){
            console("success agree");
          }
          else{
            console("failed agree");
          }
        }
      });
    }
    $("#agreepage").modal('hide');
  });
});