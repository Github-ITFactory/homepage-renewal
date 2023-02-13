/**
 * 전역변수
 */
const seq = document.getElementById('seq');
const confirmBtn = document.getElementById('confirmBtn');

/**
 * 이벤트함수
 */
confirmBtn.addEventListener('click', () => {
	let password = document.getElementById('password').value;
	let seqValue = seq.value
	if(password === "") {
		alert('비밀번호를 입력해주세요.');
		return false;
	}

	xhr(`./passwordCheck?seq=${seqValue}&password=${password}`, null, 'GET', 'passwordCheck');
});

/**
 * 사용자 함수
 */


/**
 * XMLHttpRequest 성공 함수
 */
let successXhr = (responseObject, flag) => {
	if(flag === "passwordCheck") {
		let seqValue = seq.value;
		window.location.href = `/request/detail?seq=${seqValue}`
	}
}

/**
 * XMLHttpRequest default 함수
 */
let defaultXhr = (responseObject, flag) => {
	if(flag === "passwordCheck") {
		alert('비밀번호를 다시 입력해주세요.');
		return false;
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
	                	defaultXhr(responseObject, flag);
	            }
	        } else {
	        	alert('서버와 통신하지 못하였습니다.');
	        }
	    }
	}
	xhr.send(formData);
}