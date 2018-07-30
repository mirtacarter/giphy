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
      }
    }
    
    
    // Function to generate buttons on click
    $("#add-name").on("click", function(event) {
      event.preventDefault();
    
      // Gets value of name entered into field
      var newPerson= $("#name-input").val().trim();
    
      // Push to array
      topics.push(newPerson);
    
      // Call function to render buttons
      renderButtons();
    });

// Function to get gif results
function displayGifs (){

    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/random/search?q=" +
      name + "&api_key=dc6zaTOxFJmzC&limit=10";

      console.log(name);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    var results = response.data;
    

    for (var i = 0; i < results.length; i++) {
        var newDiv = $("<div class='gifs'>");
        var p = $("<p>");
        p.text("Rating " + results[i].rating);
        var gifs = $("<img>");
        gifs.attr("src", results[i].images.fixed_height_still.url);
        newDiv.append(p);
        newDiv.append(gifs);
        $(".image-bar").prepend(newDiv);
    }
});
}


$(document).on("click", ".housewife", displayGifs);

// Calling the renderButtons function to display the initial list of movies
renderButtons();




});