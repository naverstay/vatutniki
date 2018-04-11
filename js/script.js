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

    initSelect2();

    initTabs();

    initToddlers();

    initMask();

    $body
        .delegate('.loadMoreOffers', 'click', function () {
            $('.mortgageTable').append('<div class="row _body"><div class="td _col_1">Тинькофф Банк</div><div class="td _col_2">20%</div><div class="td _col_3">19,9%</div><div class="td _col_4">до 25 лет</div></div><div class="row _body"><div class="td _col_1">Тинькофф Банк</div><div class="td _col_2">20%</div><div class="td _col_3">19,9%</div><div class="td _col_4">до 25 лет</div></div><div class="row _body"><div class="td _col_1">Тинькофф Банк</div><div class="td _col_2">20%</div><div class="td _col_3">19,9%</div><div class="td _col_4">до 25 лет</div></div>');
            return false;
        })
        .delegate('.loadMorePhotos', 'click', function () {
            $('.loadMarker').before('<div class="process_block"> <h3 class="process_caption">Ноябрь 2016</h3><a class="process_img" href="i/process_2.jpg" data-fancybox="gallery3"><img src="i/process_2.jpg"><span>10 фотографий за ноябрь 2016</span></a><a class="hide" data-fancybox="gallery3" href="i/process_img_1.jpg"><img src="i/process_img_1.jpg"></a><a class="hide" data-fancybox="gallery3" href="i/process_img_1.jpg"><img src="i/process_img_1.jpg"></a><a class="hide" data-fancybox="gallery3" href="i/process_img_1.jpg"><img src="i/process_img_1.jpg"></a><a class="hide" data-fancybox="gallery3" href="i/process_img_1.jpg"><img src="i/process_img_1.jpg"></a><a class="hide" data-fancybox="gallery3" href="i/process_img_1.jpg"><img src="i/process_img_1.jpg"></a><a class="hide" data-fancybox="gallery3" href="i/process_img_1.jpg"><img src="i/process_img_1.jpg"></a> </div>');
            return false;
        }).delegate('.sortBtn', 'click', function () {
        var btn = $(this);
        $('.sortBtn').not(btn).removeClass('_asc').removeClass('_desc');

        if (!btn.hasClass('_asc') && !btn.hasClass('_desc')) {
            btn.addClass('_desc');
        } else {
            btn.toggleClass('_asc').toggleClass('_desc');
        }

        return false;
    }).delegate('.menuBtn', 'click', function () {
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

function initTabs() {

    $('.tabBlock').each(function (ind) {
        $(this).tabs({
            active: 0,
            activate: function (e, u) {

            }
        });
    });
}

function toNum(str) {
    return parseInt(str.toString().replace(/\D*/g, ''));
}

function numFormat(str) {
    return str.replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, ' ');
}

function resize(inp) {
    var el = $(inp), txt = el.nextAll('.widthPattern').text(el.val());
    el.attr('style', 'width:' + (txt.outerWidth() + 1) + 'px !important;');
}

function initDynamicWidth($el) {
    $el.each(function () {
        var inp = $(this), ptrn = $('<span class="widthPattern" />');

        ptrn.css({
            'position': 'absolute',
            'top': -99999,
            'left': -99999,
            // 'top': 0,
            // 'left': -300,
            'pointer-events': 'none',
            'white-space': 'nowrap',
            'padding': inp.css('padding'),
            'border': inp.css('border'),
            'font-size': inp.css('font-size'),
            'font-style': inp.css('font-style'),
            'font-family': inp.css('font-family'),
            'font-weight': inp.css('font-weight'),
            'letter-spacing': inp.css('letter-spacing')
        });

        inp.after(ptrn);

        var e = 'keyup,keypress,focus,blur,change,update'.split(',');
        for (var i in e) inp.on(e[i], function () {
            resize(this);
        });
        resize(this);
    });
}

function moneyFormat(str) {
    return str.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
}

function getPural(n, str1, str2, str5) {
    return ' ' + ((((n % 10) == 1) && ((n % 100) != 11)) ? (str1) : (((((n % 10) >= 2) && ((n % 10) <= 4)) && (((n % 100) < 10) || ((n % 100) >= 20))) ? (str2) : (str5)))
}

function initPriceRange() {
    var range_val = $('#range_val'), range_start = $('#range_start'), range_end = $('#range_end');

    $('.searchRangeVal').on('change cut paste drop keydown', function () {
        setTimeout(function () {
            var start = (range_start.val()) || 0, end = (range_end.val()) || 0;

            if (!start && !end) {
                range_val.text('Цена');
            } else {
                range_val.text('от ' + start + ' до ' + end);
            }

        }, 5);
    });
}

function initMask() {
    $("input").filter(function (i, el) {
        return $(el).attr('data-inputmask') != void 0;
    }).inputmask();
}

function initToddlers() {
    var canUpdate = true;

    $('.filterToddler').each(function (ind) {
        var tdlr = $(this),
            filter = tdlr.closest('.filterBlock'),
            single = tdlr.attr('data-single'),
            min = parseInt(tdlr.attr('data-min')) || 0,
            max = parseInt(tdlr.attr('data-max')) || 10;

        initDynamicWidth(filter.find('input.val'));

        if (single) {
            noUiSlider.create(this, {
                start: max * .2,
                connect: [true, false],
                range: {
                    'min': min,
                    'max': max
                }
            });
        } else {
            noUiSlider.create(this, {
                start: [max * .2, max * .8],
                connect: true,
                range: {
                    'min': min,
                    'max': max
                }
            });
        }

        this.noUiSlider.on('update', function (values, handle) {
            var target = $(this.target),
                filter = target.closest('.filterBlock'),
                plural = target.attr('data-plural'),
                plural_text = target.attr('data-plural-text') || '',
                format = target.attr('data-format') || '',
                suffix_1 = target.attr('data-suffix_1') || '',
                suffix_2 = target.attr('data-suffix_2') || '',
                val_1 = parseInt(values[0]),
                val_2 = parseInt(values[1]),
                plural_suffix_1 = target.attr('data-plural-suffix_1') || false,
                plural_suffix_2 = target.attr('data-plural-suffix_2') || false,
                plural_1 = '',
                plural_2 = '',
                arr = [];

            if (plural != void 0) {
                arr = plural.split(',');
                plural_1 = plural.length > 0 ? getPural(val_1, arr[0], arr[1], arr[2]) : '';
                plural_2 = plural.length > 0 ? getPural(val_2, arr[0], arr[1], arr[2]) : '';

            } else if (plural_text.length) {
                plural_1 = plural_2 = plural_text;
            }

            if (canUpdate) {
                resize(filter.find('.start .val').val(
                    (format ? ('money' == format ? moneyFormat(val_1.toString()) : val_1) : val_1) +
                    suffix_1 + (plural_suffix_1 ? getPural(val_1, arr[0], arr[1], arr[2]) : '')
                ));

                resize(filter.find('.end .val').val(
                    (format ? ('money' == format ? moneyFormat(val_2.toString()) : val_2) : val_2) +
                    suffix_2 + (plural_suffix_2 ? getPural(val_2, arr[0], arr[1], arr[2]) : '')
                ));

                filter.find('.start .val').each(function (ind) {
                    var inp = $(this), plrl = inp.nextAll('.plural');

                    if (plrl.length && plrl.attr('data-plural')) {
                        var arr = plrl.attr('data-plural').split(',');
                        plrl.text(getPural(val_1, arr[0], arr[1], arr[2]));
                    }
                });

                filter.find('.end .val').each(function (ind) {
                    var inp = $(this), plrl = inp.nextAll('.plural');

                    if (plrl.length && plrl.attr('data-plural')) {
                        var arr = plrl.attr('data-plural').split(',');
                        plrl.text(getPural(val_2, arr[0], arr[1], arr[2]));
                    }
                });
            }

            filter.find('.min').html(
                (format ? ('money' == format ? moneyFormat(val_1.toString()) : val_1) : val_1) + ' ' +
                plural_1
            );

            filter.find('.max').html(
                (format ? ('money' == format ? moneyFormat(val_2.toString()) : val_2) : val_2) + ' ' +
                plural_2
            );

        });

        filter.find('.start input.val').on('keyup keypress change update', function () {
            canUpdate = false;
            tdlr[0].noUiSlider.set([toNum($(this).val()), null]);
        }).on('blur', function () {
            canUpdate = true;
            tdlr[0].noUiSlider.set([toNum($(this).val()), null]);
        });

        filter.find('.end input.val').on('keyup keypress change update', function () {
            canUpdate = false;
            tdlr[0].noUiSlider.set([null, toNum($(this).val())]);
        }).on('blur', function () {
            canUpdate = true;
            tdlr[0].noUiSlider.set([null, toNum($(this).val())]);
        });

        filter.find('.toddlerSelect').each(function (ind) {
            var slct = $(this), target = filter.find(slct.attr('data-target'));

            slct.on('change', function (e) {
                var _this = $(this);
                canUpdate = true;

                if (_this.attr('data-target') == '.start') {
                    tdlr[0].noUiSlider.set([_this.val(), null]);
                } else if ($(this).attr('data-target') == '.end') {
                    tdlr[0].noUiSlider.set([null, _this.val()]);
                }

            }).select2({
                minimumResultsForSearch: Infinity,
                dropdownParent: target,
                width: '100%',
                language: {
                    noResults: function (e, r) {
                        return 'Нет результатов';
                        // return "Город не найден. <a href='#' class='gl_link _clr_turqoise'>Список городов</a>";
                    }
                },
                templateResult: function (data) {
                    return $.isNumeric(data.text) ? numFormat(data.text) : data.text;
                },
                escapeMarkup: function (markup) {
                    return markup;
                },
                adaptDropdownCssClass: function () {
                    return slct.attr('data-dropdown-class');
                }
            });

            target.on('click', function () {
                slct.select2('open');
                return false;
            });
        });

    });
}

function initSelect2() {
    $('.select2').each(function (ind) {
        var slct = $(this);

        slct.select2({
            minimumResultsForSearch: 1,
            dropdownParent: slct.parent(),
            width: '100%',
            language: {
                noResults: function (e, r) {
                    return 'Нет результатов';
                    // return "Город не найден. <a href='#' class='gl_link _clr_turqoise'>Список городов</a>";
                }
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            adaptDropdownCssClass: function () {
                return slct.attr('data-dropdown-class');
            }
        });
    });
}

function initInfrastructureSlider() {
    var mainSliderSelector = '.main-slider',
        navSliderSelector = '.nav-slider',
        interleaveOffset = 0.5;

    if ($(navSliderSelector).length && $(mainSliderSelector).length) {

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
