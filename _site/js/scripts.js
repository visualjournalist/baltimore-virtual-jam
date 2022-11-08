var debugMode = true;
// Basic function to replace console.log() statements so they can all be disabled as needed;
function logger(logString){
	if (debugMode){
		console.log(logString);
	}
}

$(document).ready(function(){
	logger("Ready x");

	// ===================
	// |  Dropdown menu  |
	// ===================
	$(function() {
		$('#main-menu').smartmenus({
			subMenusSubOffsetX: 1,
			subMenusSubOffsetY: -8
		});
	});

	$( "#menuButton" ).click(function() {
		logger("clicked menu toggle")
		$( ".main-menu-nav").toggle();
	});

	$( ".main-menu-nav a").not(".has-submenu").click(function() {
		$( ".main-menu-nav").hide();
	});
	$( ".vj__content" ).click(function() {
		$( ".main-menu-nav").hide();
	});


	$("#siteWarning").click(function() {
		$( "#siteWarning").hide();
	});


	//createMap();
	var videoUrl = "https://www.youtube.com/embed/" + "S7SxD9fALlo?start=4481";
	console.log("videoUrl: " + videoUrl)

	$("#jamVideo").attr("src", videoUrl)


	$("a.tune").click(function(){
		console.log($(this).attr("href"));

		var trackTitle = $(this).attr("title");
		var jamDate = $(this).data("date");

		var url = $(this).attr("href");

		var tune = url.split("v=");
		tune = tune[1];
		tune = tune.split("&t=");
		var timecode = tune[1];

		tune = tune[0];

		videoUrl = "https://www.youtube.com/embed/" + tune + "?start=" + timecode;

		$("#jamVideo").attr("src", videoUrl)
		$("#trackTitle").text(trackTitle)
		$("#jamDate").text(jamDate)
		console.log("jamDate: " + jamDate)

		return false;
	})
});









//------------------------------



