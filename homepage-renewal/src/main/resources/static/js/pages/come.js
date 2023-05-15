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


var mapContainer2 = document.getElementById('map2'),
		mapOption2 = { 
		center: new kakao.maps.LatLng(35.8660015 , 128.6010232),
		level: 3 
		};
	var mapContainer = document.getElementById('map'),
		mapOption = { 
		center: new kakao.maps.LatLng(37.2874529 , 127.0602648), 
		level: 3 
		};

	var map2 = new kakao.maps.Map(mapContainer2, mapOption2); 
	var map = new kakao.maps.Map(mapContainer, mapOption); 

	// 마커가 표시될 위치입니다 
	var markerPosition2  = new kakao.maps.LatLng(35.8660015, 128.6010232); 
	var markerPosition  = new kakao.maps.LatLng(37.2874529, 127.0602648); 

	// 마커를 생성합니다
	var marker2 = new kakao.maps.Marker({
		position: markerPosition2
	});
	var marker = new kakao.maps.Marker({
		position: markerPosition
	});

	// 마커가 지도 위에 표시되도록 설정합니다
	marker2.setMap(map2);
	marker.setMap(map);

	// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
	// marker.setMap(null);    



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