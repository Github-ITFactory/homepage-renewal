package com.homepage.performance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homepage.performance.entity.PerformanceEntity;
import com.homepage.performance.mapper.PerformanceMapper;
import com.homepage.performance.vo.PerformanceVO;
import com.homepage.enums.CommonResult;

@Service
public class PerformanceService {
	
	private final PerformanceMapper performanceMapper;
	
	@Autowired
	public PerformanceService(PerformanceMapper performanceMapper) {
        this.performanceMapper = performanceMapper;
    }
	
	public Enum<?> regist(PerformanceEntity performanceEntity) {
		return this.performanceMapper.regist(performanceEntity) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
	}
	
	public PerformanceEntity[] performanceList(String part, int pageStart, int perPageNum) {
		return this.performanceMapper.performanceList(part, pageStart, perPageNum);
	}
	
	public PerformanceVO performanceListCnt(String part) {
		return this.performanceMapper.performanceListCnt(part);
	}
}
