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

	<div id="wrapper">

		<jsp:include page="../include/nav.jsp" />

		<div id="page-wrapper">
			<p>&nbsp;</p>
			<!-- /.row -->
			<div class="row">
				<div class="col-lg-12">
					<button type="button" class="btn btn-default pull-right"
						onclick="fn_moveToURL('projectForm')">
						<i class="fa fa-edit fa-fw"></i>외출 신청
					</button>
				</div>
			</div>
			<p>&nbsp;</p>
			<!-- /.row -->
			<div class="row">
				<div class="col-lg-12">
					<c:forEach var="listview" items="${listview}" varStatus="status">
						<c:url var="link" value="task">
							<c:param name="prno" value="${listview.prno}" />
						</c:url>
						<div class="col-lg-4">
							<div class="panel panel-default">
								<div class="panel-heading">
									<a href="${link}"><c:out value="${listview.prtitle}" /></a>
								</div>
								<div class="panel-body">
									<p>
										<c:out value="${listview.usernm}" />
										(
										<c:out value="${listview.prstatus}" />
										)
									</p>
									<p>
										<c:out value="${listview.prstartdate}" />
										~
										<c:out value="${listview.prenddate}" />
									</p>
								</div>
							</div>
						</div>
					</c:forEach>
				</div>
			</div>
			
		</div>
		<!-- /#page-wrapper -->

	</div>
	<!-- /#wrapper -->
</body>

</html>
