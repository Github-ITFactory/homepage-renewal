package com.homepage.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homepage.main.entity.MainEntity;
import com.homepage.main.mapper.MainMapper;

@Service
public class MainService {
	
	private final MainMapper mainMapper;
	
	@Autowired
	public MainService(MainMapper mainMapper) {
        this.mainMapper = mainMapper;
    }
	
	public MainEntity test() {
		return this.mainMapper.test();
	}
	
	public MainEntity getTest(String test) {
		return this.mainMapper.getTest(test);
	}
	
	public MainEntity postTest(String test) {
		return this.mainMapper.postTest(test);
	}
}
