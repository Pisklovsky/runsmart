
$(document).ready(function(){
    $('.slider__inner').slick({
        speed: 1000,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/right.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });

    //  $('.catalog__details').each(function(i) {
    //     $(this).on('click', function(e){
    //         e.preventDefault();
    //         $('.catalog__desc').eq(i).toggleClass('catalog__desc_active');
    //         $('.catalog__list').eq(i).toggleClass('catalog__list_active');
    //     })
    //  })

     function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e){
                e.preventDefault();
                $('.catalog__desc').eq(i).toggleClass('catalog__desc_active');
                $('.catalog__list').eq(i).toggleClass('catalog__list_active');
            })
         })
     };
     toggleSlide('.catalog__details');
     toggleSlide('.catalog__exit') ;

//MODAL

$('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation' ).fadeIn();
});

$('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut();
});

// $('[data-modal=order]').on('click', function() {
//     $('.overlay, #order').fadeIn();
// });

$('[data-modal=order]').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__description').text($('.catalog__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn();
    });
});

function validateForms(form) {
    $(form).validate({
        rules: {
            name: 'required',
            phone: 'required',
            email: {
                required: true,
                email: true
            }
        },
    
        messages: {
            name: "Пожалуйста, введите свое имя",
            phone: "Пожалуйста, введите свой телефон",
            email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправльно введен адрес почты"
            }
        }
    });
}

validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');

$('form').submit(function(e) {
    e.preventDefault();

    if (!$(this).valid()) {
        return;
    };

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();


        $('form').trigger('reset');

    });
    return false;
});

// smooth scroll

$(window).scroll(function() {
    if($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
})
    new WOW().init();
  });
          