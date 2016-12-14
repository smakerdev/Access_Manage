<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<jsp:include page="../include/common.jsp"></jsp:include>
<title>Error</title>
</head>
<body>
	<script>
		alert("${msg}");
		history.back();
	</script>
</body>
</html>