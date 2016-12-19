package kr.smaker.access.main;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RequestOutCtr {
	@RequestMapping(value = "/requestOut")
	public String requestOut(Model model, 
			HttpServletRequest request) {
		
		String userno = request.getSession().getAttribute("userno").toString();
		String usernm = request.getSession().getAttribute("usernm").toString();
		String userrole = request.getSession().getAttribute("userrole").toString();
		
		model.addAttribute("usernm", usernm);
		if (userrole.equals("A")) {
			return "admin/index";
		}
		return "main/RequestOut";
	}
	@RequestMapping(value="/requestCheck")
	public String requestOutCheck(@RequestParam("name") String name,
			@RequestParam("number") String number,
			@RequestParam("date") String date,
			@RequestParam("time") String time,
			@RequestParam("reason") String reason) {
		
		System.out.println(name + " " 
			+ number + " "
			+ date + " "
			+ time + " "
			+ reason + " ");
		
		return "main/RequestOut";
	}
}
