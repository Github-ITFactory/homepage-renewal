package com.homepage.main.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.homepage.main.entity.MainEntity;

@Mapper
public interface MainMapper {
	MainEntity test();
	
	MainEntity getTest(@Param(value = "test") String test);
	
	MainEntity postTest(@Param(value = "test") String test);
}
