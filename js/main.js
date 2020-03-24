$(function() {

// menu mobile
    $('#btn_gamburg').click(function () {
        $('.header__nav').toggleClass('active');
    });
    $('#btn_close').click(function () {
        $('.header__nav').toggleClass('active');
    });

//spred point

    //установить номер в заголовке
    let active_selected = $('.spred-point-item.active').data('selected');
    $('.spred-item__title').text("0" + active_selected);

    //менять текст в блоке в зависимости от кликнутого элемента
    $('.spred-point-item').click(function () {
        let selected = $(this).data('selected');

        $('.spred-point-item').removeClass('active');
        $(this).addClass('active');

        $('.spred-item__text').removeClass('active');
        $(".spred-item__text[data-selected='"+ selected +"']").addClass('active');

        $('.spred-item__title').text("0" + selected);
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

    const fetchPromise = fetch("http://api.tender-smart.com/request/v1/tenders/widget/statistic/");
    let mainContent = '';
    let main = document.querySelector('#tender_score');

    fetchPromise.then(response => {
        return response.json();
    }).then(films => {
        //Object.keys(films).forEach(film => {
            mainContent+=`
                <div class="tender-score__in tender-score__in--red">
                    Найдено тендеров:
                    <div class="tender-score__count" id="tender_count">${formatDigit(films.count)}</div>
                    <div class="tender-score__label" id="cur_date">${films.date}</div>
                </div>
                <div class="tender-score__in tender-score__in--blue">
                    На общую <br>сумму:
                    <div class="tender-score__count" id="tender_sum">${formatDigit(films.total)}</div>
                    <div class="tender-score__label">Сом</div>
                </div>
            `;
        //});
        console.log(films);
        main.innerHTML = mainContent;
    });

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

// phone field
    $(".send_user_phone").mask("+999 (999)99-99-99");

});
