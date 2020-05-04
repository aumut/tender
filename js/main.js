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
    if (wwidth <= 425 )
    {
        $('.mission__list').slick({
            dots: true,
            autoplay: true,
            arrows: false,
            adaptiveHeight: true,
            infinite: true,
            speed: 500,
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

// phone field with mask
    $(".send_user_phone").inputmask("+\\9\\96 (999) 99 99 99");

//to-top button
    let toTop = $('#to-top');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            toTop.addClass('show');
        } else {
            toTop.removeClass('show');
        }
    });

    toTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });

    //*******************************************************

    function senFormData(name, url) {
        var formData = new FormData(document.forms[name]);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("onready", this.responseText, this.statusText);
            if (this.readyState == 4 && this.status == 200) {
                console.log("ready");
            }
        }
        xhr.open("POST", url);
        xhr.send(formData);
    }

    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        $(".send_user_phonef").inputmask("\\9\\96999999999");
        var validation = Array.prototype.filter.call(forms, function(form) {

            form.addEventListener('submit', function(event) {
                if ((form.checkValidity() === false)){
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    if (form.getAttribute('id') === "send_appl_form") {
                        senFormData('send_appl_form', "http://api.tender-smart.com/request/v1/user/create/");
                        event.preventDefault();
                        $("#link_form").removeClass("d-none");
                        $("#send_form_wrap").addClass("d-none");
                    }
                    if (form.getAttribute('id') === "appl_form") {
                        senFormData('appl_form', "http://api.tender-smart.com/request/v1/service/mail/send/");
                    }
                    if (form.getAttribute('id') === "appl_form_1") {
                        senFormData('appl_form_1', "http://api.tender-smart.com/request/v1/service/mail/send/");
                    }
                }
                form.classList.add('was-validated');
            }, false);

        });

    }, false);

});
