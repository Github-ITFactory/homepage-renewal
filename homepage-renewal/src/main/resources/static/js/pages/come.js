/**
 * 전역변수
 */


/**
 * 이벤트함수
 */


let ovf, slider;
$(function(){
	ovf = this.getElementById("overflow");
	slider = this.getElementById("slider");
	winResize();
	$(window).bind({resize: winResize, scroll: winScroll});
	// if(slide !== 'no') {
	// 	window.scrollTo(0, window.innerHeight - 70);		
	// }
});
function winResize(){
	ovf.style.top = slider.offsetHeight + "px";
}
function winScroll(){
	ovf.style.opacity = 1;
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