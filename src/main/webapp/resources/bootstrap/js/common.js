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

function gfn_isNull(str) {
	if (str == null)
		return true;
	if (str == "NaN")
		return true;
	if (new String(str).valueOf() == "undefined")
		return true;
	var chkStr = new String(str);
	if (chkStr.valueOf() == "undefined")
		return true;
	if (chkStr == null)
		return true;
	if (chkStr.toString().length == 0)
		return true;
	return false;
}

function ComSubmit(opt_formId) {
	this.formId = gfn_isNull(opt_formId) == true ? "commonForm" : opt_formId;
	this.url = "";

	if (this.formId == "commonForm") {
		$("#commonForm")[0].reset();
	}

	this.setUrl = function setUrl(url) {
		this.url = url;
	};

	this.addParam = function addParam(key, value) {
		$("#" + this.formId).append(
				$("<input type='hidden' name='" + key + "' id='" + key
						+ "' value='" + value + "' >"));
	};

	this.submit = function submit() {
		var frm = $("#" + this.formId)[0];
		frm.action = this.url;
		frm.method = "post";
		frm.submit();
	};
}
