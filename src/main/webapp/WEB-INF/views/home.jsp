<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>
<title>DSM 외출 신청</title>
<jsp:include page="include/common.jsp" flush="false"></jsp:include>
<body>

	<div class="container" style="padding: 70px 0; text-align: center;">
		<div class="row">
			<div class="col-md-4 col-md-offset-4">
				<div class="login-panel panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">DSM 외출 관리 시스템</h3>
					</div>
					<div class="panel-body">
						<form role="form" action="./logincheck" method="post" id="form1"
							name="form1">
							<fieldset>
								<div class="form-group">
									<input class="form-control" placeholder="ID" name="userid"
										id="userid" type="text"/>
								</div>
								<div class="form-group">
									<input class="form-control" placeholder="Password"
										name="userpw" id="userpw" type="password"/>
								</div>
								<!-- Change this to a button or input when using this as a form -->
								<button type="submit" class="btn btn-lg btn-success btn-block">로그인</button>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

</html>
