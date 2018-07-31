$(document).ready(function(){
// Array of strings for gif topics
var topics = ["real housewives", "nene leakes", "tamra barney", "teresa giudice"];

// Function to generate buttons
function renderButtons() {

    // Clear content in buttons div
      $("#new-buttons").empty();
    
    // Loop function over array
      for (i = 0; i < topics.length; i++){
        // create variable for new button
        var newButton = $("<button>");
        // add class and attributes
        newButton.addClass("housewife");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        // append to div
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

      // Clear input field
      $("#name-input").val('');
    
      // Call function to render buttons
      renderButtons();
    });

// Function to get gif results
function displayGifs (){

    // variables for query
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      name + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";

    // ajax request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        // new div for gif results
        var newDiv = $("<div class='gifs'>");
        var p = $("<p>");
        // show rating
        p.text("Rating: " + results[i].rating);
     
        // variables for img tag, still image URL, and animated image URL
        var gifs = $("<img>");
        var stillImg = results[i].images.fixed_height_still.url;
        var animatedImg = results[i].images.fixed_height.url;
        // initial image src is still image URL
        gifs.attr("src", stillImg);
        // added toggle class and data-states for animation function
        gifs.addClass("toggle");
        gifs.attr("data-state", "still");
        gifs.attr("data-still", stillImg);
        gifs.attr("data-animate", animatedImg);
        // append items to new div
        newDiv.append(p);
        newDiv.append(gifs);
        // prepend new div to image bar
        $(".image-bar").prepend(newDiv);
    }
});
}

// function to check variable state and toggle animation on and off
function playGifs(){
    var state = $(this).attr("data-state");
    
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }

// click event listeners for generating gifs and toggling animation
$(document).on("click", ".housewife", displayGifs);
$(document).on("click", ".toggle", playGifs);

// Calling the renderButtons function 
renderButtons();


});