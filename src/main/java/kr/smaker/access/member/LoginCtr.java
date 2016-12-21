package kr.smaker.access.member;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.smaker.access.member.LoginVO;
import kr.smaker.access.member.MemberSvc;
import kr.smaker.access.member.UserVO;

@Controller
public class LoginCtr {
	private static final Integer cookieExpire = 60 * 60 * 24 * 30; // 1 month

	@Autowired
	private MemberSvc memberSvc;

	/**
	 * �α���ȭ��.
	 */
	@RequestMapping(value = "memberLogin")
	public String memberLogin(HttpServletRequest request, ModelMap modelMap) {
		String userid = get_cookie("sid", request);
		
		modelMap.addAttribute("userid", userid);

		return "member/memberLogin";
	}

	/**
	 * �α��� ó��.
	 */
	@RequestMapping(value = "memberLoginChk")
	public String memberLoginChk(HttpServletRequest request, HttpServletResponse response, LoginVO loginInfo,
			ModelMap modelMap) {

		UserVO mdo = memberSvc.selectMember4Login(loginInfo);

		if (mdo == null) {
			modelMap.addAttribute("msg", "�α��� �� �� �����ϴ�.");
			return "common/message";
		}

		memberSvc.insertLogIn(mdo.getUserno());

		HttpSession session = request.getSession();

		session.setAttribute("userid", mdo.getUserid());
		session.setAttribute("userrole", mdo.getUserrole());
		session.setAttribute("userno", mdo.getUserno());
		session.setAttribute("usernm", mdo.getUsernm());

		if ("Y".equals(loginInfo.getRemember())) {
			set_cookie("sid", loginInfo.getUserid(), response);
		} else {
			set_cookie("sid", "", response);
		}

		return "redirect:/index";
	}

	/**
	 * �α׾ƿ�.
	 */
	@RequestMapping(value = "memberLogout")
	public String memberLogout(HttpServletRequest request, ModelMap modelMap) {
		HttpSession session = request.getSession();

		String userno = session.getAttribute("userno").toString();

		memberSvc.insertLogOut(userno);

		session.removeAttribute("userid");
		session.removeAttribute("userrole");
		session.removeAttribute("userno");
		session.removeAttribute("usernm");
		
		session.invalidate();

		return "redirect:/memberLogin";
	}

	/**
	 * ����ڰ� �������������� �����ϸ� ���� ���.
	 */
	@RequestMapping(value = "noAuthMessage")
	public String noAuthMessage(HttpServletRequest request) {
		return "common/noAuth";
	}

	/*
	 * -------------------------------------------------------------------------
	 */
	/**
	 * ��Ű ����.
	 */
	public static void set_cookie(String cid, String value, HttpServletResponse res) {

		Cookie ck = new Cookie(cid, value);
		ck.setPath("/");
		ck.setMaxAge(cookieExpire);
		res.addCookie(ck);
	}

	/**
	 * ��Ű ��������.
	 */
	public static String get_cookie(String cid, HttpServletRequest request) {
		String ret = "";

		if (request == null) {
			return ret;
		}

		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return ret;
		}

		for (Cookie ck : cookies) {
			if (ck.getName().equals(cid)) {
				ret = ck.getValue();

				ck.setMaxAge(cookieExpire);
				break;
			}
		}
		return ret;
	}
}
