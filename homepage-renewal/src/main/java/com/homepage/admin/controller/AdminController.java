package com.homepage.admin.controller;

import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.homepage.admin.entity.AdminEntity;
import com.homepage.admin.service.AdminService;
import com.homepage.enums.CommonResult;

@Controller
public class AdminController {
	
	private final AdminService adminService;
	
	@Autowired
	public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }
	
	@RequestMapping("/admin")
	public ModelAndView main() {
		ModelAndView modelAndView = new ModelAndView("admin/admin");
        
        return modelAndView;
    }
	
	@SuppressWarnings("unchecked")
	@PostMapping("/adminLogin")
	@ResponseBody
	public String adminLogin(HttpSession session, AdminEntity adminEntity) {
		JSONObject responseObject = new JSONObject();
		Enum<?> result = this.adminService.adminLogin(adminEntity);
		adminEntity.setPassword("");
		responseObject.put("result", result.name().toLowerCase());
		
		if(result == CommonResult.SUCCESS) {
			session.setAttribute("userId", adminEntity.getUserId());
		}
        
        return responseObject.toString();
	}
}
