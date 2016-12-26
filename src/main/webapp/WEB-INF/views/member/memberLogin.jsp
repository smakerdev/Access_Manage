<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">


<title>로그인 페이지</title>
<jsp:include page="../include/common.jsp"></jsp:include>
<script src="<c:url value="/resources/bootstrap/js/access.js" />"></script>
<script>
	function fn_formSubmit() {
		if (!chkInputValue("#userid", "아이디"))
			return false;
		if (!chkInputValue("#userpw", "비밀번호"))
			return false;

		$("#form1").submit();
	}
</script>

</head>

<body>
	<br><br><br><br>
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-md-offset-4">
				<div class="login-panel panel panel-primary">
					<div class="panel-heading">
						<h3 class="panel-title">DSM 외출 신청</h3>
					</div>
					<div class="panel-body">
						<form role="form" action="memberLoginChk" method="post" id="form1"
							name="form1">
							<fieldset>
								<div class="form-group">
									<input class="form-control" placeholder="ID" name="userid"
										id="userid" type="id">
								</div>
								<div class="form-group">
									<input class="form-control" placeholder="Password"
										name="userpw" id="userpw" type="password" value=""
										onkeydown="if(event.keyCode == 13) { fn_formSubmit();}">
								</div>
								<div class="checkbox">
									<label> <input name="remember" type="checkbox"
										value="Y"
										<c:if test='${userid != null && userid != ""}'>checked</c:if>>Remember
										Me
									</label>
								</div>
								<!-- Change this to a button or input when using this as a form -->
								<a href="#" class="btn btn-lg btn-success btn-block"
									onclick="fn_formSubmit()">로그인</a>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

</html>
