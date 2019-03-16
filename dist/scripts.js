"use strict";

function isFullyInView(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

function isPartiallyInView(el, offset) {
    offset = offset || 0;
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return rect.bottom >= 0 && rect.right >= 0 && rect.top + offset <= (window.innerHeight || document.documentElement.clientHeight) && rect.left <= (window.innerWidth || document.documentElement.clientWidth);
}

function queryToObject(queryString) {
    return queryString.slice(1).split('&').reduce(function (a, i) {
        a[i.split('=')[0]] = i.split('=')[1];
        return a;
    }, {});
}
'use strict';

// Lightwiehgt functions for sending form requests async

function initAsyncForms() {
    $('.asyncForm').on('submit', asyncFormSubmissionHandler);
}

function asyncFormSubmissionHandler(e) {
    e.preventDefault();
    console.log('async form submission');

    var $form = $(this);
    var data = $form.serialize();
    var action = $form.attr('action');

    asyncFormLoading($form);

    $.post(action, data).done(function () {
        setTimeout(function () {
            asyncFormSuccess($form, data);
        }, 2000);
    }).fail(function (err) {
        setTimeout(function () {
            asyncFormError($form, err);
        }, 2000);
    });
}

function asyncFormLoading($form) {
    $form.removeClass('is-displayingSuccess is-displayingError ');
    $form.addClass('is-loading');
}

function asyncFormSuccess($form, data) {
    console.log('success', data);
    $form.removeClass('is-loading');
    $form.addClass('is-displayingSuccess');
}

function asyncFormError($form, err) {
    console.log('error', err);
    $form.removeClass('is-loading');
    $form.addClass('is-displayingError');
}
'use strict';

// Adds classes to inputs once they have been edited or contain content

function initDirtyInputs() {
    var $inputs = $('input, select, textarea');
    $inputs.each(checkIfDirty);
    $inputs.on('change', checkIfDirty);
}

function checkIfDirty() {
    if ($(this).val() !== '') {
        $(this).addClass('is-dirty');
    } else {
        $(this).removeClass('is-dirty');
    }
}
'use strict';

function initSelectProgram() {
    var queryObject = queryToObject(window.location.search);
    if (queryObject['program']) {
        var program = queryObject['program'];
        $('input[name="program"]').val(program);
    }
}
"use strict";

var googleMapTheme = [{
    "featureType": "all",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#dcdcdc"
    }, {
        "saturation": "-100"
    }, {
        "lightness": "0"
    }, {
        "visibility": "on"
    }]
}, {
    "featureType": "all",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#50479D"
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [{
        "lightness": "1"
    }, {
        "saturation": "100"
    }, {
        "color": "#50479D"
    }]
}, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "lightness": "100"
    }, {
        "weight": "2.3"
    }, {
        "color": "#ffffff"
    }, {
        "visibility": "on"
    }]
}, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#dcdcdc"
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#dcdcdc"
    }]
}, {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#ffffff"
    }]
}, {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#50479D"
    }, {
        "lightness": "50"
    }, {
        "saturation": "0"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#50479D"
    }]
}];
'use strict';

function initMap() {
    if ($('.googleMap').length > 0) {
        if (typeof google !== 'undefined') {
            $('.googleMap').each(createMap);
        } else {
            setTimeout(initMap, 500);
        }
    }
}

function createMap(index, elem) {
    var lat = Number($(elem).data('lat'));
    var lng = Number($(elem).data('lng'));
    var centerLat = Number($(elem).data('center-lat')) || lat;
    var centerLng = Number($(elem).data('center-lng')) || lng;
    var position = { lat: lat, lng: lng };
    var center = { lat: centerLat, lng: centerLng };
    var mapElem = $(elem).find('.googleMap__map')[0];

    var map = new google.maps.Map(mapElem, {
        center: isMobile ? position : center,
        zoom: 15,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: googleMapTheme || []
    });
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: {
            url: '/images/map-marker.png',
            scaledSize: new google.maps.Size(50, 75),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(25, 75)
        }
    });
}
'use strict';

function initMenuToggle() {
    $('.nav__toggle').on('click touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleNav();
    });
    $('.nav__pageItem, .nav__logo, .nav__cta').on('click', function () {
        closeNav();
    });
    $('.nav__bg').on('click touchstart', function () {
        closeNav();
    });
}

function toggleNav() {
    if ($('.nav').hasClass('is-open')) {
        closeNav();
    } else {
        openNav();
    }
}

function openNav() {
    $('.nav').addClass('is-open');
    $('.nav .hamburger').addClass('is-cross');
}

function closeNav() {
    $('.nav').removeClass('is-open');
    $('.nav .hamburger').removeClass('is-cross');
}
'use strict';


var maUpdateEvery = 10;

function checkMoActiveSections(frameCount) {
    if (frameCount % maUpdateEvery === 0) {
        var windowCenter = scrollTop + windowHeight / 2;
        $('.ma').each(function () {
            var sectionSelector = $(this).data('mo-active');
            if ($(sectionSelector).length > 0) {
                var sectionTop = $(sectionSelector).offset().top;
                var sectionBottom = sectionTop + $(sectionSelector).outerHeight();

                if (windowCenter > sectionTop && windowCenter < sectionBottom) {
                    $(this).addClass('is-active');
                } else {
                    $(this).removeClass('is-active');
                }
            }
        });
    }
}
'use strict';

//Lightweight accordian functions

function initMoCordian() {
    $('.mc').each(function () {
        calculateMCHeights(this);
        addMCListeners(this);
        toggleFirstMC(this);
    });
}

function calculateMCHeights(mc) {
    setTimeout(function () {
        $(mc).find('.mc__content').each(function () {
            var contentHeight = $(this).find('.mc__inner').outerHeight();
            $(this).css('height', contentHeight + 'px');
        });
    }, 0);
}

function addMCListeners(mc) {
    $(mc).find('.mc__toggle').on('click touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMC(mc, this);
    });
}

function toggleMC(mc, elem) {
    $(mc).find('.mc__accordian').removeClass('is-open');
    $(elem).parents('.mc__accordian').addClass('is-open');

}

function toggleFirstMC(mc) {
    toggleMC(mc, $(mc).find('.mc__accordian:first-child .mc__toggle'));
}
'use strict';


// Library for cdisplaying content in slides

function initMoFlow() {
    $('.mf').each(function () {
        addMFIndicators(this);
        setMFInterval(this);
        addMFListeners(this);
        goToNextMFSlide(this);
    });

}



function addMFIndicators(mf) {
    var totalSlides = $(mf).find('.mf__reciever').length;
    var $indicators = $(mf).find('.mf__indicators');
    var className = $indicators.data('mf-class');
    for (var s = 1; s <= totalSlides; s++) {
        $indicators.append('<div class="mf__indicator ' + className + '__indicator" data-mf-index="' + s + '"></div>');
    }
}

function addMFListeners(mf) {
    $(mf).find('.mf__indicator').on('click touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var slideNumber = $(this).data('mf-index');
        goToMFSlide(mf, slideNumber);
    });
    $(mf).find('.mf__next').on('click touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goToNextMFSlide(mf);
    });
    $(mf).find('.mf__prev').on('click touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        goToPrevMFSlide(mf);
    });

}

function setMFInterval(mf) {
    if ($(mf).hasClass('mf--interval')) {
        var time = $(mf).data('mf-interval') || 5000;
        $(mf).data('interval-instance', setInterval(function () {
            goToNextMFSlide(mf);
        }, time));
    }
}

function resetMFInterval(mf) {
    if ($(mf).hasClass('mf--interval')) {
        clearInterval($(mf).data('interval-instance'));
        setMFInterval(mf);
    }
}

function clearMFIntervals() {
    $('.mf').each(function () {
        if ($(this).hasClass('mf--interval')) {
            clearInterval($(this).data('interval-instance'));
        }
    });
}

function goToMFSlide(mf, number) {
    var $previous = $(mf).find('.mf__reciever.is-exiting');
    var $current = $(mf).find('.mf__reciever.is-active');
    var $next = $(mf).find('.mf__reciever[data-mf-index="' + number + '"]');
    var $indicators = $(mf).find('.mf__indicator');
    var $nextIndicator = $(mf).find('.mf__indicator:nth-child(' + number + ')');

    if (!$next.hasClass('is-active')) {
        if ($next.length !== 0) {
            $previous.removeClass('is-exiting');
            resetMFInterval(mf);
            setTimeout(function () {
                $next.addClass('is-active');
                $current.addClass('is-exiting');
                $current.removeClass('is-active');
                $indicators.removeClass('is-active');
                $nextIndicator.addClass('is-active');
            }, 0);
        } else {
            console.log('Tried to go to MF slide ' + number + ' but it doesn\'t exist');
        }
    }
}

function goToNextMFSlide(mf) {
    var current = $(mf).find('.mf__reciever.is-active').data('mf-index') || 0;
    var totalSlides = $(mf).find('.mf__reciever').length;
    goToMFSlide(mf, current % totalSlides + 1);
}
'use strict';

//Lightweight function for pinning elements to the page based on scroll position

var mpUpdateEvery = 1;

function animateMoPin(frameCount) {
    if (frameCount % mpUpdateEvery === 0) {
        $('.mp__pin').each(function () {
            var pinId = $(this).data('mp-id');
            var mpStart = $('.mp__start[data-mp-start=' + pinId + ']').offset().top;
            var mpFinish = $('.mp__finish[data-mp-finish=' + pinId + ']').offset().top;

            var isBelowStart = mpStart - scrollTop <= 0;
            var isAboveFinish = mpFinish - scrollTop >= 0;

            var offset = -$(this).outerHeight() / 2;

            if (!isBelowStart) {
                $(this).removeClass('is-fixed');
            } else if (isBelowStart && isAboveFinish) {
                $('.stickyNav__frame').addClass('is-showing'); //If using together with moShan this will make it show even if you load the page already scrolled past it
                $(this).addClass('is-fixed');
            } else if (!isAboveFinish) {
                $(this).removeClass('is-fixed');
                offset += scrollTop - mpStart - scrollTop + mpFinish;
                $(this).css('transform', 'translateY(' + offset + 'px)');
            }

            $(this).css('transform', 'translateY(' + offset + 'px)');
        });
    }

    requestAnimationFrame(animateMoPin);
}
'use strict';

// Javacript file for making the MW library moShan work.

function initMoShan() {
    moShanScroll();
}

function msExitPage() {
    $('.ms__trigger').removeClass('is-showing');
    $('.ms__trigger').addClass('is-exiting');
}

function moShanScroll() {
    $('.ms__trigger.is-partiallyScrolled:not(.is-exiting)').addClass('is-showing');
}
'use strict';

// SmoothScroll using requestAnimationFrame

// Should be called in document ready, needs to be rerun after page transitions
function initMoss() {
    $('a.moss').on('click touchstart', function (e) {
        e.preventDefault();
        var mossElement = $(this).attr('href');
        if ($(mossElement).length > 0) {
            // scrollGoal = $(mossElement).offset().top - 60;
            // scrollAttack = true;
            clearTimeout(attackTimeout);
            attackTimeout = setTimeout(function () {
                scrollAttack = false;
            }, moveTime * 7);
        }
    });
    if ($('.moss').length > 0) {
        $(window).bind('mousewheel DOMMouseScroll onmousewheel', setScrollGoal);
    }
}

function unMoss() {
    $(window).unbind('mousewheel DOMMouseScroll onmousewheel', setScrollGoal);
}

function setScrollGoal() {
    scrollGoal = scrollTop;
}

var scrollGoal;
var scrollAttack = false;
var attackTimeout;
var moveTime = 200;

// Should be called in reuqestAnimationFrame. delta = time passed since last frame
// scrollTop is a required global which should be updated on scroll
function moveToScrollGoal(delta) {
    if (scrollAttack && scrollTop !== scrollGoal) {
        $(window).scrollTop(scrollTop + (scrollGoal - scrollTop) * delta / moveTime);
    }
}
'use strict';

// Effect which moves items slightly on moouse move.
// Effect degree depends on layer number

function initMouseParallax() {
    $('[data-mouse-parallax-layer]').each(function (index, el) {
        getParallaxLayer(el);
    });
}

var elements = [];
var toMove = [];
var inc = 0;

function mouseParallaxMoveHandler(selector) {

    selector = selector || '.is-partiallyVisible[data-mouse-parallax-layer]';

    $(selector).each(function (index, el) {
        var pl = getParallaxLayer(el);

        var offset = $(el).offset().top - (scrollTop + windowHeight / 2);

        pl.destination = {
            x: pl.layer * -mouse.xCenterRatio * windowHypo / 100,
            y: pl.layer * -mouse.yCenterRatio * windowHypo / 100 + offset / 35 * pl.layer
        };

        pl.requiresRedraw = true;
    });
}

function parallaxAnimationHandler(delta) {
    mouseParallaxMoveHandler();
    elements.filter(function (pl) {
        return pl.requiresRedraw;
    }).forEach(function (pl) {
        updatePosition(pl, delta);
    });
}

function getParallaxLayer(el) {
    //Find element object, if not found create a new one
    var ind = $(el).data('mouse-parallax-index');
    if (ind === undefined) {
        var layer = $(el).data('mouse-parallax-layer');
        elements[inc] = new ParallaxLayer(el, Number(layer));
        moveLayer(elements[inc]);
        $(el).data('mouse-parallax-index', inc);
        ind = inc;
        inc++;
    }
    return elements[ind];
}

function updatePosition(pl, delta) {

    var xDiff = pl.destination.x - pl.position.x;
    var yDiff = pl.destination.y - pl.position.y;

    if (delta > 200) {
        pl.position = pl.destination;
    } else {
        pl.position = {
            x: pl.position.x + xDiff / (80 - pl.layer * pl.layer * 2) * delta / 8,
            y: pl.position.y + yDiff / (80 - pl.layer * pl.layer * 2) * delta / 8
        };
    }

    if (xDiff < 1 && yDiff < 1) pl.requiresRedraw = false;

    moveLayer(pl);
}

function moveLayer(pl) {
    $(pl.el).css('transform', 'translate3d(' + pl.position.x + 'px, ' + pl.position.y + 'px, 0)');
}

function ParallaxLayer(el, layer) {
    this.el = el;
    this.layer = layer;
    this.position = new Vector(0, windowHeight / 70 * layer);
    this.destination = new Vector();
    this.requiresRedraw = false;
}

function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}
'use strict';

function initPageTransitions() {
    Barba.Pjax.start();
    $('.barba-container').addClass('enter');
    var exitTime = 300;
    var OCTransition = Barba.BaseTransition.extend({
        start: function start() {
            cleanUp();
            msExitPage();
            var barba = this;
            setTimeout(function () {
                $('body').addClass('loading');
                barba.newContainerLoading.then(barba.finish.bind(barba));
            }, exitTime);
        },
        finish: function finish() {
            $(window).scrollTop(0);
            scrollGoal = 0;
            $('body').removeClass('loading');
            this.done();
            reInit();
        }
    });
    Barba.Pjax.getTransition = function () {
        return OCTransition;
    };
}

Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
    var script = container.querySelector("script");
    if (script) {
        var src = $(script).attr('src');
        if (src) {
            if (/maps.googleapis.com/.test(src) && typeof google === 'undefined') {
                $.getScript(src);
            }
        } else {
            eval(script.innerHTML);
        }
    }
});
'use strict';

// Check if elements are in view based on an array of selectors.
// The following classes will be managed on the element:

// .is-fullyScrolled
//  Will be added the first time an element fully enters the viewport

// .is-partiallyScrolled
//  Will be added the first time an element partially enters the viewport

// .is-fullyVisible
// Will be added if the entire element is in the viewport

// .is-partiallyVisible
// Will be added if any part of the element is in the viewport

// These classes can be used to add animations based on scroll or improve
// the performance of code which is operating on a lot of elements

//code is dependent on isInView() utility function

var visibilitySelectors = [{ name: '[data-mouse-parallax-layer]', offset: 0 }, { name: '.ms__trigger', offset: 0.35 }];

function handleVisibiltyClasses(scrollTop) {
    visibilitySelectors.forEach(function (selector) {
        $(selector.name).each(function (index, element) {

            if (isFullyInView(element)) $(element).addClass('is-fullyScrolled is-fullyVisible');else $(element).removeClass('is-fullyVisible');

            if (isPartiallyInView(element, windowHeight * selector.offset)) $(element).addClass('is-partiallyScrolled is-partiallyVisible');else $(element).removeClass('is-partiallyVisible');
        });
    });
}
'use strict';

function initMobileCTA() {
    var wHeight = $(window).height();
    var bHeight = $('body').height();
    var mobileCtaBtn = $('.button.FAB');

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > wHeight) {
            mobileCtaBtn.addClass('is-active');
        }
        if (scroll > bHeight - (wHeight * 2)) {
            mobileCtaBtn.removeClass('is-active');
        }
        if (scroll < wHeight) {
            mobileCtaBtn.removeClass('is-active');
        }
    })
}

function initLightbox() {
    $('.lightbox-toggle').on('click', function (event) {
        console.log('test')
        event.preventDefault();
        $('.lightbox').fadeToggle('fast');

        var context = $(event.currentTarget).attr('data-lightbox-type');
        var content = $(event.currentTarget).attr('data-lightbox-content');
        console.log(event);
        if (context == 'video') {
            $('.lightbox-column').append('\n        <div class="lightbox-video">\n        <iframe src="' + content + '" frameborder="0" allowfullscreen> </iframe>\n        </div>\n    ');
        } else if (context == 'image') {
            $('.lightbox-column').append('\n        <img src="' + content + '" class="img-" frameborder="0" allowfullscreen>\n    ');
        }
    });

    $('.lightbox-close').on('click', function (event) {
        event.preventDefault();
        $('.lightbox-column > *').remove();
    });
}



//------ READY -----
$(document).ready(function () {
    firstTimeInit();
    reInit();
});

function firstTimeInit() {
    //All init functions which only need to be run on first page load should go here
    initPageTransitions();
    initMenuToggle();
    if (!isMobile) {
        initMouseParallax();
    }
    requestAnimationFrame(animationHandler);
}


function reInit() {
    //All init functions which need to be rerun after chaning page should go here
    initDirtyInputs();
    initSelectProgram();
    initAsyncForms();
    initMoShan();
    initMoFlow();
    initMoCordian();
    initMoss();
    initMap();
    initPopup();

    if ($(window).width() <= 414) {
        initMobileCTA();
    }
    initLightbox();
    initFacebookPixel();
    //hack to make any scroll based animations run on new page
    setTimeout(function () {
        $(window).trigger('scroll');
    }, 1);
}

function cleanUp() {
    //function will be run on existing page content before exiting, use it to
    //remove any intervals or unneeded processes
    clearMFIntervals();
    unMoss();
}
//----- REQUEST ANIMATION FRAME -----
var frameCount = 0;
var lastTime;
var delta;

function animationHandler(time) {
    if (!lastTime) lastTime = time;
    delta = time - lastTime;

    checkMoActiveSections(frameCount);
    handleVisibiltyClasses(scrollTop);
    moShanScroll();
    moveToScrollGoal(delta);
    if (!isMobile) {
        animateMoPin(frameCount);
        parallaxAnimationHandler(delta);
    }

    lastTime = time;
    requestAnimationFrame(animationHandler);
}

//------ SCROLL -----
var scrollTop;
function updateScrollPosition(e) {
    scrollTop = $(window).scrollTop();
}
$(window).scroll(updateScrollPosition);

//------ RESIZE -----
var windowWidth, windowHeight, windowHypo, isMobile;

function updateWindowDimensions() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    windowHypo = Math.sqrt(windowWidth * windowWidth + windowHeight * windowHeight);
    isMobile = windowWidth < 500;
}
updateWindowDimensions();

$(window).resize(function () {
    updateWindowDimensions();
    // add any callbacks to handle components which need to repond
    // to changes in window size should go her
    $('.mc').each(function () {
        calculateMCHeights(this);
    });
});

//------ MOUSE -----
var mouse;

function updateMousePosition(e) {
    mouse = {
        x: e.clientX,
        y: e.clientY,
        xRatio: e.clientX / windowWidth,
        yRatio: e.clientY / windowHeight,
        xCenter: e.clientX - windowWidth / 2,
        yCenter: e.clientY - windowHeight / 2,
        xCenterRatio: (e.clientX - windowWidth / 2) / windowWidth,
        yCenterRatio: (e.clientY - windowHeight / 2) / windowHeight
    };
}

updateMousePosition({ clientX: windowWidth / 2, clientY: 0 });

$(window).mousemove(function (e) {
    updateMousePosition(e);
    // add any callbacks to handle components which need to repond
    // to mouse movement should go here
    //mouseParallaxMoveHandler(mouse);
});

function initPopup(){

    $('[href="#popup"]').click(function(e){
        e.preventDefault();
        $("body").addClass("show-popup");
    });

    $("#close").click(function(){
        closePopup();
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            closePopup();
        }   // esc
    });

//owl slider
    var owl1 = $('.cardSlider');
    owl1.owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 12500,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });


    "use strict";


    $('body').on('click', function() {
        $('#ouibounce-modal').hide();
    });

    $('#ouibounce-modal .modal-footer').on('click', function() {
        $('#ouibounce-modal').hide();
    });

    $('#ouibounce-modal .modal-close-btn').on('click', function() {
        $('#ouibounce-modal').hide();
    });

    $('#ouibounce-modal .modal').on('click', function(e) {
        e.stopPropagation();
    });


    var _ouibounce = ouibounce(document.getElementById('ouibounce-modal'), {
        aggressive: false//Making this true makes ouibounce not to obey "once per visitor" rule
    });
}

function closePopup(){
    $("body").removeClass("show-popup");
}

$('body').append('\n    <div class="lightbox">\n      <a href="#lightbox" class="lightbox-close lightbox-toggle">X</a>\n      <div class="lightbox-container">\n        <div class="videorow">\n          <div class="col-sm-12 lightbox-column">\n            \n          </div>\n        </div>\n      </div>\n    </div>\n  ');

function initFacebookPixel() {
    var toursBtn = document.querySelectorAll('.gtag-bookTour');
    toursBtn.forEach(function (tourBtn) {
        tourBtn.addEventListener('click', function () {
            fbq('trackCustom', 'BookATour', {
                content_name: 'Click on a Tour button',
                content_category: 'Click',
                content_type: 'button'
            });
        });
    });

    var downloadPdfBtns = document.querySelectorAll('.gtag-downloadPDF');
    downloadPdfBtns.forEach(function (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function () {
            console.log(downloadPdfBtn);
            fbq('trackCustom', 'DownloadPDF', {
                content_name: 'Click on a PDF button',
                content_category: 'Click',
                content_type: 'button'
            });
        });
    });

    var downloadPdfPopups = document.querySelectorAll('.gtag-pdfDownload');
    downloadPdfPopups.forEach(function (downloadPdfPopup) {
        downloadPdfPopup.addEventListener('click', function () {
            console.log(downloadPdfPopup);
            fbq('trackCustom', 'DownloadPDF Popup', {
                content_name: 'Click on a PDF Popup',
                content_category: 'Click',
                content_type: 'popup'
            });
        });
    });
};





