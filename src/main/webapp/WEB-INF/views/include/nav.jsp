<%@ page session="false" pageEncoding="utf-8"%>
<nav class="navbar navbar-default navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="./">DSM 외출 신청</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav">
				<li><a href="./requestOut"></i>외출 신청</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="memberPage">${usernm}님</a></li>
				<li><a href="memberLogout">로그아웃</a></li>
			</ul>
		</div>
	</div>
</nav>