package kr.smaker.access.Tool;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginSession {

	public String encryption(String data) {
		String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(data.getBytes());
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			SHA = null;
		}
		return SHA;
	}

	public int MakeSession(HashMap<String, String> map, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Cookie[] cookies = request.getCookies();

		String userid = map.get("userid");
		String userpw = map.get("userpw");
		String idx = map.get("idx");
		System.out.println("LoginSession---------------");
		System.out.println("id : " + userid);
		System.out.println("pw : " + userpw);
		System.out.println("idx : " + idx);

		String alldata = userid + userpw;
		String resultdata = encryption(alldata);
		System.out.println("alldata : " + alldata);
		System.out.println("resultdata : " + resultdata);

		Cookie saveCookie = new Cookie("Auth", resultdata);
		
		response.addCookie(saveCookie);
		
		if (cookies != null)
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("Auth")) {
					if (resultdata.equals(cookie.getValue())) {
						System.out.println("Auth Cookie : " + cookie.getValue());
						return Integer.parseInt(idx);
					}
				}
			}
		return -1;
	}
	
	public int CheckSession(HashMap<String, String> map, HttpServletRequest request, HttpServletResponse response){
		Cookie[] cookies = request.getCookies();

		String userid = map.get("userid");
		String userpw = map.get("userpw");
		String idx = map.get("idx");
		System.out.println("LoginSession---------------");
		System.out.println("userid : " + userid);
		System.out.println("userpw : " + userpw);
		System.out.println("idx : " + idx);

		String alldata = userid + userpw;
		String resultdata = encryption(alldata);
		System.out.println("alldata : " + alldata);
		System.out.println("resultdata : " + resultdata);

//		Cookie saveCookie = new Cookie("Auth", resultdata);
		
//		response.addCookie(saveCookie);
		
		if (cookies != null)
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("Auth")) {
					if (resultdata.equals(cookie.getValue())) {
						System.out.println("Auth Cookie : " + cookie.getValue());
						return Integer.parseInt(idx);
					}
				}
			}
		return -1;
	}
}