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

import kr.smaker.access.main.RequestVO;
import kr.smaker.access.member.MemberSvc;

@Controller
@RequestMapping(value = "/admin")
public class AdminCtr {

	@Autowired
	private MemberSvc memberSvc;

	public String adminIndexCtr(HttpServletRequest request, Model model) {
		return "redirect:admin/index";
	}

	@RequestMapping(value = "/index")
	public String adminCtr(HttpServletRequest request, Model model) {
		return "admin/index";
	}

	@RequestMapping(value = "/requestList")
	public String openRequestList(ModelMap modelMap, Map<String, Object> commandMap) throws Exception {
		List<Map<String, Object>> list = memberSvc.selectRequestList(commandMap);
		modelMap.addObject("list", list);
		return "admin/requestList";
	}
}
