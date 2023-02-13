/**
 * 전역변수
 */
const loginBtn = document.getElementById('loginBtn');
const userId = document.getElementById('userId');
const password = document.getElementById('password');

/**
 * 이벤트함수
 */
loginBtn.addEventListener('click', () => {
	const formData = new FormData();
	let userId = document.getElementById('userId').value
	let password = document.getElementById('password').value
	
	if(userId === "") {
		alert('아이디를 입력해주세요.');
		return false;
	} else if(password === "") {
		alert('비밀번호를 입력해주세요.');
		return false;
	}
	
	formData.append('userId', userId);
	formData.append('password', password);
	
	xhr('./adminLogin', formData, 'POST', 'adminLogin');
});

userId.addEventListener('keyup', (e) => {
	if(e.keyCode === 13) {
		e.preventDefault();
		loginBtn.click();
	}
});

password.addEventListener('keyup', (e) => {
	if(e.keyCode === 13) {
		e.preventDefault();
		loginBtn.click();
	}
});

/**
 * 사용자함수
 */

/**
 * XMLHttpRequest 성공 함수
 */
let successXhr = (responseObject, flag) => {
	if(flag == 'adminLogin') {
		window.location.href = "/";
	}
}

/**
 * XMLHttpRequest default 함수
 */
let defaultXhr = (responseObject, flag) => {
	if(flag == 'adminLogin') {
		alert('아이디 또는 비밀번호를 잘못 입력했습니다.');
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