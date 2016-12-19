<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>
<title>외출 신청 페이지</title>
<jsp:include page="../include/common.jsp"></jsp:include>
<script>
	function fn_formSubmit() {
		document.form1.submit();
	}
</script>

</head>

<body>
	<jsp:include page="../include/nav.jsp" />
	<br><br><br><br>
	<div class="container">
		<form class="form-horizontal">
			<fieldset>
				<legend>외출 신청</legend>
				<div class="form-group">
					<label for="name" class="col-lg-2 control-label">이름</label>
					<div class="col-lg-10">
						<input type="text" class="form-control" id="name"
							placeholder="이름">
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword" class="col-lg-2 control-label">Password</label>
					<div class="col-lg-10">
						<input type="password" class="form-control" id="inputPassword"
							placeholder="Password">
					</div>
				</div>
				<div class="form-group">
					<label for="textArea" class="col-lg-2 control-label">외출 사유</label>
					<div class="col-lg-10">
						<textarea class="form-control" rows="3" id="textArea"></textarea>
						<span class="help-block">구체적인 사유를 작성해주세요.</span>
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-10 col-lg-offset-2">
						<button type="reset" class="btn btn-default">Cancel</button>
						<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</fieldset>
		</form>
	</div>

</body>

</html>
