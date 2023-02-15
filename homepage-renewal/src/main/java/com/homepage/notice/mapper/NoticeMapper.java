package com.homepage.notice.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.homepage.notice.entity.NoticeEntity;
import com.homepage.notice.vo.NoticeVO;

@Mapper
public interface NoticeMapper {
	NoticeVO noticeListCnt();
}
