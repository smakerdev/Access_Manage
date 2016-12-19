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
				<legend>외춯 신청</legend>
				<div class="form-group">
					<label for="inputEmail" class="col-lg-2 control-label">Email</label>
					<div class="col-lg-10">
						<input type="text" class="form-control" id="inputEmail"
							placeholder="Email">
					</div>
				</div>
				<div class="form-group">
					<label for="inputPassword" class="col-lg-2 control-label">Password</label>
					<div class="col-lg-10">
						<input type="password" class="form-control" id="inputPassword"
							placeholder="Password">
						<div class="checkbox">
							<label> <input type="checkbox"> Checkbox
							</label>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="textArea" class="col-lg-2 control-label">Textarea</label>
					<div class="col-lg-10">
						<textarea class="form-control" rows="3" id="textArea"></textarea>
						<span class="help-block">A longer block of help text that
							breaks onto a new line and may extend beyond one line.</span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-lg-2 control-label">Radios</label>
					<div class="col-lg-10">
						<div class="radio">
							<label> <input type="radio" name="optionsRadios"
								id="optionsRadios1" value="option1" checked=""> Option
								one is this
							</label>
						</div>
						<div class="radio">
							<label> <input type="radio" name="optionsRadios"
								id="optionsRadios2" value="option2"> Option two can be
								something else
							</label>
						</div>
					</div>
				</div>
				<div class="form-group">
					<label for="select" class="col-lg-2 control-label">Selects</label>
					<div class="col-lg-10">
						<select class="form-control" id="select">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select> <br> <select multiple="" class="form-control">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</select>
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
