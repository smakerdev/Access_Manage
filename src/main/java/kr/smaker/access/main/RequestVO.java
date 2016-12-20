package kr.smaker.access.main;

public class RequestVO {
	private String name;
	private String gradenumber;
	private String status;
	private String reason;
	private String outtime;
	private String backtime;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGradenumber() {
		return gradenumber;
	}
	public void setGradenumber(String gradenumber) {
		this.gradenumber = gradenumber;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getOuttime() {
		return outtime;
	}
	public void setOuttime(String outtime) {
		this.outtime = outtime;
	}
	public String getBacktime() {
		return backtime;
	}
	public void setBacktime(String backtime) {
		this.backtime = backtime;
	}
}
