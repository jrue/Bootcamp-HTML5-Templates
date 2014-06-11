/**
 * Sidebar Template by Jeremy Rue at the UC Berkeley Graduate School of Journalism.
 *
 * Copyright (c) 2013 The Regents of the University of California
 * Released under the GPL Version 2 license
 * http://www.opensource.org/licenses/gpl-2.0.php
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 */
//easing function for smooth scrolling
jQuery.extend(jQuery.easing,
	{
		easeInOutCubic: function(e, f, a, h, g) {
			if ((f /= g / 2) < 1) {
				return h / 2 * f * f * f + a;
			}
			return h / 2 * ((f -= 2) * f * f + 2) + a;
		}
	});

//after document is loaded
$(document).ready(function($){

	var timer,
			panel,
			selected = [],
			breakpoints = [];

	/**
	 * Switch the currently selected nav element
	 *
	 * @param {to} Number - The index of which panel is currently selected
	 */
	function switchClasses(to){
		to = Number(to);
		if(panel != to){
			panel = to;
			$('nav li').removeClass('selected');
			selected[to].addClass('selected');
			resetBreakPoints();
		}
	}

	/**
	 * Will reset the breakpoints of each article tag. Call when window is resized
	 *
	 */
	function resetBreakPoints(){
		breakpoints = [];
		breakpoints.push($('#home').offset().top);
		$('article').each(function(i){
			breakpoints.push($(this).offset().top - 15);
		});
	}

	/**
	 * Capture navigation links and animate scrolling to that section.
	 *
	 */
	$('body > nav li a').on('click', function(event){
		if($(this).attr('href').substr(0, 1) == '#'){
			event.preventDefault() ? event.preventDefault() : event.returnValue = false;
			$('html, body').stop().animate(
				{
					scrollTop: $( $(this).attr('href') ).offset().top + 1 //Plus 1 px
				}, 700, 'easeInOutCubic');
			if($(window).width() < 720){$('nav ul').slideUp();}
		}
	});

	/**
	 * Update selected nav link as window scrolls.
	 *
	 */
	$(window).on('scroll', function(){
		if($(window).scrollTop() > breakpoints[breakpoints.length - 1]){
			switchClasses(breakpoints.length - 1);
		} else {
			for(var i=0; i < breakpoints.length; i++)
			{
				if($(window).scrollTop() > breakpoints[i] && $(window).scrollTop() < breakpoints[i+1]){
					switchClasses(i);
				}
			}
		}

	});

	/**
	 * When viewing smartphone version, show menu button and toggle when clicked
	 *
	 */
	$('#smartphone_menu').on('click',function(){
		if($('nav ul').is(':hidden')){
			$('nav ul').slideDown();
		} else {
			$('nav ul').slideUp();
		}
	});

	/**
	 * set each section to the window's height, even on resize
	 *
	 */
	$('body > article').css('min-height', $(window).height());
	$('nav ul li').eq(0).addClass('selected');
	$('body > header').css('height', $(window).height());
	if($('body').hasClass('sidebartheme')){
		if($(window).width() < 720){ $('nav').css('min-height', '');} else {$('nav').css('min-height', $(window).height());}
	}

	var http = 'http:';

	$('iframe').each(function(){
		if($(this).attr('src').substr(0, 2) === '//'){
			if(document.URL.substr(0, 4) === 'file'){
				$(this).attr('src', http.concat($(this).attr('src')));
			}
		}
		if($(this).attr('height') && $(this).attr('width') !== '100%' && !$(this).data('no-resize')){

			var newHeight = ($(window).width() - 230) * 0.95 * $(this).attr('height') / $(this).attr('width');
			
			if(newHeight > $(window).height() - 50){
				newHeight = $(window).height() * 0.8;
			}

			$(this).attr('height',  newHeight );
			$(this).attr('width', '100%');
		}

	});



	/**
	 * Set height on homecontainer div for absolute centering
	 */
	var homeContainerHeight = 20;
	$('#homecontainer *').each(function(){ homeContainerHeight += $(this).outerHeight(true); });
	$('#homecontainer').height(homeContainerHeight);

	/**
	 * Some responsive magic when window is resized
	 *
	 */
	$(window).on('resize', function(){
		timer && clearTimeout(timer);
		timer = setTimeout(resetBreakPoints, 100);
		$('body > article').css('min-height', $(window).height());
		$('body > header').css('height', $(window).height());
		if($(window).width() > 720){ $('nav ul').removeAttr('style');}
		if($('body').hasClass('sidebartheme')){
			if($(window).width() < 720){ $('nav').css('min-height', '');} else {$('nav').css('min-height', $(window).height());}
		}
		homeContainerHeight = 20;
		$('#homecontainer *').each(function(){ homeContainerHeight += $(this).outerHeight(true); });
		$('#homecontainer').height(homeContainerHeight);
	});

	/**
	 * Setup breakpoints variables for each article tag
	 *
	 */
	breakpoints.push($('#home').offset().top);
	selected.push($('nav li a[href="#home"]').parent());
	$('article').each(function(i){
		breakpoints.push($(this).offset().top);
		selected.push($('nav li a[href="#' + $(this).attr('id') +'"]').parent());
	});

	/**
	 * Shell theme navigation
	 *
	 */
	 if($('body').hasClass('shelltheme')){

	 	var currentSlide = 0;

		$('#slidercontainer').width($(window).width() * parseInt($('article').length + 1));
		$('#slidercontainer').height($(window).height());
		$('body header, body article').css({'width': $(window).width()});

		$(window).on('resize', function(e){
			$('#slidercontainer').width($(window).width() * parseInt($('article').length + 1));
			$('#slidercontainer').height($(window).height());
			$('body header, body article').css({'width': $(window).width()});
			$('#slidercontainer').css({'left': (0 - (currentSlide * $(window).width())) + 1});
		})

		$('body > nav li a').off('click');
		$(window).off('scroll');

		$('body > nav li a').on('click', function(event){
    if($(this).attr('href').substr(0, 1) == '#'){
      event.preventDefault() ? event.preventDefault() : event.returnValue = false;
      currentSlide = $(this).parent().index();
      $('#slidercontainer').stop().animate(
        {
          left: (0 - (currentSlide * $(window).width())) + 1 //Plus 1 px
        }, 300, 'easeInOutCubic');
      if($(window).width() < 720){$('nav ul').slideUp();}
      $('body > nav li').removeClass('selected');
      $('body > nav li').eq(currentSlide).addClass('selected');
    }
  });

	 }




});