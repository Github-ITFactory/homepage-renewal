package com.homepage.performance.controller;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.servlet.ModelAndView;

import com.homepage.common.Criteria;
import com.homepage.common.Paging;
import com.homepage.performance.entity.PerformanceEntity;
import com.homepage.performance.service.PerformanceService;
import com.homepage.performance.vo.PerformanceVO;

@Controller
@RequestMapping(value = "/performance")
public class PerformanceController {
	
	private final PerformanceService performanceService;
	
	@Autowired
	public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }
	
	@RequestMapping("")
	public ModelAndView main(@SessionAttribute(value = "userId", required = false) String userId, @RequestParam(value = "part", required = false) String part, @RequestParam(value = "page", required = false) int page) {
		ModelAndView modelAndView = new ModelAndView("performance/performance");
		PerformanceVO performanceVO = this.performanceService.performanceListCnt(part);
		
		int cnt = performanceVO.getCnt();
		Criteria cri = new Criteria();
		cri.setPage(page);
		
		Paging paging = new Paging();
        paging.setCri(cri);
        paging.setTotalCount(cnt);
		
        int pageStart = cri.getPageStart();
		int perPageNum = cri.getPerPageNum();
		
 		PerformanceEntity[] performanceList = this.performanceService.performanceList(part, pageStart, perPageNum);
		modelAndView.addObject("performanceList", performanceList);
		if(userId != null) {
			modelAndView.addObject("userId", userId);
		}
		modelAndView.addObject("part", part);
		modelAndView.addObject("paging", paging);
        
        return modelAndView;
    }
	
	@RequestMapping("/regist")
	public ModelAndView regist(@SessionAttribute(value = "userId", required = false) String userId) {
		ModelAndView modelAndView;
		if(!"admin".equals(userId)) {
			modelAndView = new ModelAndView("redirect:/");			
		} else {
			modelAndView = new ModelAndView("performance/regist");
		}
        
        return modelAndView;
    }
	
	@SuppressWarnings("unchecked")
	@PostMapping("/regist")
	@ResponseBody
	public String regist(PerformanceEntity performanceEntity) {
		JSONObject responseObject = new JSONObject();
		Enum<?> result = this.performanceService.regist(performanceEntity);
		responseObject.put("result", result.name().toLowerCase());
        
        return responseObject.toString();
	}
}
