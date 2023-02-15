/**
 * 전역변수
 */
const tableTr = document.getElementsByClassName('tableTr');
const requestRegistBtn = document.getElementById('requestRegistBtn');

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
		
		if(session === 'admin') {
			window.location.href = '/request/detail?seq=' + seq;
		} else {
			window.location.href = "/request/password?seq=" + seq;			
		}
	});
}

requestRegistBtn.addEventListener('click', (e) => {
	window.location.href = "/request/request_regist";
});

/**
 * 사용자 함수
 */

/**
 * XMLHttpRequest 성공 함수
 */
let successXhr = (responseObject, flag) => {
	
}

/**
 * XMLHttpRequest default 함수
 */
let defaultXhr = (responseObject, flag) => {
	
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
	                	defaultXhr(responseObject, flag);
	            }
	        } else {
	        	alert('서버와 통신하지 못하였습니다.');
	        }
	    }
	}
	xhr.send(formData);
}