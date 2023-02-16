/**
 * 전역변수
 */
const noticeModify = document.getElementById("noticeModify");

/**
 * 이벤트함수
 */
noticeModify.addEventListener('click', () => {
	const formData = new FormData();
	let seq = document.getElementById('seq').value;
	let title = document.getElementById('title').value;
	let contents = CKEDITOR.instances.contents.getData();
	
	if(title === "") {
		alert('제목을 입력해주세요.');
		return false;
	} else if(contents === "") {
		alert('내용을 입력해주세요.');
		return false;
	}
	
	formData.append('seq', seq);
	formData.append('title', title);
	formData.append('contents', contents);
	
	xhr('./notice_modify', formData, 'PUT', 'notice_modify');
});

/**
 * 사용자함수
 */
window.onload = function(){
	ck = CKEDITOR.replace("contents", {
		height:500
	});
};

CKEDITOR.config.resize_enabled = false;

/**
 * XMLHttpRequest 성공 함수
 */
let successXhr = (responseObject, flag) => {
	if(flag === 'notice_modify') {
		alert('수정이 완료되었습니다.');
		let seq = document.getElementById('seq').value;
		window.location.href = "/notice/notice_detail?seq=" + seq;
	}
}

/**
 * XMLHttpRequest 함수
 */
let xhr = (url, formData, method, flag) => {
	const xhr = new XMLHttpRequest();
	
	xhr.open(method, url);
	xhr.onreadystatechange = () => {
	    if (xhr.readyState === XMLHttpRequest.DONE) {
	        if (xhr.status >= 200 && xhr.status < 300) {
	            const responseObject = JSON.parse(xhr.responseText);
	            switch (responseObject['result']) {
	                case 'success':
	                	successXhr(responseObject, flag);
	                    break;
	                default:
	                    alert('오류가 발생했습니다.');
	            }
	        } else {
	        	alert('서버와 통신하지 못하였습니다.');
	        }
	    }
	}
	xhr.send(formData);
}

