$( document ).ready(function() {

    $('.pricing_item__btn .btn_green').on('click', function () {
        $('.popup-button .material-icons').click();
    });

    // Slider tabs

    var sliders = [];

    $('.swiper-container').each(function(index, element){

        $(this).addClass('s'+index);
        var slider = new Swiper('.s'+index, {
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        sliders.push(slider);

    });

    // Hover nav

    $('.menu-item-has-children').mouseenter(function() {
        $(this).addClass('active');
        $(this).children('.sub-menu').stop().fadeIn()
    }).mouseleave(function() {
        $(this).removeClass('active');
        $(this).children('.sub-menu').stop().fadeOut()
    });

    // Mobile nav

    $('.header_wrap__icon').on('click', function () {
       $('.header_mobile').toggleClass('slide');
       $('html').toggleClass('over');
       $('.header_wrap__left').toggleClass('white');
       $('.header_wrap__icon').toggleClass('white');
    });

    // Scroll to element

    $(".how_header__text a").on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: ($(target).offset().top)
        }, 800);
    });

    // Contact options

    $(function() {    // Makes sure the code contained doesn't run until
        //     all the DOM elements have loaded

        $('#contact_options').change(function(){
            $('.contacts__item').hide();
            $('#' + $(this).val()).show();
        });

    });

    // Integration show/hide


    $('.integration_item').on( "click", function(e) {
        e.preventDefault();
        $('.integration_item').removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr('value');
        $(".integration_info").each(function(){
            $(this).hide();
            if($(this).attr('data-filter') == id) {
                $(this).show();
            }
        });
    });

    // Sales tools

    var getFilter = function (category) {
        var filter = $("#filters ." + category + ":checked").map(function () {
            return '[data-filter*="' + this.value + '"]';
        }).get().join(",");
        filter = (filter.length > 0) ? filter : "*";
        return filter;
    };

    $("#filters select").change(function () {
        var all = $(".filterme");
        var tgts = all.filter(getFilter("category")).filter(getFilter("cost")).filter(getFilter("features")).filter(getFilter("rating"));
        all.not(tgts).hide();
        tgts.show();
    });
});

// AOS

AOS.init({
    once: false,
});



