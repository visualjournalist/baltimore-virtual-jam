var current = "tunes";

var debugMode = true;
// Basic function to replace console.log() statements so they can all be disabled as needed;
function logger(logString){
	if (debugMode){
		console.log(logString);
	}
}



// `folderObject` is the object for editing and updating the active query.
// As it is updated, we push the changes to localStorage, where they're saved as a string 
// The localStorage version is loaded and parsed on initial page load.
var folderObject = {};
if ( localStorage.getItem('folder') ){
	folderObject = JSON.parse(localStorage.getItem('folder'));
}






$(document).ready(function(){
	logger("Ready — folderObject?");

	console.log(folderObject)

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


	// Fold the corners on saved cards (from localStorage)
	for( tune in folderObject){
		var tuneNameSimplified = folderObject[tune].name;
		console.log("tuneNameSimplified");
		console.log(tuneNameSimplified)
		tuneNameSimplified = tuneNameSimplified.replaceAll(" ", "");
		tuneNameSimplified = tuneNameSimplified.replaceAll(".", "")
		tuneNameSimplified = tuneNameSimplified.replaceAll("'", "")
		tuneNameSimplified = tuneNameSimplified.replaceAll("(", "")
		tuneNameSimplified = tuneNameSimplified.replaceAll(")", "")
		tuneNameSimplified = tuneNameSimplified + folderObject[tune].key;
		console.log(tuneNameSimplified);

		$("#" + tuneNameSimplified ).addClass("added");

		$("#" + tuneNameSimplified ).next("ul").addClass("show");
	}


	// Trying to set up code to save tunes to local object
	$(".vj__add-tune").click(function(){
		trackTitle = $(this).data("tune");
		key = $(this).data("key");

		if($(this).hasClass("added")){
			$(this).removeClass("added");
			$(this).next("ul").removeClass("show");
			logger("Trying to delete: " + trackTitle);
			delete folderObject[trackTitle];
		} else {
			$(this).addClass("added");
			$(this).next("ul").addClass("show");
			folderObject[trackTitle] = {};

			folderObject[trackTitle].name = trackTitle;
			folderObject[trackTitle].key = key;

		}

		localStorage.setItem('folder', JSON.stringify(folderObject))

		console.log("current saved tunes")
		console.log(folderObject);
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
			$(".vj__featured-box__column-right").removeClass("showSaved")
		} else if (current == "video"){
			$(".vj__featured-box__column-right").addClass("hide");
			$(".vj__featured-box").removeClass("hide");
			$(".vj__featured-box__column-right").removeClass("showSaved")
		} else if (current == "about"){
			$(".vj__featured-box__column-right").addClass("showSaved")
		}
	}
});









//------------------------------



