//jQuery.noConflict();
var jsReady = false;
var swfReady = false;

function isReady() {
	return jsReady;
}

function setSwfIsReady() {
	swfReady = true;
}

function pageInit() {
	jsReady = true;
}

function getSWF(movieName) {
	if(navigator.appName.indexOf("Microsoft Internet") == -1) {
		if(document.embeds && document.embeds[movieName + "-noie"])
			return document.embeds[movieName + "-noie"];
	} else {
		return document.getElementById(movieName);
	}
}

(function($) {
	$(function() {
		$(document).ready(function() {
			pageInit();

			var lastPoint;
			
			$(".point").on('mouseup', function(e){
				e.stopPropagation();
			});

			$(".point").on('mouseenter', function(e) {
				if(lastPoint) {
					if(lastPoint.attr('data-target') == $(this).attr('data-target')) {
						return;
					}
					$(lastPoint.attr("data-target")).hide();
					$(lastPoint.attr('data-media')).jPlayer('stop');
					
					$(".point").removeClass('active');
				}

				var $this = $(this);
				lastPoint = $this;
				var target = $($this.attr("data-target"));
				
				$this.addClass('active');
				
				if($(this).attr('data-media') == '#intro-4') {
					target.css('left', $this.position().left - 270);
					target.css('top', $this.position().top - 115);
				} else if($(this).attr('data-media') == '#intro-3') {
					target.css('left', $this.position().left - 230);
					target.css('top', $this.position().top - 115);
				} else {
					target.css('left', $this.position().left - 300);
					target.css('top', $this.position().top - 165);
				}

				target.show();
				target.find('.scrollbar-container').tinyscrollbar();

				target.find('.close').on('click', function() {
					$this.removeClass('active');
					target.hide();
					switchToBgSound($this.attr('data-media'));
					lastPoint = false;
				});

				e.stopPropagation();

				target.off('click mouseup').on('click mouseup', function(e) {
					e.stopPropagation();
				});

				$("body").off('mouseup').on('mouseup', function(e) {
					$this.removeClass('active');
					target.hide();
					switchToBgSound($this.attr('data-media'));
					lastPoint = false;
				});

				switchToIntro($this.attr('data-media'));

			});

			$(".intro").each(function(index,item){
				$(item).jPlayer({
					ready : function() {
						$(this).jPlayer("setMedia", {
							mp3 : $(item).attr('data-media')
						});
					},
					play: function() {
					    $(this).jPlayer("pauseOthers"); // pause all players except this one.
					},
					swfPath : "jPlayer",
					supplied : "mp3"
				});
			});

			function switchToIntro(selector) {
				getSWF('welcome-flash').stopPlaySound();
				$(selector).jPlayer('play');
				// $(selector).jPlayer({
					// ready : function() {
						// $(this).jPlayer("setMedia", {
							// mp3 : $(selector).attr('data-media')
						// }).jPlayer('play');
					// },
					// swfPath : "jPlayer",
					// supplied : "mp3"
				// });
			}

			function switchToBgSound(selector) {
				getSWF('welcome-flash').resumePlaySound();
				$(selector).jPlayer('stop');
			}

		});
	});
})(jQuery);
