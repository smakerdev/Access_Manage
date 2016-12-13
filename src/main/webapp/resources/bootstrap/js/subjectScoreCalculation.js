function KCalculator()
{
	/*
		K.'s DSM 2017 subject score calculator for IE 9+.

		The source code is under the MIT license.
	*/

	var meanScores = {}; // {11: 4.2, ...}
	var precalculated = {};
	var that = this;
	this.DEBUGGING_LOG = "";

	this.get = function getValue(valueName) {
			this.DEBUGGING_LOG += ("GET " + valueName + ".\n");

			if(this.isFiniteNumeric(precalculated[valueName])) return precalculated[valueName];

			// 해당 학년의 1개 학기 교과 성적이 없는 경우에는 그 누락된 성적 대신에 해당 학년의 교과 성적이 기록된 학기의 교과 성적을 적용한다.
			if(valueName === "11") return precalculated[valueName] = (this.isFiniteNumeric(meanScores["11"]) ? meanScores["11"] : meanScores["12"]);
			if(valueName === "12") return precalculated[valueName] = (this.isFiniteNumeric(meanScores["12"]) ? meanScores["12"] : meanScores["11"]);
			if(valueName === "21") return precalculated[valueName] = (this.isFiniteNumeric(meanScores["21"]) ? meanScores["21"] : meanScores["22"]);
			if(valueName === "22") return precalculated[valueName] = (this.isFiniteNumeric(meanScores["22"]) ? meanScores["22"] : meanScores["21"]);
			if(valueName === "32") return precalculated[valueName] = (this.isFiniteNumeric(meanScores["32"]) ? meanScores["32"] : meanScores["31"]);

			precalculated[valueName] = 0;
			valueName.split('+').forEach(function(componentValueName) {
					that.DEBUGGING_LOG += (valueName + "'s COMPONENT: " + componentValueName + ".\n");
					precalculated[valueName] += that.get(componentValueName);
				});
			return precalculated[valueName];
		};
	this.calculateSubjectScore = function calculateSubjectScore(mainType, subtype/*"graduate" or "graduate-to-be"*/, inputMeanScores) {
			meanScores = inputMeanScores;

			var grade1_exists = this.isFiniteNumeric(meanScores["11"]) || this.isFiniteNumeric(meanScores["12"]),
				grade2_exists = this.isFiniteNumeric(meanScores["21"]) || this.isFiniteNumeric(meanScores["22"]);
			precalculated["31"] = meanScores["31"]; // This value is essential.

			var result;
			if(subtype === "graduate-to-be")
			{
				// 1개 학년 또는 2개 학년의 교과 성적이 없는 경우에는 타 학년의 성적을 이용하여 평균 평점을 계산하여 해당 학년에 적용한다.
				if(!grade1_exists && !grade2_exists) precalculated["11+12"] = precalculated["21+22"] = this.get("31") * 2;
				else if(!grade1_exists) precalculated["11+12"] = (this.get("21+22") + this.get("31")) * 2 / 3;
				else if(!grade2_exists) precalculated["21+22"] = (this.get("11+12") + this.get("31")) * 2 / 3;

				if(mainType === "general") result = {first: 4.5 * this.get("11+12"), second: 4.5 * this.get("21+22"), third: 12 * this.get("31")};
				else if(mainType === "special") result = {first: 2.7 * this.get("11+12"), second: 2.7 * this.get("21+22"), third: 7.2 * this.get("31")};
			}
			else if(subtype === "graduate")
			{
				// 1개 학년 또는 2개 학년의 교과 성적이 없는 경우에는 타 학년의 성적을 이용하여 평균 평점을 계산하여 해당 학년에 적용한다.
				if(!grade1_exists && !grade2_exists) precalculated["11+12"] = precalculated["21+22"] = this.get("31+32");
				else if(!grade1_exists) precalculated["11+12"] = (this.get("21+22") + this.get("31+32")) * 2 / 4;
				else if(!grade2_exists) precalculated["21+22"] = (this.get("11+12") + this.get("31+32")) * 2 / 4;

				if(mainType === "general") result = {first: 4.5 * this.get("11+12"), second: 4.5 * this.get("21+22"), third: 6 * this.get("31+32")};
				else if(mainType === "special") result = {first: 2.7 * this.get("11+12"), second: 2.7 * this.get("21+22"), third: 3.6 * this.get("31+32")};
			}

			precalculated = {};
			this.DEBUGGING_LOG += "\n\n";

			result.subjectScore = result.first + result.second + result.third;
			return result;
		};
}
KCalculator.prototype = {
		isFiniteNumeric: function isFiniteNumeric(value) {
				return typeof value === "number" && !isNaN(value) && isFinite(value);
			}
	};