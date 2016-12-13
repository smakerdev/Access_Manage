package kr.smaker.access.Controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {
	@RequestMapping(value = "/logincheck", method = RequestMethod.POST)
	public void logincheck(HttpServletRequest request) {
		String userid = request.getParameter("userid");
		String userpw = request.getParameter("userpw");
		
	}
}
