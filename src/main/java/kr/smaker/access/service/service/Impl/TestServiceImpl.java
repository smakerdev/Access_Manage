package kr.smaker.access.service.service.Impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.smaker.access.dao.LoginItem;
import kr.smaker.access.dao.TestDBConnDao;
import kr.smaker.access.service.TestService;



@Service("testService")
public class TestServiceImpl implements TestService {
	
    @Resource(name="testDBConnDao")
    private TestDBConnDao testDBConnDao;
    
    public LoginItem checklogin(String id, String pw) throws Exception {
		return TestDBConnDao.checklogin(id, pw);
	}
}