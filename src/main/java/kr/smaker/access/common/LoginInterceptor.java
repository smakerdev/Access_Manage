package kr.smaker.access.common;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LoginInterceptor implements HandlerInterceptor {

	/**
	 * Controller ���� ��û��. �Ϲ� ������� �α��� üũ.
	 */
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) {
		HttpSession session = req.getSession();

		/*
		 * session.setAttribute("userid", "admin");
		 * session.setAttribute("userrole", "A"); session.setAttribute("userno",
		 * "1"); session.setAttribute("usernm", "������");
		 */

		try {
			if (session == null || session.getAttribute("userno") == null) {
				res.sendRedirect("memberLogin");
				return false;
			}
		} catch (IOException ex) {
		}

		return true;
	}

	public void postHandle(HttpServletRequest req, HttpServletResponse res, Object handler, ModelAndView mv) {
	}

	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handler, Exception ex) {
	}

}
