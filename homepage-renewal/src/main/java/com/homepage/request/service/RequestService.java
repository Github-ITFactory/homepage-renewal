package com.homepage.request.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.homepage.request.entity.RequestEntity;
import com.homepage.request.mapper.RequestMapper;
import com.homepage.request.vo.RequestVO;
import com.fasterxml.jackson.databind.deser.std.UUIDDeserializer;
import com.homepage.admin.entity.AdminEntity;
import com.homepage.enums.CommonResult;

@Service
public class RequestService {
	
	private final RequestMapper requestMapper;
	
	@Autowired
	public RequestService(RequestMapper requestMapper) {
        this.requestMapper = requestMapper;
    }
	
	public Enum<?> regist(RequestEntity requestEntity) {
		return this.requestMapper.regist(requestEntity) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
	}
	
	public RequestEntity[] requestList(int pageStart, int perPageNum) {
		return this.requestMapper.requestList(pageStart, perPageNum);
	}
	
	public RequestVO requestListCnt() {
		return this.requestMapper.requestListCnt();
	}
	
	public Enum<?> passwordCheck(int seq, String password) {
		RequestVO requestVO = this.requestMapper.passwordCheck(seq, password);
		
		return requestVO.getCnt() > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
	}
	
	public RequestEntity requestDetail(int seq) {
		return this.requestMapper.requestDetail(seq);
	}
	
	public Enum<?> fileRegist(int seq, MultipartFile file) throws IOException {
		String uuidfileName = null;
		String originFileName = null;
		String filePath = null;
		
		originFileName = file.getOriginalFilename();
		UUID uuid = UUID.randomUUID();
		uuidfileName = uuid.toString();
		
		filePath = "../Request/";
		
		File uploadFile = null;
		FileOutputStream fos = null;
		
		try {
			new File(filePath).mkdirs();
			uploadFile = new File(filePath + uuidfileName);
			uploadFile.createNewFile();
			fos = new FileOutputStream(uploadFile);
			fos.write(file.getBytes());
		} catch (IOException e) {
			throw e;
		} finally {
			if (fos != null) {
				fos.close();
			}

		}
		
		RequestEntity requestEntity = new RequestEntity();
		requestEntity.setSeq(seq);
		requestEntity.setFileNm(uuidfileName);
		requestEntity.setOrgFileNm(originFileName);
		requestEntity.setFilePath(filePath);
		
		return this.requestMapper.updateFile(requestEntity) > 0 ? CommonResult.SUCCESS : CommonResult.FAILURE;
	}
}
