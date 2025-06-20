var API = null;
var ADMINAPI = null;

function init($) {

	"use strict";

	// Sticky nav
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 1) {
			$('.header').addClass("sticky");
		} else {
			$('.header').removeClass("sticky");
		}
	});
	
	// Sticky sidebar
	if($('#sidebar').length) {
		$('#sidebar').theiaStickySidebar({
			updateSidebarHeight: true,
			additionalMarginTop: 100
		});
	}

	// Faq section
	if($('#faq_cat').length) {
		$('#faq_cat').theiaStickySidebar({
			additionalMarginTop: 100
		});
	}

	if($("div#menu1").length) {
		var $adminMenu = $("div#menu1").mmenu({
			"extensions": ["pagedim-black", "theme-dark"],
			counters: true,
			keyboardNavigation: {
				enable: true,
				enhance: true
			},
			navbar: {
				title: 'ADMIN MENU'
			},
			navbars: [{position:'bottom',content: ['<a href="#0">© 2019 Sober</a>']}]},
		{
			// configuration
			clone: true,
			classNames: {
				fixedElements: {
					fixed: "menu_fixed",
					sticky: "sticky"
				}
			}
		});

	}
	//Mobile Admin Menu

	// Mobile Mmenu
	var $menu = $("nav#menu").mmenu({
		"extensions": ["pagedim-black", "theme-dark"],
		counters: true,
		keyboardNavigation: {
			enable: true,
			enhance: true
		},
		navbar: {
			title: 'MENU'
		},
		navbars: [{position:'bottom',content: ['<a href="#0">© 2019 Sober</a>']}]},
		{
		// configuration
		clone: true,
		classNames: {
			fixedElements: {
				fixed: "menu_fixed",
				sticky: "sticky"
			}
		}
	});

  $('#homeCarousel.slide').carousel({
    interval: 25000,
    pause: "hover"
  });

  $('input').focus(function(){
    $("#homeCarousel").carousel('pause');
  }).blur(function() {
    $("#homeCarousel").carousel('cycle');
  });

	var $icon = $("#hamburger");
	API = $menu.data("mmenu");
	if($adminMenu) {
		var $icon1 = $("#admin-hamburger");
		ADMINAPI = $adminMenu.data("mmenu");
	}
	$icon.on("click", function () {
		console.log('clicked icon')
		API.open();
	});
	API.bind("open:finish", function () {
		setTimeout(function () {
			$icon.addClass("is-active");
		}, 100);
	});
	API.bind("close:finish", function () {
		setTimeout(function () {
			$icon.removeClass("is-active");
		}, 100);
	});
	if(ADMINAPI) {
		$icon1.on("click", function () {
			ADMINAPI.open();
		});
		ADMINAPI.bind("open:finish", function () {
			setTimeout(function () {
				$icon1.addClass("is-active");
			}, 100);
		});
		ADMINAPI.bind("close:finish", function () {
			setTimeout(function () {
				$icon1.removeClass("is-active");
			}, 100);
		});
	}
	
	// Rotate icons
	$(".main_categories a").hover(
		function(){$(this).find("i").toggleClass("rotate-x");}
	);
	
	// Show Password
	$('#password, #password_in').hidePassword('focus', {
		toggle: {
			className: 'my-toggle'
		}
	});
	
	//Scroll to top
	$(window).on('scroll', function () {
		'use strict';
		if ($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});
	
	/* Animation on scroll */
	new WOW().init();
	
	// Account switch client type
	$('input[name="client_type"]').click(function () {
		var inputValue = $(this).attr("value");
		var targetBox = $("." + inputValue);
		$(".box").not(targetBox).hide();
		$(targetBox).show();
	});

  $('#sign-in').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
    mainClass: 'my-mfp-zoom-in'
  });
	
	//  Video popups
	$('.video').magnificPopup({type:'iframe'});	/* video modal*/
	
	// Image popups
	$('.magnific-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
            preloader: true,
			gallery: {
				enabled: true
			},
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					// just a hack that adds mfp-anim class to markup 
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			closeOnContentClick: true,
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});
	});
	
	// Other address
	$('#other_addr input').change(function(){
        if(this.checked)
            $('#other_addr_c').fadeIn('fast');
        else
            $('#other_addr_c').fadeOut('fast');
    });
	
	// Accordion
	function toggleChevron(e) {
		$(e.target)
			.prev('.card-header')
			.find("i.indicator")
			.toggleClass('ti-minus ti-plus');
	}
	$('.accordion_2').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);
		function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".indicator")
            .toggleClass('ti-minus ti-plus');
    }
	
	// Jquery select
	$('.custom-search-input-2 select, .custom-select-form select').niceSelect();
	
	// Like Icon
    $('.wish_bt').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('liked');
	});
	
	// Search Mobile aside
	$('a.side_panel').on("click", function () {
		$('#search_mobile').toggleClass('show');
		$('.layer').toggleClass('layer-is-visible');
	});
	
	// Search Mobile horizontal
	$('a.search_mob').click(function () {
		$('.search_mob_wp').slideToggle("fast");
	});
	
	// Collapse filters
	$(window).on('load', function () {
		var width = $(window).width();
		if ($(this).width() < 991) {
			$('.collapse#collapseFilters').removeClass('show');
		} else {
			$('.collapse#collapseFilters').addClass('show');
		};
	});
	
	//Footer collapse
	var $headingFooter = $('footer h3');
	$(window).resize(function() {
        if($(window).width() <= 575) {
      		$headingFooter.attr("data-toggle","collapse");
        } else {
          $headingFooter.removeAttr("data-toggle","collapse");
        }
    }).resize();
	$headingFooter.on("click", function () {
		$(this).toggleClass('opened');
	});
	
	// Carousels
	$('#carousel').owlCarousel({
		center: true,
		items: 2,
		loop: true,
		margin: 10,
		responsive: {
			0: {
				items: 1,
				dots:false
			},
			600: {
				items: 2
			},
			1000: {
				items: 4
			}
		}
	});
	
	// Sticky filters
	$(window).on('load resize', function () {
		var width = $(window).width();
		if (width <= 991) {
			$('.sticky_horizontal').stick_in_parent({
				offset_top: 40
			});
		} else {
			$('.sticky_horizontal').stick_in_parent({
				offset_top: 60			
			});
		}
	});
	
	// Sticky results map view
	$(window).on('load resize', function () {
		var width = $(window).width();
		if (width <= 991) {
			$('#results_map_view').stick_in_parent({
				offset_top: 47
			});
		} else {
			$('#results_map_view').stick_in_parent({
				offset_top: 58			
			});
		}
	});
	            
	// Secondary nav scroll
	var $sticky_nav= $('.secondary_nav');
	$sticky_nav.find('a').on('click', function(e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').animate({
			'scrollTop': $target.offset().top - 85
		}, 800, 'swing');
	});
	$sticky_nav.find('ul li a').on('click', function () {
		$sticky_nav.find('ul li a.active').removeClass('active');
		$(this).addClass('active');
	});
	
	$('#faq_box a[href^="#"]').on('click', function () {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			   if (target.length) {
				 $('html,body').animate({
					 scrollTop: target.offset().top -195
				}, 800);
				return false;
			}
		}
	});
	$('ul#cat_nav li a').on('click', function () {
		$('ul#cat_nav li a.active').removeClass('active');
		$(this).addClass('active');
	});
	
	// Button show/hide map
	$(".btn_map, .btn_map_in, .btn_filt").on("click", function () {
		var el = $(this);
		el.text() == el.data("text-swap") ? el.text(el.data("text-original")) : el.text(el.data("text-swap"));
		$('html, body').animate({
			scrollTop: $("body").offset().top
		}, 600);
	});
	
	// Button map view
	$(".btn_map_view").on("click", function () {
		var el = $(this);
		el.text() == el.data("text-swap") ? el.text(el.data("text-original")) : el.text(el.data("text-swap"));
	});
	
	
}
