/**
 * 전역변수
 */
const performRegist = document.getElementById('performRegist');
const all = document.getElementById('all');
const food = document.getElementById('food');
const manuf = document.getElementById('manuf');
const etc = document.getElementById('etc');

/**
 * 이벤트함수
 */
if(performRegist != null) {
	performRegist.addEventListener('click', () => {
		window.location.href = "/performance/regist";
	});
}

let ovf, slider;
$(function(){
ovf = this.getElementById("overflow");
slider = this.getElementById("slider");
winResize();
$(window).bind({resize: winResize, scroll: winScroll});
});
function winResize(){
ovf.style.top = slider.offsetHeight + "px";
}


/**
 * 사용자 함수
 */
if(part === '0') {
	all.style.backgroundColor = 'red';
} else if(part === '1') {
	food.style.backgroundColor = 'red';
} else if(part === '2') {
	manuf.style.backgroundColor = 'red';
} else if(part === '3') {
	etc.style.backgroundColor = 'red';
}


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