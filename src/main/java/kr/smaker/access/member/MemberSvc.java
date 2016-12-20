package kr.smaker.access.member;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.smaker.access.main.RequestVO;
import kr.smaker.access.member.LoginVO;
import kr.smaker.access.member.UserVO;

@Service
public class MemberSvc {

    @Autowired
    private SqlSessionTemplate sqlSession;    
    
    public UserVO selectMember4Login(LoginVO param) {
        return sqlSession.selectOne("userMapper.selectMember4Login", param);
    }
    
    public void insertLogIn(String param) {
        sqlSession.insert("userMapper.insertLogIn", param);
    }

    public void insertLogOut(String param) {
        sqlSession.insert("userMapper.insertLogOut", param);
    }
    
    public void insertRequest(HashMap<String, Object> map) throws Exception {
    	sqlSession.insert("userMapper.insertRequest", map);
    }
    
    public List<Map<String, Object>> selectRequestList(Map<String, Object> map) throws Exception {
    	 return sqlSession.selectList("userMapper.selectRequestList", map);
    }
}
