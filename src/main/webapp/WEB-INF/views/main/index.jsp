<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>
<title>메인</title>
<jsp:include page="../include/common.jsp"></jsp:include>
<script>
	function fn_formSubmit() {
		document.form1.submit();
	}
</script>

</head>

<body>
	<jsp:include page="../include/nav.jsp" />

	<br><br><br>
	<div class="container">
		<div class="jumbotron">
			<h2><strong>${usernm}</strong>님의 자퇴을 위한 서비스</h2>
			<p>&nbsp;빨리 외출 신청합시다!!</p>
		</div>
	</div>


</body>

</html>
