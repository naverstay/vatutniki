var $body, overviewSlider;

function detectBrowser() {
    var myNav = navigator.userAgent.toLowerCase(),
        html = document.documentElement;

    if ((myNav.indexOf('msie') != -1)) {
        ie = ((myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false);
        html.className += ' mustdie';
        html.className += ' ie' + ie;
    } else if (!!myNav.match(/trident.*rv\:11\./)) {
        ie = 11;
        html.className += ' ie' + ie;
    }

    if (myNav.indexOf('safari') != -1) {
        if (myNav.indexOf('chrome') == -1) {
            html.className += ' safari';
        } else {
            html.className += ' chrome';
        }
    }

    if (myNav.indexOf('firefox') != -1) {
        html.className += ' firefox';
    }

    if ((myNav.indexOf('windows') != -1)) {
        html.className += ' windows';
    }
}

detectBrowser();

$(function ($) {
    $body = $('body');

    initMainSlider();

    initInfrastructureSlider();

    initOverviewSlider();

    $body.delegate('.menuBtn', 'click', function () {
        $body.removeClass('search_opened').toggleClass('menu_opened');
        return false;
    }).delegate('.overviewTab', 'click', function () {
        var btn = $(this), target = $(btn.attr('href'));

        if (target.length) {
            btn.parent().addClass('_active').siblings().removeClass('_active');
            target.addClass('_active').siblings().removeClass('_active');
        }

        return false;
    });
});

function initOverviewSlider() {
    // Overview Slider

    var overviewOptions = {
        //loop: true,
        //loopAdditionalSlides: 3,
        speed: 1000,
        spaceBetween: 0,
        slidesPerView: 3,
        //centeredSlides: true,
        touchRatio: 0.1,
        slideToClickedSlide: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        breakpoints: {
            768: {
                slidesPerView: 1
            }
        },
        on: {
            slideChangeTransitionEnd: function (swp) {
                $(this.slides).filter('.swiper-slide-active').find('.overviewTab').click();
            }
        }
    };

    overviewSlider = new Swiper('.overviewSlider', overviewOptions);

}

function initInfrastructureSlider() {
    var mainSliderSelector = '.main-slider',
        navSliderSelector = '.nav-slider',
        interleaveOffset = 0.5;

// Main Slider
    var mainSliderOptions = {
        loop: true,
        speed: 1000,
        //autoplay: {
        //    delay: 3000
        //},
        loopAdditionalSlides: 10,
        grabCursor: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                this.autoplay.stop();
            },
            imagesReady: function () {
                this.el.classList.remove('loading');
                //this.autoplay.start();
            },
            slideChangeTransitionEnd: function () {
                var swiper = this,
                    captions = swiper.el.querySelectorAll('.caption');
                for (var i = 0; i < captions.length; ++i) {
                    captions[i].classList.remove('show');
                }
                swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
            },
            progress: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress,
                        innerOffset = swiper.width * interleaveOffset,
                        innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-bgimg").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function (speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-bgimg").style.transition =
                        speed + "ms";
                }
            }
        }
    };
    var mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
    var navSliderOptions = {
        loop: true,
        loopAdditionalSlides: 10,
        speed: 1000,
        spaceBetween: 20,
        slidesPerView: 3,
        centeredSlides: true,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        direction: 'vertical',
        on: {
            imagesReady: function () {
                this.el.classList.remove('loading');
            },
            click: function () {
                mainSlider.autoplay.stop();
            }
        }
    };
    var navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
    mainSlider.controller.control = navSlider;
    navSlider.controller.control = mainSlider;
}

function initMainSlider() {

    var mainSlider = new Swiper('.mainSlider', {
        slidesPerView: 'auto',
        freeModeSticky: true,
        freeMode: true,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.slideNext',
            prevEl: '.slidePrev'
        }
    });

    //$('.mainSlider').slick({
    //    dots: false,
    //    loop: true,
    //    centerMode: true,
    //    speed: 500,
    //    centerPadding: '0px',
    //    slidesToShow: 1,
    //    prevArrow: $('.slidePrev'),
    //    nextArrow: $('.slideNext')
    //});


}
