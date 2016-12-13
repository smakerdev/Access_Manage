package kr.smaker.access.Tool;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UTF8Response
{
	public ResponseEntity<String> entity = null;
	public UTF8Response(String body, String type)
	{
		HttpHeaders headers = new HttpHeaders();
		if(type.equalsIgnoreCase("JSON")) headers.add("Content-Type", "application/json; charset=utf-8");
		else if(type.equalsIgnoreCase("HTML")) headers.add("Content-Type", "text/html; charset=utf-8");

		this.entity = new ResponseEntity<String>(body, headers, HttpStatus.OK);
	}
}