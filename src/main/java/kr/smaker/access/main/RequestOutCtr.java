package kr.smaker.access.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RequestOutCtr {
	@RequestMapping(value = "/RequestOut")
	public String requestOut() {
		return "main/RequestOut";
	}
}
