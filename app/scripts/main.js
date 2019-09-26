document.addEventListener('DOMContentLoaded', ready);

function ready() {
    /*==========
    variables
    ==========*/

    const tabletWidth = 965;

    var body = document.body;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var header = document.querySelector('header');
    var js_headerMenuMobileBtn = document.querySelector('.js_headerMenuMobileBtn');
    var gallerySlider = document.querySelector('.js_gallery-slider');
    var links = document.querySelectorAll('.js_link');

    var sendMessageForm = document.querySelector('.js_form');


    /*==========
    events
    ==========*/

    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth || document.documentElement.clientWidth;
        onHeaderChange();
    });

    document.addEventListener('scroll', function() {
        onHeaderChange();
    });

    if (gallerySlider) {
        initGallerySlider();
    }

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            event.preventDefault();

            var hash = link.getAttribute('href');
            var blockToScroll = document.querySelector(hash);

            blockToScroll.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (sendMessageForm) {
        sendMessageForm.addEventListener('submit', function(e) {
            sendMessage(e, $(sendMessageForm));
        });
    }

    if (js_headerMenuMobileBtn) {
        js_headerMenuMobileBtn.addEventListener('click', toggleMobileMenu);
    }

    onHeaderChange();
    initGalery();

    /*==========
    functions
    ==========*/

    function initGallerySlider() {
        var swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.slider-button-next',
                prevEl: '.slider-button-prev',
            },
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true
        });
    }

    function onHeaderChange() {
        var scrollOffset = window.pageYOffset;

        if (windowWidth <= tabletWidth ||
            (windowWidth >= tabletWidth && scrollOffset >= 400)) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed');
        }
    }

    function initGalery() {
        var lightbox = GLightbox({
            selector: 'glightbox',
            touchNavigation: true,
            loopAtEnd: true
        });
    }

    function sendMessage(e, form) {
        e.preventDefault();
        var successMessage = document.querySelector('.js_from-success');

        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function() {
                form[0].reset();
                form[0].classList.add('hidden');
                successMessage.classList.remove('hidden');
                setTimeout(function() {
                    form[0].classList.remove('hidden');
                    successMessage.classList.add('hidden');
                }, 2000);
            },
            error: function() {
                console.log('error sendMessage');
            }
        });
    }

    function toggleMobileMenu() {
        if (header) {
            header.classList.toggle('open');
        }
    }
}