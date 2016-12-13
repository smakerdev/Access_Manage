package kr.smaker.access.service;

import java.util.HashMap;
import java.util.List;

import kr.smaker.access.dao.LoginItem;

public interface TestService {
	public LoginItem checklogin(String id, String pw) throws Exception;
}
