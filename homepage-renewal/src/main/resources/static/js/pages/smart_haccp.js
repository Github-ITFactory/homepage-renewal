// aos animate
AOS.init();

window.onload = function () { 
    createSmarthaccp(); 
};

$(document).ready(function(){
    const swiper01 = new Swiper('.swiper01', {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        autoplay: true,
        pagination: {
            el: '.swiper-pagination01',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 0
            },
            767: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 30
            },
            1240: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 30
            }
          }
    })

    $('.floating_close').click(function(){
        $('.floating').hide();
    })

    $('.qrcode').hide();
    $('.qr').click(function(){
        $('.qrcode').toggle();
    })

})

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

    function winScroll(){
        ovf.style.opacity = 1;
    }


function createSmarthaccp(){
    var strDOM = "";
    for (var i = 0; i < contents.length; i++){
        var content = contents[i]

        strDOM += '<div class="performance_box">';
        strDOM +=   '<div class="performance_img">';
        strDOM +=       '<img src="' + content.url + '" alt="' + content.name + '"/>';
        strDOM +=   '</div>';
        strDOM +=   '<div class="performance_txt">';
        strDOM +=       '<p>' + content.name + '</p>';
        strDOM +=       '<span>' + content.kinds + '</span>';
        strDOM +=   '</div>';
        strDOM += '</div>';

    }

    var $performanceContainer = $('#performance_content');
        $performanceContainer.append(strDOM);

}