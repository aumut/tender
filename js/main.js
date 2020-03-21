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
    if (wwidth<1199 )
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

//tender sum
    let tender_count = document.getElementById("tender_count");
    let tender_sum = document.getElementById("tender_sum");

    tender_count.value = 1105;
    tender_count.sum = 0;

    let tender_count_value = tender_count.value;
    let tender_sum_value = tender_count_value * 1055;

    tender_count.innerHTML = formatDigit(tender_count_value);
    tender_sum.innerHTML = formatDigit(tender_sum_value);

    function formatDigit(n){
        var s = String(n);
        var k = s.indexOf(".");
        if (k < 0) {
            k = s.length;
        } else {
            s += "00"
        }

        s = s.substr(0, k + 3);
        for (var i = k - 3, j = n < 0 ? 1 : 0; i > j; i -= 3) s = s.substr(0, i) + " " + s.substr(i);

        return s;

    }

//current date
    const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    function GetTodayDate() {
        var tdate = new Date();
        var dd = tdate.getDate(); // day
        var MM = monthNames[tdate.getMonth()]; // month
        var yyyy = tdate.getFullYear(); // year
        var currentDate= dd + "." + MM + "." + yyyy;
        return currentDate;
    }
    let cur_date =  document.getElementById("cur_date");
    cur_date.innerHTML = GetTodayDate();

// phone field
    $(".send_user_phone").mask("+999 (999)99-99-99");

});
