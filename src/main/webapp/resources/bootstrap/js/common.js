console.info("common.js has been loaded.");

function Common() {
}
Common.prototype = {
	postIt : function postIt(uri, postParameters, successCallback,
			failureCallback) {
		var httpRequest = new XMLHttpRequest;
		httpRequest.addEventListener("readystatechange", function() {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200)
					successCallback(httpRequest.responseText);
				else
					failureCallback(httpRequest.status);
			}
		});
		httpRequest.open("POST", uri, true);
		httpRequest.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded");
		httpRequest.send(postParameters);
	}
};