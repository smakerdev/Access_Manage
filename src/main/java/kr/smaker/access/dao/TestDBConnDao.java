package kr.smaker.access.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.Cookie;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import kr.smaker.access.dao.UserInfo;

@Repository("testDBConnDao")
public class TestDBConnDao {

	@Autowired
	private static SqlSession sqlSession;

	public static LoginItem checklogin(String id, String pw) {
		String out = sqlSession.selectOne("userMapper.getpwd", id);
		System.out.println("out : " + out);

		System.out.println("Login Result : " + ((out != null) ? out.equals(pw) : "null"));

		if ((out != null) && out.equals(pw)) {
			System.out.println("[WELCOME!!!]");
			UserInfo realData = (UserInfo) sqlSession.selectOne("userMapper.test", id);
			// UserData realData = (UserData)data.get(0);
			// System.out.println("Size : " + data.size());
			System.out.println("User ID : " + realData.getUserid());
			System.out.println("User PW : " + realData.getUserpw());
			System.out.println("User Name : " + realData.getUsername());
			System.out.println("User Member : " + realData.getIdx());

			ArrayList<Cookie> cookies = new ArrayList<Cookie>();
			cookies.add(new Cookie("idx_number", String.valueOf(realData.getIdx())));
			return new LoginItem(realData.getUsername(), cookies, null, true);
		} else
			return new LoginItem(null, null, null, false);
	}
}
