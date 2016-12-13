package kr.smaker.access.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {
	@RequestMapping(value = "/logincheck", method = RequestMethod.POST)
	public void logincheck() {
		
	}
}
