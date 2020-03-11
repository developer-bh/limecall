$( document ).ready(function() {

    // Tooltip

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    // Pricing tooltop

    $(".hover-tooltip").mouseenter(function() {
        $(this).find('.tooltip').show();
    }).mouseleave(function() {
        $(this).find('.tooltip').hide();
    });

    // All features fixed bar

    var content = $('.af_list');
    if (content.length) {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            var offset = content.offset();
            var height = content.height();
            if (offset.top <= scroll && scroll <= offset.top + height) {
                $('.af_bar').addClass("fixed");
            } else {
                $('.af_bar').removeClass('fixed');
            }
        });
    }

    // Cache selectors

    var lastId,
        topMenu = $("#mainNav"),
        topMenuHeight = topMenu.outerHeight()+15,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({
            scrollTop: offsetTop + 40
        }, 900);
        e.preventDefault();
    });

    $(window).scroll(function(){
        var fromTop = $(this).scrollTop()+topMenuHeight;

        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });

    // Guides add class scroll

    $(document).on("scroll", onScroll);

    $('.guides__bar a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('.guides__bar a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.guides__bar a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }

    // Templates filter show/hide

    $('.templates_filters li').on('click', function (e) {
        $(this).toggleClass('active');
        $('.temp_item').hide();
        $('.templates_filters li.active').each(function() {
            var cat= $(this).data('categoryType');
            $('.temp_item[data-category-type="'+cat+'"]').show();
        });
        if ($('.templates_filters li.active').length < 1) {
            $('.temp_item').show();
        }
    });

    // Progress

    $(document).on('ready', function() {
        var winHeight = $(window).height(),
            docHeight = $(document).height(),
            progressBar = $('progress'),
            max, value;

        /* Set the max scrollable area */
        max = docHeight - winHeight;
        progressBar.attr('max', max);

        $(document).on('scroll', function(){
            value = $(window).scrollTop();
            progressBar.attr('value', value);
        });
    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 500) {
            $(".sticky_header").show();
        } else {
            $(".sticky_header").hide();
        }
    });

    // Pricing

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

    if($(window).innerWidth() <= 767) {
        $('.header_mobile .header_nav .menu-item-has-children').on('click', function () {
            $(this).toggleClass('active');
        });
    } else {
        $('.menu-item-has-children').mouseenter(function() {
            $(this).addClass('active');
            $(this).children('.sub-menu').stop().show()
        }).mouseleave(function() {
            $(this).removeClass('active');
            $(this).children('.sub-menu').stop().hide()
        });
    }

    // Mobile nav

    $('.header_wrap__icon').on('click', function () {
       $('.header_mobile').fadeIn();
       $('html').addClass('over');
    });

    $('.header_mobile__top .close').on('click', function () {
        $('.header_mobile').fadeOut();
        $('html').removeClass('over');
    });

    // Scroll to element

    $(".pricing_all").on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: ($(target).offset().top)
        }, 800);
    });

    $(".how_header__text a").on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: ($(target).offset().top)
        }, 800);
    });

    $(".glossary_list__letters .box a").on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: ($(target).offset().top)
        }, 1000);
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

    // Refunds accordion

    $('.accordion .btn').on('click', function () {
        $(this).toggleClass('opened');
    });
});

// AOS

AOS.init({
    once: false,
});

$( document ).ready(function() {

    // Intercom on mobile

    // var isOnMobile = function() {
    //     if(window.innerWidth <= 800) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };
    //
    // console.log(isOnMobile());
    //
    // window.intercomSettings = {
    //     app_id: 'tt29cfh9',
    //     email: 'sathish@limecall.com',
    //     hide_default_launcher: isOnMobile()
    // };

});





