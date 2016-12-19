package kr.smaker.access.main;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RequestOutCtr {
	@RequestMapping(value = "/requestOut")
	public String requestOut(Model model, HttpServletRequest request) {
		String userno = request.getSession().getAttribute("userno").toString();
		String usernm = request.getSession().getAttribute("usernm").toString();
		String userrole = request.getSession().getAttribute("userrole").toString();
		
		model.addAttribute("usernm", usernm);
		if (userrole.equals("A")) {
			return "admin/index";
		}
		return "main/RequestOut";
	}
}
