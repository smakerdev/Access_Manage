package kr.smaker.access.admin;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminCtr {
	
	@RequestMapping(value = "/admin/index")
	public String adminCtr(HttpServletRequest request, Model model) {
		String userno = request.getSession().getAttribute("userno").toString();
		String usernm = request.getSession().getAttribute("usernm").toString();
		
		model.addAttribute("userno", userno);
		model.addAttribute("usernm", usernm);
		
		return "admin/index";
	}

}
