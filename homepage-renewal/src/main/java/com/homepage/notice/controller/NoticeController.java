package com.homepage.notice.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.homepage.common.Criteria;
import com.homepage.common.Paging;
import com.homepage.enums.CommonResult;
import com.homepage.notice.entity.NoticeEntity;
import com.homepage.notice.service.NoticeService;
import com.homepage.notice.vo.NoticeVO;
import com.homepage.request.entity.RequestEntity;

@Controller
@RequestMapping(value = "/notice")
public class NoticeController {
	
	private final NoticeService noticeService;
	
	@Autowired
	public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }
	
	@RequestMapping("")
	public ModelAndView notice(@RequestParam(value = "page", required = false) int page) {
		ModelAndView modelAndView = new ModelAndView("notice/notice");
		NoticeVO noticeVO = this.noticeService.noticeListCnt();
		
		int cnt = noticeVO.getCnt();
		Criteria cri = new Criteria();
		cri.setPage(page);
		
		Paging paging = new Paging();
        paging.setCri(cri);
        paging.setTotalCount(cnt);
		
        int pageStart = cri.getPageStart();
		int perPageNum = cri.getPerPageNum();
		
		NoticeEntity[] noticeList = this.noticeService.noticeList(pageStart, perPageNum);
		modelAndView.addObject("noticeList", noticeList);
		modelAndView.addObject("paging", paging);
		
        return modelAndView;
    }
	
	@RequestMapping("/notice_regist")
	public ModelAndView notice_regist() {
		ModelAndView modelAndView = new ModelAndView("notice/notice_regist");
        
        return modelAndView;
    }
	
	@SuppressWarnings("unchecked")
	@PostMapping("/regist")
	@ResponseBody
	public String regist(NoticeEntity noticeEntity) {
		JSONObject responseObject = new JSONObject();
		Enum<?> result = this.noticeService.regist(noticeEntity);
		responseObject.put("result", result.name().toLowerCase());
        
        return responseObject.toString();
	}
	
	@RequestMapping("/notice_detail")
	public ModelAndView notice_detail(@RequestParam(value = "seq", required = false) int seq) {
		ModelAndView modelAndView = new ModelAndView("notice/notice_detail");
		NoticeEntity noticeEntity = this.noticeService.noticeDetail(seq);
		
		modelAndView.addObject("noticeEntity", noticeEntity);
		modelAndView.addObject("seq", seq);
        
        return modelAndView;
    }
	
	@RequestMapping("/notice_modify")
	public ModelAndView notice_modify(@RequestParam(value = "seq", required = false) int seq) {
		ModelAndView modelAndView = new ModelAndView("notice/notice_modify");
		NoticeEntity noticeEntity = this.noticeService.noticeDetail(seq);
		
		modelAndView.addObject("noticeEntity", noticeEntity);
		modelAndView.addObject("seq", seq);
        
        return modelAndView;
    }
	
	@SuppressWarnings("unchecked")
	@PutMapping("/notice_modify")
	@ResponseBody
	public String notice_modify(NoticeEntity noticeEntity) {
		JSONObject responseObject = new JSONObject();
		Enum<?> result = this.noticeService.notice_modify(noticeEntity);
		responseObject.put("result", result.name().toLowerCase());
        
        return responseObject.toString();
	}
}
