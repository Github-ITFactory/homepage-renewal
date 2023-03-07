/**
 * 전역변수
 */
// const getTest = document.getElementById('getTest');
const header = document.querySelector('.header');
// const subDepth_A = document.querySelector('.main-depth > li:nth-child(1)');
const subDepth_B = document.querySelector('.main-depth > li:nth-child(2)');
const subDepth_C = document.querySelector('.main-depth > li:nth-child(4)');
const hamburger = document.querySelector('.hamburger-btn');
const subBg = document.querySelector('.bg-wrap');

const closeBtn = document.querySelector('.close-btn');
const mMenu = document.querySelector('.m-main-depth');
const mSub = document.querySelectorAll('.m-depth');//li
const mSubMenu = document.querySelectorAll('.m-sub-depth'); //li의 ul
let gnbSlide = false;
let mSubSlide = false;

const ACTIVE = "active"


/**
 * 이벤트함수
 */

// getTest.addEventListener('click', () => {
// 	let test = document.getElementsByTagName('div')[0].innerHTML;
// 	xhr(`./getTest?test=${test}`, null, 'GET', 'getTest');
// });

/** 스크롤이벤트 */ 
let prevScrollTop = 0;

document.addEventListener("scroll", function(){ 
    let nextScrollTop = window.pageYOffset || 0; 
    if (nextScrollTop > prevScrollTop){
        header.classList.add('scrollDown');
    } else {
        header.classList.remove('scrollDown');
    }
});


// subDepth_A.addEventListener('mouseover', ()=>{
//     subBg.style.display = "block";
// });
subDepth_B.addEventListener('mouseover', ()=>{
    subBg.style.display = "block";
});
subDepth_C.addEventListener('mouseover', ()=>{
    subBg.style.display = "block";
});
// subDepth_A.addEventListener('mouseout', ()=>{
//     subBg.style.display = "none";
// });
subDepth_B.addEventListener('mouseout', ()=>{
    subBg.style.display = "none";
});
subDepth_C.addEventListener('mouseout', ()=>{
    subBg.style.display = "none";
});

/** 모바일 메뉴 이벤트*/ 
hamburger.addEventListener('click', ()=>{
    mMenu.classList.toggle('slide');
    return gnbSlide = true;
});
document.addEventListener('click',function(e){
    if(gnbSlide == true){ //슬라이드 메뉴가 열려 있을때
        let tgEl = e.target;
        let header = tgEl.closest('.header');
    
        if(!header){
            mMenu.classList.remove('slide');
            return gnbSlide = false;
        }

        hamburger.classList.add('on');
    }
});
closeBtn.addEventListener('click', ()=>{
    mMenu.classList.remove('slide');
});

for(let i =0; i < mSub.length; i++){
	mSub[i].addEventListener('click',function(){
    	for(let j = 0; j < mSub.length; j++){
        	mSubMenu[j].classList.remove('active');
        }
        mSubMenu[i].classList.add('active');
    });
}

mSub.forEach(function(item){
    item.addEventListener('click',function(){
        mSub.forEach(function(e){
            e.classList.remove('active');
        });
        item.classList.add('active');
    });
});