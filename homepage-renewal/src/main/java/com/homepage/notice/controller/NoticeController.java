package com.homepage.notice.controller;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
        
        return modelAndView;
    }
}
