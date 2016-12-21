package kr.smaker.access.admin;

import java.util.List;
import java.util.Map;

import javax.activation.CommandMap;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kr.smaker.access.member.MemberSvc;

@Controller
public class AdminCtr {

	@Autowired
	private MemberSvc memberSvc;
	
	@RequestMapping(value="/admin")
	public String adminIndexCtr(HttpServletRequest request, Model model) {
		String userrole = request.getSession().getAttribute("userrole").toString();
		if (userrole != null) {
			if (userrole.equals("A")) {
				return "admin/index";
			}
		}
		return "redirect:index";
	}

	@RequestMapping(value = "/admin/index")
	public String adminCtr(HttpServletRequest request, Model model) {
		String userrole = request.getSession().getAttribute("userrole").toString();
		
		if (userrole != null) {
			if (userrole.equals("A")) {
				return "admin/index";
			}
		}
		return "redirect:index";
	}
	
	@RequestMapping(value = "/requestList")
	public String openRequestList(ModelMap modelMap, Map<String, Object> commandMap, HttpServletRequest request) throws Exception {
		List<Map<String, Object>> list = memberSvc.selectRequestList(commandMap);
		String userrole = request.getSession().getAttribute("userrole").toString();
		
		modelMap.addObject("list", list);

		if (userrole != null) {
			if (userrole.equals("A")) {
				return "admin/requestList";
			}
		}
		return "redirect:index";
	}
}
