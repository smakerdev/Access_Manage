package kr.smaker.access.Controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import kr.smaker.access.dao.LoginItem;
import kr.smaker.access.service.TestService;
import kr.smaker.access.Tool.UTF8Response;

@Controller
public class LoginController {

	@Resource(name = "testService")
	private TestService testService;

	@RequestMapping(value = "/logincheck", method = RequestMethod.POST)
	public ResponseEntity<String> logincheck(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String userid = request.getParameter("userid");
		String userpw = request.getParameter("userpw");

		if (userid.equals("")) {
			return new UTF8Response("{\"success\":false, \"errorcode\":1}", "json").entity;
		}
		if (userpw.equals("")) {
			return new UTF8Response("{\"success\":false, \"errorcode\":2}", "json").entity;
		}

		System.out.println("id : " + userid);
		System.out.println("pw : " + userpw);
		LoginItem logindata = testService.checklogin(userid, userpw);
		if (logindata.loginstate) {
			HashMap<String, String> SessionMap = new HashMap<String, String>();
			SessionMap.put("email", email);
			SessionMap.put("password", password);
			SessionMap.put("submit_number", (logindata.cookies).toString());
			session.MakeSession(SessionMap, request, response);

			ArrayList<Cookie> cookies = logindata.cookies;
			System.out.println("Name : " + logindata.userName);
			for (Cookie cookie : cookies)
				response.addCookie(cookie);
			return new UTF8Response("{\"success\":true, \"username\":\"" + logindata.userName + "\"}", "json").entity;
		} else {
			System.out.println("Login Failed");
			return new UTF8Response("{\"success\":false, \"errorcode\":0}", "json").entity;
		}

		return null;
	}
}
