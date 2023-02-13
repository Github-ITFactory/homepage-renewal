package com.homepage.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.homepage.admin.entity.AdminEntity;
import com.homepage.admin.mapper.AdminMapper;
import com.homepage.enums.CommonResult;

@Service
public class AdminService {
	
	private final AdminMapper adminMapper;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	@Autowired
	public AdminService(AdminMapper adminMapper) {
        this.adminMapper = adminMapper;
    }
	
	public Enum<?> adminLogin(AdminEntity adminEntity) {
		boolean passwordCheck = false;
		
		AdminEntity admin = this.adminMapper.adminLogin(adminEntity);
		if(admin != null) {
			passwordCheck = passwordEncoder.matches(adminEntity.getPassword(), admin.getPassword());
		}
		
		if(passwordCheck) {
			return CommonResult.SUCCESS;
		}
		
		return CommonResult.FAILURE;
	}
}
