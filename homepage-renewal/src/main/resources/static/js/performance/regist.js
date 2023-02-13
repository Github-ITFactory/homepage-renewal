/**
 * 전역변수
 */
const registBtn = document.getElementById('registBtn');

/**
 * 이벤트함수
 */

registBtn.addEventListener("click", () => {
	const formData = new FormData();
	
	let compName = document.getElementById('compName').value;
	let sector = document.getElementById('sector').value;
	let field = document.getElementById('field').value;
	let detail = document.getElementById('detail').value;
	let part = document.getElementById('part').value;
	
	formData.append('compName', compName);
	formData.append('sector', sector);
	formData.append('field', field);
	formData.append('detail', detail);
	formData.append('part', part);
	
	xhr('./regist', formData, 'POST', 'regist');
});

/**
 * XMLHttpRequest 성공 함수
 */
let successXhr = (responseObject, flag) => {
	if(flag === "regist") {
		alert('등록 완료');
		document.getElementById('compName').value = "";
		document.getElementById('sector').value = "";
		document.getElementById('field').value = "";
		document.getElementById('detail').value= "";
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