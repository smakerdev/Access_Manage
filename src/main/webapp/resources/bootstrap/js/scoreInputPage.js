// Developed by K.(wlzla000@naver.com) in 2016.
// I want to use Arrow Functions, Template Strings, etc. of ES6! But I have to make it support IE 9+.

console.info("scoreInputPage.js v20 has been loaded.",
	new (function Developer() {
		this["   nickname"] = "K."; // The first
		this["  email"] = "wlzla000@naver.com"; // The second
		this[" blogURI"] = "http://blog.naver.com/wlzla000"; // The third
	}));

var __calculator = new KCalculator;
(function stringRepeatPolyfill() { // A polyfill for String.prototype.repeat, from Mozilla developer network.
		if(!String.prototype.repeat)
		{
			String.prototype.repeat = function(count) {
					"use strict";

					if(this == null) throw new TypeError("Cannot convert " + this + " to object.");
					var str = "" + this;
					count = +count;
					if(count != count/*for NaN, etc..*/) count = 0;
					if(count < 0) throw new RangeError("repeat count must be non-negative");
					if(count == Infinity) throw new RangeError("repeat count must be less than infinity");
					count = Math.floor(count);
					if (str.length == 0 || count == 0) return "";

					// Ensuring count is a 31-bit integer allows us to heavily optimize the main part.
					// But anyway, most current (August 2014) browsers can't handle strings 1 << 28 chars or longer,
					// so:
					if(str.length * count >= 1 << 28) throw new RangeError("repeat count must not overflow maximum string size");
					var rpt = "";
					while(true)
					{
						if((count & 1) == 1) rpt += str;
						count >>>= 1;
						if(count == 0) break;
						str += str;
					}
					// Could we try:
					// return Array(count + 1).join(this);
					return rpt;
				};
		}
	})();

var TYPE_TABLE = {
		"general": {text: "일반", code: 0},
		"special": {text: "특별", code: 1},
		"social integration": {text: "사회 통합", code: 2},
		"the national meritorious' children": {text: "국가 유공자 자녀", code: 3},
		"special admission": {text: "특례 입학자", code: 4},

		"basic livelihood security recipient": {text: "기초 생활 수급권자", code: 0},
		"one-parent family subject to protection": {text: "한 부모 가족 보호 대상자", code: 1},
		"the secondary poor": {text: "차상위 계층", code: 2},
		"the tertiary poor": {text: "차차상위 계층", code: 3},
		"north korean refugee": {text: "북한 이탈 주민", code: 4},
		"multicultural family": {text: "다문화 가정", code: 5},
		"others": {text: "기타 대상자", code: 6},

		"graduate": {text: "졸업자", code: 0},
		"graduate-to-be": {text: "졸업 예정자", code: 1},
		"GED": {text: "고입 검정고시 합격자", code: 2}
	};
var setupPage = (function closure() {
		var initialized = false;

		/*
			mainType
				will be used in the calculation.
					"general"
					"special"

			subtype
				will be used in the calculation.
					"GED"
					"graduate"
					"graduate-to-be"
		*/
		return function initialize(mainType, subtype, originalMainType, originalMainTypeDetail) {
				if(initialized) return;

				initialized = true;
				console.info("Set-up with ", arguments);

				document.body.setAttribute("data-mainType", mainType);
				document.body.setAttribute("data-subtype", subtype);
				document.body.setAttribute("data-originalMainType", originalMainType);
				if(originalMainTypeDetail) document.body.setAttribute("data-originalMainTypeDetail", originalMainTypeDetail);

				// Set the title(type text).
				var typeTextElement = document.getElementById("typeText");
				typeTextElement.textContent = (
						'('
							+ TYPE_TABLE[originalMainType].text
							+ (originalMainType === "social integration" ? ('(' + TYPE_TABLE[originalMainTypeDetail].text + ')') : "")
							+ ", "
							+ TYPE_TABLE[subtype].text
						+ " 전형.)"
					);

				// Generate the HTML code.
				var disabler = document.getElementById("disabler"),
					scoreInputDiv = document.getElementById("gradeInput"),
					notes = document.getElementById("notes"),
					rightSection = document.getElementById("rightSection");
				if(subtype === "GED")
				{
					scoreInputDiv.innerHTML = (
						"<div>" +
							["국어", "수학", "영어", "사회", "과학"].map(function(subjectName) {
									return "<div class='subject'><strong>" + subjectName + "</strong></div>";
								}).join("") +
							"<div class='subject'>" +
								"<select>" +
									"<option value='noInput' selected>선택하세요.</option>" +
									"<option value='ethics'>도덕</option>" +
									"<option value='tech'>기술</option>" +
									"<option value='homeEconomics'>가정</option>" +
									"<option value='physicalEducation'>체육</option>" +
									"<option value='music'>음악</option>" +
									"<option value='art'>미술</option>" +
								"</select>" +
							"</div>" +
						"</div>" +
						"<div>" +
							("<div class='cell'>" +
								"<input class='GEDScoreInput' type='number' min='0' max='100' step='0.5'>" +
							"</div>").repeat(6) +
						"</div>");
					Array.prototype.forEach.call(document.querySelectorAll(".GEDScoreInput"), function(input) {
							input.addEventListener("input", function validateTheRange() {
									var numeric = parseFloat(input.value);
									if(input.value.length <= 5 && __calculator.isFiniteNumeric(numeric) && 0 <= numeric && numeric <= 100);
									else // Invalid
										input.value = "";
								});
						});

					notes.innerHTML = "대덕 소프트웨어 마이스터 고등학교 입학 시스템";

					document.querySelector("#rightSection > .content").style.display = "none";
				}
				else
				{
					disabler.innerHTML = ("<div>" +
							"<div class='cell'><strong>이수 여부</strong></div" +
							"><div class='cell'><input type='checkbox' checked></div" +
							"><div class='cell'><input type='checkbox' checked></div" +
							"><div class='cell'><input type='checkbox' checked></div" +
							"><div class='cell'><input type='checkbox' checked></div" +
							"><div class='cell'></div" +
							"><div class='cell'></div>" +
						"</div>");

					scoreInputDiv.innerHTML = ("<div>" +
							"<div class='cell'></div" +
							"><div class='cell'><strong>1학년 1학기</strong></div" +
							"><div class='cell'><strong>1학년 2학기</strong></div" +
							"><div class='cell'><strong>2학년 1학기</strong></div" +
							"><div class='cell'><strong>2학년 2학기</strong></div" +
							"><div class='cell'><strong>3학년 1학기</strong></div>" +
							(subtype === "graduate" ? "<div class='cell'><strong>3학년 2학기</strong></div>" : "") +
						"</div>");

					var numberOfTheCells;
					if(subtype === "graduate") numberOfTheCells = 6;
					if(subtype === "graduate-to-be") numberOfTheCells = 5;
					["국어", "사회", "역사", "수학", "과학", "기술·가정", "영어"].forEach(function(subjectName) {
							scoreInputDiv.innerHTML += ("<div>" +
									"<div class='subject'>" +
										"<strong>" + subjectName + "</strong>" +
									"</div" +
									("><div class='cell'>" +
										"<select>" +
											"<option value='noInput' selected>입력하세요.</option>" +
											"<option value='5'>" + "&nbsp;".repeat(10) + "A</option>" +
											"<option value='4'>" + "&nbsp;".repeat(10) + "B</option>" +
											"<option value='3'>" + "&nbsp;".repeat(10) + "C</option>" +
											"<option value='2'>" + "&nbsp;".repeat(10) + "D</option>" +
											"<option value='1'>" + "&nbsp;".repeat(10) + "E</option>" +
											"<option value='none'>" + "&nbsp;".repeat(5) + "미이수</option>" +
										"</select>" +
									"</div\n").repeat(numberOfTheCells) + '>' +
								"</div>");
						});

					notes.innerHTML = ("※ 집중 이수제 대상자의 경우에는, 해당되는 학기에 이수하지 않은 과목에 ‘미이수’를 입력해 주세요.<br>" +
							"※ 해외 체류 학생의 경우에는 해당되는 학기의 ‘이수 여부’를 ‘미이수’로 해 주세요.<br>" +
							"A: 성취율 90% 이상. &nbsp; B: 성취율 80% 이상, 90% 미만.<br>" +
							"C: 성취율 70% 이상, 80% 미만. &nbsp; D: 성취율 60% 이상, 70% 미만. &nbsp; E: 성취율 60% 미만.");

					var tabRouter = new TabFocusRouter;
					tabRouter.createRoute("Verticalifier",
						[2, 3, 4, 5, 6, 7].map(function(n) {
							return ("#gradeInput > div > .cell:nth-child(" + n + ") > select:not([disabled])");
						}).concat([tabRouter.DEFAULT]));
				}

				// Bind event listeners for the checkboxes.
				Array.prototype.forEach.call(document.querySelectorAll("#disabler input[type=checkbox]"), function(checkboxElement) {
						checkboxElement.addEventListener("change", function(event) {
								var checkboxElement = event.target;
								Array.prototype.forEach.call(document.querySelectorAll("#disabler .cell input"), function(element, index) {
										if(element === checkboxElement)
										{
											Array.prototype.forEach.call(document.querySelectorAll("#gradeInput > div > .cell:nth-child(" + (index + 2) + ")"), function(cell) {
													var selectInput = cell.querySelector("select");
													if(checkboxElement.checked)
													{
														cell.style.opacity = 1;
														if(selectInput)
														{
															selectInput.value = "noInput";
															selectInput.removeAttribute("disabled");
														}
													}
													else
													{
														cell.style.opacity = 0.1;
														if(selectInput)
														{
															selectInput.setAttribute("disabled", "disabled");
															selectInput.value = "none";
														}
													}
												});
										}
									});
							});
					});

				// Display the content of the page.
				document.querySelector(".main").style.display = "inline-block";
			};
	})();


function getTheColumnValue(columnNumber, doNotRemoveSubjectInformation) // Returns an empty array([]) for a column that does not exist.
{
	return Array.prototype.map.call(document.querySelectorAll("#gradeInput > div:not(:first-of-type) > .cell:nth-child(" + columnNumber + ") > select"), function(selectElement) {
			return selectElement.value === "none" ? "none" : parseInt(selectElement.value);
		}).map(function(score) {
			return score === "none" ? null : score;
		}).filter(function(score) {
			return doNotRemoveSubjectInformation ? true : score !== null;
		});
}
function mean(numericArray)
{
	return numericArray.length === 0 ? null : numericArray.reduce(function(previousValue, currentValue) {
			return previousValue + currentValue / numericArray.length;
		}, 0);
}
function roundToNearestThousandths(number)
{
	return Math.round(number * 1000) / 1000;
}
function calculate(mainType, subtype)
{
	console.info("Calculate the scores with ", arguments);

	var attendanceScore, volunteeringScore, subjectScoreCalculation;
	if(subtype === "GED")
	{
		var averageGEDScore = Array.prototype.reduce.call(document.querySelectorAll("#gradeInput .cell input[type='number']"), function(sumBuilder, input, index, inputArray) {
				return sumBuilder + parseFloat(input.value) / inputArray.length;
			}, 0);
		if(averageGEDScore < 60)
		{
			alert("고입 검정고시 성적을 제대로 입력해 주세요.");
			// The average score of Korean high school qualification examination must be 60 or above.

			return false;
		}
		if(mainType === "general")
		{
			subjectScoreCalculation = {subjectScore: (averageGEDScore - 50) / 50 * 150};
			volunteeringScore = 8 + subjectScoreCalculation.subjectScore / 150 * 7;
		}
		else if(mainType === "special")
		{
			subjectScoreCalculation = {subjectScore: (averageGEDScore - 50) / 50 * 90};
			volunteeringScore = 8 + subjectScoreCalculation.subjectScore / 90 * 7;
		}
		attendanceScore = 15;
	}
	else
	{
		var schoolAbsences = parseInt(document.getElementById("schoolAbsences").value);
		var latenesses = parseInt(document.getElementById("latenesses").value);
		var earlyLeavings = parseInt(document.getElementById("earlyLeavings").value);
		var classAbsences = parseInt(document.getElementById("classAbsences").value);
		if(!(0 <= schoolAbsences && 0 <= latenesses && 0 <= earlyLeavings && 0 <= classAbsences))
		{
			alert("출석 정보를 제대로 입력해 주세요.");

			return false;
		}
		attendanceScore = 15 - Math.min(15, schoolAbsences + Math.floor((latenesses + earlyLeavings + classAbsences) / 3));
		volunteeringScore = parseInt(document.getElementById("volunteeringTime").value);

		var score11 = getTheColumnValue(2), score12 = getTheColumnValue(3);
		var score21 = getTheColumnValue(4), score22 = getTheColumnValue(5);
		var score31 = getTheColumnValue(6), score32 = getTheColumnValue(7);
		var firstMeanScore = roundToNearestThousandths(mean(score11.concat(score12)));
		var secondMeanScore = roundToNearestThousandths(mean(score21.concat(score22)));
		var thirdMeanScore, subjectScoreCalculation;
		if(subtype === "graduate-to-be")
		{
			thirdMeanScore = roundToNearestThousandths(mean(score31));
			subjectScoreCalculation = __calculator.calculateSubjectScore(mainType, subtype, {
					11: mean(score11),
					12: mean(score12),
					21: mean(score21),
					22: mean(score22),
					31: mean(score31)
				});
		}
		if(subtype === "graduate")
		{
			thirdMeanScore = roundToNearestThousandths(mean(score31.concat(score32)));
			subjectScoreCalculation = __calculator.calculateSubjectScore(mainType, subtype, {
					11: mean(score11),
					12: mean(score12),
					21: mean(score21),
					22: mean(score22),
					31: mean(score31),
					32: mean(score32)
				});
		}
	}

	if(subtype === "GED")
	{
		document.getElementById("firstSubjectScore").textContent =
		document.getElementById("secondSubjectScore").textContent =
		document.getElementById("thirdSubjectScore").textContent = "-";
	}
	else
	{
		document.getElementById("firstSubjectScore").textContent = roundToNearestThousandths(subjectScoreCalculation.first);
		document.getElementById("secondSubjectScore").textContent = roundToNearestThousandths(subjectScoreCalculation.second);
		document.getElementById("thirdSubjectScore").textContent = roundToNearestThousandths(subjectScoreCalculation.third);
	}
	document.getElementById("subjectScore").textContent = roundToNearestThousandths(subjectScoreCalculation.subjectScore);
	document.getElementById("attendanceScore").textContent = attendanceScore; // attendanceScore is an integer, so it does not need to be rounded.
	document.getElementById("volunteeringScore").textContent = roundToNearestThousandths(volunteeringScore);
	document.getElementById("totalScore").textContent = roundToNearestThousandths(subjectScoreCalculation.subjectScore + attendanceScore + volunteeringScore);

	console.info("Calculated.");

	return true;
}
function makeTheInputJSON()
{
	/*
		The server MUST check
			if all the fields are valid,
			if the `mainType` and the `orignalMainType` is matched,
			etc..
	*/

	var result = {
			mainType: document.body.getAttribute("data-mainType"),
			subtype: document.body.getAttribute("data-subtype"),
			originalMainType_code: TYPE_TABLE[document.body.getAttribute("data-originalMainType")].code
		};
	if(document.body.getAttribute("data-originalMainType") === "social integration")
	{
		result.originalMainTypeDetail_code = TYPE_TABLE[document.body.getAttribute("data-originalMainTypeDetail")].code;
	}

	if(result.subtype === "GED")
	{
		result.score = {};
		["korean", "math", "english", "socialStudies", "science", document.querySelector("#gradeInput .subject > select").value].forEach(function(subjectEnglishName, index, array) {
				result["score"][subjectEnglishName] = parseFloat(document.querySelector("#gradeInput .cell:nth-of-type(" + (index + 1) + ") input[type='number']").value);

				if(array.length - 1 === index) result.optionalSubject = subjectEnglishName;
			});
	}
	else
	{
		var score11 = getTheColumnValue(2, true), score12 = getTheColumnValue(3, true);
		var score21 = getTheColumnValue(4, true), score22 = getTheColumnValue(5, true);
		var score31 = getTheColumnValue(6, true), score32 = getTheColumnValue(7, true);

		result.schoolAbsences = parseInt(document.getElementById("schoolAbsences").value);
		result.latenesses = parseInt(document.getElementById("latenesses").value);
		result.earlyLeavings = parseInt(document.getElementById("earlyLeavings").value);
		result.classAbsences = parseInt(document.getElementById("classAbsences").value);
		result.volunteeringScore = parseInt(document.getElementById("volunteeringTime").value);
		result.score = {11: score11, 12: score12, 21: score21, 22: score22, 31: score31, 32: (score32.length === 0 ? null : score32)};
	}

	return JSON.stringify(result);
}
function makeTheResultJSON()
{
	var result = {};
	["firstSubjectScore", "secondSubjectScore", "thirdSubjectScore", "subjectScore", "attendanceScore", "volunteeringScore", "totalScore"].forEach(function(name) {
			result[name] = parseFloat(document.getElementById(name).textContent);
			if(isNaN(result[name])) result[name] = "-";
		});
	return JSON.stringify(result);
}

function updateIt(successCallback, failureCallback)
{
	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function() {
			if(httpRequest.readyState == 4)
			{
				if(httpRequest.status == 200) successCallback(httpRequest.responseText);
				else
				{
					console.error("There was a problem with the request. The status code: ", httpRequest.status);
					failureCallback();
				}
			}
		};
	httpRequest.open("POST", "./sendscore", true);
	httpRequest.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	httpRequest.send(makeTheInputJSON());
}
document.getElementById("calculate").addEventListener("click", function() {
		var mainType = document.body.getAttribute("data-mainType"), subtype = document.body.getAttribute("data-subtype");

		var score31 = getTheColumnValue(6), score32 = getTheColumnValue(7, true);
		var noScoreInputForScore31 = (score31.length === 0);
		var noScoreInputForScore32 = (score32.length !== 0/*score32 exists*/ && score32.every(function(score) {
				return score === null;
			}));
		var missingInputExists = document.getElementById("volunteeringTime").value === "noInput"
					|| Array.prototype.some.call(document.querySelectorAll("#gradeInput .cell select"), function(scoreInput) {
							return scoreInput.value === "noInput";
						});
		var missingOrInvalidGEDScore = !(Array.prototype.every.call(document.querySelectorAll("#gradeInput .cell input[type='number']"), function(scoreInput) {
				var inputNumericValue = parseFloat(scoreInput.value);
				scoreInput.value = inputNumericValue;

				return __calculator.isFiniteNumeric(inputNumericValue) && 0 <= inputNumericValue && inputNumericValue <= 100; 
			}));
		var missingGEDOptionalSubject = (subtype === "GED" && document.querySelector("#gradeInput .subject > select").value === "noInput");
		if(subtype !== "GED" && missingInputExists)
		{
			alert("입력되지 않은 부분이 있습니다.");
		}
		else if(subtype === "graduate" && (noScoreInputForScore31 || noScoreInputForScore32))
		{
			alert("졸업자의 경우에는,\n3학년 1학기 성적과 3학년 2학기 성적이\n반드시 있어야 합니다!");
		}
		else if(subtype === "graduate-to-be" && noScoreInputForScore31)
		{
			alert("졸업 예정자의 경우에는,\n3학년 1학기 성적이\n반드시 있어야 합니다!");
		}
		else if(subtype === "GED" && missingOrInvalidGEDScore)
		{
			alert("점수를 제대로 입력해 주세요.");
		}
		else if(subtype === "GED" && missingGEDOptionalSubject)
		{
			alert("고입 검정고시 시에 응시한 선택 과목을 입력하세요.");
		}
		else
		{
			if(calculate(mainType, subtype)) // Calculated successfully.
			{
				updateIt(function success(responseJSON) {
						alert("입력된 정보가 저장되었습니다.");
						if(window.parent && window.parent.scoreCalculationCallback)
						{
							window.parent.scoreCalculationCallback(JSON.parse(responseJSON));
						}
					}, function failure() {
						alert("정보 갱신에 실패하였습니다.\n잠시 후에 다시 시도해 보세요.");
					});
			}
		}
	});

function setScores(scoreMatrix)
{
	var SEMESTER_INDEXES = {11: 2, 12: 3, 21: 4, 22: 5, 31: 6, 32: 7};
	for(var semester in scoreMatrix)
	{
		if(!(semester in SEMESTER_INDEXES)) continue;

		Array.prototype.forEach.call(
				document.querySelectorAll(".cell:nth-child(" + SEMESTER_INDEXES[semester] + ") select"),
				function(selectBox, index) {
						if(scoreMatrix[semester][index] === null) selectBox.value = "none";
						else
							selectBox.value = scoreMatrix[semester][index];
					}
			);
	}
}
/************************************************** Not being used.
function goToAnotherPage(URI)
{
	var DO_NOT_CONFIRM = true;
	if(DO_NOT_CONFIRM || confirm("입력하신 정보를 저장하시겠습니까?\n저장하지 않으면 입력된 내용이 사라집니다."))
	{
		updateIt(function success() {
				if(!DO_NOT_CONFIRM) alert("저장되었습니다.")
				location.href = URI;
			}, function failure() {
				alert("정보 갱신에 실패하였습니다.\n잠시 후에 다시 시도해 보세요.");
			});
	}
	else
		location.href = URI;
}
document.getElementById("goToPrevPage").addEventListener("click", function() {
		goToAnotherPage("./input");
	});
document.getElementById("goToNextPage").addEventListener("click", function() {
		goToAnotherPage("./selfIntroduce");
	});
**************************************************/