package com.homepage.notice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.homepage.enums.CommonResult;
import com.homepage.notice.entity.NoticeEntity;
import com.homepage.notice.mapper.NoticeMapper;
import com.homepage.notice.vo.NoticeVO;
import com.homepage.request.entity.RequestEntity;

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
	
	public Enum<?> regist(NoticeEntity noticeEntity) {
		return this.noticeMapper.regist(noticeEntity) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
	}
	
	public NoticeEntity noticeDetail(int seq) {
		return this.noticeMapper.noticeDetail(seq);
	}
	
	public Enum<?> notice_modify(NoticeEntity noticeEntity) {
		return this.noticeMapper.notice_modify(noticeEntity) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
	}
}
