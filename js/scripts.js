var current = "tunes";

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
	/*
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
	*/


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


		$(".vj__featured-box__column-right").addClass("hide");
		$(".vj__featured-box").removeClass("hide");

		if (chords[trackTitle]){
			console.log("chords!")
			console.log(chords[trackTitle].chords);

			var chordsPretty = chords[trackTitle].chords;
			chordsPretty = chordsPretty.replaceAll("|", "<span style='color: #CCC;'>|</span>")

			$("#summary").html(chordsPretty)
			$("#summary").addClass("chords")
		} else {
			console.log('no chords')
			$("#summary").html("")
		}

		$("a.tune").removeClass("selected");
		$(this).addClass("selected");


		$(".vj__featured-box__column-right").addClass("hide");
		$(".vj__featured-box").removeClass("hide");
		$(".vj__nav-link.selected").removeClass("selected");
		$("#navVideo").addClass("selected");

		return false;
	})

	$("#menuButton").click(function(){
		$(".vj__featured-box__column-right").toggleClass("hide");
		$(".vj__featured-box").toggleClass("hide");
	})

	$(".vj__navbar__key").click(function(){

		//return false
	})

	$(".vj__nav-link").click(function(){
		current = $(this).data("tab");
		$(".vj__nav-link.selected").removeClass("selected");
		$(this).addClass("selected");

		tabNavigation();
	})

	function tabNavigation(){
		console.log("tabNavigation: " + current);

		if (current == "tunes"){
			$(".vj__featured-box__column-right").removeClass("hide");
			$(".vj__featured-box").addClass("hide");
		} else if (current == "video"){
			$(".vj__featured-box__column-right").addClass("hide");
			$(".vj__featured-box").removeClass("hide");
		} else if (current == "about"){

		}
	}
});









//------------------------------



