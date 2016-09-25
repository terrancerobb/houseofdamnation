// requestAnimationFrame polyfill
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame =
		window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}());
// end requestAnimationFrame polyfill

(function ($) {
    var $win = $(window);
    var $doc = $(document);
    var dirty = { resize: false, scroll: false };

    (function animationTick(){
    	requestAnimationFrame(animationTick);

    	if(dirty.resize) {
        if($win.width() > 767){
          homeNav();
  			}else{
          homeNavRemove();
        }
    		dirty.resize = false;
    	}

    	if(!dirty.scroll) {
    		return;
    	}
    	dirty.scroll = false;
    }());


		function homeNav(){
      if($win.width() > 767){
        $('#page-top').attr({
          "data-spy": "scroll",
          "data-target": ".navbar"
        })
        $navOffset = $('#nav-sticky').offset().top;
        $('#nav-sticky').affix({
          offset: {
            top: $navOffset
          }
        })

        $navHeight = $('#nav-sticky').outerHeight() + 20;
        $('#nav-sticky').on('affix.bs.affix', function () {
          $('header.intro').css("marginBottom" , $navHeight);
        });

        $('#nav-sticky').on('affixed-top.bs.affix', function () {
          $('header.intro').css("marginBottom" , 0);
        });
			}
		}

    function homeNavRemove(){
        $('#page-top').removeAttr(
          "data-spy",
          "data-target"
        )
        $win.off('.affix');
          $("#nav-sticky")
              .removeClass("affix affix-top affix-bottom")
              .removeData("bs.affix");

        $navHeight = $('#nav-sticky').outerHeight() + 20;
        $('#nav-sticky').on('affix.bs.affix', function () {
          $('header.intro').css("marginBottom" , $navHeight);
        });

        $('#nav-sticky').on('affixed-top.bs.affix', function () {
          $('header.intro').css("marginBottom" , 0);
        });
		}


    $doc.ready(function(){

      homeNav();

      $('a.page-scroll').bind('click', function(event) {
        event.preventDefault();
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
      });

      var video = $("#player").attr("src");
      $('#videoModal').on('show.bs.modal', function (e) {
          $("#player").attr("src","https://www.youtube.com/embed/casXTzrA7BM");
      });
      $('#videoModal').on('hide.bs.modal', function (e) {
          $("#player").attr("src","");
      });

      if($win.width() > 767){
        $("#soundcloud").attr("src","https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/225862382&amp;color=020405&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=falsee&amp;buying=falsee&amp;sharing=false&amp;theme_color020405");
        $(".soundCloud").addClass("shown");
			}
    });

		$win.load(function() {

		})

    $win.scroll(function() {
    	dirty.scroll = true;
    });
    $win.resize(function() {
    	dirty.resize = true;
    });

})(jQuery);
