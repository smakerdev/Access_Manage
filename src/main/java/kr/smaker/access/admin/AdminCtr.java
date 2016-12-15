package kr.smaker.access.admin;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AdminCtr {

	@RequestMapping(value = "/admin")
	public String adminIndexCtr(HttpServletRequest request, Model model) {
		return "redirect:admin/index";
	}

	@RequestMapping(value = "/admin/index")
	public String adminCtr(HttpServletRequest request, Model model) {
		return "admin/index";
	}
}
