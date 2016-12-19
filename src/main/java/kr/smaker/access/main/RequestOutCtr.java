package kr.smaker.access.main;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.smaker.access.member.MemberSvc;

@Controller
public class RequestOutCtr {
	
	@Autowired
	private MemberSvc memberSvc;
	
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
			@RequestParam("reason") String reason,
			HttpServletRequest request) {
		
		String userno = request.getSession().getAttribute("userno").toString();
		
		System.out.println(name + " " 
			+ number + " "
			+ date + " "
			+ time + " "
			+ reason + " ");
		String outtime = date + " " + time;
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("name", name);
		map.put("outtime", outtime);
		map.put("reason", reason);
		map.put("userno", userno);
		
		try {
			memberSvc.insertRequest(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "main/RequestOut";
	}
}
