package com.homepage.notice.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.homepage.notice.entity.NoticeEntity;
import com.homepage.notice.vo.NoticeVO;
import com.homepage.request.entity.RequestEntity;

@Mapper
public interface NoticeMapper {
	NoticeVO noticeListCnt();
	
	NoticeEntity[] noticeList(@Param(value = "pageStart") int pageStart, @Param(value = "perPageNum") int perPageNum);
	
	int regist(NoticeEntity noticeEntity);
	
	NoticeEntity noticeDetail(@Param(value = "seq") int seq);
	
	int notice_modify(NoticeEntity noticeEntity);
}
