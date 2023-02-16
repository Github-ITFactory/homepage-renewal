/**
 * 전역변수
 */
const noticeModify = document.getElementById('noticeModify');
const noticeList = document.getElementById('noticeList');
const seq = document.getElementById('seq').value;

/**
 * 이벤트함수
 */
noticeModify.addEventListener('click', () => {
	window.location.href = "/notice/notice_modify?seq=" + seq;
});

noticeList.addEventListener('click', () => {
	window.location.href = "/notice?page=1";
});

/**
 * XMLHttpRequest 성공 함수
 */
let successXhr = (responseObject, flag) => {

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

