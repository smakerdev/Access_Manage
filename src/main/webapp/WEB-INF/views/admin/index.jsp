<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>
<title>교사용 페이지</title>
<jsp:include page="../include/common.jsp"></jsp:include>
<script>
	function fn_formSubmit() {
		document.form1.submit();
	}
</script>

</head>

<body>
	<jsp:include page="../include/admin_nav.jsp" />

	<br>
	<br>
	<br>
	<div class="container">
		<div style="text-align: center;" class="jumbotron">
			<h2>교사용 페이지</h2>
		</div>
	</div>


</body>

</html>
