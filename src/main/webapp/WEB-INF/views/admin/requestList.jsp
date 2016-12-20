<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
<head>
<title>외출자 목록</title>
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
			<h2>외출자 목록</h2>
		</div>


		<br> <br>

		<div class="panel panel-default">

			<!-- Table -->
			<table class="table">
				<thead>
					<tr>
						<th scope="col">이름</th>
						<th scope="col">학번</th>
						<th scope="col">외출 시간</th>
						<th scope="col">사유</th>
						<th scope="col">상태</th>
					</tr>
				</thead>
				<tbody>
					<c:choose>
						<c:when test="${fn:length(list) > 0}">
							<c:forEach items="${list }" var="row">
								<tr>
									<td>${row.NAME }</td>
									<td>${row.GRADENUMBER }</td>
									<td>${row.OUTTIME }</td>
									<td>${row.REASON }</td>
									<td>${row.STATUS }</td>
								</tr>
							</c:forEach>
						</c:when>
						<c:otherwise>
							<tr>
								<td colspan="4">조회된 결과가 없습니다.</td>
							</tr>
						</c:otherwise>
					</c:choose>

				</tbody>
			</table>
</body>
</div>
</div>


</body>

</html>
