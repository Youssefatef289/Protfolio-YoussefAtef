(function ($) {

  "use strict";

    // COLOR MODE
    $('.color-mode').click(function(){
        $('.color-mode-icon').toggleClass('active')
        $('body').toggleClass('dark-mode')
    })

    // HEADER
    $(".navbar").headroom();

    // PROJECT CAROUSEL - Enhanced with better mobile support
    $('.owl-carousel').not('.certificates-carousel').owlCarousel({
    	items: 1,
	    loop: true,
	    margin: 0,
	    nav: true,
	    dots: true,
	    autoplay: false,
	    autoplayTimeout: 5000,
	    autoplayHoverPause: true,
	    smartSpeed: 800,
	    responsive: {
	        0: {
	            items: 1,
	            nav: true,
	            dots: true,
	            margin: 0
	        },
	        600: {
	            items: 1,
	            nav: true,
	            dots: true,
	            margin: 0
	        },
	        1000: {
	            items: 1,
	            nav: true,
	            dots: true,
	            margin: 0
	        }
	    },
	    navText: [
	        '<i class="fa-solid fa-chevron-left"></i>',
	        '<i class="fa-solid fa-chevron-right"></i>'
	    ]
	});

    // CERTIFICATES CAROUSEL
    $('.certificates-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true,
	    autoplay:true,
	    autoplayTimeout:3000,
	    autoplayHoverPause:true,
	    navText: [
	        '<i class="fa-solid fa-chevron-left"></i>',
	        '<i class="fa-solid fa-chevron-right"></i>'
	    ]
	});

    // TESTIMONIALS CAROUSEL
    $('.testimonials-carousel').owlCarousel({
    	items: 1,
	    loop:true,
	    margin:10,
	    nav:true,
	    autoplay:true,
	    autoplayTimeout:4000,
	    autoplayHoverPause:true,
	    navText: [
	        '<i class="fa-solid fa-chevron-left"></i>',
	        '<i class="fa-solid fa-chevron-right"></i>'
	    ]
	});

    // SKILL BARS ANIMATION
    function animateSkillBars() {
        $('.skill-progress').each(function() {
            const $this = $(this);
            const skillValue = $this.data('skill');
            
            if (skillValue) {
                $this.css('width', skillValue + '%');
            }
        });
    }

    // Animate skill bars on scroll
    $(window).on('scroll', function() {
        const skillsSection = $('#skills');
        if (skillsSection.length) {
            const scrollPosition = $(window).scrollTop() + $(window).height();
            const sectionPosition = skillsSection.offset().top + skillsSection.outerHeight();
            
            if (scrollPosition > skillsSection.offset().top && !skillsSection.hasClass('animated')) {
                skillsSection.addClass('animated');
                animateSkillBars();
            }
        }
    });

    // Trigger on page load if skills section is visible
    $(document).ready(function() {
        const skillsSection = $('#skills');
        if (skillsSection.length) {
            const scrollPosition = $(window).scrollTop() + $(window).height();
            if (scrollPosition > skillsSection.offset().top) {
                skillsSection.addClass('animated');
                animateSkillBars();
            }
        }
    });

    // STATISTICS COUNTER ANIMATION
    function animateCounters() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const target = parseInt($this.data('target'));
            
            if (target && !$this.hasClass('counted')) {
                $this.addClass('counted');
                
                $({ countNum: 0 }).animate({
                    countNum: target
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(target);
                    }
                });
            }
        });
    }

    // Animate counters on scroll
    $(window).on('scroll', function() {
        const statisticsSection = $('.statistics');
        if (statisticsSection.length) {
            const scrollPosition = $(window).scrollTop() + $(window).height();
            const sectionPosition = statisticsSection.offset().top + statisticsSection.outerHeight();
            
            if (scrollPosition > statisticsSection.offset().top && !statisticsSection.hasClass('animated')) {
                statisticsSection.addClass('animated');
                animateCounters();
            }
        }
    });

    // Trigger on page load if statistics section is visible
    $(document).ready(function() {
        const statisticsSection = $('.statistics');
        if (statisticsSection.length) {
            const scrollPosition = $(window).scrollTop() + $(window).height();
            if (scrollPosition > statisticsSection.offset().top) {
                statisticsSection.addClass('animated');
                animateCounters();
            }
        }
	});

    // SMOOTHSCROLL
    $(function() {
      $('.nav-link, .custom-btn-link').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
        }, 1000);
        event.preventDefault();
      });
    });  

    // TOOLTIP
    $('.social-links a').tooltip();

    // LANGUAGE TOGGLE
    let currentLang = localStorage.getItem('language') || 'en';
    
    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Add smooth fade out effect
        $('body').addClass('language-changing');
        
        // Update HTML dir attribute
        if (lang === 'ar') {
            $('html').attr('dir', 'rtl').attr('lang', 'ar');
        } else {
            $('html').attr('dir', 'ltr').attr('lang', 'en');
        }
        
        // Add class to ensure images are visible
        $('body').addClass('images-visible');
        
        // Force images to be visible immediately and with multiple attempts
        function forceImagesVisible() {
            // Add dynamic style tag for maximum priority
            if ($('#force-images-visible-style').length === 0) {
                $('head').append('<style id="force-images-visible-style">html[dir="rtl"] img, html[dir="ltr"] img, img, .owl-carousel img, .project-image, .certificate-image, .about-image img { display: block !important; visibility: visible !important; opacity: 1 !important; max-width: 100% !important; height: auto !important; }</style>');
            }
            
            // Force all images with strong CSS
            $('img').each(function() {
                const $img = $(this);
                // Remove any hidden classes
                $img.removeClass('hidden d-none invisible').addClass('img-visible');
                // Force inline styles with high priority
                $img[0].style.setProperty('display', 'block', 'important');
                $img[0].style.setProperty('visibility', 'visible', 'important');
                $img[0].style.setProperty('opacity', '1', 'important');
                $img[0].style.setProperty('max-width', '100%', 'important');
                $img[0].style.setProperty('height', 'auto', 'important');
                
                // Reload image if needed
                if ($img[0].complete === false) {
                    const src = $img.attr('src');
                    if (src) {
                        $img.attr('src', src + '?t=' + new Date().getTime());
                    }
                }
            });
            
            // Force all image containers
            $('.project-info, .about-image, .certificate-item, .item, .owl-item, .owl-carousel .item, .project-image-wrapper, .project-image, .certificate-image').each(function() {
                const $container = $(this);
                $container[0].style.setProperty('display', 'block', 'important');
                $container[0].style.setProperty('visibility', 'visible', 'important');
                $container.removeClass('hidden d-none invisible');
            });
            
            // Force carousel containers and stage
            $('.owl-carousel, .owl-stage, .owl-stage-outer, .owl-stage-inner').each(function() {
                const $carousel = $(this);
                $carousel[0].style.setProperty('display', 'block', 'important');
                $carousel[0].style.setProperty('visibility', 'visible', 'important');
                $carousel.removeClass('hidden d-none invisible');
            });
        }
        
        // Execute immediately
        forceImagesVisible();
        
        // Execute after short delay
        setTimeout(forceImagesVisible, 10);
        
        // Execute after longer delay to catch any late-loading images
        setTimeout(function() {
            forceImagesVisible();
            
            // Force carousel to refresh and show images
            if ($('.owl-carousel').length > 0) {
                $('.owl-carousel').each(function() {
                    const $carousel = $(this);
                    const isTestimonials = $carousel.hasClass('testimonials-carousel');
                    const isCertificates = $carousel.hasClass('certificates-carousel');
                    
                    if ($carousel.data('owl.carousel')) {
                        try {
                            // Try refresh first
                            $carousel.trigger('refresh.owl.carousel');
                            // Force update
                            setTimeout(function() {
                                $carousel.trigger('update.owl.carousel');
                                forceImagesVisible();
                            }, 50);
                        } catch(e) {
                            try {
                                // Try update
                                $carousel.trigger('update.owl.carousel');
                                forceImagesVisible();
                            } catch(e2) {
                                // Reinitialize if needed
                                try {
                                    $carousel.owlCarousel('destroy');
                                } catch(e3) {}
                                
                                setTimeout(function() {
                                    if (isCertificates) {
                                        $carousel.owlCarousel({
                                            items: 1,
                                            loop: true,
                                            margin: 10,
                                            nav: true,
                                            autoplay: true,
                                            autoplayTimeout: 3000,
                                            autoplayHoverPause: true,
                                            navText: [
                                                '<i class="fa-solid fa-chevron-left"></i>',
                                                '<i class="fa-solid fa-chevron-right"></i>'
                                            ]
                                        });
                                    } else if (isTestimonials) {
                                        $carousel.owlCarousel({
                                            items: 1,
                                            loop: true,
                                            margin: 10,
                                            nav: true,
                                            autoplay: true,
                                            autoplayTimeout: 4000,
                                            autoplayHoverPause: true,
                                            navText: [
                                                '<i class="fa-solid fa-chevron-left"></i>',
                                                '<i class="fa-solid fa-chevron-right"></i>'
                                            ]
                                        });
                                    } else {
                                        $carousel.owlCarousel({
                                            items: 1,
                                            loop: true,
                                            margin: 0,
                                            nav: true,
                                            dots: true,
                                            autoplay: false,
                                            autoplayTimeout: 5000,
                                            autoplayHoverPause: true,
                                            smartSpeed: 800,
                                            navText: [
                                                '<i class="fa-solid fa-chevron-left"></i>',
                                                '<i class="fa-solid fa-chevron-right"></i>'
                                            ]
                                        });
                                    }
                                    forceImagesVisible();
                                }, 100);
                            }
                        }
                    }
                });
            }
        }, 100);
        
        // Final check after transition
        setTimeout(forceImagesVisible, 350);
        
        // Additional checks
        setTimeout(forceImagesVisible, 500);
        setTimeout(forceImagesVisible, 1000);
        
        // Update all elements with data-en and data-ar attributes
        $('[data-en], [data-ar]').each(function() {
            const $el = $(this);
            const text = lang === 'ar' ? $el.attr('data-ar') : $el.attr('data-en');
            
            if (!text) return;
            
            // If element has no children, just update text
            if ($el.children().length === 0) {
                $el.text(text);
            } else {
                // For elements with children, check if we should update parent or children
                // Update child spans that have data attributes
                $el.find('span[data-en], span[data-ar]').each(function() {
                    const $child = $(this);
                    const childText = lang === 'ar' ? $child.attr('data-ar') : $child.attr('data-en');
                    if (childText) {
                        $child.text(childText);
                    }
                });
                
                // If the element itself has data attributes and contains only text nodes and spans, update it
                const hasOnlyTextAndSpans = $el.children().length === $el.find('span').length;
                if (hasOnlyTextAndSpans && $el.text().trim() === ($el.attr('data-en') || $el.attr('data-ar'))) {
                    $el.text(text);
                }
            }
        });
        
        // Update placeholders
        $('[data-placeholder-en], [data-placeholder-ar]').each(function() {
            const $el = $(this);
            const placeholder = lang === 'ar' ? $el.attr('data-placeholder-ar') : $el.attr('data-placeholder-en');
            if (placeholder) {
                $el.attr('placeholder', placeholder);
            }
        });
        
        // Update button values
        $('[data-value-en], [data-value-ar]').each(function() {
            const $el = $(this);
            const value = lang === 'ar' ? $el.attr('data-value-ar') : $el.attr('data-value-en');
            if (value) {
                $el.attr('value', value);
            }
        });
        
        // Update language toggle button text
        $('#langText').text(lang === 'ar' ? 'EN' : 'AR');
        $('#languageToggle').attr('title', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
        
        // Fade in effect after transition completes
        setTimeout(function() {
            $('body').removeClass('language-changing');
        }, 300);
    }
    
    // Initialize language on page load
    updateLanguage(currentLang);
    
    // Ensure images are visible on page load (especially for Arabic)
    $(document).ready(function() {
        // Add dynamic style immediately
        if ($('#force-images-visible-style').length === 0) {
            $('head').append('<style id="force-images-visible-style">html[dir="rtl"] img, html[dir="ltr"] img, img, .owl-carousel img, .project-image, .certificate-image, .about-image img { display: block !important; visibility: visible !important; opacity: 1 !important; max-width: 100% !important; height: auto !important; }</style>');
        }
        
        // Force images visible multiple times to catch all cases
        function ensureImagesOnLoad() {
            $('img').each(function() {
                const $img = $(this);
                $img.removeClass('hidden d-none invisible').addClass('img-visible');
                $img[0].style.setProperty('display', 'block', 'important');
                $img[0].style.setProperty('visibility', 'visible', 'important');
                $img[0].style.setProperty('opacity', '1', 'important');
                $img[0].style.setProperty('max-width', '100%', 'important');
                $img[0].style.setProperty('height', 'auto', 'important');
            });
            
            // Force containers
            $('.project-info, .about-image, .certificate-item, .item, .owl-item, .owl-carousel, .project-image-wrapper, .project-image, .certificate-image').each(function() {
                const $el = $(this);
                $el[0].style.setProperty('display', 'block', 'important');
                $el[0].style.setProperty('visibility', 'visible', 'important');
                $el.removeClass('hidden d-none invisible');
            });
            
            // Force carousel containers
            $('.owl-stage, .owl-stage-outer, .owl-stage-inner').each(function() {
                const $el = $(this);
                $el[0].style.setProperty('display', 'block', 'important');
                $el[0].style.setProperty('visibility', 'visible', 'important');
            });
        }
        
        // Execute immediately
        ensureImagesOnLoad();
        
        // Execute after delays
        setTimeout(ensureImagesOnLoad, 50);
        setTimeout(ensureImagesOnLoad, 200);
        setTimeout(ensureImagesOnLoad, 500);
        setTimeout(ensureImagesOnLoad, 1000);
    });
    
    // Language toggle button click
    $('#languageToggle').on('click', function() {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        updateLanguage(newLang);
    });

    // SCROLL TO TOP BUTTON - Enhanced
    const scrollToTopBtn = $('#scrollToTop');
    
    // Show/hide button based on scroll position with smooth transition
    let scrollTimeout;
    $(window).on('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
        if ($(window).scrollTop() > 300) {
            scrollToTopBtn.addClass('show');
        } else {
            scrollToTopBtn.removeClass('show');
        }
        }, 10);
    });
    
    // Scroll to top on button click with smooth animation
    scrollToTopBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
        
        // Add a small bounce effect
        $(this).addClass('clicked');
        setTimeout(function() {
            scrollToTopBtn.removeClass('clicked');
        }, 200);
    });

    // CONTACT FORM - FormSubmit Integration
    // Handle form placeholders based on language
    function updateFormPlaceholders() {
        const currentLang = $('html').attr('lang') || 'en';
        const isRTL = currentLang === 'ar';
        
        $('#name').attr('placeholder', isRTL ? $('#name').data('placeholder-ar') : $('#name').data('placeholder-en'));
        $('#email').attr('placeholder', isRTL ? $('#email').data('placeholder-ar') : $('#email').data('placeholder-en'));
        $('#message').attr('placeholder', isRTL ? $('#message').data('placeholder-ar') : $('#message').data('placeholder-en'));
    }
    
    updateFormPlaceholders();
    
    // Update placeholders when language changes
    $(document).on('languageChanged', function() {
        updateFormPlaceholders();
    });

    // Contact Form Submission
    $('#contactForm').on('submit', function(e) {
        const submitBtn = $('#submitBtn');
        const submitBtnText = $('#submitBtnText');
        const submitBtnLoading = $('#submitBtnLoading');
        const formMessage = $('#formMessage');
        const currentLang = $('html').attr('lang') || 'en';
        const isRTL = currentLang === 'ar';
        
        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        
        // Validate form
        if (!name || !email || !message) {
            e.preventDefault();
            showMessage('error', isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill in all fields');
            return false;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            showMessage('error', isRTL ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
            return false;
        }
        
        // Show loading state
        submitBtnText.hide();
        submitBtnLoading.show();
        submitBtn.prop('disabled', true);
        formMessage.hide();
        
        // Set success redirect to current page
        $('input[name="_next"]').val(window.location.href + '?success=true');
        
        // Show success message after a short delay (form will submit)
        setTimeout(function() {
            showMessage('success', isRTL ? 'جاري إرسال الرسالة...' : 'Sending message...');
        }, 100);
    });
    
    // Check if form was submitted successfully
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const currentLang = $('html').attr('lang') || 'en';
        const isRTL = currentLang === 'ar';
        showMessage('success', isRTL ? 'تم إرسال الرسالة بنجاح! سأرد عليك قريباً.' : 'Message sent successfully! I will get back to you soon.');
        $('#contactForm')[0].reset();
        updateFormPlaceholders();
        
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Function to show success/error messages
    function showMessage(type, message) {
        const formMessage = $('#formMessage');
        formMessage.removeClass('success error').addClass(type);
        formMessage.text(message).fadeIn();
        
        // Auto hide after 5 seconds (only for success messages)
        if (type === 'success') {
            setTimeout(function() {
                formMessage.fadeOut();
            }, 5000);
        }
    }

})(jQuery);
