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

window.addEventListener('scroll', function() {
    const posY = this.window.pageYOffset;
    const section1 = this.document.querySelector('.section-1').getBoundingClientRect().top;
    const section2 = this.document.querySelector('.section-2').getBoundingClientRect().top;
    const section3 = this.document.querySelector('.section-3').getBoundingClientRect().top;
    const section4 = this.document.querySelector('.section-4').getBoundingClientRect().top;

    const section1Top = posY + section1;
    const section2Top = posY + section2;
    const section3Top = posY + section3 - 500;
    const section4Top = posY + section4;

    let totalHeight = document.body.scrollHeight - this.window.innerHeight -1;

    if(posY >= section1Top && posY < section2Top) {
		this.document.body.style.backgroundColor = "#000"
    } else if(posY >= section2Top && posY < section3Top) {
		this.document.body.style.backgroundColor = "linear-gradient(to top, #121212, #000)"
    } else if(posY >= section3Top && posY < section4Top) {
		this.document.body.style.backgroundColor = "#fff"
    } else if(posY >= section4Top && posY <= totalHeight) {
		this.document.body.style.backgroundColor = "#fff"
    }

});



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

