// wrap; make sure we wait to attach our handlers until the DOM is fully loaded.

$(document).ready( function(){
  
$("#searchBtn").on("click", function() {
 event.preventDefault();
  console.log("CLICK!")
  var pCastSearch = $("#searchBox").val();
  pCastSearch = pCastSearch.toLowerCase()
  .trim();
console.log(pCastSearch);


  $.get("/api/search/" + pCastSearch, function(data) {
    $("#searchResults").empty();
    console.log(data);

    data.forEach(searchResult => {
      
    // $("#searchResults").append(searchResult.id);
    $("#searchResults").append("<img id= 'imgResult' src=" + searchResult.image + "/>");
    $("#searchResults").append("<h6>Title: " + searchResult.title + "</h6>");
    // $("#searchResults").append("<h6>Language: " + searchResult.language + "</h6>");
    // $("#searchResults").append("<h6>Author: " + searchResult.author + "</h6>");
    var saveBtns = $("<button>").addClass("saveBtn micButton fa fa-microphone").attr("id", "addToBtn")
    $("#searchResults").append(saveBtns)
    var hr = $("<hr>").addClass("my-4")
    $("#searchResults").append(hr)

    });
  });
}); 


});





// id: 20
// title: "Rocket"
// image: "http://is5.mzstatic.com/image/thumb/Music71/v4/15/b4/40/15b440b0-1fa5-cb82-fa82-f7174a77e69a/source/600x600bb.jpg"
// description: "Countdown to excitement! Every week Christina Warren, Brianna Wu and Simone de Rochefort have accelerated geek conversation. Tech, comics, movies, games and books, no galaxy is off limits! Hosted by Brianna Wu, Christina Warren, and Simone De Rochefort."
// language: "English"
// categories: "Technology | Gadgets"
// website: "https://www.relay.fm/rocket"
// author: "Relay FM"
// itunes_id: 959773870
// createdAt: "2020-02-02T12:00:00.000Z"
// updatedAt: "2020-02-02T12:00:00.000Z"






