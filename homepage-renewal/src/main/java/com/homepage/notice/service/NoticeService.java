package com.homepage.notice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homepage.notice.entity.NoticeEntity;
import com.homepage.notice.mapper.NoticeMapper;
import com.homepage.notice.vo.NoticeVO;

@Service
public class NoticeService {
	
	private final NoticeMapper noticeMapper;
	
	@Autowired
	public NoticeService(NoticeMapper noticeMapper) {
        this.noticeMapper = noticeMapper;
    }
	
	public NoticeVO noticeListCnt() {
		return this.noticeMapper.noticeListCnt();
	}
	
	public NoticeEntity[] noticeList(int pageStart, int perPageNum) {
		return this.noticeMapper.noticeList(pageStart, perPageNum);
	}
}
