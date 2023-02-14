package com.homepage.smart_haccp.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.homepage.enums.CommonResult;
import com.homepage.main.entity.MainEntity;
import com.homepage.main.service.MainService;

@Controller
public class SmarthaccpController {
	
	@RequestMapping("/smarthaccp")
	public ModelAndView main() {
		ModelAndView modelAndView = new ModelAndView("pages/smart_haccp");
        
        return modelAndView;
    }
}
