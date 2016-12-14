<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>

<head>
<jsp:include page="../include/common.jsp"></jsp:include>
<title>Error</title>

<style type="text/css">
.error-template {
	padding: 40px 15px;
	text-align: center;
}
</style>
</head>

<body>

	<div class="wrapper">
		<div class="row">
			<div class="col-md-12">
				<div class="error-template">
					<h1>Oops!</h1>
					<h2>404 Not Found</h2>
					<div class="error-details">Sorry, an error has occured,
						Requested page not found!</div>
					<div>
						<a href="/" class="btn btn-default btn-lg"> <span
							class="glyphicon glyphicon-home"></span>Take Me Home
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>


</body>

</html>
