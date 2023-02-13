package com.homepage.request.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.homepage.request.entity.RequestEntity;
import com.homepage.request.vo.RequestVO;

@Mapper
public interface RequestMapper {
	int regist(RequestEntity requestEntity);
	
 	RequestEntity[] requestList(@Param(value = "pageStart") int pageStart, @Param(value = "perPageNum") int perPageNum);
	
	RequestVO requestListCnt();
	
	RequestVO passwordCheck(@Param(value = "seq") int seq, @Param(value = "password") String password);
	
	RequestEntity requestDetail(@Param(value = "seq") int seq);
	
	int updateFile(RequestEntity requestEntity);
}
