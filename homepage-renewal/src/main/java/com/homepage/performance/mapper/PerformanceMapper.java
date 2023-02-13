package com.homepage.performance.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.homepage.performance.entity.PerformanceEntity;
import com.homepage.performance.vo.PerformanceVO;

@Mapper
public interface PerformanceMapper {
	int regist(PerformanceEntity performanceEntity);
	
 	PerformanceEntity[] performanceList(@Param(value = "part") String part, @Param(value = "pageStart") int pageStart, @Param(value = "perPageNum") int perPageNum);
	
	PerformanceVO performanceListCnt(@Param(value = "part") String part);
}
