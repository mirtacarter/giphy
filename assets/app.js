$(document).ready(function(){
// Array of strings for gif topics
var topics = ["real housewives", "nene leakes", "tamra barney", "teresa giudice"];

// Function to generate buttons
function renderButtons() {

// Clear content in buttons div
  $("#new-buttons").empty();

// Loop over array to generate button, add attributes, append to div
  for (i = 0; i < topics.length; i++){
    var newButton = $("<button>");
    newButton.addClass("housewife");
    newButton.attr("data-name", topics[i]);
    newButton.text(topics[i]);
    $("#new-buttons").append(newButton);
  
}}

// Function to generate buttons on click
$("#add-name").on("click", function(event) {
  event.preventDefault();

  // Write code to grab the text the user types into the input field
  var newPerson= $("#name-input").val().trim();

  // Write code to add the new movie into the movies array
  topics.push(newPerson);

  // The renderButtons function is called, rendering the list of movie buttons
  renderButtons();
  
});

// Calling the renderButtons function to display the initial list of movies
renderButtons();


});