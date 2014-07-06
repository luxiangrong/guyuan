//jQuery.noConflict();
var jsReady=false;
var swfReady=false;

function isReady(){
	return jsReady;
}

function setSwfIsReady(){
   swfReady=true;

}

function pageInit(){
     jsReady=true;
}

function getSWF(movieName) 
{ 
    if (navigator.appName.indexOf("Microsoft") != -1) 
    { 
        return window[movieName]; 
    } 
    else 
    { 
        return document[movieName]; 
    } 
} 


(function($) {
	$(function() {
		$(document).ready(function(){
			pageInit();
		});
		
		function hello(msg) {
			alert(msg);
		}
		
		
		$(".point").click(function(e){
			
			var $this = $(this);
			var target = $($this.attr("data-target"));
			
			target.css('left', $this.position().left - 300);
			target.css('top', $this.position().top - 165);
			
			target.show();
			target.find('.scrollbar-container').tinyscrollbar();
			
			
			target.find('.close').on('click', function(){
				target.hide();
				getSWF('welcome-flash').resumePlaySound();
				$("#jquery_jplayer_1").jPlayer('stop');
			});
			
			target.on('click', function(e){
				e.stopPropagation();
			});
			e.stopPropagation();
			$("body").off('click').on('click', function(e){
				target.hide();
				getSWF('welcome-flash').resumePlaySound();
				$("#jquery_jplayer_1").jPlayer('stop');
			});
			
			$("#jquery_jplayer_1").jPlayer('play');
			
			getSWF('welcome-flash').stopPlaySound();
		});
		
		$("#jquery_jplayer_1").jPlayer(
			{
				ready: function () {
					$(this).jPlayer("setMedia", {
						mp3: "media/small_apple.mp3",  m4a: "media/small_apple.mp4",  oga: "media/small_apple.ogg"
		      		});
    			},
   				swfPath: "jPlayer",
   				supplied: "mp3, m4a, oga"
  			}
  		);
  		
  		
	});
})(jQuery);
