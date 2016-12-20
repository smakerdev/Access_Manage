package kr.smaker.access.main;

import java.io.UnsupportedEncodingException;
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

	@RequestMapping(value = "/requestCheck")
	public String requestOutCheck(HttpServletRequest request) throws UnsupportedEncodingException {

		request.setCharacterEncoding("euc-kr");
		String name = request.getParameter("name");
		String number = request.getParameter("number");
		String date = request.getParameter("date");
		String time = request.getParameter("time");
		String reason = request.getParameter("reason");

		if (name != null)
			name = new String(name.getBytes("8859_1"), "UTF-8");

		if (reason != null)
			reason = new String(name.getBytes("8859_1"), "UTF-8");
		
		String userno = request.getSession().getAttribute("userno").toString();

		System.out.println(name + " " + number + " " + date + " " + time + " " + reason + " ");

		String outtime = date + " " + time;
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("name", name);
		map.put("outtime", outtime);
		map.put("reason", reason);
		map.put("number", number);
		map.put("userno", userno);

		try {
			memberSvc.insertRequest(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "main/RequestOut";
	}
}
