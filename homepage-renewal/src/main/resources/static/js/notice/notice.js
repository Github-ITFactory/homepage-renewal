/**
 * 전역변수
 */
const tableTr = document.getElementsByClassName('tableTr');
const noticeRegist = document.getElementById('noticeRegist');
const pageNum = document.getElementsByClassName('pageNum');

/**
 * 이벤트함수
 */
for(let i = 0; i < tableTr.length; i++) {
	tableTr[i].addEventListener('mouseover', (e) => {
		e.target.parentElement.classList.add("mouseover");
	});
	
	tableTr[i].addEventListener('mouseout', (e) => {
		e.target.parentElement.classList.remove("mouseover");
	});
	
	tableTr[i].addEventListener('click', (e) => {
		let seq = e.target.parentElement.children[0].innerText;
		
		window.location.href = '/notice/notice_detail?seq=' + seq;
	});
}

if(noticeRegist != null) {
	noticeRegist.addEventListener('click', () => {
		window.location.href = "/notice/notice_regist";
	});
}

for(let i = 0; i < pageNum.length; i++) {
	if(pageNum[i].innerText == page) {
		pageNum[i].classList.add('on');
	}
}

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

