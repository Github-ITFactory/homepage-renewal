/**
 * 전역변수
 */
const registBtn = document.getElementById('registBtn');

/**
 * 이벤트함수
 */
registBtn.addEventListener('click', () => {
	const formData = new FormData();
	let name = document.getElementById('name').value;
	let email = document.getElementById('email').value;
	let phone = document.getElementById('phone').value;
	let position = document.getElementById('position').value;
	let detail = document.getElementById('detail').value;
	let password = document.getElementById('password').value;
	
	if(name === "") {
		alert('이름을 입력해주세요.');
		return false;
	} else if(email === "") {
		alert('이메일을 입력해주세요.');
		return false;
	} else if(phone === "") {
		alert('연락처를 입력해주세요.');
		return false;
	} else if(position === "") {
		alert('직책을 입력해주세요.');
		return false;
	} else if(detail === "") {
		alert('내용을 입력해주세요.');
		return false;
	} else if(password === "") {
		alert('비밀번호를 입력해주세요.');
		return false;
	}
	
	formData.append('name', name);
	formData.append('email', email);
	formData.append('phone', phone);
	formData.append('position', position);
	formData.append('detail', detail);
	formData.append('password', password);
	
	xhr('./regist', formData, 'POST', 'regist');
});

/**mybatis update 파라미터 여러개
 * 사용자 함수
 */

/**
 * XMLHttpRequest 성공 함수
 */
let successXhr = (responseObject, flag) => {
	if(flag === "regist") {
		let seq = responseObject.seq;
		
		const formData = new FormData();
		
		formData.append('seq', seq);
		if(document.getElementById('file').files[0] !== undefined) {
			let file = document.getElementById('file').files[0];			
			formData.append('file', file);
			xhr('./fileRegist', formData, 'POST', 'fileRegist');
		} else {
			alert('등록이 완료되었습니다.');
			window.location.href = "/request?page=1"
		}
		
	} else if(flag === 'fileRegist') {
		alert('등록이 완료되었습니다.');
		window.location.href = "/request?page=1"
	}
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