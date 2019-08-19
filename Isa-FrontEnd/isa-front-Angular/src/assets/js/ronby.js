(function($) {
	$(document).ready(function(){
		
		$('.countdown-style-1').each(function(){
			$(this).countdown($(this).attr('data-countdown-to')).on('update.countdown', function(event) {
			  var $this = $(this).html(event.strftime(''
			   	+ '<li><div class="number">%D</div><div class="text">Days</div></li>'
			    + '<li><div class="number">%H</div><div class="text">Hours</div></li>'
			    + '<li><div class="number">%M</div><div class="text">Minutes</div></li>'
			    + '<li><div class="number">%S</div><div class="text">Seconds</div></li>'
			    ));
			});
		})
		
		$('.tesimonial-slider-1').owlCarousel({
			loop: true,
			autoplayHoverPause: true,
			margin:0,
			autoplay: true,					
			dots: false,
			nav:true,	
			navText: ['<i class="fa fa-caret-left background-primary"></i>','<i class="fa fa-caret-right background-primary"></i>'],
			autoplaySpeed: 1000,
			navSpeed: 1000,			
			items: 1
		});

		$('.masonry').masonry({
			columnWidth: '.masonry-sizer',
			gutter: '.masonry-gutter',
			itemSelector: '.masonry-item',
			percentPosition: true
		});

		$('.tabs-filter').each(function(){
			var el = $(this);
			el.on('click', '.tab', function(e){
				e.preventDefault();
				el.find('.tab.active').removeClass('active');
				$(this).addClass('active');
				el.find('.content-tab.active').removeClass('active');
				el.find('.content-tab[data-tab="' + $(this).attr('data-tab') + '"]').addClass('active');
			});
		});
		
		$('.brand-carousel-slider').owlCarousel({
			loop: true,
			autoplayHoverPause: true,
			margin:70,
			autoplay: true,					
			dots: false,
			nav: false,				
			autoplaySpeed: 1000,
			navSpeed: 1000,
			//slideBy: 'page',
			responsive: {
				0: {items: 1},
				400: {items: 2},
				600: {items: 3},
				800: {items: 4},
				1000: {items: 5}
			}
		});
		$('#sync1').owlCarousel({
			loop: true,
			autoplayHoverPause: true,
			margin:70,
			autoplay: false,					
			dots: false,
			nav: true,				
			autoplaySpeed: 1000,
			navText: ['<i class="fa fa-angle-left background-white"></i>','<i class="fa fa-angle-right background-white"></i>'],
			navSpeed: 1000,
			responsive: {
				0: {items: 1},
				1000: {items: 1}
			}
		});
		$('.project-detail-carousel-slider').owlCarousel({
			loop: true,
			autoplayHoverPause: true,
			margin:20,
			autoplay: true,					
			dots: false,
			nav: false,
			navSpeed: 1000,			
			autoplaySpeed: 1000,
			//slideBy: 'page',
			responsive: {
				0: {items: 2},
				576: {items: 3},
				768: {items: 4},
				992: {items: 4},
				1200: {items: 5}
			}
		});
		$('.testimonial-slider-2').owlCarousel({
			loop: true,
			autoplayHoverPause: true,
			autoplay: true,					
			dots: false,
			nav: true,
			navText: ['<i class="fa fa-angle-left background-white"></i>','<i class="fa fa-angle-right background-white"></i>'],
			navSpeed: 1000,		
			autoplaySpeed: 1000,
			//slideBy: 'page',
			items: 1
		});

		$('.post-carousel-2 .owl-carousel').owlCarousel({
			loop: true,
			autoplayHoverPause: true,
			margin:30,
			autoplay: true,					
			dots: false,
			nav: true,
			navSpeed: 1000,			
			autoplaySpeed: 1000,
			navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			responsive: {
				0: {items: 1},
				576: {items: 2},
				768: {items: 3},
				992: {items: 3},
				1200: {items: 4}
			}
		});

		$('.post-carousel-3 .owl-carousel').owlCarousel({
			loop: true,
			autoplayHoverPause: true,
			margin:30,
			autoplay: true,					
			dots: false,
			nav: true,
			navSpeed: 1000,			
			autoplaySpeed: 1000,
			navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			responsive: {
				0: {items: 1},				
				768: {items: 2},				
				1200: {items: 3}
			}
		});
	
		$('.magnific-gallery').magnificPopup({
			delegate: 'a', // child items selector, by clicking on it popup will open
			type: 'image',		
			gallery: {
			  enabled: true, // set to true to enable gallery

			}
		});


		// Toggle styles customizer
		$('#sc-toggle').click(function(e) {
			$('#style-customizer').toggleClass('expanded');
		});
		$('#sc-toggle-close').click(function(e) {
			$('#style-customizer').removeClass('expanded');
		});
		

		$('.custom-number-input , .custom-number-input-2').each(function(){
			var parent = $(this);
			var input = $(this).find('input');
			if (!input) return;

			var min = parseInt(input.attr('min'));
			var step = parseInt(input.attr('step')) || 1;

			function input_add (x) {
				current_value = parseInt(input.val());
				if (min && (current_value + x) < min ) {
					return;
				}
				input.val(current_value + x);
			}
			parent.on('click','.input-increase', function(){
				input_add(step);
			});
			parent.on('click','.input-decrease', function(){
				input_add(-step);
			});
		});

		$('.testimonial-slider-3').owlCarousel({
			loop: true,
			autoplayHoverPause: true,
			autoplay: true,					
			dots: false,
			nav: true,
			navSpeed: 1000,		
			autoplaySpeed: 1000,
			slideBy: 'page',
			items: 1
		});

		$('.hidden-search-form-toggler').click(function(e){
			e.preventDefault();
			$('.hidden-search-form').fadeIn();			
		});
		$('.hidden-search-form .form-close').click(function(e){
			e.preventDefault();
			$('.hidden-search-form').fadeOut();
		});

		$('.countUpNumber').each(function () {
		    $(this).prop('Counter',0).animate({
		        Counter: $(this).text()
		    }, {
		        duration: 4000,
		        easing: 'swing',
		        step: function (now) {
		            $(this).text(Math.ceil(now));
		        }
		    });
		});
		
	});
})(jQuery);