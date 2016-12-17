package kr.smaker.access.main;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RequestOutCtr {
	@RequestMapping(value = "/requestOut")
	public String requestOut(HttpServletRequest request) {
		String userno = request.getSession().getAttribute("userno").toString();
		String usernm = request.getSession().getAttribute("usernm").toString();
		String userrole = request.getSession().getAttribute("userrole").toString();
		
		if (userrole.equals("A")) {
			return "main/index";
		}
		return "main/RequestOut";
	}
}
