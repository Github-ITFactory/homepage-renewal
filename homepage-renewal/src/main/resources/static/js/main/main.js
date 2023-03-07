/**
 * 전역변수
 */
// const getTest = document.getElementById('getTest');


/**
 * 이벤트함수
 */

// getTest.addEventListener('click', () => {
// 	let test = document.getElementsByTagName('div')[0].innerHTML;
// 	xhr(`./getTest?test=${test}`, null, 'GET', 'getTest');
// });

/** 스크롤 애니메이션*/
AOS.init();

let observer = new IntersectionObserver((e)=>{
	// 화면에 등장시 코드 실행
	e.forEach((on)=>{
		if(on.isIntersecting){
			on.target.style.backgroundColor = '#F57E25';
		} else {
			on.target.style.backgroundColor = '#000';
		}
		// on.intersectionRatio
	})
});

let leftWrap = document.querySelector('.left-wrap');
observer.observe(leftWrap);
observer.observe(leftWrap[0]);


/**
 * XMLHttpRequest 성공 함수
 */
let successXhr = (responseObject, flag) => {
	if(flag == 'postTest') {
		alert(`POST : ${responseObject['mainEntity']}`);
	} else if(flag == 'getTest') {
		alert(`GET : ${responseObject['mainEntity']}`);
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

