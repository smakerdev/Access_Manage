package kr.smaker.access.main;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexCtr {

	@RequestMapping(value = "/index")
	public String index(HttpServletRequest request, Model model) {
		String userno = request.getSession().getAttribute("userno").toString();
		String usernm = request.getSession().getAttribute("usernm").toString();
		String userrole = request.getSession().getAttribute("userrole").toString();

	
		System.out.println("UserData : " + userno + usernm + userrole);
		model.addAttribute("userrole", userrole);
		model.addAttribute("usernm", usernm);
		return "main/index";
	}

}
