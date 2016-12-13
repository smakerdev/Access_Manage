package kr.smaker.access.dao;

import java.util.ArrayList;

import javax.servlet.http.Cookie;

public class LoginItem {
	public String userName;
	public ArrayList<Cookie> cookies;
	public String extraData;
	public boolean loginstate;

	public LoginItem(String userName, ArrayList<Cookie> cookies, String extraData, boolean loginstate) {
		this.userName = userName;
		this.cookies = cookies;
		this.extraData = extraData;
		this.loginstate = loginstate;
	}
}
