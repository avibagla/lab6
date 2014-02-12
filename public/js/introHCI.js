'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	$.get("/project/" + idNumber, function(result){
		console.log(result);
		var details = "<h4>" + result.title + "</h4>" + 
			"<img src= \"" + result.image + "\" class=detailsImage />" + result.summary;
		$("#" + projectID + " .details").html(details);
	});

	console.log("User clicked on project " + idNumber);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	$.get("/palette", colorCallback);
	console.log("User clicked on color button");
}

function colorCallback(result){
	var colors = result.colors.hex;
	changeColors(colors);
	console.log(result);
}
function changeColors (colors) {
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}