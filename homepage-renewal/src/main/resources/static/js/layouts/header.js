/**
 * 전역변수
 */
// const getTest = document.getElementById('getTest');
const subDepth_A = document.querySelector('.main-depth li:nth-child(1)');
const subDepth_B = document.querySelector('.main-depth li:nth-child(5)');
const subBg = document.querySelector('.bg-wrap');
const header = document.querySelector('.header');
const subBgDisplay = subBg.style;

/**
 * 이벤트함수
 */

// getTest.addEventListener('click', () => {
// 	let test = document.getElementsByTagName('div')[0].innerHTML;
// 	xhr(`./getTest?test=${test}`, null, 'GET', 'getTest');
// });


let prevScrollTop = 0;

document.addEventListener("scroll", function(){ 
    let nextScrollTop = window.pageYOffset || 0; 
    if (nextScrollTop > prevScrollTop){
        header.classList.add('scrollDown');
    } else {
        header.classList.remove('scrollDown');
    }
});


subDepth_A.addEventListener('mouseover', ()=>{
    subBg.style.display = "block";
});
subDepth_B.addEventListener('mouseover', ()=>{
    subBg.style.display = "block";
});
subDepth_A.addEventListener('mouseout', ()=>{
    subBg.style.display = "none";
});
subDepth_B.addEventListener('mouseout', ()=>{
    subBg.style.display = "none";
});