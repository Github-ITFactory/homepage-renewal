package com.homepage.admin.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.homepage.admin.entity.AdminEntity;
import com.homepage.main.entity.MainEntity;

@Mapper
public interface AdminMapper {
	AdminEntity adminLogin(AdminEntity adminEntity);
}
