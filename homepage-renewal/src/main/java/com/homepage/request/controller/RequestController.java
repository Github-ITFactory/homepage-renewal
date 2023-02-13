package com.homepage.request.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.homepage.admin.entity.AdminEntity;
import com.homepage.common.Criteria;
import com.homepage.common.Paging;
import com.homepage.enums.CommonResult;
import com.homepage.performance.entity.PerformanceEntity;
import com.homepage.request.entity.RequestEntity;
import com.homepage.request.service.RequestService;
import com.homepage.request.vo.RequestVO;

@Controller
@RequestMapping(value = "/request")
public class RequestController {
	
	private final RequestService requestService;
	
	@Autowired
	public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }
	
	@RequestMapping("")
	public ModelAndView main(@SessionAttribute(value = "userId", required = false) String userId, @RequestParam(value = "page", required = false) int page) {
		ModelAndView modelAndView = new ModelAndView("request/request");
		RequestVO requestVO = this.requestService.requestListCnt();
		
		int cnt = requestVO.getCnt();
		Criteria cri = new Criteria();
		cri.setPage(page);
		
		Paging paging = new Paging();
        paging.setCri(cri);
        paging.setTotalCount(cnt);
		
        int pageStart = cri.getPageStart();
		int perPageNum = cri.getPerPageNum();
		
		RequestEntity[] requestList = this.requestService.requestList(pageStart, perPageNum);
		modelAndView.addObject("requestList", requestList);
		modelAndView.addObject("paging", paging);
        
        return modelAndView;
    }
	
	@RequestMapping("/password")
	public ModelAndView password(@RequestParam(value = "seq", required = false) int seq) {
		ModelAndView modelAndView = new ModelAndView("request/request_password");
		modelAndView.addObject("seq", seq);
        
        return modelAndView;
    }
	
	@RequestMapping("/detail")
	public ModelAndView detail(@RequestParam(value = "seq", required = false) int seq) {
		ModelAndView modelAndView = new ModelAndView("request/request_detail");
		RequestEntity requestEntity = this.requestService.requestDetail(seq);
		
		modelAndView.addObject("seq", seq);
		modelAndView.addObject("requestEntity", requestEntity);
        
        return modelAndView;
    }
	
	@RequestMapping("/request_regist")
	public ModelAndView request_regist() {
		ModelAndView modelAndView = new ModelAndView("request/request_regist");
        
        return modelAndView;
    }
	
	@SuppressWarnings("unchecked")
	@GetMapping("/passwordCheck")
	@ResponseBody
	public String passwordCheck(@RequestParam(value = "seq", required = false) int seq, @RequestParam(value = "password", required = false) String password, HttpSession session) {
		JSONObject responseObject = new JSONObject();
		Enum<?> result = this.requestService.passwordCheck(seq, password);
		responseObject.put("result", result.name().toLowerCase());
		
		if("success".equals(result.name().toLowerCase())) {
			session.setAttribute("passwordCheck", "success");
		}
        
        return responseObject.toString();
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/regist")
	@ResponseBody
	public String regist(RequestEntity requestEntity) {
		JSONObject responseObject = new JSONObject();
		Enum<?> result = this.requestService.regist(requestEntity);
		responseObject.put("result", result.name().toLowerCase());
		responseObject.put("seq", requestEntity.getSeq());
        
        return responseObject.toString();
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/fileRegist")
	@ResponseBody
	public String fileRegist(@RequestParam(value = "seq", required = false) int seq,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		JSONObject responseObject = new JSONObject();
		Enum<?> result = this.requestService.fileRegist(seq, file);
		responseObject.put("result", result.name().toLowerCase());
        
        return responseObject.toString();
	}
	
	@SuppressWarnings("unchecked")
	@GetMapping("/fileDown")
	@ResponseBody
	public void fileDown(@RequestParam(value = "seq", required = false) int seq, HttpServletResponse response) throws IOException {
		RequestEntity requestEntity = this.requestService.requestDetail(seq);
        
		String file = requestEntity.getFilePath() + requestEntity.getFileNm();
		File downfile = new File(file);
		String fileName = URLEncoder.encode(requestEntity.getOrgFileNm(), "UTF-8");
		
		FileInputStream fis = null;
		response.setContentLength((int) downfile.length());
		response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
		
		OutputStream out = response.getOutputStream();
		try {
			fis = new FileInputStream(downfile);
			FileCopyUtils.copy(fis, out);
		} catch (IOException e) {
			throw e;
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					throw e;
				}
			}
		}
		out.flush();
	}
}
