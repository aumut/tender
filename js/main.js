$(function() {
// menu mobile
    $('#btn_gamburg').click(function () {
        $('.header__nav').toggleClass('active');
    });
    $('#btn_close').click(function () {
        $('.header__nav').toggleClass('active');
    });

//slider
    let wwidth= $(window).width();
    //console.log('wwidth = '+ wwidth+ '; cond = '+ (wwidth<768));
    if (wwidth<768 )
    {
        $('.mission__info').slick({
            dots: true,
            autoplay: true,
            arrows: false,
            adaptiveHeight: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1
        });
    }
});